import React from 'react';
import { History, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Snapshot {
  id: string;
  capturedAt: string;
  contentPreview: string;
}

interface SnapshotListProps {
  snapshots: Snapshot[];
  onSelectSnapshot: (snapshotId: string) => void;
  selectedSnapshotId: string | null;
  loading?: boolean;
}

export function SnapshotList({ snapshots, onSelectSnapshot, selectedSnapshotId, loading }: SnapshotListProps) {
  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 backdrop-blur-lg bg-opacity-80 border border-blue-500/20">
        <h2 className="text-blue-400 text-xl font-semibold mb-4 flex items-center gap-2">
          <History className="w-5 h-5" />
          Snapshots History
        </h2>
        <div className="animate-pulse space-y-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-16 bg-gray-800/50 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (snapshots.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 backdrop-blur-lg bg-opacity-80 border border-blue-500/20">
        <h2 className="text-blue-400 text-xl font-semibold mb-4 flex items-center gap-2">
          <History className="w-5 h-5" />
          Snapshots History
        </h2>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No snapshots available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 backdrop-blur-lg bg-opacity-80 border border-blue-500/20">
      <h2 className="text-blue-400 text-xl font-semibold mb-4 flex items-center gap-2">
        <History className="w-5 h-5" />
        Snapshots History
      </h2>
      <div className="space-y-2">
        {snapshots.map((snapshot, index) => (
          <motion.button
            key={snapshot.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectSnapshot(snapshot.id)}
            className={clsx(
              'w-full text-left p-3 rounded-lg transition-all duration-200',
              selectedSnapshotId === snapshot.id
                ? 'bg-blue-500/20 border border-blue-500/40'
                : 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800'
            )}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">
                    {new Date(snapshot.capturedAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm truncate pr-4">
                  {snapshot.contentPreview}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}