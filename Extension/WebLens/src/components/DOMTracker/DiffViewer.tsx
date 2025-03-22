// DiffViewer.tsx
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
    <pre className="font-mono text-sm">
      {changes.map((part, index) => {
        let color = 'text-gray-300';
        if (part.added) color = 'text-green-400 bg-green-900/20';
        if (part.removed) color = 'text-red-400 bg-red-900/20';
        
        return (
          <span key={index} className={color}>
            {part.value}
          </span>
        );
      })}
    </pre>
  );
};

// export default Diff;