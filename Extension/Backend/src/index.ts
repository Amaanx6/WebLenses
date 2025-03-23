import express, { Request, Response } from 'express';
import mongoose, { Schema, Document, Types } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { diffLines } from 'diff';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI as string)
.then(() => console.log('Connected to MongoDB'))
.catch((err: unknown) => console.error('MongoDB connection error:', err));

// Interfaces
interface ITrackedWebsite extends Document {
url: string;
name?: string;
createdAt: Date;
isActive: boolean;
}

interface ISnapshot extends Document {
website: Types.ObjectId;
content: string;
capturedAt: Date;
}

// Schemas
const trackedWebsiteSchema = new Schema<ITrackedWebsite>({
url: { type: String, required: true, unique: true },
name: String,
createdAt: { type: Date, default: Date.now },
isActive: { type: Boolean, default: true }
});

const snapshotSchema = new Schema<ISnapshot>({
website: { type: Schema.Types.ObjectId, ref: 'TrackedWebsite', required: true },
content: { type: String, required: true },
capturedAt: { type: Date, default: Date.now }
});

const TrackedWebsite = mongoose.model<ITrackedWebsite>('TrackedWebsite', trackedWebsiteSchema);
const Snapshot = mongoose.model<ISnapshot>('Snapshot', snapshotSchema);

// Middleware
const validateWebsiteExists = async (req: Request, res: Response, next: Function) => {
try {
const website = await TrackedWebsite.findById(req.params.websiteId);
if (!website) return res.status(404).json({ error: 'Website not found' });
next();
} catch (error) {
res.status(500).json({ error: 'Server error' });
}
};

// API Routes
// @ts-ignore
app.post('/api/websites', async (req: Request, res: Response) => {
try {
const { url, name } = req.body;


if (!url) return res.status(400).json({ error: 'URL is required' });

const existingWebsite = await TrackedWebsite.findOne({ url });
if (existingWebsite) {
  return res.status(409).json({ 
    error: 'Website already tracked',
    websiteId: existingWebsite._id
  });
}

const website = new TrackedWebsite({ url, name });
await website.save();

res.status(201).json({
  id: website._id,
  url: website.url,
  name: website.name,
  createdAt: website.createdAt
});
} catch (error) {
res.status(500).json({ error: 'Server error' });
}
});
// @ts-ignore

app.post('/api/websites/:websiteId/snapshots', validateWebsiteExists, async (req: Request, res: Response) => {
try {
const { content } = req.body;
if (!content) return res.status(400).json({ error: 'Content is required' });


const snapshot = new Snapshot({
  website: req.params.websiteId,
  content
});

await snapshot.save();

res.status(201).json({
  id: snapshot._id,
  capturedAt: snapshot.capturedAt,
  contentLength: content.length
});
} catch (error) {
res.status(500).json({ error: 'Server error' });
}
});

app.get('/api/websites', async (req: Request, res: Response) => {
try {
const websites = await TrackedWebsite.find({ isActive: true }).lean();


// Get latest snapshot for each website
const websitesWithSnapshots = await Promise.all(
  websites.map(async (website) => {
    const latestSnapshot = await Snapshot.findOne(
      { website: website._id },
      { capturedAt: 1 }
    ).sort({ capturedAt: -1 }).lean();

    return {
      ...website,
      latestSnapshot: latestSnapshot?.capturedAt || null
    };
  })
);

res.json(websitesWithSnapshots.map(website => ({
  id: website._id,
  url: website.url,
  name: website.name,
  createdAt: website.createdAt,
  latestSnapshot: website.latestSnapshot
})));
} catch (error) {
console.error('GET /websites error:', error);
res.status(500).json({
error: 'Server error',
details: error instanceof Error ? error.message : 'Unknown error'
});
}
});
// @ts-ignore

app.get('/api/websites/:websiteId/snapshots', validateWebsiteExists, async (req: Request, res: Response) => {
try {
const snapshots = await Snapshot.find({ website: req.params.websiteId })
.sort({ capturedAt: -1 })
.select('capturedAt content')
.limit(50);


res.json(snapshots.map(snapshot => ({
  id: snapshot._id,
  capturedAt: snapshot.capturedAt,
  contentPreview: snapshot.content.slice(0, 100) + '...'
})));
} catch (error) {
res.status(500).json({ error: 'Server error' });
}
});
// @ts-ignore

app.get('/api/websites/:websiteId/diff', validateWebsiteExists, async (req: Request, res: Response) => {
try {
const snapshots = await Snapshot.find({ website: req.params.websiteId })
.sort({ capturedAt: -1 })
.limit(2);


if (snapshots.length < 2) {
  return res.status(404).json({ error: 'Not enough snapshots' });
}

const [newer, older] = snapshots;
const differences = diffLines(older.content, newer.content);

res.json({
  older: older.capturedAt,
  newer: newer.capturedAt,
  changes: differences.map(part => ({
    value: part.value,
    added: part.added,
    removed: part.removed
  }))
});
} catch (error) {
res.status(500).json({ error: 'Server error' });
}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});