import React, { useState } from 'react';
import { Database, Zap, Eye, Copy, Check, Terminal, Layers, ArrowDown, ArrowRight, ShieldCheck } from 'lucide-react';

interface VisualMermaidFlowProps {
  rawMermaidCode: string;
}

export const VisualMermaidFlow: React.FC<VisualMermaidFlowProps> = ({ rawMermaidCode }) => {
  const [activeView, setActiveView] = useState<'diagram' | 'code'>('diagram');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawMermaidCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-700/80 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span className="text-xs sm:text-sm font-semibold text-white">
            Figure 1: Enterprise RAG Decoupled Systems Architecture
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-slate-950 rounded-lg p-0.5 border border-slate-800 flex text-xs">
            <button
              onClick={() => setActiveView('diagram')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                activeView === 'diagram'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Visual Flowchart
            </button>
            <button
              onClick={() => setActiveView('code')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                activeView === 'code'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Raw Mermaid
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Copy raw Mermaid code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Content */}
      {activeView === 'diagram' ? (
        <div className="p-4 sm:p-8 space-y-6">
          {/* Plane 1: Offline Ingestion Plane */}
          <div className="p-4 sm:p-6 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-300">
                  Offline Data & Ingestion Plane (Asynchronous Batch & CDC)
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Throughput & Precision Focus
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-400 font-medium">Enterprise Sources</span>
                <p className="font-semibold text-slate-200 mt-1">Confluence, S3, Postgres, SharePoint</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-400 font-medium">Parser & Cleaner</span>
                <p className="font-semibold text-slate-200 mt-1">Layout Analysis, OCR, PII Redaction</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-400 font-medium">Structure Chunking</span>
                <p className="font-semibold text-slate-200 mt-1">Parent-Child & Recursive Tokenizer</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-900/60 text-center">
                <span className="text-blue-300 font-medium">Vector Indexing</span>
                <p className="font-semibold text-white mt-1">HNSW Cosine Index (Qdrant / FAISS)</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-900/60 text-center">
                <span className="text-purple-300 font-medium">Lexical Indexing</span>
                <p className="font-semibold text-white mt-1">BM25 Inverted Index (OpenSearch)</p>
              </div>
            </div>
          </div>

          {/* Connection Indicator */}
          <div className="flex items-center justify-center text-slate-500 font-mono text-xs">
            <ArrowDown className="w-4 h-4 text-blue-400 animate-pulse mr-1" />
            <span>Indexed Knowledge Available For Real-time Search</span>
          </div>

          {/* Plane 2: Online Inference Plane */}
          <div className="p-4 sm:p-6 rounded-xl bg-slate-900/90 border border-emerald-900/50 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300">
                  Online Inference Plane (Synchronous SLA &lt; 750ms)
                </h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                P95 SLA Bound
              </span>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-mono text-[11px] text-emerald-400">Step 1: Auth & Gateway</div>
                  <div className="font-semibold text-white mt-0.5">JWT Verification + RBAC Filter</div>
                  <p className="text-slate-400 text-[11px] mt-1">Pre-retrieval role filtering outside LLM</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-mono text-[11px] text-blue-400">Step 2: Dual Candidate Search</div>
                  <div className="font-semibold text-white mt-0.5">Parallel BM25 + FAISS Vector</div>
                  <p className="text-slate-400 text-[11px] mt-1">Captures exact IDs and conceptual meaning</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-mono text-[11px] text-purple-400">Step 3: Rank Fusion (RRF)</div>
                  <div className="font-semibold text-white mt-0.5">Reciprocal Rank Aggregation</div>
                  <p className="text-slate-400 text-[11px] mt-1">Formula: Σ 1 / (60 + rank_i)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-mono text-[11px] text-amber-400">Step 4: Cross-Encoder</div>
                  <div className="font-semibold text-white mt-0.5">Full Query-Chunk Attention</div>
                  <p className="text-slate-400 text-[11px] mt-1">Scores top-25 candidate passages</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-mono text-[11px] text-emerald-400">Step 5: Confidence Gate</div>
                  <div className="font-semibold text-white mt-0.5">Score Check &gt; 0.45 Threshold</div>
                  <p className="text-slate-400 text-[11px] mt-1">Triggers abstention if evidence is weak</p>
                </div>

                <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-900/60">
                  <div className="font-mono text-[11px] text-blue-300">Step 6: Grounded Generation</div>
                  <div className="font-semibold text-white mt-0.5">LLM with Bracketed Citations</div>
                  <p className="text-slate-300 text-[11px] mt-1">Strict XML context delimiters</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plane 3: Observability Plane */}
          <div className="p-4 sm:p-6 rounded-xl bg-slate-900/90 border border-indigo-900/50 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-300">
                  Continuous Evaluation & Observability Plane
                </h4>
              </div>
              <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                CI/CD Automated Gate
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-400">Retrieval Metrics</span>
                <p className="font-semibold text-white mt-1">Recall@10, Precision@5, MRR, NDCG</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-400">Ragas Triad Metrics</span>
                <p className="font-semibold text-white mt-1">Faithfulness, Answer Relevance, Context Precision</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-400">Operational SLA</span>
                <p className="font-semibold text-white mt-1">P95 &lt; 750ms, Token Budget, Cache Hit Rate</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 bg-slate-950 overflow-x-auto font-mono text-xs text-emerald-300 leading-relaxed">
          <pre>
            <code>{rawMermaidCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
