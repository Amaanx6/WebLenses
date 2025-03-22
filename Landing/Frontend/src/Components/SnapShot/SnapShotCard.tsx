import React from 'react';
import { Globe, Clock } from 'lucide-react';
import { Snapshot } from './Snapshot';

interface SnapshotCardProps {
  snapshot: Snapshot;
}

export function SnapshotCard({ snapshot }: SnapshotCardProps) {
  return (
    <div className="glassmorphism rounded-xl p-6">
      <div className="flex items-center mb-4">
        <Globe className="w-6 h-6 text-emerald-400 mr-2" />
        <h3 className="text-lg font-semibold text-white truncate">{snapshot.url}</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {new Date(snapshot.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="glassmorphism rounded-lg p-4">
          <pre className="text-sm text-gray-300 overflow-auto max-h-40 whitespace-pre-wrap">
            {snapshot.content.slice(0, 200)}...
          </pre>
        </div>
      </div>
    </div>
  );
}