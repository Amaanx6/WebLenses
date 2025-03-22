// src/components/Mindmap/MindmapVisualization.tsx
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

export const MindmapVisualization = ({ data }: { data: any }) => {
  return (
    <div className="flex-1 bg-gray-900 rounded-lg border border-gray-700">
      <ReactFlow 
        nodes={data.nodes}
        edges={data.edges}
        fitView
        className="rounded-lg"
      >
        <Background color="#374151" gap={16} />
        <Controls className="bg-gray-800 p-1 rounded-md shadow-lg" />
      </ReactFlow>
    </div>
  );
};