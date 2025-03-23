import React, { useEffect, useState } from 'react';
import { Network, X, Loader2 } from 'lucide-react';
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  Node, 
  Edge,
  MarkerType,
  ConnectionLineType,
  BackgroundVariant,
  Position,
  Handle
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
  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(32, 32, 56, 0.95) 100%)',
  border: '2px solid #4FD1C5',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(79, 209, 197, 0.15)',
  backdropFilter: 'blur(8px)',
  padding: '12px 20px',
};

const handleStyle = {
  width: '8px',
  height: '8px',
  background: '#4FD1C5',
  border: '2px solid #2D3748'
};

const MindmapNode = ({ data }: any) => (
  <>
    <Handle
      type="target"
      position={Position.Left}
      style={handleStyle}
    />
    <div style={nodeStyle}>
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/20" />
        <span className="font-mono text-sm font-medium text-gray-100">{data.label}</span>
      </div>
    </div>
    <Handle
      type="source"
      position={Position.Right}
      style={handleStyle}
    />
  </>
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
        .nodeSize([200, 250])
        .separation(() => 2);

      const hierarchyRoot = hierarchy(rootNode);
      const treeLayout = layout(hierarchyRoot);

      const reactFlowNodes: Node[] = [];
      const reactFlowEdges: Edge[] = [];

      treeLayout.descendants().forEach((node) => {
        const label = node.data.textContent 
          ? `${node.data.tag} - ${node.data.textContent.slice(0, 20)}${node.data.textContent.length > 20 ? '...' : ''}`
          : node.data.tag;

        reactFlowNodes.push({
          id: node.data.id,
          type: 'mindmap',
          position: { x: node.y, y: node.x },
          data: { label },
          style: { width: 'auto' }
        });

        if (node.parent) {
          reactFlowEdges.push({
            id: `edge-${node.parent.data.id}-${node.data.id}`,
            source: node.parent.data.id,
            target: node.data.id,
            type: 'step',
            style: {
              stroke: '#4FD1C5',
              strokeWidth: 3,
              opacity: 0.8,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: '#4FD1C5',
            },
            animated: true
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-700/50 w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-700/50 flex items-center justify-between bg-gray-800/50">
          <div className="flex items-center gap-3">
            <Network className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">DOM Mindmap</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
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
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              minZoom={0.3}
              maxZoom={1.5}
              nodesDraggable={false}
              proOptions={{ hideAttribution: true }}
              className="bg-gray-900/50"
              defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
            >
              <Background 
                color="#4FD1C5" 
                gap={24} 
                size={1.5}
                className="opacity-[0.02]"
                variant={BackgroundVariant.Dots}
              />
              <Controls 
                className="bg-gray-800/90 p-2 rounded-xl border border-gray-700/50 shadow-xl backdrop-blur-sm"
                showInteractive={false}
              />
            </ReactFlow>
          )}
        </div>
      </div>
    </div>
  );
}