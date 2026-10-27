import React, { useState } from 'react';
import { Layers, ArrowRight, ShieldCheck, Database, Zap, AlertTriangle, Eye, GitBranch, Lock } from 'lucide-react';
import { EngineeringVisuals } from './EngineeringVisuals';

interface StageDetail {
  id: string;
  name: string;
  plane: 'offline' | 'online' | 'observability';
  latency: string;
  technology: string;
  description: string;
  failureMode: string;
  engineeringMitigation: string;
}

const PIPELINE_STAGES: StageDetail[] = [
  {
    id: 'ingestion',
    name: '1. Ingestion & Multi-Format Parsing',
    plane: 'offline',
    latency: 'Async / Batch / CDC',
    technology: 'PyMuPDF, Unstructured.io, Tesseract OCR',
    description: 'Parses PDFs, DOCX, HTML tables, and Markdown while preserving semantic header tags (H1-H3) and structural lists.',
    failureMode: 'Table cell flattening separating numbers from headers; missing OCR text on scanned policy documents.',
    engineeringMitigation: 'Convert tables to clean Markdown format with repeating column headers; fallback OCR layout detection.'
  },
  {
    id: 'chunking',
    name: '2. Structure-Aware Chunking',
    plane: 'offline',
    latency: 'Async (< 5ms per doc)',
    technology: 'RecursiveCharacterTextSplitter, Semantic Splitter',
    description: 'Divides documents into 300–600 character blocks with 80-character overlap, attaching deterministic SHA-256 chunk IDs.',
    failureMode: 'Split-clause inversion (e.g., separating "provided that" from a strict compliance restriction).',
    engineeringMitigation: 'Paragraph-aware boundary preservation and Parent-Child hierarchical indexing.'
  },
  {
    id: 'embedding',
    name: '3. Embedding Generation',
    plane: 'offline',
    latency: '15–30 ms / batch',
    technology: 'Sentence-Transformers (all-MiniLM-L6-v2 / BGE)',
    description: 'Computes dense 384-dimensional or 1024-dimensional semantic vectors; in-place L2 normalization for cosine similarity.',
    failureMode: 'Vector drift on domain-specific acronyms, regulatory statutes, and proprietary financial tokens.',
    engineeringMitigation: 'Domain contrastive fine-tuning on proprietary internal Q&A pairs or hybrid lexical pairing.'
  },
  {
    id: 'dual_index',
    name: '4. Dual Indexing & Storage',
    plane: 'offline',
    latency: '< 10 ms write',
    technology: 'FAISS (IndexFlatIP/HNSW) + OpenSearch BM25',
    description: 'Persists dense vectors into an Approximate Nearest Neighbor graph alongside document payloads; inverted index for tokens.',
    failureMode: 'Index desynchronization where lexical index contains modified documents missing from vector collection.',
    engineeringMitigation: 'Atomic dual-write commits via Kafka Change Data Capture (CDC) streaming.'
  },
  {
    id: 'security_gate',
    name: '5. Security Gateway & RBAC Filter',
    plane: 'online',
    latency: '5–10 ms',
    technology: 'FastAPI Depends, PyJWT, Cryptography',
    description: 'Extracts authenticated user roles and tenant IDs; attaches deterministic filters to vector and lexical search queries.',
    failureMode: 'Data leakage caused by prompt-based filtering ("only show if user is admin") being jailbroken.',
    engineeringMitigation: 'Deterministic pre-retrieval database filtering outside the language model boundary.'
  },
  {
    id: 'dual_search',
    name: '6. Dual-Stream Candidate Retrieval',
    plane: 'online',
    latency: '15–30 ms',
    technology: 'Parallel ThreadPoolExecutor, FAISS + BM25',
    description: 'Runs parallel sparse lexical search (for exact IDs/numbers) and dense vector search (for semantic meaning).',
    failureMode: 'Dense search hallucinates relevance on rare acronyms; BM25 fails completely on conceptual synonyms.',
    engineeringMitigation: 'Dual-path execution ensures both vocabulary precision and conceptual recall.'
  },
  {
    id: 'rank_fusion',
    name: '7. Reciprocal Rank Fusion (RRF)',
    plane: 'online',
    latency: '2–5 ms',
    technology: 'RRF Algorithm (k = 60), Python / C++',
    description: 'Merges sparse and dense candidate ranks using 1/(k + rank_i), resolving score scale mismatches without calibration.',
    failureMode: 'Score inflation when using naive linear weighted sums without min-max score calibration.',
    engineeringMitigation: 'Parameter-insensitive position-based aggregation (Cormack et al. 2009).'
  },
  {
    id: 'cross_encoder',
    name: '8. Cross-Encoder Reranking',
    plane: 'online',
    latency: '40–80 ms',
    technology: 'CrossEncoder (ms-marco-MiniLM-L-6-v2, TensorRT)',
    description: 'Evaluates full query-chunk cross-attention over top-25 candidates, calculating precise relevance probability.',
    failureMode: 'Latency explosion if applied naively over hundreds of raw vector candidates.',
    engineeringMitigation: 'Strictly bounded candidate pool (top-25) and INT8 quantization via ONNX Runtime.'
  },
  {
    id: 'grounded_llm',
    name: '9. Grounded Context LLM Generation',
    plane: 'online',
    latency: '300–600 ms (TTFT)',
    technology: 'Enterprise Foundation Model (Gemini / Claude / Llama)',
    description: 'Injects reranked passages inside strict XML delimiters; instructs model to cite bracketed chunk IDs or abstain.',
    failureMode: 'Hallucination when evidence is sparse; prompt injection executed from malicious retrieved document.',
    engineeringMitigation: 'Confidence threshold check (< 0.45 triggers polite abstention); input token sanitization.'
  },
  {
    id: 'observability',
    name: '10. Observability & Triad Evaluation',
    plane: 'observability',
    latency: 'Async / Stream',
    technology: 'OpenTelemetry, Ragas, Prometheus',
    description: 'Continuously measures retrieval Recall@k, generator Faithfulness, Context Precision, and latency budgets.',
    failureMode: 'Silent degradation of factual accuracy following upstream embedding model or prompt changes.',
    engineeringMitigation: 'Automated CI/CD regression testing against golden benchmark dataset (200+ QA pairs).'
  }
];

