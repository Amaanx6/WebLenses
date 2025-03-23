
// components/DOMTracker.tsx
import { useState, useEffect } from 'react';
import { Diff } from './DiffViewer';
import { Loader2, Camera, AlertCircle, History, Plus } from 'lucide-react';

interface Snapshot {
  id: string;
  capturedAt: Date;
  contentPreview: string;
}

interface Website {
  id: string;
  url: string;
  createdAt: Date;
  name?: string;
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
  const [website, setWebsite] = useState<Website | null>(null);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [diff, setDiff] = useState<DiffResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTracking, setIsTracking] = useState(false);

  const fetchWebsiteData = async (websiteId: string) => {
    try {
      // The backend doesn't have a route for getting a single website by ID
      // Instead, we'll get all websites and filter for the one we want
      const websitesRes = await fetch('http://localhost:5000/api/websites');
      if (!websitesRes.ok) {
        throw new Error('Failed to load website data');
      }
      
      const websites = await websitesRes.json();
      const websiteData = websites.find((site: Website) => site.id === websiteId);
      
      if (!websiteData) {
        throw new Error('Website not found');
      }
      
      setWebsite(websiteData);
      
      const snapshotsRes = await fetch(`http://localhost:5000/api/websites/${websiteId}/snapshots`);
      if (!snapshotsRes.ok) {
        const errorData = await snapshotsRes.json().catch(() => ({ error: 'Invalid snapshots response' }));
        throw new Error(errorData.error || 'Failed to load history');
      }
      const snapshotsData = await snapshotsRes.json();
      setSnapshots(snapshotsData);
      setIsTracking(true);
      
      if (snapshotsData.length >= 2) {
        const diffRes = await fetch(`http://localhost:5000/api/websites/${websiteId}/diff`);
        if (diffRes.ok) {
          const diffData = await diffRes.json();
          setDiff(diffData);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const checkTrackingStatus = async (url: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/websites');
      if (!response.ok) {
        throw new Error('Failed to check tracking status');
      }
      
      const websites = await response.json();
      // Find websites matching the URL
      return websites.filter((site: Website) => site.url === url);
    } catch (err) {
      console.error('Check tracking error:', err);
      setError(err instanceof Error ? err.message : 'Tracking check failed');
      return [];
    }
  };

  const startTracking = async (url: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.websiteId) {
          await fetchWebsiteData(data.websiteId);
          return true;
        }
        throw new Error(data.error || 'Tracking failed');
      }

      setWebsite(data);
      setIsTracking(true);
      await fetchWebsiteData(data.id);
      return true;
    } catch (err) {
      console.error('Start tracking error:', err);
      setError(err instanceof Error ? err.message : 'Tracking failed');
      return false;
    }
  };

  const captureSnapshot = async () => {
    if (!website?.id) return;

    try {
      setIsLoading(true);
      const [tab] = await chrome.tabs.query({ 
        active: true, 
        currentWindow: true,
        url: ['*://*/*'] // Allow all URLs
      });

      if (!tab?.id) throw new Error('No active tab found');
      
      const [injection] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          try {
            return document.documentElement?.outerHTML || '';
          } catch (error) {
            console.error('DOM access error:', error);
            return null;
          }
        },
        world: 'MAIN'
      });

      if (!injection.result) throw new Error('DOM capture failed');
      if (typeof injection.result !== 'string' || injection.result.length < 100) {
        throw new Error('Invalid DOM content captured');
      }

      const saveResponse = await fetch(
        `http://localhost:5000/api/websites/${website.id}/snapshots`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: injection.result })
        }
      );

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json().catch(() => ({ error: 'Invalid response' }));
        throw new Error(errorData.error || 'Snapshot save failed');
      }

      await fetchWebsiteData(website.id);
      setError('');
    } catch (err) {
      console.error('Capture error:', err);
      setError(err instanceof Error ? err.message : 'Capture failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeTracker = async () => {
      try {
        const [tab] = await chrome.tabs.query({ 
          active: true, 
          currentWindow: true 
        });

        if (tab?.url) {
          const existingWebsites = await checkTrackingStatus(tab.url);
          if (existingWebsites && existingWebsites.length > 0) {
            await fetchWebsiteData(existingWebsites[0].id);
          } else {
            setWebsite({ url: tab.url } as Website);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Init error:', err);
        setError(err instanceof Error ? err.message : 'Initialization failed');
        setIsLoading(false);
      }
    };

    initializeTracker();
  }, []);

  const handleMainAction = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url) return;

    if (isTracking) {
      await captureSnapshot();
    } else {
      await startTracking(tab.url);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-900 text-gray-100 p-4 rounded-lg shadow-xl border border-gray-700">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5 text-purple-400" />
          WebLens Tracker
        </h2>

        {isLoading ? (
          <div className="flex items-center gap-2 text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading tracker state...</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        ) : website?.id ? (
          <div className="space-y-2">
            <div className="text-sm text-purple-300 break-all">{website.url}</div>
            <div className="text-xs text-gray-400">
              Tracking since: {new Date(website.createdAt).toLocaleDateString()}
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            Ready to track current website
          </div>
        )}
      </div>

      <button
        onClick={handleMainAction}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 ${
          isTracking 
            ? 'bg-purple-600 hover:bg-purple-700' 
            : 'bg-emerald-600 hover:bg-emerald-700'
        } text-white px-4 py-2 rounded-md disabled:opacity-50 transition-colors mb-6`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isTracking ? (
          <>
            <Camera className="w-4 h-4" />
            Capture Snapshot
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Start Tracking
          </>
        )}
      </button>

      {snapshots.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold">Version History  visit <b>(DiffArchive)</b> </h3>
            <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
              {snapshots.length} snapshots
            </span>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {snapshots.map((snapshot) => (
              <div 
                key={snapshot.id}
                className="p-2 bg-gray-800 rounded-md hover:bg-gray-700/50 transition-colors"
              >
                <div className="text-xs text-gray-300">
                  {new Date(snapshot.capturedAt).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1 truncate">
                  {snapshot.contentPreview}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {diff && (
        <div className="bg-gray-800 rounded-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold">Latest Changes</h3>
          </div>
          <Diff changes={diff.changes} />
        </div>
      )}
    </div>
  );
};

export default DomTracker;