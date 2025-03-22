import React, { useState } from 'react';
import { SnapshotList } from './SnapShotList';
import { SnapshotCard } from './SnapShotCard';
import { SnapshotStats } from './SnapShotStats';
import { DOMTree } from './DOMTree';
import { mockSnapshots } from './MockData';
import type { Snapshot } from './Snapshot';

export function SnapShotHome() {
  const [selectedSnapshot, setSelectedSnapshot] = useState<Snapshot | null>(null);
  const [showDOMTree, setShowDOMTree] = useState(false);

  const handleViewMindmap = (snapshot: Snapshot) => {
    setSelectedSnapshot(snapshot);
    setShowDOMTree(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <SnapshotStats snapshots={mockSnapshots} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SnapshotList 
              snapshots={mockSnapshots}
              isLoading={false}
              error={null}
              onViewMindmap={handleViewMindmap}
            />
          </div>
          
          <div>
            {mockSnapshots.length > 0 && (
              <SnapshotCard snapshot={mockSnapshots[0]} />
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

