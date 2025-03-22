import React, { useState } from 'react';
import { List, AlertCircle, Eye, Activity, Network } from 'lucide-react';
import { Snapshot } from './Snapshot';

interface SnapshotListProps {
  snapshots: Snapshot[];
  isLoading: boolean;
  error: string | null;
  onViewMindmap: (snapshot: Snapshot) => void;
}

export function SnapshotList({ snapshots, isLoading, error, onViewMindmap }: SnapshotListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-400">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="glassmorphism rounded-xl p-6">
      <div className="flex items-center mb-6">
        <List className="w-6 h-6 text-emerald-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">Recent Snapshots</h2>
      </div>
      <div className="space-y-4">
        {snapshots.map((snapshot) => (
          <div
            key={snapshot._id}
            className="glassmorphism rounded-lg p-4 hover:bg-gray-800/50 transition-all duration-300 border border-gray-700/50 group relative"
            onMouseEnter={() => setHoveredId(snapshot._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-emerald-400 truncate max-w-md group-hover:text-emerald-300 transition-colors">
                  {snapshot.url}
                </h3>
                <p className="text-sm text-gray-400">
                  {new Date(snapshot.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span className="text-xs bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full border border-blue-700/50">
                  {snapshot.content.length} chars
                </span>
              </div>
            </div>
            
            {hoveredId === snapshot._id && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <button
                  onClick={() => onViewMindmap(snapshot)}
                  className="p-2 bg-emerald-500/20 rounded-lg hover:bg-emerald-500/30 transition-colors"
                >
                  <Network className="w-4 h-4 text-emerald-400" />
                </button>
                <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                  <Eye className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}