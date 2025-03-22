import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { diffLines } from 'diff';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dom-tracker')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: unknown) => console.error('MongoDB connection error:', err));

// TypeScript Interface for Snapshot
interface ISnapshot extends Document {
  url: string;
  content: string;
  createdAt: Date;
}

// Mongoose Schema
const snapshotSchema = new Schema<ISnapshot>({
  url: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Snapshot = mongoose.model<ISnapshot>('Snapshot', snapshotSchema);

// API Routes
//@ts-ignore
app.post('/api/snapshots', async (req: Request, res: Response) => {
  try {
    const { url, content } = req.body;
    
    if (!url || !content) {
      return res.status(400).json({ error: 'Missing url or content' });
    }

    const snapshot = new Snapshot({ url, content });
    await snapshot.save();
    
    res.json({ id: snapshot._id, createdAt: snapshot.createdAt });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/snapshots/:url', async (req: express.Request, res: express.Response) => {
  try {
    const snapshots = await Snapshot.find({ url: req.params.url })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(snapshots.map((s: ISnapshot) => ({
      id: s._id,
      createdAt: s.createdAt
    })));
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
//@ts-ignore

app.get('/api/snapshots/:url/diff', async (req: express.Request, res: express.Response) => {
  try {
    const snapshots = await Snapshot.find({ url: req.params.url })
      .sort({ createdAt: -1 })
      .limit(2);

    if (snapshots.length < 2) {
      return res.status(404).json({ error: 'Not enough snapshots' });
    }

    const [newer, older] = snapshots;
    const differences = diffLines(older.content, newer.content);

    res.json({
      older: older.createdAt,
      newer: newer.createdAt,
      changes: differences.map((part: { value: string; added?: boolean; removed?: boolean }) => ({
        value: part.value,
        added: part.added,
        removed: part.removed
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Add to your existing backend routes
app.get('/api/websites', async (req: Request, res: Response) => {
  try {
    const websites = await Snapshot.distinct('url');
    res.json(websites);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


//@ts-ignore
app.get('/api/snapshots/:url/latest', async (req: Request, res: Response) => {
  try {
    const snapshot = await Snapshot.findOne({ url: req.params.url })
      .sort({ createdAt: -1 });
    
    if (!snapshot) return res.status(404).json({ error: 'No snapshots found' });
    
    res.json({ content: snapshot.content });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add this route above the PORT declaration
app.get('/api/snapshots', async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    console.log('Database name:', mongoose.connection.db.databaseName);
    console.log('Collection name being queried:', Snapshot.collection.collectionName);
    
    // Try a more basic query first
    const count = await Snapshot.countDocuments();
    console.log('Total document count:', count);
    
    const snapshots = await Snapshot.find().lean();
    console.log('Query returned documents:', snapshots.length);
    
    if (snapshots.length > 0) {
      console.log('Sample document:', JSON.stringify(snapshots[0]).substring(0, 200) + '...');
    }
    
    // Your existing code...
    res.json({
      count: snapshots.length,
      results: snapshots.map(snapshot => ({
        id: snapshot._id,
        url: snapshot.url,
        createdAt: snapshot.createdAt,
        content: snapshot.content ? (snapshot.content.slice(0, 100) + '...') : 'No content'
      }))
    });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
