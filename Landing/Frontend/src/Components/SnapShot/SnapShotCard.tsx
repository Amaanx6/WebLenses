import React from 'react';
import { Globe, Clock, FileText, Code } from 'lucide-react';
import { Snapshot } from './Snapshot';

interface SnapshotCardProps {
  snapshot: Snapshot;
}

export function SnapshotCard({ snapshot }: SnapshotCardProps) {
  const contentPreview = snapshot.content
    .replace(/<[^>]+>/g, '')
    .slice(0, 150);

  return (
    <div className="glassmorphism rounded-xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group">
      <div className="flex items-center mb-6">
        <Globe className="w-6 h-6 text-emerald-400 mr-3 group-hover:rotate-180 transition-transform duration-700" />
        <h3 className="text-lg font-semibold text-white truncate flex-1">{snapshot.url}</h3>
      </div>

      <div className="space-y-6">
        <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
          <Clock className="w-4 h-4 mr-3" />
          <span className="text-sm">
            {new Date(snapshot.createdAt).toLocaleString()}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FileText className="w-4 h-4" />
            <span>Content Preview</span>
          </div>
          
          <div className="glassmorphism rounded-lg p-4 group-hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
              <Code className="w-3 h-3" />
              <span>HTML Content</span>
            </div>
            <pre className="text-sm text-gray-300 font-mono overflow-auto max-h-40 whitespace-pre-wrap">
              {contentPreview}...
            </pre>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{snapshot.content.length.toLocaleString()} characters</span>
            <span>{(snapshot.content.length / 1024).toFixed(2)} KB</span>
          </div>
        </div>
      </div>
    </div>
  );
}