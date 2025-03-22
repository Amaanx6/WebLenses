// src/components/Mindmap/WebsiteList.tsx
import { useEffect, useState } from 'react';

export const WebsiteList = ({ onSelect }: { onSelect: (url: string) => void }) => {
  const [websites, setWebsites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebsites = async () => {
      const response = await fetch('http://localhost:5000/api/websites');
      const data = await response.json();
      setWebsites(data);
      setLoading(false);
    };
    
    fetchWebsites();
  }, []);

  return (
    <div className="w-64 border-r border-gray-700 p-4">
      <h2 className="text-lg font-semibold mb-4">Tracked Websites</h2>
      {loading ? (
        <div className="animate-pulse space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-700 rounded" />
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {websites.map(url => (
            <li
              key={url}
              className="p-2 hover:bg-gray-800 rounded cursor-pointer truncate"
              onClick={() => onSelect(url)}
            >
              {url}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};