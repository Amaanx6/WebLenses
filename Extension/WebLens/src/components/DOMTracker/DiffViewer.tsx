// components/DiffViewer.tsx
import React from 'react';

interface DiffProps {
  changes: Array<{
    value: string;
    added?: boolean;
    removed?: boolean;
  }>;
}

export const Diff: React.FC<DiffProps> = ({ changes }) => {
  return (
    <div className="text-xs font-mono whitespace-pre-wrap max-h-52 overflow-y-auto">
      {changes.map((change, index) => (
        <div 
          key={index} 
          className={`${
            change.added 
              ? 'bg-green-900/50 text-green-300' 
              : change.removed 
                ? 'bg-red-900/50 text-red-300' 
                : 'text-gray-400'
          }`}
        >
          {change.value}
        </div>
      ))}
    </div>
  );
};