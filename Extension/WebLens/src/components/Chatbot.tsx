import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ content: string; isUser: boolean }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const API_KEY = 'AIzaSyAbi5TW_CQNk1s7eErTSLzxtJXGpr6BiA0';
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    try {
      setLoading(true);
      setError('');
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Get page content
      const pageContent = await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => document.body.innerText,
      });

      const truncatedContent = pageContent[0].result?.slice(0, 30000) || '';
      
      // Add user message
      setMessages(prev => [...prev, { content: input, isUser: true }]);
      
      // Generate AI response
      const prompt = `As WebLens AI analyzing this page (${tab.url}), answer concisely:\n"${input}"\n\nPage content: ${truncatedContent}`;
      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      // Add AI response
      setMessages(prev => [...prev, { 
        content: response.replace(/\*\*(.*?)\*\*/g, '<span class="text-blue-300">$1</span>'),
        isUser: false 
      }]);

    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="fixed z-[9999]">
      <div className="w-[340px] pt-4 h-[510px] bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 flex flex-col transform transition-all duration-300 hover:border-gray-600/60">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              WebLens AI
            </h1>
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-gradient-to-t from-green-400 to-emerald-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-gradient-to-t from-blue-400 to-cyan-500 animate-pulse delay-100" />
              <div className="w-2 h-2 rounded-full bg-gradient-to-t from-purple-400 to-pink-500 animate-pulse delay-200" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Analyzing current page</p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {messages.map((msg, i) => (
            <div 
              key={i}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.isUser 
                    ? 'bg-blue-500/10 border border-blue-500/20' 
                    : 'bg-gray-800/40 border border-gray-700/30'
                }`}
              >
                <div 
                  className="text-sm leading-relaxed text-gray-100"
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-2xl bg-gray-800/40 border border-gray-700/30">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700/50">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this page..."
              className="w-full bg-gray-800/50 text-gray-100 placeholder-gray-400 rounded-xl p-3 pr-12 
                       border border-gray-700/50 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20
                       resize-none scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
                       transition-all duration-200 text-sm"
              rows={3}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            
            <button
              type="submit"
              disabled={loading}
              className="absolute bottom-3 right-3 p-1.5 bg-blue-500/80 hover:bg-blue-400/90 rounded-lg
                       backdrop-blur-sm border border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200 hover:scale-110"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
          
          {error && (
            <p className="text-red-400 text-xs mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Chatbot;