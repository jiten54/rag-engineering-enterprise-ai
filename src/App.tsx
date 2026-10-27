/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ArticleView } from './components/ArticleView';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { RetrievalMatrix } from './components/RetrievalMatrix';
import { InteractiveRAGPlayground } from './components/InteractiveRAGPlayground';
import { CodeExplorer } from './components/CodeExplorer';
import { FULL_ARTICLE_MARKDOWN, ARTICLE_METADATA } from './data/articleContent';
import { Mail, Github, FileText, ArrowLeft } from 'lucide-react';

const TAB_TO_PATH: Record<ActiveTab, string> = {
  article: '/article',
  architecture: '/architecture',
  matrix: '/matrix',
  simulator: '/simulator',
  code: '/code',
};

const PATH_TO_TAB: Record<string, ActiveTab> = {
  '/': 'article',
  '/article': 'article',
  '/architecture': 'architecture',
  '/matrix': 'matrix',
  '/simulator': 'simulator',
  '/code': 'code',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('article');
  const [isCopied, setIsCopied] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  // Sync state from current browser URL on mount
  useEffect(() => {
    const parseUrl = () => {
      const pathname = window.location.pathname.replace(/\/$/, '') || '/';
      const hash = window.location.hash.replace('#', '');

      if (PATH_TO_TAB[pathname]) {
        setActiveTab(PATH_TO_TAB[pathname]);
        setIsNotFound(false);
      } else if (hash && (hash in TAB_TO_PATH)) {
        setActiveTab(hash as ActiveTab);
        setIsNotFound(false);
      } else if (pathname !== '/') {
        setIsNotFound(true);
      }
    };

    parseUrl();

    const handlePopState = () => parseUrl();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsNotFound(false);
    const targetPath = TAB_TO_PATH[tab];
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyArticle = () => {
    navigator.clipboard.writeText(FULL_ARTICLE_MARKDOWN);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([FULL_ARTICLE_MARKDOWN], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Beyond_the_Chatbot_Engineering_Reliable_RAG_Systems.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar with Mobile Drawer and GitHub Link */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onDownloadMarkdown={handleDownloadMarkdown}
        onCopyArticle={handleCopyArticle}
        isCopied={isCopied}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isNotFound ? (
          <div className="max-w-2xl mx-auto px-4 py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-blue-400 flex items-center justify-center mx-auto mb-6 text-2xl font-bold font-mono">
              404
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
            <p className="text-slate-400 text-sm mb-6">
              The requested route does not exist. Explore the enterprise RAG publication sections below.
            </p>
            <button
              onClick={() => handleTabChange('article')}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Technical Article
            </button>
          </div>
        ) : (
          <>
            {activeTab === 'article' && (
              <ArticleView
                onNavigateTab={(tab) => handleTabChange(tab)}
              />
            )}
            {activeTab === 'architecture' && <ArchitectureDiagram />}
            {activeTab === 'matrix' && <RetrievalMatrix />}
            {activeTab === 'simulator' && <InteractiveRAGPlayground />}
            {activeTab === 'code' && <CodeExplorer />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8 mt-16 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-200">
              Beyond the Chatbot: Engineering Reliable RAG Systems for Enterprise AI
            </p>
            <p className="mt-0.5 text-slate-400">
              Author: <span className="text-slate-300 font-medium">{ARTICLE_METADATA.author}</span> • Enterprise AI & Retrieval-Augmented Generation Systems
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleTabChange('article')}
              className="hover:text-blue-400 transition"
            >
              Article
            </button>
            <button
              onClick={() => handleTabChange('architecture')}
              className="hover:text-blue-400 transition"
            >
              Architecture
            </button>
            <button
              onClick={() => handleTabChange('matrix')}
              className="hover:text-blue-400 transition"
            >
              Retrieval Matrix
            </button>
            <button
              onClick={() => handleTabChange('simulator')}
              className="hover:text-blue-400 transition"
            >
              RAG Simulator
            </button>
            <button
              onClick={() => handleTabChange('code')}
              className="hover:text-blue-400 transition"
            >
              Python Code
            </button>
            <a
              href="https://github.com/jiten54/rag-engineering-enterprise-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-slate-300 hover:text-white transition"
            >
              <Github className="w-3.5 h-3.5 mr-1" />
              GitHub
            </a>
            <a
              href="mailto:jitenmoni8@gmail.com"
              className="flex items-center text-blue-400 hover:text-blue-300 transition"
            >
              <Mail className="w-3.5 h-3.5 mr-1" />
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
