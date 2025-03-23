import React, { useState } from 'react';
import { List, AlertCircle, Eye, Activity, Network, Search, Filter, Clock } from 'lucide-react';
import { Snapshot } from './Snapshot';

interface SnapshotListProps {
  snapshots: Snapshot[];
  isLoading: boolean;
  error: string | null;
  onViewMindmap: (snapshot: Snapshot) => void;
}

export function SnapshotList({ snapshots, isLoading, error, onViewMindmap }: SnapshotListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSnapshots = snapshots.filter(snapshot => 
    snapshot.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="glassmorphism rounded-xl p-8 flex flex-col items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-400 animate-pulse">Loading snapshots...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glassmorphism rounded-xl p-8 flex flex-col items-center justify-center h-64 border border-red-700/30">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="glassmorphism rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <List className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-semibold text-white">Recent Snapshots</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
          <button className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSnapshots.map((snapshot) => (
          <div
            key={snapshot._id}
            className="glassmorphism rounded-lg p-4 hover:bg-gray-800/50 transition-all duration-300 border border-gray-700/50 group relative"
            onMouseEnter={() => setHoveredId(snapshot._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="font-medium text-emerald-400 truncate max-w-md group-hover:text-emerald-300 transition-colors">
                  {snapshot.url}
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(snapshot.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-900/20 rounded-full border border-blue-700/30">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-blue-300">
                    {(snapshot.content.length / 1024).toFixed(1)} KB
                  </span>
                </div>
              </div>
            </div>
            
            {hoveredId === snapshot._id && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 animate-fade-in">
                <button
                  onClick={() => onViewMindmap(snapshot)}
                  className="p-2 bg-emerald-500/20 rounded-lg hover:bg-emerald-500/30 transition-colors group/btn"
                >
                  <Network className="w-4 h-4 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                </button>
                <button className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors group/btn">
                  <Eye className="w-4 h-4 text-blue-400 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            )}
          </div>
        ))}

        {filteredSnapshots.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No snapshots found matching your search
          </div>
        )}
      </div>
    </div>
  );
}