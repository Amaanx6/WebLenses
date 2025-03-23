import React from 'react';
import { BarChart2, Clock, Globe, FileText, Layers, TrendingUp } from 'lucide-react';
import { Snapshot } from './Snapshot';

interface SnapshotStatsProps {
  snapshots: Snapshot[];
}

export function SnapshotStats({ snapshots }: SnapshotStatsProps) {
  const uniqueUrls = new Set(snapshots.map(s => s.url)).size;
  const latestSnapshot = snapshots[0];
  const totalContentSize = snapshots.reduce((acc, s) => acc + s.content.length, 0);
  const averageContentLength = snapshots.length > 0
    ? Math.round(snapshots.reduce((acc, s) => acc + s.content.length, 0) / snapshots.length)
    : 0;
  
  const contentGrowthRate = snapshots.length > 1
    ? ((snapshots[0].content.length - snapshots[snapshots.length - 1].content.length) / 
       snapshots[snapshots.length - 1].content.length * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart2 className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-semibold text-white">Snapshot Analytics</h2>
        </div>
        <div className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glassmorphism rounded-xl p-6 border border-emerald-700/30 hover:border-emerald-600/50 transition-colors group">
          <div className="flex items-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
            <Globe className="w-5 h-5 mr-3" />
            <span className="font-medium">Monitored URLs</span>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-white">{uniqueUrls}</p>
            <p className="text-sm text-gray-400">Active tracking points</p>
          </div>
        </div>

        <div className="glassmorphism rounded-xl p-6 border border-blue-700/30 hover:border-blue-600/50 transition-colors group">
          <div className="flex items-center text-blue-400 mb-4 group-hover:scale-105 transition-transform">
            <Clock className="w-5 h-5 mr-3" />
            <span className="font-medium">Latest Capture</span>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-white">
              {latestSnapshot ? new Date(latestSnapshot.createdAt).toLocaleString() : 'No snapshots'}
            </p>
            <p className="text-sm text-gray-400">Most recent activity</p>
          </div>
        </div>

        <div className="glassmorphism rounded-xl p-6 border border-purple-700/30 hover:border-purple-600/50 transition-colors group">
          <div className="flex items-center text-purple-400 mb-4 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5 mr-3" />
            <span className="font-medium">Content Stats</span>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-white">{(totalContentSize / 1024).toFixed(1)}KB</p>
            <p className="text-sm text-gray-400">Total content size</p>
          </div>
        </div>

        <div className="glassmorphism rounded-xl p-6 border border-pink-700/30 hover:border-pink-600/50 transition-colors group">
          <div className="flex items-center text-pink-400 mb-4 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5 mr-3" />
            <span className="font-medium">Average Size</span>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-white">{(averageContentLength / 1024).toFixed(1)}KB</p>
            <p className="text-sm text-gray-400">Per snapshot</p>
          </div>
        </div>

        <div className="glassmorphism rounded-xl p-6 border border-amber-700/30 hover:border-amber-600/50 transition-colors group">
          <div className="flex items-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5 mr-3" />
            <span className="font-medium">Growth Rate</span>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-white">{contentGrowthRate}%</p>
            <p className="text-sm text-gray-400">Content size change</p>
          </div>
        </div>
      </div>
    </div>
  );
}