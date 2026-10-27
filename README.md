# Beyond the Chatbot: Engineering Reliable Retrieval-Augmented Generation (RAG) Systems for Enterprise AI

A publication-ready, research-backed technical blog and engineering portfolio website authored by **Jiten Moni Das**, specializing in enterprise Retrieval-Augmented Generation (RAG), LLM systems engineering, and distributed data architecture.

This repository features an in-depth 3,250-word technical article, interactive 10-stage RAG architecture explorer, side-by-side retrieval trade-offs matrix, live hybrid retrieval and RBAC simulator, interactive algorithmic engineering graphics, and a complete reproducible Python reference implementation (FastAPI, Sentence-Transformers, FAISS, BM25, and Pytest).

---

## 🌟 Key Features

1. **Publication-Ready Technical Article:**
   - 13 comprehensive sections covering parametric vs. non-parametric memory, ingestion pipelines, chunking boundaries, hybrid retrieval, Cross-Encoder reranking, Ragas evaluation, and OWASP LLM security.
   - 10 verified primary literature citations with direct arXiv preprints and DOIs (Lewis et al. 2020, Karpukhin et al. 2020, Robertson 2009, Cormack 2009, Es et al. 2023, Liu et al. 2024, etc.).
   - Table of contents with live heading filter and estimated reading times.

2. **Interactive RAG Architecture Explorer:**
   - Decoupled Offline Ingestion Plane, Synchronous Online Inference Plane, and Observability Plane.
   - Click-to-inspect pipeline stages with latency budgets, underlying technologies, real-world failure modes, and engineering mitigations.
   - Dual-view Mermaid architecture flowchart (interactive visual diagram + copyable raw Mermaid syntax).

3. **Retrieval Strategies Comparison Matrix:**
   - Interactive side-by-side evaluation of Lexical BM25, Dense Vector (Bi-Encoder), Hybrid Search with Reciprocal Rank Fusion (RRF), Metadata Pre-filtering, Cross-Encoder Reranking, and Hypothetical Document Embeddings (HyDE).

4. **Live RAG Simulator & Playground:**
   - Test natural language queries against realistic enterprise regulatory and architecture documents.
   - Compare BM25, Dense Vector, RRF Hybrid, and Cross-Encoder scoring in real time.
   - Test RBAC clearance levels (Analyst, Compliance Officer, C-Suite Executive).
   - Detect direct and indirect prompt injection attacks (OWASP LLM01) and inspect assembled zero-hallucination XML context prompts.

5. **Reproducible Python Microservice Codebase:**
   - Tabbed source code viewer for `requirements.txt`, `app/config.py`, `app/ingestion.py`, `app/retrieval.py`, `app/main.py`, and `tests/test_retrieval.py`.
   - Syntax-highlighted code with line numbers and one-click copy and download functionality.

6. **AI/ML Systems Engineering Graphics & Algorithmic Blueprints:**
   - Interactive SVG-based technical architecture visualizations.
   - Multi-layer HNSW graph hierarchy ($O(\log N)$ skip-list beam search and `efSearch` dynamics).
   - Bi-Encoder vector dot-product vs. Cross-Encoder full self-attention token interaction heatmaps.
   - Reciprocal Rank Fusion (RRF) decay curves showing reciprocal rank weighting across varying $k \in \{20, 60, 100\}$.
   - Synchronous inference latency budget breakdown bar satisfying strict P95 $< 750$ms SLA.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4 + Lucide React Icons
- **Deployment Platform:** Vercel (Static Web Architecture with SPA Rewrites)
- **Zero-Dependency Code Highlighting:** Native tokenized highlighting for Python, Bash, and JSON without heavy external dependencies.
- **Microservice Reference Implementation:** Python 3.11+, FastAPI, Sentence-Transformers (`all-MiniLM-L6-v2`), FAISS-CPU (`IndexFlatIP`), Rank-BM25, and Pytest.

---

## 📁 Repository Directory Structure

