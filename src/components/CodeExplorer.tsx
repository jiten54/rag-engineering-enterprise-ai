import React, { useState } from 'react';
import { PYTHON_CODEBASE, CodeFile } from '../data/codeFiles';
import { Code2, Copy, Check, Terminal, FileCode, FolderGit2, Download } from 'lucide-react';

export const CodeExplorer: React.FC = () => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>('app/retrieval.py');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const currentFile: CodeFile =
    PYTHON_CODEBASE.find((f) => f.path === selectedFilePath) || PYTHON_CODEBASE[0];

  const handleCopyCode = (content: string, path: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(path);
    setTimeout(() => setCopiedFile(null), 2500);
  };

  const handleDownloadFile = (file: CodeFile) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-blue-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <FolderGit2 className="w-4 h-4" />
          <span>Production-Grade Reference Implementation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Reproducible Python FastAPI + FAISS Architecture
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl">
          Examine the modular Python implementation with pinned dependencies, unit tests, deterministic paragraph hashing, normalized inner-product cosine retrieval, and confidence-gated abstention logic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* File Tree (Left) */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
              <Terminal className="w-3.5 h-3.5 mr-2 text-blue-400" />
              Repository Files
            </h3>
            <div className="space-y-1 text-xs">
              {PYTHON_CODEBASE.map((file) => {
                const isSelected = selectedFilePath === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFilePath(file.path)}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between font-mono transition ${
                      isSelected
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center space-x-2 truncate">
                      <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                      <span className="truncate">{file.path}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase">{file.language}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Execution Stack:</span>
            <ul className="mt-1.5 space-y-1 list-disc pl-4 text-slate-400">
              <li>FastAPI 0.115 + Uvicorn</li>
              <li>Sentence-Transformers 3.3.1</li>
              <li>FAISS-CPU 1.9.0 (IndexFlatIP)</li>
              <li>Rank-BM25 0.2.2 (Okapi)</li>
              <li>Pytest 8.3</li>
            </ul>
          </div>
        </div>

        {/* Code Content Viewer (Right) */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {/* Code Header Bar */}
            <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <FileCode className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-xs sm:text-sm font-bold text-white">
                  {currentFile.path}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  — {currentFile.description}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopyCode(currentFile.content, currentFile.path)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center space-x-1"
                >
                  {copiedFile === currentFile.path ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400 mr-1" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownloadFile(currentFile)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-6 overflow-x-auto max-h-[680px] overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed text-slate-200">
              <pre>
                <code>{currentFile.content}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
