import React, { useMemo } from 'react';
import { GitCompare, Plus, Minus, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface DiffChange {
  value: string;
  added: boolean;
  removed: boolean;
}

interface DiffViewerProps {
  diff: {
    older: string;
    newer: string;
    changes: DiffChange[];
  } | null;
}

export function DiffViewer({ diff }: DiffViewerProps) {
  const stats = useMemo(() => {
    if (!diff) return { added: 0, removed: 0 };
    
    return diff.changes.reduce((acc, change) => {
      const lineCount = (change.value.match(/\n/g) || []).length;
      if (change.added) acc.added += lineCount || 1;
      if (change.removed) acc.removed += lineCount || 1;
      return acc;
    }, { added: 0, removed: 0 });
  }, [diff]);

  if (!diff) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 rounded-lg p-8 backdrop-blur-lg bg-opacity-80 border border-gray-700/50 h-full flex flex-col items-center justify-center gap-4"
      >
        <FileCode className="w-16 h-16 text-gray-600" />
        <div className="text-center">
          <h3 className="text-gray-300 font-medium mb-2">No Diff Selected</h3>
          <p className="text-gray-500 text-sm">Select a website and snapshot to view differences</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 rounded-lg backdrop-blur-lg bg-opacity-80 border border-gray-700/50 flex flex-col h-full"
    >
      <div className="border-b border-gray-700/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-200 text-xl font-semibold flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-emerald-400" />
            Changes
          </h2>
          <div className="text-sm bg-gray-800 rounded-lg px-3 py-1.5 text-gray-400 border border-gray-700">
            {new Date(diff.newer).toLocaleString()} vs {new Date(diff.older).toLocaleString()}
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">{stats.added} additions</span>
          </motion.div>
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 bg-red-500/10 px-3 py-1.5 rounded-md border border-red-500/20"
          >
            <Minus className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-medium">{stats.removed} deletions</span>
          </motion.div>
        </div>
      </div>
      
      <div className="overflow-auto flex-1 relative">
        <div className="absolute inset-0">
          {diff.changes.map((change, index) => {
            const lines = change.value.split('\n');
            return lines.map((line, lineIndex) => {
              if (line === '' && lineIndex === lines.length - 1) return null;
              
              return (
                <motion.div
                  key={`${index}-${lineIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: lineIndex * 0.01 }}
                  className={clsx(
                    'group flex',
                    change.added && 'bg-emerald-500/10 hover:bg-emerald-500/20',
                    change.removed && 'bg-red-500/10 hover:bg-red-500/20',
                    !change.added && !change.removed && 'hover:bg-gray-800/50'
                  )}
                >
                  <div className={clsx(
                    'w-[50px] flex-shrink-0 border-r border-gray-700/50 text-right pr-2 py-1 select-none font-mono',
                    change.added && 'text-emerald-400 bg-emerald-500/5',
                    change.removed && 'text-red-400 bg-red-500/5',
                    !change.added && !change.removed && 'text-gray-500'
                  )}>
                    {change.added && '+'}
                    {change.removed && '-'}
                  </div>
                  <pre className={clsx(
                    'py-1 pl-4 pr-2 font-mono text-sm whitespace-pre overflow-x-auto flex-1',
                    change.added && 'text-emerald-400',
                    change.removed && 'text-red-400',
                    !change.added && !change.removed && 'text-gray-300'
                  )}>
                    {line || ' '}
                  </pre>
                </motion.div>
              );
            });
          })}
        </div>
      </div>
    </motion.div>
  );
}