```text
rag-engineering-enterprise-ai/
├── .env.example              # Environment variables template
├── ARTICLE.md                # Full standalone article in Markdown (~3,250 words)
├── index.html                # HTML entry point with OpenGraph, Twitter & Schema.org metadata
├── metadata.json             # AI Studio applet metadata
├── package.json              # Project scripts and dependencies
├── tsconfig.json             # TypeScript compiler configuration
├── vercel.json               # Vercel deployment routing, SPA rewrites & security headers
├── vite.config.ts            # Vite configuration with Tailwind CSS plugin and path aliases
├── src/
│   ├── App.tsx               # Root application router with popstate and 404 handling
│   ├── main.tsx              # React DOM entry point
│   ├── index.css             # Tailwind CSS imports
│   ├── components/
│   │   ├── ArchitectureDiagram.tsx       # 10-stage RAG pipeline explorer
│   │   ├── ArticleView.tsx               # Technical article reader & Table of Contents
│   │   ├── CodeExplorer.tsx              # Python repository file browser
│   │   ├── EngineeringVisuals.tsx        # HNSW, cross-attention, RRF & latency visuals
│   │   ├── InteractiveRAGPlayground.tsx  # Hybrid retrieval & RBAC simulator
│   │   ├── Navbar.tsx                    # Header with mobile drawer & GitHub repo link
│   │   ├── RetrievalMatrix.tsx           # Side-by-side retrieval trade-offs
│   │   └── VisualMermaidFlow.tsx         # Dual visual / raw Mermaid architecture
│   ├── data/
│   │   ├── articleContent.ts             # 13 article sections and publication metadata
│   │   ├── citations.ts                  # Primary literature citations & retrieval matrix
│   │   ├── codeFiles.ts                  # Production Python reference implementation
│   │   └── interactiveSimulator.ts       # Synthetic enterprise corpus & RRF scoring engine
│   └── utils/
│       └── codeHighlighter.tsx           # Lightweight Python/Bash/JSON syntax highlighter
```

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js `18.x`, `20.x`, or `22.x`
- npm (bundled with Node.js) or yarn / pnpm / bun

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/jiten54/rag-engineering-enterprise-ai.git
cd rag-engineering-enterprise-ai
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 3. Run Typecheck & Production Build
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 🚀 Vercel Deployment Guide

This project is pre-configured for deployment on **Vercel** via GitHub integration or the Vercel CLI.

### Option A: Deploy via GitHub (Recommended)

1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: configure enterprise RAG blog for Vercel deployment"
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com).
3. Click **"Add New..."** > **"Project"**.
4. Import your `rag-engineering-enterprise-ai` repository.
5. Vercel will automatically detect the **Vite** framework preset using `vercel.json`:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
   - **Node.js Version:** `20.x` (or `22.x`)
6. Click **Deploy**. Your site will be live within ~45 seconds with automated SSL and edge CDN distribution.

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Vercel Configuration Details (`vercel.json`)

The included `vercel.json` ensures:
- **Client-Side SPA Routing:** Direct URL requests (`/article`, `/architecture`, `/matrix`, `/simulator`, `/code`) rewrite to `/index.html`, eliminating 404 errors on page reload.
- **Cache Optimization:** Immutable 1-year caching for static `/assets/*` chunks.
- **Security Headers:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, and `Referrer-Policy: strict-origin-when-cross-origin`.

---

## 🧪 Testing the Python Reference Implementation Locally

To test the accompanying Python FastAPI RAG microservice described in Section 4:

```bash
# 1. Create a virtual environment
python3 -m venv .venv
source .venv/bin/activate

# 2. Install dependencies
pip install fastapi==0.115.6 uvicorn[standard]==0.34.0 sentence-transformers==3.3.1 faiss-cpu==1.9.0.post1 rank-bm25==0.2.2 pytest==8.3.4

# 3. Run unit tests
pytest tests/ -v

# 4. Start the FastAPI microservice
uvicorn app.main:app --port 8000 --reload
```

---

## 👤 Author Profile

- **Author:** Jiten Moni Das
- **Degree:** B.Sc. in Information Technology (Graduated 2024)
- **Specializations:** Python, Machine Learning, Information Retrieval, RAG Architectures, REST APIs, and Data Engineering.
- **Email:** [jitenmoni8@gmail.com](mailto:jitenmoni8@gmail.com)
- **Focus:** Enterprise AI & Distributed Information Retrieval Systems

---

## 📄 License

Apache-2.0 License.
