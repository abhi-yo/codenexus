"use client"

import Image from "next/image"
import Link from "next/link"
import CodeEditor from "@/components/code-editor"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import { useState } from "react"

const defaultCode = `// Write your code here
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// This function can be optimized
console.log(fibonacci(10));`;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [code, setCode] = useState<string>(defaultCode); // State for editor code

  // Handler for editor changes
  const handleEditorChange = (value: string) => {
    setCode(value);
  };

  // Encode code for URL
  const encodedCode = encodeURIComponent(code);

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/background.png" alt="Cyberpunk city background" fill priority className="object-cover animate-subtle-pulse brightness-[0.4] contrast-[1.1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-transparent to-cyan-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute inset-0 backdrop-blur-[1.5px]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:100%_4px] animate-scan" />
        <BackgroundBeamsWithCollision className="!z-[1]">
          <div className="hidden" />
        </BackgroundBeamsWithCollision>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 container mx-auto px-4 py-8 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <h1 className="text-3xl font-instrument-serif text-white">CodeNexus</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="text-sm flex space-x-8 font-inter text-white/90">
              <li>
                <Link href="#features" className="hover:text-teal-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#editor" className="hover:text-teal-600 transition-colors">
                  Try It
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-600 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Container */}
          <div className="relative md:hidden">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-4 -mt-2 hover:bg-white/10 rounded-md transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
                />
              </svg>
            </button>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 py-2 w-48 bg-gray-900/95 backdrop-blur-sm rounded-md border border-white/10 shadow-xl">
                <nav>
                  <ul className="flex flex-col text-sm font-inter">
                    <li>
                      <Link 
                        href="#features" 
                        className="block px-4 py-2 text-white/90 hover:bg-white/10 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="#editor" 
                        className="block px-4 py-2 text-white/90 hover:bg-white/10 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Try It
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/about"
                        className="block px-4 py-2 text-white/90 hover:bg-white/10 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        About
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col justify-center max-w-3xl mx-auto text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-instrument-serif text-white mt-16 mb-4">
            Enhance Your <span className="text-teal-400">Code</span> With AI
          </h2>
          <p className="text-md sm:text-sm text-white/80 font-inter mb-10">
            Powered by Groq AI to transform your code into something extraordinary
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href={`/enhance?code=${encodedCode}`}
              className="bg-teal-800 hover:bg-teal-700 text-white font-inter px-6 py-2.5 rounded-md transition-all hover:shadow-lg hover:shadow-teal-900/30 text-sm"
            >
              Try Now
            </Link>
            <Link
              href="#features"
              className="border border-white/30 hover:border-teal-700 text-white font-inter px-6 py-2.5 rounded-md transition-all hover:shadow-lg hover:shadow-teal-900/20 text-sm"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Editor Section */}
        <section id="editor" className="mb-24">
          <h3 className="text-3xl font-instrument-serif text-white mb-10 text-center">Write Your Code</h3>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-900/70 backdrop-blur-sm p-4 rounded-xl border border-gray-700 shadow-xl">
              <CodeEditor 
                value={code} 
                onChange={handleEditorChange} 
                options={{
                  lineNumbers: 'off', // Hide line numbers
                  glyphMargin: false, // Hide glyph margin (gap)
                  folding: false, // Hide folding indicators (also part of the gap)
                }}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-white/60 font-inter mt-auto pt-12">
          <p>© {new Date().getFullYear()} CodeNexus. Powered by Groq AI.</p>
        </footer>
      </div>
    </main>
  )
}
