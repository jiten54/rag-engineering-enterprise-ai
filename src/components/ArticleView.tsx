import React, { useState } from 'react';
import { ARTICLE_METADATA, ARTICLE_SECTIONS } from '../data/articleContent';
import { CITATIONS } from '../data/citations';
import { VisualMermaidFlow } from './VisualMermaidFlow';
import { renderHighlightedCode } from '../utils/codeHighlighter';
import {
  BookOpen,
  Clock,
  FileText,
  User,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  BookmarkCheck,
  Search,
  Copy,
  Check,
  Github,
  PlayCircle,
  Code2
} from 'lucide-react';

interface ArticleViewProps {
  onNavigateTab?: (tab: 'simulator' | 'code' | 'architecture') => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ onNavigateTab }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(ARTICLE_SECTIONS[0].id);
  const [tocSearch, setTocSearch] = useState('');
  const [copiedCodeBlockIdx, setCopiedCodeBlockIdx] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeBlockIdx(idx);
    setTimeout(() => setCopiedCodeBlockIdx(null), 2000);
  };

  const filteredSections = ARTICLE_SECTIONS.filter(
    (s) =>
      s.title.toLowerCase().includes(tocSearch.toLowerCase()) ||
      s.number.includes(tocSearch)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Article Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Technical Blog Article
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Production Systems Guide
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              AI/ML & Data Engineering
            </span>
            <a
              href="https://github.com/jiten54/rag-engineering-enterprise-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center space-x-1"
            >
              <Github className="w-3 h-3 mr-1" />
              <span>GitHub Repo</span>
            </a>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {ARTICLE_METADATA.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal mb-6 max-w-4xl leading-relaxed">
            {ARTICLE_METADATA.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-400" />
              <span className="font-medium text-slate-200">{ARTICLE_METADATA.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{ARTICLE_METADATA.readingTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>{ARTICLE_METADATA.estimatedWordCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookmarkCheck className="w-4 h-4 text-emerald-400" />
              <span>Audience: {ARTICLE_METADATA.targetAudience}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table of Contents Sticky Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
                <BookOpen className="w-3.5 h-3.5 mr-2 text-blue-400" />
                Table of Contents
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">13 Sections</span>
            </div>

            {/* Filter Search */}
            <div className="relative">
              <input
                type="text"
                value={tocSearch}
                onChange={(e) => setTocSearch(e.target.value)}
                placeholder="Filter headings..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 pl-7 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-2.5" />
            </div>

            {/* Nav Links */}
            <nav className="space-y-1 max-h-[calc(100vh-320px)] overflow-y-auto pr-1 text-xs no-scrollbar">
              {filteredSections.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="truncate pr-2">
                      <span className="text-slate-500 font-mono mr-1.5">{sec.number}.</span>
                      {sec.title}
                    </span>
                    <span className="text-[10px] text-slate-500 shrink-0">{sec.readTimeMin}m</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Interactive Tool Links */}
            {onNavigateTab && (
              <div className="pt-3 border-t border-slate-800 space-y-1.5">
                <button
                  onClick={() => onNavigateTab('simulator')}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-medium text-emerald-400 flex items-center justify-between transition"
                >
                  <span className="flex items-center">
                    <PlayCircle className="w-3.5 h-3.5 mr-1.5" />
                    Launch RAG Simulator
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                </button>
                <button
                  onClick={() => onNavigateTab('code')}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-medium text-blue-400 flex items-center justify-between transition"
                >
                  <span className="flex items-center">
                    <Code2 className="w-3.5 h-3.5 mr-1.5" />
                    Browse Python Source
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                </button>
              </div>
            )}

            {/* Author Profile Footer */}
            <div className="pt-3 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 leading-snug">
                <span className="font-semibold text-slate-200">Author:</span> {ARTICLE_METADATA.author}
                <br />
                <span className="text-slate-500 text-[10px]">{ARTICLE_METADATA.authorBio}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Article Body */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-12">
          {ARTICLE_SECTIONS.map((section, secIdx) => {
            // Check if this is the Mermaid Diagram section
            const isMermaidSection = section.id === 'mermaid-architecture-diagram';

            return (
              <article
                key={section.id}
                id={section.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:border-slate-700/80 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-slate-800/80">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 font-mono text-sm font-bold border border-blue-500/20">
                    {section.number}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {section.title}
                  </h2>
                </div>

                {/* Formatted Markdown-like rendering */}
                <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                  {section.markdownContent.split('\n\n').map((paragraph, pIdx) => {
                    const blockKey = `${secIdx}-${pIdx}`;

                    // Heading 3
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={blockKey} className="text-lg font-bold text-white mt-6 mb-2 tracking-tight">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }

                    // Blockquotes
                    if (paragraph.startsWith('> ')) {
                      return (
                        <blockquote key={blockKey} className="border-l-4 border-blue-500 bg-blue-950/20 px-4 py-3 rounded-r-lg text-slate-200 italic my-4">
                          {paragraph.replace('> ', '')}
                        </blockquote>
                      );
                    }

                    // Mermaid Diagram Section special render
                    if (paragraph.startsWith('```mermaid')) {
                      const code = paragraph.replace(/```mermaid\n/, '').replace(/\n```/, '');
                      return (
                        <VisualMermaidFlow key={blockKey} rawMermaidCode={code} />
                      );
                    }

                    // Code blocks (Python, Text, Bash, JSON)
                    if (paragraph.startsWith('```')) {
                      const lines = paragraph.split('\n');
                      const lang = lines[0].replace('```', '') || 'text';
                      const code = lines.slice(1, -1).join('\n');
                      const isCodeCopied = copiedCodeBlockIdx === pIdx;

                      return (
                        <div key={blockKey} className="my-5 rounded-xl overflow-hidden border border-slate-700/70 bg-slate-950 shadow-lg">
                          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-slate-400 flex justify-between items-center text-xs">
                            <span className="font-mono text-blue-400 uppercase font-semibold">{lang}</span>
                            <button
                              onClick={() => handleCopyCode(code, pIdx)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center space-x-1 transition"
                            >
                              {isCodeCopied ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400 mr-1" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-slate-400 mr-1" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="p-4 overflow-x-auto">
                            {renderHighlightedCode(code, lang)}
                          </div>
                        </div>
                      );
                    }

                    // Tables
                    if (paragraph.includes('| :---') || paragraph.includes('| --- |') || (paragraph.startsWith('|') && paragraph.endsWith('|'))) {
                      const rows = paragraph.trim().split('\n').filter(r => !r.includes(':---') && !r.includes('--- |'));
                      if (rows.length > 0) {
                        const headers = rows[0].split('|').map(s => s.trim()).filter(Boolean);
                        const bodyRows = rows.slice(1).map(r => r.split('|').map(s => s.trim()).filter(Boolean));
                        return (
                          <div key={blockKey} className="overflow-x-auto my-6 border border-slate-800 rounded-xl shadow-sm">
                            <table className="min-w-full divide-y divide-slate-800 text-xs sm:text-sm">
                              <thead className="bg-slate-850">
                                <tr>
                                  {headers.map((h, hIdx) => (
                                    <th key={hIdx} className="px-4 py-3 text-left font-semibold text-slate-200">
                                      {h.replace(/\*\*/g, '')}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
                                {bodyRows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-slate-850/50 transition">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="px-4 py-3 text-slate-300">
                                        {cell.replace(/\*\*/g, '')}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                    }

                    // Bullet lists
                    if (paragraph.startsWith('- ') || paragraph.startsWith('• ') || paragraph.startsWith('1. ')) {
                      const items = paragraph.split('\n');
                      return (
                        <ul key={blockKey} className="space-y-2 my-3 pl-5 list-disc text-slate-300 marker:text-blue-400">
                          {items.map((item, iIdx) => (
                            <li key={iIdx} className="pl-1">
                              {item.replace(/^[-•\d.]\s+/, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    // Math equations
                    if (paragraph.startsWith('$$') && paragraph.endsWith('$$')) {
                      const mathExpr = paragraph.replace(/\$\$/g, '');
                      return (
                        <div key={blockKey} className="my-4 p-4 rounded-xl bg-slate-950/80 border border-blue-900/40 text-center font-mono text-sm sm:text-base text-blue-300 shadow-inner">
                          {mathExpr}
                        </div>
                      );
                    }

                    // Standard paragraph
                    return (
                      <p key={blockKey} className="text-slate-300">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </article>
            );
          })}

          {/* Primary References Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 mt-12 shadow-sm">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-400" />
              Verified Primary Literature Citations
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Every factual assertion, algorithm, and mathematical formula is anchored in peer-reviewed publications and official technical standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CITATIONS.map((cite) => (
                <div
                  key={cite.id}
                  className="p-4 rounded-xl bg-slate-850/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-blue-400">{cite.key}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{cite.year}</span>
                    </div>
                    <h4 className="font-semibold text-sm text-slate-200 mb-1 leading-snug">
                      {cite.title}
                    </h4>
                    <p className="text-xs text-slate-400 mb-2">{cite.authors}</p>
                    <p className="text-xs text-slate-500 italic mb-3">{cite.venueOrPublisher}</p>
                    <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      {cite.summary}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80">
                    <a
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-medium text-blue-400 hover:text-blue-300"
                    >
                      View Source Archive <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
