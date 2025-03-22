import React from 'react';
import { BarChart2, Clock, Globe } from 'lucide-react';
import { Snapshot } from './Snapshot';

interface SnapshotStatsProps {
  snapshots: Snapshot[];
}

export function SnapshotStats({ snapshots }: SnapshotStatsProps) {
  const uniqueUrls = new Set(snapshots.map(s => s.url)).size;
  const latestSnapshot = snapshots[0];
  const averageContentLength = snapshots.length > 0
    ? Math.round(snapshots.reduce((acc, s) => acc + s.content.length, 0) / snapshots.length)
    : 0;

  return (
    <div className="glassmorphism rounded-xl p-6">
      <div className="flex items-center mb-6">
        <BarChart2 className="w-6 h-6 text-emerald-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">Snapshot Statistics</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glassmorphism rounded-lg p-4 border border-emerald-700/50">
          <div className="flex items-center text-emerald-400 mb-2">
            <Globe className="w-5 h-5 mr-2" />
            <span className="font-medium">Unique URLs</span>
          </div>
          <p className="text-2xl font-bold text-white">{uniqueUrls}</p>
        </div>
        <div className="glassmorphism rounded-lg p-4 border border-blue-700/50">
          <div className="flex items-center text-blue-400 mb-2">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-medium">Latest Update</span>
          </div>
          <p className="text-sm font-medium text-gray-300">
            {latestSnapshot ? new Date(latestSnapshot.createdAt).toLocaleString() : 'No snapshots yet'}
          </p>
        </div>
        <div className="animate-gradient rounded-lg p-4">
          <div className="flex items-center text-white mb-2">
            <BarChart2 className="w-5 h-5 mr-2" />
            <span className="font-medium">Avg. Content Length</span>
          </div>
          <p className="text-2xl font-bold text-white">{averageContentLength}</p>
        </div>
      </div>
    </div>
  );
}