// src/components/Mindmap/MindmapPage.tsx
import { useState, useEffect } from 'react';
import { WebsiteList } from './WebsiteList';
import { MindmapVisualization } from './MindmapVisualization';
import { GeminiHandler } from './GeminiHandler';

export const MindmapPage = () => {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [domContent, setDomContent] = useState<string | null>(null);
  const [mindmapData, setMindmapData] = useState<any>(null);

  useEffect(() => {
    const fetchLatestSnapshot = async (url: string) => {
      const response = await fetch(`http://localhost:5000/api/snapshots/${encodeURIComponent(url)}/latest`);
      const { content } = await response.json();
      setDomContent(content);
    };

    if (selectedUrl) fetchLatestSnapshot(selectedUrl);
  }, [selectedUrl]);

  return (
    <div className="h-screen w-full flex bg-gray-900 text-gray-100">
      <WebsiteList onSelect={setSelectedUrl} />
      
      <div className="flex-1 flex flex-col p-4">
        {selectedUrl && domContent ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Mindmap for {selectedUrl}</h2>
              <GeminiHandler 
                content={domContent} 
                onResult={setMindmapData} 
              />
            </div>
            {mindmapData ? (
              <MindmapVisualization data={mindmapData} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Click "Generate Mindmap" to visualize the structure
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a website from the left panel
          </div>
        )}
      </div>
    </div>
  );
};

export default MindmapPage;