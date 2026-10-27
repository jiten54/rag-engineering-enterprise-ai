import React, { useState } from 'react';
import { Network, GitCompare, BarChart3, Clock, Compass, Layers, Zap, Shield, Sparkles } from 'lucide-react';

export const EngineeringVisuals: React.FC = () => {
  const [activeGraphic, setActiveGraphic] = useState<'hnsw' | 'attention' | 'rrf' | 'latency'>('hnsw');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 my-10 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            AI/ML Systems Engineering Graphics
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Algorithmic Deep Dives & Architectural Blueprints
          </h3>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveGraphic('hnsw')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeGraphic === 'hnsw'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            HNSW Graph Hierarchy
          </button>
          <button
            onClick={() => setActiveGraphic('attention')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeGraphic === 'attention'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cross-Attention Matrix
          </button>
          <button
            onClick={() => setActiveGraphic('rrf')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeGraphic === 'rrf'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            RRF Rank Curves
          </button>
          <button
            onClick={() => setActiveGraphic('latency')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeGraphic === 'latency'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Latency Budget
          </button>
        </div>
      </div>

      {/* Graphic 1: HNSW Graph Indexing */}
      {activeGraphic === 'hnsw' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-3/5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <svg viewBox="0 0 600 320" className="w-full h-auto text-slate-300 font-mono text-xs select-none">
                <defs>
                  <linearGradient id="layerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                  </marker>
                </defs>

                {/* Layer 2 (Top Sparse Layer) */}
                <rect x="30" y="25" width="540" height="60" rx="8" fill="url(#layerGrad)" stroke="#334155" strokeWidth="1.5" />
                <text x="45" y="45" fill="#94a3b8" fontSize="11" fontWeight="bold">LAYER 2 (Coarse Skip-List • Low Degree M)</text>
                
                {/* Layer 2 Nodes */}
                <circle cx="120" cy="65" r="7" fill="#60a5fa" />
                <circle cx="480" cy="65" r="7" fill="#60a5fa" />
                <line x1="127" y1="65" x2="473" y2="65" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                <text x="270" y="58" fill="#60a5fa" fontSize="10" textAnchor="middle">Long-range jump</text>

                {/* Vertical Step Down Arrow */}
                <line x1="480" y1="72" x2="480" y2="120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" markerEnd="url(#arrow)" />

                {/* Layer 1 (Medium Layer) */}
                <rect x="30" y="125" width="540" height="70" rx="8" fill="url(#layerGrad)" stroke="#334155" strokeWidth="1.5" />
                <text x="45" y="145" fill="#94a3b8" fontSize="11" fontWeight="bold">LAYER 1 (Intermediate Search)</text>
                
                {/* Layer 1 Nodes */}
                <circle cx="120" cy="170" r="6" fill="#93c5fd" />
                <circle cx="260" cy="165" r="6" fill="#93c5fd" />
                <circle cx="390" cy="175" r="6" fill="#93c5fd" />
                <circle cx="480" cy="165" r="7" fill="#60a5fa" />
                <line x1="480" y1="165" x2="396" y2="175" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <line x1="384" y1="175" x2="266" y2="165" stroke="#3b82f6" strokeWidth="1.5" />
                <line x1="254" y1="165" x2="126" y2="170" stroke="#3b82f6" strokeWidth="1.5" />

                {/* Vertical Step Down Arrow to Base Layer */}
                <line x1="390" y1="181" x2="390" y2="225" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" markerEnd="url(#arrow)" />

                {/* Layer 0 (Dense Base Layer) */}
                <rect x="30" y="230" width="540" height="75" rx="8" fill="url(#layerGrad)" stroke="#1e3a8a" strokeWidth="1.5" />
                <text x="45" y="250" fill="#38bdf8" fontSize="11" fontWeight="bold">LAYER 0 (Full Corpus Graph • Max Connectivity M_max)</text>
                
                {/* Layer 0 Nodes Cluster */}
                <circle cx="100" cy="275" r="5" fill="#cbd5e1" />
                <circle cx="150" cy="285" r="5" fill="#cbd5e1" />
                <circle cx="210" cy="270" r="5" fill="#cbd5e1" />
                <circle cx="280" cy="285" r="5" fill="#cbd5e1" />
                <circle cx="350" cy="275" r="6" fill="#38bdf8" />
                <circle cx="390" cy="265" r="7" fill="#60a5fa" />
                <circle cx="430" cy="280" r="7" fill="#22c55e" />
                <circle cx="500" cy="270" r="5" fill="#cbd5e1" />
                
                {/* Local edges */}
                <line x1="390" y1="265" x2="424" y2="280" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="390" y1="265" x2="356" y2="275" stroke="#64748b" strokeWidth="1" />
                <line x1="350" y1="275" x2="285" y2="285" stroke="#64748b" strokeWidth="1" />
                <line x1="430" y1="280" x2="495" y2="270" stroke="#64748b" strokeWidth="1" />

                {/* Target Match Badge */}
                <rect x="420" y="295" width="85" height="18" rx="4" fill="#14532d" />
                <text x="462" y="308" fill="#86efac" fontSize="9" textAnchor="middle" fontWeight="bold">k-NN MATCH</text>
              </svg>
            </div>

            <div className="w-full md:w-2/5 space-y-4 text-xs sm:text-sm text-slate-300">
              <h4 className="text-base font-bold text-white flex items-center">
                <Network className="w-4 h-4 mr-2 text-blue-400" />
                Logarithmic Graph Traversal Complexity
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                HNSW (Malkov & Yashunin 2020) arranges high-dimensional vector embeddings into multi-layer proximity graphs. Search begins at top layers with large spatial hops ($O(\log N)$) and steps down greedily until reaching candidate clusters at Layer 0.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Routing Complexity:</span>
                  <span className="text-emerald-400 font-bold">O(log N)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>efSearch Parameter:</span>
                  <span className="text-blue-400 font-bold">64 – 128 (Recall &gt; 97%)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Typical Index Latency:</span>
                  <span className="text-purple-400 font-bold">4 – 12 ms per query</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Graphic 2: Cross-Attention Matrix */}
      {activeGraphic === 'attention' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-3/5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-2 flex justify-between">
                <span>Query Tokens (Y-Axis) vs Document Tokens (X-Axis)</span>
                <span className="text-blue-400 font-semibold">Self-Attention Weights A_ij</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-xs">
                {/* Header row: Doc tokens */}
                <div className="p-1"></div>
                <div className="p-1.5 bg-slate-900 rounded text-slate-400 text-[11px]">"CIP"</div>
                <div className="p-1.5 bg-slate-900 rounded text-slate-400 text-[11px]">"5"</div>
                <div className="p-1.5 bg-slate-900 rounded text-slate-400 text-[11px]">"years"</div>
                <div className="p-1.5 bg-slate-900 rounded text-slate-400 text-[11px]">"mandate"</div>

                {/* Row 1 */}
                <div className="p-1.5 bg-slate-900 rounded text-slate-400 text-[11px] text-right">"KYC"</div>
                <div className="p-3 bg-blue-600/90 text-white rounded font-bold shadow-inner">0.89</div>
                <div className="p-3 bg-blue-950/40 text-slate-400 rounded">0.12</div>
                <div className="p-3 bg-blue-950/60 text-slate-300 rounded">0.24</div>
                <div className="p-3 bg-blue-800/80 text-white rounded font-bold">0.71</div>

                {/* Row 2 */}
                <div className="p-1.5 bg-slate-900 rounded text-slate-400 text-[11px] text-right">"retention"</div>
                <div className="p-3 bg-blue-950/50 text-slate-300 rounded">0.28</div>
                <div className="p-3 bg-blue-700/80 text-white rounded font-bold">0.68</div>
                <div className="p-3 bg-blue-600 text-white rounded font-bold shadow-inner">0.96</div>
                <div className="p-3 bg-blue-900/60 text-slate-200 rounded">0.45</div>

                {/* Row 3 */}
                <div className="p-1.5 bg-slate-900 rounded text-slate-400 text-[11px] text-right">"period"</div>
                <div className="p-3 bg-blue-950/30 text-slate-400 rounded">0.08</div>
                <div className="p-3 bg-blue-600/90 text-white rounded font-bold">0.82</div>
                <div className="p-3 bg-blue-600 text-white rounded font-bold shadow-inner">0.91</div>
                <div className="p-3 bg-blue-950/50 text-slate-300 rounded">0.31</div>
              </div>
            </div>

            <div className="w-full md:w-2/5 space-y-4 text-xs sm:text-sm text-slate-300">
              <h4 className="text-base font-bold text-white flex items-center">
                <GitCompare className="w-4 h-4 mr-2 text-indigo-400" />
                Bi-Encoder vs Cross-Encoder Contrast
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Bi-encoders compress an entire passage into a single vector, losing fine-grained lexical intersections. Cross-encoders evaluate full query-chunk cross-attention over all transformer layers ($O(L_q \times L_d)$), computing precise token relevance.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Bi-Encoder Complexity:</span>
                  <span className="text-emerald-400 font-bold">O(L) precomputed</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cross-Encoder Complexity:</span>
                  <span className="text-amber-400 font-bold">O((L_q + L_d)^2)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Target Candidate Pool:</span>
                  <span className="text-blue-400 font-bold">Top 20–30 passages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Graphic 3: RRF Decay Curves */}
      {activeGraphic === 'rrf' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-3/5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <svg viewBox="0 0 500 240" className="w-full h-auto text-slate-400 font-mono text-xs select-none">
                {/* Axes */}
                <line x1="40" y1="200" x2="480" y2="200" stroke="#475569" strokeWidth="1.5" />
                <line x1="40" y1="20" x2="40" y2="200" stroke="#475569" strokeWidth="1.5" />
                
                <text x="260" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">Candidate Rank Position r (1 to 50)</text>
                <text x="15" y="110" fill="#94a3b8" fontSize="10" transform="rotate(-90 15 110)" textAnchor="middle">RRF Score 1/(k + r)</text>

                {/* Curve k = 20 (steepest) */}
                <path d="M 40,40 Q 90,130 480,185" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                {/* Curve k = 60 (standard) */}
                <path d="M 40,75 Q 120,140 480,188" fill="none" stroke="#3b82f6" strokeWidth="3" />
                {/* Curve k = 100 (flattest) */}
                <path d="M 40,110 Q 150,155 480,192" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />

                {/* Legend */}
                <rect x="310" y="30" width="160" height="65" rx="6" fill="#0f172a" stroke="#334155" />
                <circle cx="325" cy="45" r="4" fill="#3b82f6" />
                <text x="335" y="49" fill="#93c5fd" fontSize="10">k = 60 (Standard RRF)</text>
                <circle cx="325" cy="63" r="4" fill="#f59e0b" />
                <text x="335" y="67" fill="#fde68a" fontSize="10">k = 20 (Steep rank bias)</text>
                <circle cx="325" cy="81" r="4" fill="#10b981" />
                <text x="335" y="85" fill="#a7f3d0" fontSize="10">k = 100 (High smoothing)</text>
              </svg>
            </div>

            <div className="w-full md:w-2/5 space-y-4 text-xs sm:text-sm text-slate-300">
              <h4 className="text-base font-bold text-white flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-emerald-400" />
                Parameter-Insensitive Fusion (Cormack 2009)
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Reciprocal Rank Fusion converts arbitrary score scales (unbounded BM25 scores vs normalized cosine values) into ordinal ranks. The constant $k=60$ acts as a dampener to prevent a single high outlier from overwhelming the fused candidate list.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Formula:</span>
                  <span className="text-blue-400 font-bold">RRF = Σ 1/(60 + r_m)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Score Normalization:</span>
                  <span className="text-emerald-400 font-bold">None required</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Outlier Sensitivity:</span>
                  <span className="text-purple-400 font-bold">Low (Monotonic)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Graphic 4: Latency Budget Breakdown */}
      {activeGraphic === 'latency' && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-mono text-slate-400 flex justify-between">
              <span>Synchronous Inference Latency Breakdown (Target SLA &lt; 750ms)</span>
              <span className="text-emerald-400 font-bold">Total P95: ~530ms</span>
            </div>

            {/* Stacked bar visualization */}
            <div className="w-full h-10 rounded-xl overflow-hidden flex font-mono text-[11px] font-bold text-white text-center leading-10 shadow-inner">
              <div style={{ width: '3%' }} className="bg-slate-700" title="Auth & Gateway (8ms)">8m</div>
              <div style={{ width: '8%' }} className="bg-blue-600" title="Query Embedding (22ms)">22m</div>
              <div style={{ width: '6%' }} className="bg-purple-600" title="Dual Retrieval (18ms)">18m</div>
              <div style={{ width: '18%' }} className="bg-amber-600" title="Cross-Encoder Rerank (65ms)">65ms Rerank</div>
              <div style={{ width: '65%' }} className="bg-emerald-600" title="LLM Time-To-First-Token (420ms)">420ms Streaming LLM TTFT</div>
            </div>

            {/* Stage details */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500">1. Auth/RBAC</span>
                <p className="font-bold text-slate-300 mt-0.5">8 ms (1.5%)</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-blue-400">2. Embedding</span>
                <p className="font-bold text-white mt-0.5">22 ms (4.1%)</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-purple-400">3. Hybrid ANN</span>
                <p className="font-bold text-white mt-0.5">18 ms (3.4%)</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-amber-400">4. Reranker</span>
                <p className="font-bold text-white mt-0.5">65 ms (12.3%)</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-emerald-400">5. LLM Stream</span>
                <p className="font-bold text-white mt-0.5">420 ms (78.7%)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
