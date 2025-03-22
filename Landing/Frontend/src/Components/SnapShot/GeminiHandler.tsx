// src/components/Mindmap/GeminiHandler.tsx
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyAbi5TW_CQNk1s7eErTSLzxtJXGpr6BiA0');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const GeminiHandler = ({ 
  content,
  onResult
}: { 
  content: string;
  onResult: (data: any) => void 
}) => {
  const [loading, setLoading] = useState(false);

  const generateMindmap = async () => {
    setLoading(true);
    try {
      const prompt = `Analyze this HTML structure and create a mindmap JSON format with the following structure:
      {
        nodes: { id: string, label: string }[],
        edges: { id: string, source: string, target: string }[]
      }
      Focus on main structural elements and their hierarchy. Use HTML tag names and important attributes like id/class.
      HTML: ${content.slice(0, 30000)}`;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      const jsonMatch = response.match(/```json([\s\S]*?)```/);
      
      if (jsonMatch) {
        const mindmapData = JSON.parse(jsonMatch[1]);
        onResult(mindmapData);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg mb-4">
      <button
        onClick={generateMindmap}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Mindmap'}
      </button>
    </div>
  );
};