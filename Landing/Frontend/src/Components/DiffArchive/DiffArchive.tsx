import React, { useState, useEffect } from 'react';
import { WebsiteList } from './WebsiteList';
import { SnapshotList } from './SnapshotList';
import { DiffViewer } from './DIffViewer';
import { motion } from 'framer-motion';

export function DiffArchive() {
  const [websites, setWebsites] = useState([]);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [selectedSnapshotId, setSelectedSnapshotId] = useState(null);
  const [diff, setDiff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/websites')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch websites');
        return res.json();
      })
      .then(data => {
        setWebsites(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch websites:', error);
        // setError('Failed to load websites');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedWebsiteId) {
      setLoading(true);
      fetch(`http://localhost:5000/api/websites/${selectedWebsiteId}/snapshots`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch snapshots');
          return res.json();
        })
        .then(data => {
          setSnapshots(data);
          setSelectedSnapshotId(null);
          setDiff(null);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch snapshots:', error);
        //   setError('Failed to load snapshots');
          setLoading(false);
        });
    }
  }, [selectedWebsiteId]);

  useEffect(() => {
    if (selectedWebsiteId) {
      setLoading(true);
      fetch(`http://localhost:5000/api/websites/${selectedWebsiteId}/diff`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch diff');
          return res.json();
        })
        .then(data => {
          setDiff(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch diff:', error);
        //   setError('Failed to load diff');
          setLoading(false);
        });
    }
  }, [selectedWebsiteId, selectedSnapshotId]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-950 text-white p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4"
          >
            <WebsiteList
              websites={websites}
              //@ts-ignore
              onSelectWebsite={setSelectedWebsiteId}
              selectedWebsiteId={selectedWebsiteId}
              loading={loading}
            />
          </motion.div>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3"
          >
            <SnapshotList
              snapshots={snapshots}
              //@ts-ignore
              onSelectSnapshot={setSelectedSnapshotId}
              selectedSnapshotId={selectedSnapshotId}
              loading={loading}
            />
          </motion.div>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-5 flex flex-col min-h-[600px]"
          >
            <DiffViewer diff={diff} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}