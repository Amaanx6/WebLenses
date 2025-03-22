import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface DiffProps {
  changes: Array<{
    value: string;
    added?: boolean;
    removed?: boolean;
  }>;
}

export const Diff: React.FC<DiffProps> = ({ changes }) => {
  const hasChanges = changes.some(part => part.added || part.removed);
  
  return (
    <div className="w-full rounded-md overflow-hidden">
      {hasChanges ? (
        <div className="flex flex-col items-center text-center py-2">
          <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
          <p className="text-gray-400 text-sm mb-2">
            {changes.length} modifications found
          </p>
          <div className="bg-gray-700/30 p-2 rounded-lg text-sm text-gray-300 w-full max-w-xs">
            Full change history available on{' '}
            <span className="text-purple-300 font-medium">ChangeArchive</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center py-2">
          <AlertCircle className="w-5 h-5 text-yellow-400 mb-2" />
          <p className="text-gray-400 text-sm">
            The DOM structure remains identical
          </p>
        </div>
      )}
    </div>
  );
};