// components/LandingPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  History, 
  BarChart, 
  Terminal, 
  Download,
  Sun,
  Moon,
  GitCompare,
  ShieldCheck
} from 'lucide-react';

const LandingPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeTab, setActiveTab] = useState('features');
  const [clickCount, setClickCount] = useState(0);
  const [contentVersion, setContentVersion] = useState(1);

  const features = [
    {
      icon: <Activity className="w-8 h-8 text-purple-400" />,
      title: "Real-Time DOM Tracking",
      description: contentVersion === 1 
        ? "Watch website changes live with millisecond precision." 
        : "Observe DOM mutations as they happen with our advanced tracker"
    },
    {
      icon: <GitCompare className="w-8 h-8 text-purple-400" />,
      title: "Version History",
      description: contentVersion === 1
        ? "Full Git-style version control for web pages"
        : "Maintain complete historical record of all DOM states"
    },
    {
      icon: <BarChart className="w-8 h-8 text-purple-400" />,
      title: "Change Analytics",
      description: contentVersion === 1
        ? "Visualize modifications with interactive timelines"
        : "Detailed insights into DOM evolution patterns"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
      title: "Secure Tracking",
      description: contentVersion === 1
        ? "Military-grade encryption for all your snapshots"
        : "Zero-knowledge architecture ensures complete privacy"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className="sticky top-0 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Terminal className="w-8 h-8 text-purple-400" />
              <span className="font-bold text-xl">DOM Tracker Pro</span>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-gray-700/30"
              >
                {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button 
                onClick={() => setActiveTab('features')} 
                className={`px-4 py-2 rounded-lg ${activeTab === 'features' ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-gray-700/30'}`}
              >
                Features
              </button>
              <button 
                onClick={() => setActiveTab('demo')} 
                className={`px-4 py-2 rounded-lg ${activeTab === 'demo' ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-gray-700/30'}`}
              >
                Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 text-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block mb-8"
          >
            <Terminal className="w-24 h-24 text-purple-400 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Revolutionize Your Web Development
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Track, analyze, and version control website changes with atomic precision
          </p>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg flex items-center space-x-2"
            >
              <Download className="w-6 h-6" />
              <span>Install Extension</span>
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-700/10 rounded-xl border border-gray-700/30 hover:border-purple-400/30 transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Try It Live!</h2>
          <div className="max-w-2xl mx-auto bg-gray-800/30 p-8 rounded-xl border border-gray-700/30">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-700/10 p-6 rounded-lg mb-6 cursor-pointer"
              onClick={() => {
                setClickCount(prev => prev + 1);
                setContentVersion(prev => prev === 1 ? 2 : 1);
              }}
            >
              <div className="text-4xl mb-4">🔄</div>
              <p className="text-gray-400 mb-2">
                Click to modify content (Tracked {clickCount} times)
              </p>
              <button className="text-purple-400 hover:text-purple-300">
                Simulate Content Change
              </button>
            </motion.div>
            <History className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <p className="text-gray-400">
              All changes automatically tracked and versioned
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800/80 border-t border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
          <p>© 2024 DOM Tracker Pro. All changes monitored.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;