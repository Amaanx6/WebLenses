// components/AccessibilityQuickCheck.tsx
import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface AccessibilityIssue {
  type: 'Critical' | 'High' | 'Medium';
  message: string;
  source: 'basic' | 'ai';
}

const AccessibilityQuickCheck = () => {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [controller] = useState(new AbortController());

  useEffect(() => {
    const runAccessibilityCheck = async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab?.id || !tab.url) {
          throw new Error('No active webpage found');
        }

        // Basic accessibility checks
        const basicIssues = await performBasicAccessibilityCheck(tab.id);
        
        // AI-powered checks
        const aiIssues = await performGeminiAnalysis(tab.id);
        
        setIssues([...basicIssues, ...aiIssues]);
        setError('');

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Analysis failed');
      } finally {
        setIsLoading(false);
      }
    };

    const performBasicAccessibilityCheck = async (tabId: number): Promise<AccessibilityIssue[]> => {
      try {
        const [result] = await chrome.scripting.executeScript({
          target: { tabId },
          func: () => document.documentElement.outerHTML
        });

        const html = result.result as string;
        const detectedIssues: AccessibilityIssue[] = [];

        if (!/<html[^>]*\blang=/.test(html)) {
          detectedIssues.push({
            type: 'Critical',
            message: 'Missing language declaration in <html> tag',
            source: 'basic'
          });
        }

        const imagesWithoutAlt = (html.match(/<img(?!.*?alt=)[^>]*>/g) || []).length;
        if (imagesWithoutAlt > 0) {
          detectedIssues.push({
            type: 'High',
            message: `${imagesWithoutAlt} image(s) missing alt text`,
            source: 'basic'
          });
        }

        return detectedIssues;
      } catch {
        return [];
      }
    };

    const performGeminiAnalysis = async (tabId: number): Promise<AccessibilityIssue[]> => {
      try {
        const [result] = await chrome.scripting.executeScript({
          target: { tabId },
          func: () => document.documentElement.outerHTML
        });

        const response = await fetch('http://localhost:5000/api/analyze-accessibility', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: result.result }),
          signal: controller.signal
        });

        if (!response.ok) throw new Error('AI analysis failed');
        
        const data = await response.json();
        return data.issues?.map((issue: any) => ({
          ...issue,
          source: 'ai'
        })) || [];

      } catch {
        return [];
      }
    };

    runAccessibilityCheck();
    return () => controller.abort();
  }, []);

  return (
    <div className="w-full max-w-md bg-gray-900 p-4 rounded-lg border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-yellow-400" />
        <h3 className="font-semibold">Instant Accessibility Audit</h3>
      </div>

      {error ? (
        <div className="flex items-center gap-2 p-3 bg-red-900/20 rounded-md">
          <XCircle className="w-4 h-4 text-red-400" />
          <span className="text-sm">{error}</span>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      ) : issues.length === 0 ? (
        <div className="flex items-center gap-2 p-3 bg-green-900/20 rounded-md">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm">No accessibility issues found!</span>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-xs text-gray-400 mb-2">
            Found {issues.length} issues (
            <span className="text-blue-400">{issues.filter(i => i.source === 'ai').length} AI-detected</span>, 
            <span className="text-green-400"> {issues.filter(i => i.source === 'basic').length} basic</span>)
          </div>
          
          {issues.map((issue, index) => (
            <div 
              key={index}
              className={`p-3 rounded-md border ${
                issue.type === 'Critical' ? 'border-red-500/30' :
                issue.type === 'High' ? 'border-orange-500/30' :
                'border-yellow-500/30'
              } ${issue.source === 'ai' ? 'bg-gray-800/50' : ''}`}
            >
              <div className="flex items-start gap-2">
                <XCircle className={`w-4 h-4 mt-0.5 ${
                  issue.type === 'Critical' ? 'text-red-400' :
                  issue.type === 'High' ? 'text-orange-400' : 'text-yellow-400'
                }`} />
                <div>
                  <div className="text-sm font-medium">
                    {issue.type} Priority
                    {issue.source === 'ai' && (
                      <span className="ml-2 text-xs text-blue-400">AI Detected</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{issue.message}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccessibilityQuickCheck;