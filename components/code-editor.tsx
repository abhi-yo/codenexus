"use client"

import React, { useRef } from 'react';
import Editor, { Monaco, OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useTheme } from 'next-themes';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  language?: string;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value,
  onChange,
  height = "12rem", // Default height h-48
  language = 'javascript', // Default language
  options // Destructure options
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { resolvedTheme } = useTheme();

  const handleEditorChange = (newValue: string | undefined) => {
    onChange(newValue || '');
  };

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    // You can configure the editor here if needed
  };

  // Merge default options with passed options
  const finalOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    scrollBeyondLastLine: false,
    padding: { top: 8, bottom: 8 },
    automaticLayout: true,
    // Default specific options that can be overridden
    lineNumbers: 'on',
    glyphMargin: true,
    folding: true,
    ...options, // Spread passed options last to override defaults
  };

  return (
    <div>
      <Editor
        height={height} 
        language={language}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
        options={finalOptions}
      />
    </div>
  );
};

export default CodeEditor;
