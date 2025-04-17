import Image from "next/image"
import Link from "next/link"
import CodeEditor from "@/components/code-editor"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/background.png" alt="Cyberpunk city background" fill priority className="object-cover animate-subtle-pulse brightness-[0.7] contrast-[1.1]" />
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
      <div className="relative z-10 flex-1 container mx-auto px-4 py-8 flex flex-col h-screen">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-instrument-serif text-white">CodeNexus</h1>
          </div>
          <nav>
            <ul className="flex space-x-6 font-inter text-white/90 text-sm">
              <li>
                <Link href="#features" className="hover:text-cyan-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#editor" className="hover:text-cyan-400 transition-colors">
                  Try It
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col justify-center max-w-4xl mx-auto text-center mt-10">
          <h2 className="text-5xl md:text-7xl font-instrument-serif text-white mb-4">
            Enhance Your <span className="text-cyan-400">Code</span> With AI
          </h2>
          <p className="text-sm text-white/80 font-inter mb-6">
            Powered by Groq AI to transform your code into something extraordinary
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="#editor"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-inter px-5 py-1.5 rounded-md transition-all hover:shadow-lg hover:shadow-cyan-500/20 text-sm"
            >
              Try Now
            </Link>
            <Link
              href="#features"
              className="border border-white/30 hover:border-cyan-400 text-white font-inter px-5 py-1.5 rounded-md transition-all hover:shadow-lg hover:shadow-cyan-400/10 text-sm"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Editor Section */}
        <section id="editor" className="mb-24">
          <h3 className="text-2xl font-instrument-serif text-white mb-4 text-center">Write Your Code</h3>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-900/70 backdrop-blur-sm p-3 rounded-xl border border-gray-700 shadow-xl">
              <CodeEditor />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-white/60 font-inter">
          <p>© {new Date().getFullYear()} CodeNexus. Powered by Groq AI.</p>
        </footer>
      </div>
    </main>
  )
}
