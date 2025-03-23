import React from 'react';
import { Globe, Clock, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Website {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  latestSnapshot: string | null;
}

interface WebsiteListProps {
  websites: Website[];
  onSelectWebsite: (websiteId: string) => void;
  selectedWebsiteId: string | null;
  loading?: boolean;
}

export function WebsiteList({ websites, onSelectWebsite, selectedWebsiteId, loading }: WebsiteListProps) {
  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 backdrop-blur-lg bg-opacity-80 border border-emerald-500/20">
        <h2 className="text-emerald-400 text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Tracked Websites
        </h2>
        <div className="animate-pulse space-y-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-16 bg-gray-800/50 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (websites.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 backdrop-blur-lg bg-opacity-80 border border-emerald-500/20">
        <h2 className="text-emerald-400 text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Tracked Websites
        </h2>
        <div className="text-center py-8">
          <Globe className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No websites tracked yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 backdrop-blur-lg bg-opacity-80 border border-emerald-500/20">
      <h2 className="text-emerald-400 text-xl font-semibold mb-4 flex items-center gap-2">
        <Globe className="w-5 h-5" />
        Tracked Websites
      </h2>
      <div className="space-y-2">
        {websites.map((website, index) => (
          <motion.button
            key={website.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectWebsite(website.id)}
            className={clsx(
              'w-full text-left p-3 rounded-lg transition-all duration-200',
              selectedWebsiteId === website.id
                ? 'bg-emerald-500/20 border border-emerald-500/40'
                : 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800'
            )}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium truncate">
                  {website.name || website.url}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <LinkIcon className="w-3 h-3 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-400 text-sm truncate">{website.url}</p>
                </div>
              </div>
              {website.latestSnapshot && (
                <div className="flex items-center text-xs text-gray-400 gap-1 bg-gray-800 px-2 py-1 rounded-md border border-gray-700/50">
                  <Clock className="w-3 h-3" />
                  {new Date(website.latestSnapshot).toLocaleDateString()}
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}