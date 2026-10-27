import React from 'react';
import { BookOpen, Cpu, TableProperties, PlayCircle, Code2, Briefcase, Download, Check, Copy } from 'lucide-react';

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
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'article', label: 'Technical Article', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'architecture', label: 'Architecture', icon: <Cpu className="w-4 h-4" /> },
    { id: 'matrix', label: 'Retrieval Matrix', icon: <TableProperties className="w-4 h-4" /> },
    { id: 'simulator', label: 'RAG Simulator', icon: <PlayCircle className="w-4 h-4" /> },
    { id: 'code', label: 'Python Codebase', icon: <Code2 className="w-4 h-4" /> },
    { id: 'kit', label: 'Outreach & Audit', icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Author */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('article')}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-inner font-mono font-bold text-white text-lg">
              R
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-white">
                  Beyond the Chatbot: Enterprise RAG
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-900/60 text-blue-300 border border-blue-700/50">
                  HubCredo Sample
                </span>
              </div>
              <p className="text-xs text-slate-400">By Jiten Moni Das • Technical Writing & AI Engineering</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
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
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 border-t border-slate-800/80 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
