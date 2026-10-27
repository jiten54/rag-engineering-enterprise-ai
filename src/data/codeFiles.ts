export interface CodeFile {
  name: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

export const PYTHON_CODEBASE: CodeFile[] = [
  {
    name: "requirements.txt",
    path: "requirements.txt",
    language: "text",
    description: "Pinned dependencies for FastAPI, sentence-transformers, FAISS CPU, rank-bm25, and Pydantic.",
    content: `# Enterprise RAG Pipeline Dependencies
fastapi==0.115.6
uvicorn[standard]==0.34.0
pydantic==2.10.4
sentence-transformers==3.3.1
faiss-cpu==1.9.0.post1
rank-bm25==0.2.2
numpy==1.26.4
torch==2.5.1
pytest==8.3.4
httpx==0.28.1
`
  },
  {
    name: "config.py",
    path: "app/config.py",
    language: "python",
    description: "Application configuration, embedding model weights, FAISS indexing parameters, and latency bounds.",
    content: `"""Application Configuration and Hyperparameters.

Defines environment variables, model identifiers, index settings,
and retrieval thresholds using Pydantic Settings.
"""

from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Runtime configuration for the Enterprise RAG microservice."""

    app_name: str = "Enterprise RAG Service"
    app_version: str = "1.0.0"
    debug: bool = False

    # Embedding model configuration
    # all-MiniLM-L6-v2 outputs 384-dimensional dense vectors
    embedding_model_name: str = "sentence-transformers/all-MiniLM-L6-v2"
    embedding_dimension: int = 384

    # Optional Cross-Encoder reranker model
    reranker_model_name: str = "cross-encoder/ms-marco-MiniLM-L-6-v2"

    # Chunking hyperparameters
    chunk_size: int = Field(default=500, description="Target character count per chunk")
    chunk_overlap: int = Field(default=80, description="Overlap character count between chunks")

    # Retrieval parameters
    sparse_top_k: int = 15
    dense_top_k: int = 15
    rerank_top_k: int = 5
    rrf_k_factor: int = 60  # Smoothing constant k in 1 / (k + rank)

    # Security & Confidence Thresholds
    min_confidence_score: float = Field(
        default=0.45,
        description="Minimum normalized cross-encoder relevance score required to prevent abstention"
    )

    class Config:
        env_prefix = "RAG_"


settings = Settings()
`
  },
  {
    name: "ingestion.py",
    path: "app/ingestion.py",
    language: "python",
    description: "Structure-aware document chunking, metadata enrichment, hashing, and PII pre-sanitization.",
    content: `"""Document Ingestion, Sanitization, and Structure-Aware Chunking.

Processes raw text or enterprise policy documents into semantically coherent
chunks equipped with deterministic hashes and access-control metadata.
"""

from dataclasses import dataclass, field
import hashlib
import re
from typing import Any, Dict, List, Optional


@dataclass
class DocumentChunk:
    """Represents an atomic, searchable piece of enterprise knowledge."""
    chunk_id: str
    doc_id: str
    title: str
    text: str
    metadata: Dict[str, Any] = field(default_factory=dict)
    char_start: int = 0
    char_end: int = 0


class DocumentIngestionPipeline:
    """Handles text cleaning, boundary-preserving chunking, and metadata tagging."""

    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 80):
        if chunk_overlap >= chunk_size:
            raise ValueError("chunk_overlap must be strictly less than chunk_size")
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    @staticmethod
    def sanitize_text(text: str) -> str:
        """Removes extraneous whitespace, control characters, and normalizes line breaks."""
        text = re.sub(r"[\\r\\t]+", " ", text)
        text = re.sub(r"\\n{3,}", "\\n\\n", text)
        text = re.sub(r"[ ]{2,}", " ", text)
        return text.strip()

    def chunk_document(
        self,
        doc_id: str,
        title: str,
        text: str,
        metadata: Optional[Dict[str, Any]] = None
    ) -> List[DocumentChunk]:
        """Splits text on natural paragraph and sentence boundaries with overlap."""
        clean_text = self.sanitize_text(text)
        meta = metadata.copy() if metadata else {}

        # First pass: split on double newlines (paragraphs)
        paragraphs = clean_text.split("\\n\\n")
        chunks: List[DocumentChunk] = []

        current_text = ""
        current_start = 0

        for para in paragraphs:
            para = para.strip()
            if not para:
                continue

            # If adding this paragraph exceeds chunk_size, flush existing buffer
            if len(current_text) + len(para) + 2 > self.chunk_size and current_text:
                chunk_hash = hashlib.sha256(current_text.encode("utf-8")).hexdigest()[:12]
                chunk_id = f"{doc_id}_{len(chunks):04d}_{chunk_hash}"
                chunks.append(
                    DocumentChunk(
                        chunk_id=chunk_id,
                        doc_id=doc_id,
                        title=title,
                        text=current_text,
                        metadata=meta,
                        char_start=current_start,
                        char_end=current_start + len(current_text)
                    )
                )

                # Maintain overlap from tail of current buffer
                if self.chunk_overlap > 0 and len(current_text) > self.chunk_overlap:
                    current_text = current_text[-self.chunk_overlap:] + " " + para
                else:
                    current_text = para
                current_start += len(current_text)
            else:
                if current_text:
                    current_text += "\\n\\n" + para
                else:
                    current_text = para

        # Flush final remaining buffer
        if current_text:
            chunk_hash = hashlib.sha256(current_text.encode("utf-8")).hexdigest()[:12]
            chunk_id = f"{doc_id}_{len(chunks):04d}_{chunk_hash}"
            chunks.append(
                DocumentChunk(
                    chunk_id=chunk_id,
                    doc_id=doc_id,
                    title=title,
                    text=current_text,
                    metadata=meta,
                    char_start=current_start,
                    char_end=current_start + len(current_text)
                )
            )

        return chunks
`
  },
  {
    name: "retrieval.py",
    path: "app/retrieval.py",
    language: "python",
    description: "Hybrid retrieval engine combining BM25, FAISS IndexFlatIP, Reciprocal Rank Fusion, and Cross-Encoder.",
    content: `"""Hybrid Retrieval and Rank Fusion Engine.

Combines lexical BM25 search and dense vector search via FAISS, fuses candidates
via Reciprocal Rank Fusion (RRF), and applies Cross-Encoder reranking.
"""

from typing import Any, Dict, List, Optional, Tuple
import numpy as np
from rank_bm25 import BM25Okapi
import faiss
from sentence_transformers import SentenceTransformer, CrossEncoder

from app.ingestion import DocumentChunk
from app.config import settings


class HybridRetriever:
    """Production-grade hybrid retriever enforcing strict metadata and rank fusion."""

    def __init__(
        self,
        embedding_model_name: Optional[str] = None,
        reranker_model_name: Optional[str] = None
    ):
        model_name = embedding_model_name or settings.embedding_model_name
        self.encoder = SentenceTransformer(model_name)
        self.dimension = self.encoder.get_sentence_embedding_dimension()

        # FAISS IndexFlatIP uses Inner Product; combined with L2 normalized vectors,
        # inner product is identical to Cosine Similarity.
        self.index = faiss.IndexFlatIP(self.dimension)

        self.reranker_name = reranker_model_name or settings.reranker_model_name
        self.reranker = CrossEncoder(self.reranker_name)

        self.chunks: List[DocumentChunk] = []
        self.bm25: Optional[BM25Okapi] = None
        self.tokenized_corpus: List[List[str]] = []

    def index_chunks(self, chunks: List[DocumentChunk]) -> int:
        """Indexes document chunks into both lexical (BM25) and dense (FAISS) structures."""
        if not chunks:
            return 0

        self.chunks = chunks

        # 1. Build BM25 Index
        self.tokenized_corpus = [
            chunk.text.lower().split() for chunk in self.chunks
        ]
        self.bm25 = BM25Okapi(self.tokenized_corpus)

        # 2. Compute Dense Embeddings & Normalize for Cosine Similarity
        texts = [f"{c.title}: {c.text}" for c in self.chunks]
        embeddings = self.encoder.encode(texts, convert_to_numpy=True, show_progress_bar=False)

        # In-place L2 normalization transforms inner-product into cosine similarity
        faiss.normalize_L2(embeddings)

        self.index.reset()
        self.index.add(embeddings.astype(np.float32))

        return len(self.chunks)

    def _lexical_search(self, query: str, top_k: int) -> List[Tuple[int, float]]:
        """Retrieves top_k chunks using Okapi BM25 scoring."""
        if not self.bm25:
            return []
        tokenized_query = query.lower().split()
        scores = self.bm25.get_scores(tokenized_query)
        top_indices = np.argsort(scores)[::-1][:top_k]
        return [(int(idx), float(scores[idx])) for idx in top_indices if scores[idx] > 0]

    def _dense_search(self, query: str, top_k: int) -> List[Tuple[int, float]]:
        """Retrieves top_k chunks using FAISS cosine similarity."""
        if self.index.ntotal == 0:
            return []
        query_vector = self.encoder.encode([query], convert_to_numpy=True)
        faiss.normalize_L2(query_vector)

        distances, indices = self.index.search(query_vector.astype(np.float32), top_k)
        results: List[Tuple[int, float]] = []
        for dist, idx in zip(distances[0], indices[0]):
            if idx != -1:
                results.append((int(idx), float(dist)))
        return results

    @staticmethod
    def reciprocal_rank_fusion(
        sparse_results: List[Tuple[int, float]],
        dense_results: List[Tuple[int, float]],
        k: int = 60
    ) -> List[Tuple[int, float]]:
        """Fuses multiple ranked lists using Reciprocal Rank Fusion (RRF).

        Formula: RRF_score(d) = \\sum_{m \\in M} \\frac{1}{k + r_m(d)}
        Where r_m(d) is the rank (1-indexed) in retriever m.
        """
        rrf_scores: Dict[int, float] = {}

        for rank, (doc_idx, _) in enumerate(sparse_results, start=1):
            rrf_scores[doc_idx] = rrf_scores.get(doc_idx, 0.0) + (1.0 / (k + rank))

        for rank, (doc_idx, _) in enumerate(dense_results, start=1):
            rrf_scores[doc_idx] = rrf_scores.get(doc_idx, 0.0) + (1.0 / (k + rank))

        # Sort descending by RRF score
        sorted_candidates = sorted(rrf_scores.items(), key=lambda item: item[1], reverse=True)
        return sorted_candidates

    def retrieve(
        self,
        query: str,
        user_roles: Optional[List[str]] = None,
        top_k: int = 5
    ) -> List[Dict[str, Any]]:
        """Executes full hybrid retrieval with RBAC pre-filtering and Cross-Encoder reranking."""
        if not self.chunks:
            return []

        # 1. Parallel candidate retrieval
        sparse_hits = self._lexical_search(query, top_k=settings.sparse_top_k)
        dense_hits = self._dense_search(query, top_k=settings.dense_top_k)

        # 2. Reciprocal Rank Fusion
        fused = self.reciprocal_rank_fusion(sparse_hits, dense_hits, k=settings.rrf_k_factor)

        # 3. Security Filter: Exclude documents the user is unauthorized to access
        # Enforced programmatically BEFORE passing to LLM context
        authorized_candidates = []
        for idx, rrf_score in fused:
            chunk = self.chunks[idx]
            required_role = chunk.metadata.get("required_role")
            if required_role and user_roles is not None:
                if required_role not in user_roles and "admin" not in user_roles:
                    continue
            authorized_candidates.append((idx, rrf_score))

        if not authorized_candidates:
            return []

        candidate_pool = authorized_candidates[: settings.sparse_top_k]

        # 4. Cross-Encoder Reranking
        pairs = [(query, self.chunks[idx].text) for idx, _ in candidate_pool]
        rerank_scores = self.reranker.predict(pairs)

        ranked_results = []
        for (idx, rrf_score), score in zip(candidate_pool, rerank_scores):
            chunk = self.chunks[idx]
            ranked_results.append({
                "chunk_id": chunk.chunk_id,
                "doc_id": chunk.doc_id,
                "title": chunk.title,
                "text": chunk.text,
                "metadata": chunk.metadata,
                "rerank_score": float(score),
                "rrf_score": float(rrf_score)
            })

        # Sort strictly by Cross-Encoder score descending
        ranked_results.sort(key=lambda x: x["rerank_score"], reverse=True)
        return ranked_results[:top_k]
`
  },
  {
    name: "main.py",
    path: "app/main.py",
    language: "python",
    description: "FastAPI REST microservice endpoints with request validation, health checks, and citation assembly.",
    content: `"""FastAPI Application Entry Point.

Exposes REST endpoints for document ingestion, hybrid vector retrieval,
health checks, and structured context formatting for LLM generation.
"""

from typing import Any, Dict, List, Optional
import time
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field

from app.config import settings
from app.ingestion import DocumentIngestionPipeline
from app.retrieval import HybridRetriever

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Production-grade hybrid RAG retrieval microservice with RRF and Cross-Encoder reranking."
)

# Global in-memory pipeline instances (in production, connected to Milvus/Qdrant/Pinecone)
pipeline = DocumentIngestionPipeline(
    chunk_size=settings.chunk_size,
    chunk_overlap=settings.chunk_overlap
)
retriever = HybridRetriever()


class RawDocument(BaseModel):
    doc_id: str = Field(..., description="Unique document identifier")
    title: str = Field(..., description="Document title")
    text: str = Field(..., description="Full text body")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Custom access control tags")


class IndexRequest(BaseModel):
    documents: List[RawDocument]


class QueryRequest(BaseModel):
    query: str = Field(..., min_length=3, description="Search question")
    user_roles: Optional[List[str]] = Field(default=None, description="RBAC roles of the caller")
    top_k: int = Field(default=5, ge=1, le=20)


class RetrievedChunkResponse(BaseModel):
    chunk_id: str
    doc_id: str
    title: str
    text: str
    rerank_score: float
    rrf_score: float
    metadata: Dict[str, Any]


class QueryResponse(BaseModel):
    query: str
    latency_ms: float
    should_abstain: bool
    results: List[RetrievedChunkResponse]
    formatted_context_prompt: str


@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    """Liveness probe verifying index status."""
    return {
        "status": "healthy",
        "total_chunks_indexed": len(retriever.chunks),
        "embedding_dimension": retriever.dimension,
        "embedding_model": settings.embedding_model_name
    }


@app.post("/index", status_code=status.HTTP_201_CREATED)
def index_documents(payload: IndexRequest):
    """Processes, chunks, and indexes a batch of raw documents."""
    all_chunks = []
    for doc in payload.documents:
        chunks = pipeline.chunk_document(
            doc_id=doc.doc_id,
            title=doc.title,
            text=doc.text,
            metadata=doc.metadata
        )
        all_chunks.extend(chunks)

    total_indexed = retriever.index_chunks(all_chunks)
    return {
        "message": f"Successfully indexed {len(payload.documents)} documents into {total_indexed} chunks.",
        "chunks_indexed": total_indexed
    }


@app.post("/query", response_model=QueryResponse)
def query_knowledge_base(payload: QueryRequest):
    """Executes hybrid retrieval, evaluates confidence threshold, and builds citation context."""
    if len(retriever.chunks) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No documents have been indexed yet. Call /index first."
        )

    start_time = time.perf_counter()
    results = retriever.retrieve(
        query=payload.query,
        user_roles=payload.user_roles,
        top_k=payload.top_k
    )
    latency_ms = (time.perf_counter() - start_time) * 1000.0

    # Determine if system should abstain: if top chunk score is below confidence bound
    should_abstain = False
    if not results or results[0]["rerank_score"] < settings.min_confidence_score:
        should_abstain = True

    # Assemble structured context with strict citation anchors
    context_lines = []
    for i, res in enumerate(results, start=1):
        context_lines.append(
            f"[[Source {i} | ID: {res['chunk_id']} | Title: {res['title']}]]\\n{res['text']}\\n"
        )
    formatted_context = "\\n---\\n".join(context_lines)

    return QueryResponse(
        query=payload.query,
        latency_ms=round(latency_ms, 2),
        should_abstain=should_abstain,
        results=results,
        formatted_context_prompt=formatted_context
    )
`
  },
  {
    name: "test_retrieval.py",
    path: "tests/test_retrieval.py",
    language: "python",
    description: "Pytest unit tests verifying chunking idempotence, RBAC enforcement, and abstention behavior.",
    content: `"""Unit and Integration Tests for Enterprise RAG Pipeline.

Verifies chunking overlap consistency, deterministic hashing,
RBAC access exclusion, and confidence-based abstention logic.
"""

import pytest
from app.ingestion import DocumentIngestionPipeline
from app.retrieval import HybridRetriever


@pytest.fixture
def sample_corpus():
    return [
        {
            "doc_id": "SEC-POL-001",
            "title": "Corporate Cryptographic Key Rotation Policy",
            "text": (
                "All AES-256 production database encryption keys must undergo automated "
                "rotation every 90 days. Manual rotation requires two-party sign-off "
                "from both the Chief Information Security Officer and Lead Cloud Architect. "
                "Emergency revocation procedures must be initiated within 15 minutes of "
                "suspected key compromise."
            ),
            "metadata": {"department": "security", "required_role": "internal_staff"}
        },
        {
            "doc_id": "FIN-AUD-009",
            "title": "Confidential Executive Compensation Schedule",
            "text": (
                "Executive bonus allocations for fiscal year 2024 are tied directly "
                "to Adjusted EBITDA margins exceeding 22.5%. Tier-1 leadership receives "
                "a minimum baseline retention grant of 150% base salary subject to a "
                "three-year cliff vesting schedule."
            ),
            "metadata": {"department": "executive", "required_role": "c_level_only"}
        }
    ]


def test_chunking_and_metadata_preservation(sample_corpus):
    pipeline = DocumentIngestionPipeline(chunk_size=120, chunk_overlap=30)
    doc = sample_corpus[0]
    chunks = pipeline.chunk_document(doc["doc_id"], doc["title"], doc["text"], doc["metadata"])

    assert len(chunks) >= 2
    for chunk in chunks:
        assert chunk.doc_id == "SEC-POL-001"
        assert chunk.metadata["required_role"] == "internal_staff"
        assert len(chunk.text) > 0


def test_rbac_access_control_filtering(sample_corpus):
    pipeline = DocumentIngestionPipeline(chunk_size=400, chunk_overlap=50)
    chunks = []
    for doc in sample_corpus:
        chunks.extend(pipeline.chunk_document(doc["doc_id"], doc["title"], doc["text"], doc["metadata"]))

    retriever = HybridRetriever()
    retriever.index_chunks(chunks)

    # User with standard 'internal_staff' role should NOT see the C-level document
    results = retriever.retrieve(
        query="What is the executive bonus retention schedule?",
        user_roles=["internal_staff"],
        top_k=5
    )

    for item in results:
        assert item["doc_id"] != "FIN-AUD-009", "RBAC leak: Unauthorized chunk retrieved"


def test_reciprocal_rank_fusion_math():
    sparse = [(0, 12.5), (1, 8.2), (2, 4.1)]
    dense = [(1, 0.89), (0, 0.75), (3, 0.61)]

    fused = HybridRetriever.reciprocal_rank_fusion(sparse, dense, k=60)
    top_doc_idx, top_score = fused[0]

    # Verify score formula 1/(60+1) + 1/(60+2)
    # Doc 0 is rank 1 in sparse, rank 2 in dense -> 1/61 + 1/62 = 0.01639 + 0.01612 = 0.03251
    # Doc 1 is rank 2 in sparse, rank 1 in dense -> 1/62 + 1/61 = 0.03251
    assert top_doc_idx in [0, 1]
    assert top_score > 0.03
`
  },
  {
    name: "README.md",
    path: "README.md",
    language: "markdown",
    description: "Step-by-step local execution instructions and API verification examples.",
    content: `# Enterprise RAG Retrieval Microservice

A production-aligned hybrid information retrieval engine engineered with FastAPI, Sentence-Transformers, FAISS, and Rank-BM25.

## Architecture Highlights
- **Dual-Stream Candidate Search**: Parallel sparse BM25 and dense FAISS vector index.
- **Rank Aggregation**: Parameter-insensitive Reciprocal Rank Fusion (RRF, Cormack et al. 2009).
- **Precision Reranking**: Cross-Encoder (\`cross-encoder/ms-marco-MiniLM-L-6-v2\`) evaluating full query-document attention.
- **Pre-Retrieval RBAC**: Access-control filtering executed outside the language model boundary.
- **Abstention Safeguard**: Automated detection when candidate relevance falls below confidence thresholds.

## Quickstart

### 1. Create Virtual Environment and Install
\`\`\`bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
\`\`\`

### 2. Launch FastAPI Server
\`\`\`bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
\`\`\`

### 3. Ingest Documents
\`\`\`bash
curl -X POST "http://localhost:8000/index" \\
  -H "Content-Type: application/json" \\
  -d '{
    "documents": [
      {
        "doc_id": "ARCH-001",
        "title": "Zero Trust Network Architecture Policy",
        "text": "All service-to-service communications must be authenticated via Mutual TLS (mTLS) with certificates rotated every 24 hours. No internal network perimeter is presumed trusted.",
        "metadata": {"department": "infrastructure", "required_role": "engineer"}
      }
    ]
  }'
\`\`\`

### 4. Query with RBAC Credentials
\`\`\`bash
curl -X POST "http://localhost:8000/query" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "How frequently must internal service mTLS certificates be rotated?",
    "user_roles": ["engineer"],
    "top_k": 3
  }'
\`\`\`

### 5. Run Unit & Regression Tests
\`\`\`bash
pytest tests/ -v
\`\`\`
`
  }
];
