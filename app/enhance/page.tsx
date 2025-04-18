'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CodeEditor from '@/components/code-editor';
import { ArrowLeft } from 'lucide-react'; // Example icon

function EnhancePageContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code');

  const [originalCode, setOriginalCode] = useState<string>('');
  const [enhancedCode, setEnhancedCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCode) {
      setOriginalCode(decodeURIComponent(initialCode));
    }
  }, [initialCode]);

  const handleEnhance = async () => {
    if (!originalCode.trim()) {
      setError('No code provided to enhance.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEnhancedCode(''); // Clear previous enhanced code
    try {
      const response = await fetch('/api/enhance-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: originalCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to enhance code');
      }

      const data = await response.json();
      setEnhancedCode(data.enhancedCode);

    } catch (err) {    
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for potential changes in the original code editor (if needed)
  const handleOriginalCodeChange = (value: string) => {
    setOriginalCode(value);
    // Optionally clear enhanced code if original changes
    // setEnhancedCode('');
  };
  
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    // Maybe clear enhanced code when language changes?
    // setEnhancedCode(''); 
  };

  const availableLanguages = [
    'javascript', 'typescript', 'python', 'java', 'csharp', 'html', 'css', 'json', 'markdown', 'sql'
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-black">
      {/* Subtle Background Pattern (Optional) */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      
      {/* Glassmorphic Container */}
      <div className="relative z-10 w-full max-w-6xl p-6 md:p-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
        
        <Link href="/" className="absolute top-4 left-4 md:top-6 md:left-6 text-white/70 hover:text-white transition-colors flex items-center text-sm">
          <ArrowLeft size={16} className="mr-2"/>
          Back Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-instrument-serif text-white text-center mb-4">Enhance Your Code</h1>
        
        {/* Language Selector */}
        <div className="mb-6 flex justify-center">
          <select 
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-900/70 border border-white/10 text-white/80 text-sm rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-teal-500 backdrop-blur-sm"
          >
            {availableLanguages.map(lang => (
              <option key={lang} value={lang} className="bg-gray-900 text-white">
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Original Code Section */}
          <div className="flex flex-col">
            <h2 className="text-md font-inter text-white/80 mb-3">Original Code</h2>
            <div className="flex-1 bg-gray-900/70 backdrop-blur-sm p-1 rounded-lg border border-gray-700/50 shadow-md">
              <CodeEditor 
                value={originalCode}
                onChange={handleOriginalCodeChange} 
                height="20rem" 
                language={language}
              />
            </div>
          </div>

          {/* Enhanced Code Section */}
          <div className="flex flex-col">
            <h2 className="text-md font-inter text-white/80 mb-3">Enhanced Code</h2>
            <div className="flex-1 bg-gray-900/70 backdrop-blur-sm p-1 rounded-lg border border-gray-700/50 shadow-md">
              <CodeEditor 
                value={enhancedCode}
                onChange={setEnhancedCode} 
                height="20rem" 
                language={language}
              />
            </div>
          </div>
        </div>

        {/* Enhance Button and Status */}
        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={handleEnhance}
            disabled={isLoading || !originalCode.trim()}
            className={`
              px-6 py-2 rounded-lg transition-all duration-200 ease-in-out 
              text-sm font-inter text-white/90 
              bg-white/10 border border-white/15 backdrop-blur-md 
              shadow-sm shadow-black/20
              ${isLoading || !originalCode.trim() 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-white/15 hover:border-white/25 hover:text-white hover:shadow-lg hover:shadow-teal-900/40'
              }
            `}
          >
            {isLoading ? 'Enhancing...' : '✨ Enhance with AI'}
          </button>
          {error && <p className="text-red-400 text-sm mt-3">Error: {error}</p>}
        </div>

      </div>
    </div>
  );
}

// Use Suspense for client components using searchParams
export default function EnhancePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>}>
      <EnhancePageContent />
    </Suspense>
  );
} 