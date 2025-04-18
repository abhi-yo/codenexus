"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="h-80 bg-gray-800 animate-pulse rounded-md" />,
})

const defaultCode = `// Write your code here
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// This function can be optimized
console.log(fibonacci(10));
`

export default function CodeEditor() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="h-48 rounded-md overflow-hidden">
      <MonacoEditor
        height="100%"
        defaultLanguage="javascript"
        defaultValue={defaultCode}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          fontFamily: "JetBrains Mono, monospace",
          lineNumbers: "off",
          folding: false,
          lineDecorationsWidth: 10,
          padding: { top: 8, bottom: 8 },
        }}
      />
    </div>
  )
}
