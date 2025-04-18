import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      
      {/* Content Area - Top Aligned */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Back Link positioned relative to content */}
        <div className="mb-8">
          <Link href="/" className="text-white/60 hover:text-white transition-colors flex items-center text-sm w-fit">
            <ArrowLeft size={16} className="mr-1.5"/>
            Back
          </Link>
        </div>

        <h1 className="text-3xl md:text-5xl font-instrument-serif text-white mb-8">
          About CodeNexus
        </h1>
        
        <div className="space-y-5 text-white/80 font-inter text-base leading-relaxed">
          <p>
            CodeNexus leverages the power of cutting-edge AI, specifically the <a href="https://groq.com/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors underline underline-offset-2 font-medium">Groq LPU™ Inference Engine</a>, 
            to analyze and enhance your code snippets. 
          </p>
          <p>
            Input your code, select the language, and let our AI provide 
            optimized or improved versions, helping you learn and refactor more effectively. 
          </p>
          <p>
            Experience the speed and capability of AI-driven code transformation 
            in a sleek, cyberpunk-inspired interface designed for developers.
          </p>
        </div>

      </div>
    </div>
  );
} 