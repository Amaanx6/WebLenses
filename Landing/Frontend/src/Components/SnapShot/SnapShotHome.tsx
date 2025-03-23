import React, { useState, useEffect } from 'react';
import { SnapshotList } from './SnapShotList';
import { SnapshotCard } from './SnapShotCard';
import { SnapshotStats } from './SnapShotStats';
import { DOMTree } from './DOMTree';
import { mockSnapshots } from './MockData';
import type { Snapshot } from './Snapshot';

export function SnapShotHome() {
  const [selectedSnapshot, setSelectedSnapshot] = useState<Snapshot | null>(null);
  const [showDOMTree, setShowDOMTree] = useState(false);
  const [snapshots, setSnapshots] = useState<Snapshot[]>(mockSnapshots);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSnapshots = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/websites');
        if (!response.ok) throw new Error('Failed to fetch snapshots');
        const websites = await response.json();
        
        // Fetch latest snapshot for each website
        const snapshotsData = await Promise.all(
          websites.map(async (website: any) => {
            const snapshotResponse = await fetch(`http://localhost:5000/api/websites/${website.id}/snapshots`);
            if (!snapshotResponse.ok) return null;
            const snapshots = await snapshotResponse.json();
            return snapshots[0] ? {
              _id: snapshots[0].id,
              url: website.url,
              content: snapshots[0].contentPreview,
              createdAt: snapshots[0].capturedAt
            } : null;
          })
        );

        const validSnapshots = snapshotsData.filter(Boolean);
        setSnapshots(validSnapshots.length > 0 ? validSnapshots : mockSnapshots);
      } catch (err) {
        console.error('Error fetching snapshots:', err);
        setSnapshots(mockSnapshots); // Fallback to mock data
        setError('Failed to fetch snapshots from server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnapshots();
  }, []);

  const handleViewMindmap = (snapshot: Snapshot) => {
    setSelectedSnapshot(snapshot);
    setShowDOMTree(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <SnapshotStats snapshots={snapshots} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SnapshotList 
              snapshots={snapshots}
              isLoading={isLoading}
              error={error}
              onViewMindmap={handleViewMindmap}
            />
          </div>
          
          <div>
            {snapshots.length > 0 && (
              <SnapshotCard snapshot={snapshots[0]} />
            )}
          </div>
        </div>
      </div>

      {showDOMTree && selectedSnapshot && (
        <DOMTree
          html={selectedSnapshot.content}
          onClose={() => setShowDOMTree(false)}
        />
      )}
    </div>
  );
}