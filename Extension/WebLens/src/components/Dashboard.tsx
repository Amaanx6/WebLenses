// components/Dashboard.tsx
import { useState } from 'react';
import Chatbot from './chatbot/Chatbot';
import Tracker from './DOMTracker/DOMTracker'; 

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'chatbot' | 'tracker' | 'feature3' | 'feature4'>('chatbot');

  return (
    <div className="fixed inset-0 z-[9999] flex bg-gray-900/80 backdrop-blur-lg">
      {/* Sidebar */}
      <div className="w-16 border-r border-gray-700/50 flex flex-col items-center py-4 space-y-4">
        {/* Chatbot Button */}
        <button
          className={`p-2 rounded-lg transition-all duration-300 ${
            activeTab === 'chatbot'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'text-gray-400 hover:bg-gray-700/30'
          }`}
          onClick={() => setActiveTab('chatbot')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {/* Website Tracker Button */}
        <button
          className={`p-2 rounded-lg transition-all duration-300 ${
            activeTab === 'tracker'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              : 'text-gray-400 hover:bg-gray-700/30'
          }`}
          onClick={() => setActiveTab('tracker')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Disabled Feature Buttons */}
        {[3, 4].map((num) => (
          <button
            key={num}
            className="p-2 rounded-lg text-gray-400 opacity-50 cursor-not-allowed relative group"
            disabled
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-700 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Coming Soon
            </span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'chatbot' && <Chatbot />}
        {activeTab === 'tracker' && <Tracker />}
        {/* Add other feature components here when ready */}
      </div>
    </div>
  );
};

export default Dashboard;