import React, { useState } from 'react';
import {
  BookOpen,
  Cpu,
  TableProperties,
  PlayCircle,
  Code2,
  Briefcase,
  Download,
  Check,
  Copy,
  Github,
  Menu,
  X,
  Share2
} from 'lucide-react';

export type ActiveTab = 'article' | 'architecture' | 'matrix' | 'simulator' | 'code' | 'kit';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onDownloadMarkdown: () => void;
  onCopyArticle: () => void;
  isCopied: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onDownloadMarkdown,
  onCopyArticle,
  isCopied
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; path: string }[] = [
    { id: 'article', label: 'Technical Article', icon: <BookOpen className="w-4 h-4" />, path: '/article' },
    { id: 'architecture', label: 'Architecture', icon: <Cpu className="w-4 h-4" />, path: '/architecture' },
    { id: 'matrix', label: 'Retrieval Matrix', icon: <TableProperties className="w-4 h-4" />, path: '/matrix' },
    { id: 'simulator', label: 'RAG Simulator', icon: <PlayCircle className="w-4 h-4" />, path: '/simulator' },
    { id: 'code', label: 'Python Codebase', icon: <Code2 className="w-4 h-4" />, path: '/code' },
    { id: 'kit', label: 'Outreach & Audit', icon: <Briefcase className="w-4 h-4" />, path: '/kit' },
  ];

  const handleTabClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Author */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleTabClick('article')}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-inner font-mono font-bold text-white text-lg group-hover:scale-105 transition-transform">
              R
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  Beyond the Chatbot: Enterprise RAG
                </span>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-900/60 text-blue-300 border border-blue-700/50">
                  HubCredo Portfolio Sample
                </span>
              </div>
              <p className="text-xs text-slate-400">By Jiten Moni Das • Technical Writing & AI/ML Systems</p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center space-x-2">
            <a
              href="https://github.com/jitenmoni/rag-engineering-enterprise-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="View GitHub Repository"
            >
              <Github className="w-3.5 h-3.5 mr-1.5 text-slate-300" />
              GitHub
            </a>

            <button
              onClick={handleShareLink}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Share Page Link"
            >
              {shareCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              onClick={onCopyArticle}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Copy complete markdown article"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1.5 text-slate-400" />}
              {isCopied ? 'Copied MD' : 'Copy MD'}
            </button>

            <button
              onClick={onDownloadMarkdown}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition"
              title="Download ARTICLE.md file"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download .md
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={onDownloadMarkdown}
              className="p-1.5 rounded-lg bg-blue-600 text-white"
              title="Download Markdown"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden sm:flex space-x-1 sm:space-x-2 overflow-x-auto py-2 border-t border-slate-800/80 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-3 border-t border-slate-800 space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="mr-2.5">{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs px-2">
              <a
                href="https://github.com/jitenmoni/rag-engineering-enterprise-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-300 hover:text-blue-400 py-1"
              >
                <Github className="w-4 h-4 mr-1.5" /> GitHub Repository
              </a>
              <button
                onClick={onCopyArticle}
                className="text-slate-300 hover:text-blue-400 py-1"
              >
                {isCopied ? 'Copied Markdown!' : 'Copy Markdown'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