export const ArchitectureDiagram: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<StageDetail>(PIPELINE_STAGES[7]); // Default to Cross-Encoder

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Intro header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Interactive RAG Architecture Explorer
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl">
          Inspect the decoupled planes of an enterprise RAG system: the asynchronous offline data ingestion plane, the low-latency synchronous inference plane, and the continuous evaluation plane.
        </p>
      </div>

      {/* Planes Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-300 font-semibold text-sm mb-1">
            <Database className="w-4 h-4 text-blue-400" />
            <span>Offline Data Plane</span>
          </div>
          <p className="text-xs text-slate-400">
            Asynchronous ingestion, OCR parsing, recursive chunking, embedding generation, and dual-indexing into HNSW & BM25.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-emerald-900/60 shadow-sm">
          <div className="flex items-center space-x-2 text-emerald-300 font-semibold text-sm mb-1">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Online Inference Plane</span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time pipeline under strict &lt; 750ms SLA: JWT RBAC filtering, dual-stream retrieval, RRF rank fusion, Cross-Encoder reranking, and grounded generation.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/60 shadow-sm">
          <div className="flex items-center space-x-2 text-indigo-300 font-semibold text-sm mb-1">
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>Observability & Evaluation</span>
          </div>
          <p className="text-xs text-slate-400">
            Continuous Ragas evaluation (Faithfulness, Context Precision), latency budgets, OpenTelemetry instrumentation, and CI/CD golden regression testing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Stages List (Left) */}
        <div className="lg:col-span-5 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Click Pipeline Stage to Inspect
          </h3>
          {PIPELINE_STAGES.map((stage) => {
            const isSelected = selectedStage.id === stage.id;
            const badgeColor =
              stage.plane === 'offline'
                ? 'bg-slate-800 text-slate-300 border-slate-700'
                : stage.plane === 'online'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                : 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60';

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage)}
                className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500/60 shadow-sm'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-xs sm:text-sm text-white">
                    {stage.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {stage.technology}
                  </div>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <span className={`px-2 py-0.5 text-[10px] rounded-md font-mono border ${badgeColor}`}>
                    {stage.latency}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-slate-600'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspector Card (Right) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Stage Specification
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedStage.name}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-300 border border-blue-500/30">
                {selectedStage.plane.toUpperCase()} PLANE
              </span>
            </div>

            <div className="space-y-6 text-sm text-slate-300">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Operational Description
                </h4>
                <p className="leading-relaxed text-slate-200">
                  {selectedStage.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div>
                  <span className="text-xs text-slate-400">Target Latency Budget</span>
                  <p className="font-mono text-sm font-semibold text-emerald-400 mt-0.5">
                    {selectedStage.latency}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Primary Technology</span>
                  <p className="font-mono text-xs sm:text-sm font-semibold text-slate-200 mt-0.5 truncate">
                    {selectedStage.technology}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40">
                <div className="flex items-center space-x-2 text-red-300 font-semibold text-xs uppercase tracking-wider mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Real-World Production Failure Mode</span>
                </div>
                <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed">
                  {selectedStage.failureMode}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                <div className="flex items-center space-x-2 text-emerald-300 font-semibold text-xs uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Engineering Mitigation Strategy</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                  {selectedStage.engineeringMitigation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithmic & Systems Engineering Graphics */}
      <div className="mt-12">
        <EngineeringVisuals />
      </div>
    </div>
  );
};
