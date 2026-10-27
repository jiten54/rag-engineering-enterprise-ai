import React, { useState } from 'react';
import { RETRIEVAL_STRATEGIES } from '../data/citations';
import { TableProperties, CheckCircle2, Zap, Clock, ShieldAlert, Cpu } from 'lucide-react';

export const RetrievalMatrix: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>(RETRIEVAL_STRATEGIES[2].name); // Hybrid default

  const current = RETRIEVAL_STRATEGIES.find((s) => s.name === selectedStrategy) || RETRIEVAL_STRATEGIES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Retrieval Strategies Comparison Matrix
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl">
          An engineering trade-off analysis of Lexical BM25, Dense Vectors, Reciprocal Rank Fusion Hybrid Search, Metadata Pre-filtering, Cross-Encoder Reranking, and Query Rewriting.
        </p>
      </div>

      {/* Strategy selector pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {RETRIEVAL_STRATEGIES.map((strat) => {
          const isSelected = strat.name === selectedStrategy;
          return (
            <button
              key={strat.name}
              onClick={() => setSelectedStrategy(strat.name)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {strat.name}
            </button>
          );
        })}
      </div>

      {/* Selected Strategy Deep Dive Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-10 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Selected Architecture
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {current.name}
            </h3>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              {current.latencyImpact}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center">
              <Cpu className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
              {current.computeCost}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Algorithmic Mechanism
            </h4>
            <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {current.mechanism}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-6 mb-2">
              Ideal Enterprise Fit
            </h4>
            <div className="flex items-start space-x-2 text-slate-200 bg-blue-950/20 p-4 rounded-xl border border-blue-900/40">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{current.bestUseCase}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center">
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                Key Engineering Strengths
              </h4>
              <p className="text-emerald-200/90 text-xs sm:text-sm leading-relaxed">
                {current.strengths}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center">
                <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
                Core Weaknesses & Edge Cases
              </h4>
              <p className="text-amber-200/90 text-xs sm:text-sm leading-relaxed">
                {current.weaknesses}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm overflow-hidden">
        <h3 className="text-base font-bold text-white mb-4 flex items-center">
          <TableProperties className="w-4 h-4 mr-2 text-blue-400" />
          Full Side-by-Side Trade-off Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-xs sm:text-sm">
            <thead className="bg-slate-850">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Strategy</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Latency</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Compute Cost</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Primary Strength</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Vulnerability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
              {RETRIEVAL_STRATEGIES.map((s, idx) => (
                <tr
                  key={idx}
                  onClick={() => setSelectedStrategy(s.name)}
                  className={`cursor-pointer transition hover:bg-slate-800/60 ${
                    s.name === selectedStrategy ? 'bg-blue-900/20 font-medium' : ''
                  }`}
                >
                  <td className="px-4 py-3.5 text-white font-semibold whitespace-nowrap">
                    {s.name}
                  </td>
                  <td className="px-4 py-3.5 text-slate-300 font-mono text-xs whitespace-nowrap">
                    {s.latencyImpact}
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 font-mono text-xs whitespace-nowrap">
                    {s.computeCost}
                  </td>
                  <td className="px-4 py-3.5 text-emerald-300/90 max-w-xs">
                    {s.strengths}
                  </td>
                  <td className="px-4 py-3.5 text-amber-300/90 max-w-xs">
                    {s.weaknesses}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
