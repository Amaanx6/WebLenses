import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ content: string; isUser: boolean; timestamp: number }>>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const API_KEY = 'AIzaSyAbi5TW_CQNk1s7eErTSLzxtJXGpr6BiA0';
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => scrollToBottom(), [messages, loading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    try {
      setLoading(true);
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      const pageContent = await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => document.body.innerText,
      });

      const truncatedContent = pageContent[0].result?.slice(0, 30000) || '';
      
      // Add user message
      setMessages(prev => [...prev, { 
        content: input, 
        isUser: true, 
        timestamp: Date.now() 
      }]);
      
      // Generate AI response
      const prompt = `As a professional analyst, provide a concise summary and answer about this page (${tab.url}):\n"${input}"\n\nPage content: ${truncatedContent}`;
      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      // Add AI response
      setMessages(prev => [...prev, { 
        content: response.replace(/\*\*(.*?)\*\*/g, '<span class="font-medium text-gray-100">$1</span>'),
        isUser: false,
        timestamp: Date.now()
      }]);

    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-gray-900/95 backdrop-blur-xl border border-gray-700/30 rounded-xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-100">Web Analyst</h1>
            <p className="text-xs text-gray-400 font-mono">Active Analysis Session</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-16 bg-gray-700/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                animate={{ width: loading ? '100%' : '0%' }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.timestamp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-3 rounded-xl ${
                msg.isUser 
                  ? 'bg-blue-500/5 border border-blue-500/10'
                  : 'bg-gray-800/30 border border-gray-700/20'
              }`}>
                <div 
                  className="text-sm text-gray-100 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
                <p className="mt-1 text-xs text-gray-400 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="max-w-[85%] p-3 rounded-xl bg-gray-800/30 border border-gray-700/20">
                <div className="flex space-x-2 items-center text-gray-400">
                  <span className="text-sm">Analyzing content</span>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-700/30"
      >
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter professional inquiry..."
            className="w-full bg-gray-800/20 text-gray-100 placeholder-gray-400 rounded-lg px-4 py-3 pr-12
                     border border-gray-700/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20
                     transition-all duration-200 text-sm backdrop-blur-sm
                     focus:outline-none"
            disabled={loading}
          />
          
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-300 hover:text-blue-400
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" 
                    fill="currentColor"/>
            </svg>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Chatbot;