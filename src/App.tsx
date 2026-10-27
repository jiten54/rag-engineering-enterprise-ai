/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ArticleView } from './components/ArticleView';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { RetrievalMatrix } from './components/RetrievalMatrix';
import { InteractiveRAGPlayground } from './components/InteractiveRAGPlayground';
import { CodeExplorer } from './components/CodeExplorer';
import { JobApplicationKit } from './components/JobApplicationKit';
import { FULL_ARTICLE_MARKDOWN, ARTICLE_METADATA } from './data/articleContent';
import { Check, Mail, ExternalLink, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('article');
  const [isCopied, setIsCopied] = useState(false);

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
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadMarkdown={handleDownloadMarkdown}
        onCopyArticle={handleCopyArticle}
        isCopied={isCopied}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'article' && <ArticleView />}
        {activeTab === 'architecture' && <ArchitectureDiagram />}
        {activeTab === 'matrix' && <RetrievalMatrix />}
        {activeTab === 'simulator' && <InteractiveRAGPlayground />}
        {activeTab === 'code' && <CodeExplorer />}
        {activeTab === 'kit' && <JobApplicationKit />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8 mt-16 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-200">
              Beyond the Chatbot: Engineering Reliable RAG Systems for Enterprise AI
            </p>
            <p className="mt-0.5 text-slate-400">
              Author: <span className="text-slate-300 font-medium">{ARTICLE_METADATA.author}</span> • Prepared for HubCredo Technical Content Writer Sample
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('article')}
              className="hover:text-blue-400 transition"
            >
              Full Article
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className="hover:text-blue-400 transition"
            >
              RAG Simulator
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className="hover:text-blue-400 transition"
            >
              Python Source
            </button>
            <button
              onClick={() => setActiveTab('kit')}
              className="hover:text-blue-400 transition"
            >
              Application Kit
            </button>
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
