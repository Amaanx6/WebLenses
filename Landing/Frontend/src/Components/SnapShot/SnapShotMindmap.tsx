import React, { useEffect, useRef, useState } from 'react';
import { Network, Share2 } from 'lucide-react';
import type { MindmapData, DOMNode } from './Snapshot';

interface SnapshotMindmapProps {
  className?: string;
}

export function SnapshotMindmap({ className }: SnapshotMindmapProps) {
  const [mindmapData, setMindmapData] = useState<MindmapData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<DOMNode | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMindmapData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/snapshots/mindmap');
        if (!response.ok) throw new Error('Failed to fetch mindmap data');
        const data = await response.json();
        setMindmapData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load mindmap');
      }
    };

    fetchMindmapData();
  }, []);

  if (error) {
    return (
      <div className="glassmorphism rounded-xl p-6 text-red-400 flex items-center justify-center">
        <Share2 className="w-6 h-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  if (!mindmapData) {
    return (
      <div className="glassmorphism rounded-xl p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`glassmorphism rounded-xl p-6 ${className}`}>
      <div className="flex items-center mb-6">
        <Network className="w-6 h-6 text-emerald-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">Snapshot Mindmap</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative h-[400px] glassmorphism rounded-lg p-4">
          <div className="absolute inset-0 flex flex-wrap gap-4 p-4 overflow-auto">
            {mindmapData.nodes.map((node) => (
              <div
                key={node.id}
                className={`
                  relative p-4 rounded-lg cursor-pointer transition-all duration-300
                  ${selectedNode?.id === node.id 
                    ? 'bg-emerald-500/20 border-emerald-500/50' 
                    : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70'
                  }
                  border
                `}
                style={{
                  width: `${Math.max(200, node.children.length * 50)}px`,
                }}
                onClick={() => setSelectedNode(node)}
              >
                <h3 className="text-emerald-400 font-medium truncate mb-2">&lt;{node.tag}&gt;</h3>
                {node.textContent && (
                  <p className="text-sm text-gray-400 line-clamp-2">{node.textContent}</p>
                )}
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {Object.keys(node.attributes || {}).length} attributes
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glassmorphism rounded-lg p-4">
          {selectedNode ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Selected Node Details</h3>
              <div className="space-y-2">
                <p className="text-emerald-400">&lt;{selectedNode.tag}&gt;</p>
                {selectedNode.textContent && (
                  <p className="text-sm text-gray-400">{selectedNode.textContent}</p>
                )}
                {selectedNode.attributes && Object.entries(selectedNode.attributes).length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Attributes:</p>
                    {Object.entries(selectedNode.attributes).map(([key, value]) => (
                      <p key={key} className="text-xs text-gray-500">
                        {key}="{value}"
                      </p>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Children: {selectedNode.children.length}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a node to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}