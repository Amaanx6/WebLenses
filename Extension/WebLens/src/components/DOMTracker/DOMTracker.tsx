// components/Tracker.tsx
import { useState, useEffect } from 'react';
import { Diff } from './DiffViewer';

interface Snapshot {
  id: string;
  createdAt: Date;
}

interface DiffResult {
  older: Date;
  newer: Date;
  changes: Array<{
    value: string;
    added?: boolean;
    removed?: boolean;
  }>;
}

const DomTracker = () => {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [currentUrl, setCurrentUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentDiff, setCurrentDiff] = useState<DiffResult | null>(null);

  const fetchSnapshots = async (url: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/snapshots/${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('Failed to load history');
      
      const data = await response.json();
      setSnapshots(data);

      if (data.length >= 2) {
        const diffResponse = await fetch(`http://localhost:5000/api/snapshots/${encodeURIComponent(url)}/diff`);
        if (!diffResponse.ok) throw new Error('Failed to load diff');
        
        const diffData = await diffResponse.json();
        setCurrentDiff(diffData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    }
  };

  const captureDom = async () => {
    try {
      setIsLoading(true);
      const [tab] = await chrome.tabs.query({ 
        active: true, 
        currentWindow: true,
        status: 'complete'
      });

      if (!tab?.url || !tab.id) {
        throw new Error('No active tab found');
      }

      const injectionResults = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.documentElement?.outerHTML || '',
        world: 'MAIN'
      });

      const htmlContent = injectionResults[0]?.result;
      if (!htmlContent) throw new Error('DOM capture failed');

      const saveResponse = await fetch('http://localhost:5000/api/snapshots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: tab.url, content: htmlContent })
      });

      if (!saveResponse.ok) throw new Error('Save failed');

      setCurrentUrl(tab.url);
      await fetchSnapshots(tab.url);
      setError('');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    captureDom();
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-w-[400px]">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Website Tracker</h2>
        
        {isLoading ? (
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
            <span>Analyzing page structure...</span>
          </div>
        ) : error ? (
          <div className="text-red-400 text-sm">
            Error: {error}
          </div>
        ) : (
          <div className="text-sm text-gray-400">
            Tracking: <span className="text-purple-300 break-all">{currentUrl}</span>
          </div>
        )}
      </div>

      <button
        onClick={captureDom}
        disabled={isLoading}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md disabled:opacity-50 mb-4"
      >
        {isLoading ? 'Capturing...' : 'Capture New Snapshot'}
      </button>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Version History</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {snapshots.map(snapshot => (
            <div 
              key={snapshot.id} 
              className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
            >
              <span className="text-xs text-gray-300">
                {new Date(snapshot.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {currentDiff && (
        <div className="mt-4 p-4 bg-gray-800 rounded-md">
          <h3 className="font-semibold mb-2">Changes Detected</h3>
          <Diff changes={currentDiff.changes} />
        </div>
      )}
    </div>
  );
};

export default DomTracker;