import React, { useEffect, useState } from 'react';
import { Network, X, Loader2 } from 'lucide-react';
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  Node, 
  Edge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { hierarchy, tree } from 'd3-hierarchy';

interface DOMNode {
  id: string;
  tag: string;
  children: DOMNode[];
  attributes: Record<string, string>;
  textContent?: string;
}

interface DOMTreeProps {
  html: string;
  onClose: () => void;
}

const nodeStyle = {
  background: '#1a1a2e',
  border: '2px solid #4FD1C5',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(79, 209, 197, 0.2)',
};

const MindmapNode = ({ data }: any) => (
  <div className="px-4 py-2" style={nodeStyle}>
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
      <span className="font-mono text-sm text-gray-100">{data.label}</span>
    </div>
  </div>
);

const nodeTypes = { mindmap: MindmapNode };

export function DOMTree({ html, onClose }: DOMTreeProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parseHTML = async () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const parseNode = (node: Element): DOMNode => ({
        id: Math.random().toString(36).substr(2, 9),
        tag: node.tagName.toLowerCase(),
        children: Array.from(node.children).map(child => parseNode(child)),
        attributes: Object.fromEntries(
          Array.from(node.attributes).map(attr => [attr.name, attr.value])
        ),
        textContent: node.childNodes.length === 1 && 
          node.firstChild?.nodeType === 3 ? node.textContent?.trim() : undefined
      });

      const rootNode = parseNode(doc.documentElement);
      const layout = tree<DOMNode>()
        .nodeSize([300, 150])
        .separation(() => 1);

      const hierarchyRoot = hierarchy(rootNode);
      const treeLayout = layout(hierarchyRoot);

      const reactFlowNodes: Node[] = [];
      const reactFlowEdges: Edge[] = [];

      treeLayout.descendants().forEach((node) => {
        reactFlowNodes.push({
          id: node.data.id,
          type: 'mindmap',
          position: { x: node.y, y: node.x },
          data: { label: node.data.tag },
          style: { width: 160 }
        });

        if (node.parent) {
          reactFlowEdges.push({
            id: `edge-${node.parent.data.id}-${node.data.id}`,
            source: node.parent.data.id,
            target: node.data.id,
            animated: true,
            style: {
              stroke: '#4FFB73',
              strokeWidth: 3,
              filter: 'drop-shadow(0 0 2px rgba(79, 251, 115, 0.5))'
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#4FFB73',
              width: 20,
              height: 20
            },
          });
        }
      });

      setNodes(reactFlowNodes);
      setEdges(reactFlowEdges);
      setLoading(false);
    };

    parseHTML();
  }, [html]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl border border-gray-700/50 w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">DOM Mindmap</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="h-[calc(90vh-4rem)] relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
          ) : (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              minZoom={0.5}
              maxZoom={2}
              nodesDraggable={false}
            >
              <Background 
                color="#2d3748" 
                gap={40} 
                className="opacity-20"
                variant="dots"
              />
              <Controls className="bg-gray-800 p-1.5 rounded-md border border-gray-700/50" />
            </ReactFlow>
          )}
        </div>
      </div>
    </div>
  );
}