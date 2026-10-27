export interface Citation {
  id: string;
  key: string;
  title: string;
  authors: string;
  venueOrPublisher: string;
  year: number;
  url: string;
  summary: string;
}

export const CITATIONS: Citation[] = [
  {
    id: "lewis2020rag",
    key: "[1]",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: "Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, Douwe Kiela",
    venueOrPublisher: "Advances in Neural Information Processing Systems (NeurIPS 2020), arXiv:2005.11401",
    year: 2020,
    url: "https://arxiv.org/abs/2005.11401",
    summary: "Introduced the foundational RAG architecture combining parametric memory (pre-trained seq2seq models) with non-parametric memory (dense vector index via DPR)."
  },
  {
    id: "karpukhin2020dpr",
    key: "[2]",
    title: "Dense Passage Retrieval for Open-Domain Question Answering",
    authors: "Vladimir Karpukhin, Barlas Oğuz, Sewon Min, Patrick Lewis, Ledell Wu, Sergey Edunov, Danqi Chen, Wen-tau Yih",
    venueOrPublisher: "Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP 2020), arXiv:2004.04906",
    year: 2020,
    url: "https://arxiv.org/abs/2004.04906",
    summary: "Demonstrated that dual-encoder dense retrieval out-indexes BM25 by 9-19% top-20 accuracy on open-domain question answering datasets using dot-product scoring."
  },
  {
    id: "robertson2009bm25",
    key: "[3]",
    title: "The Probabilistic Relevance Framework: BM25 and Beyond",
    authors: "Stephen Robertson, Hugo Zaragoza",
    venueOrPublisher: "Foundations and Trends in Information Retrieval, Vol. 3, No. 4, pp. 333-389",
    year: 2009,
    url: "https://doi.org/10.1561/1500000019",
    summary: "The definitive mathematical formulation of BM25 term frequency saturation (k1) and document length normalization (b) in probabilistic information retrieval."
  },
  {
    id: "cormack2009rrf",
    key: "[4]",
    title: "Reciprocal Rank Fusion outperforms Condorcet and individual rank learning methods",
    authors: "Gordon V. Cormack, Charles L. A. Clarke, Stefan Buettcher",
    venueOrPublisher: "Proceedings of the 32nd International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR '09), pp. 758–759",
    year: 2009,
    url: "https://dl.acm.org/doi/10.1145/1571941.1572114",
    summary: "Established Reciprocal Rank Fusion (RRF) as a robust, parameter-insensitive rank aggregation algorithm that merges rankings from distinct retrieval systems without score normalization."
  },
  {
    id: "es2023ragas",
    key: "[5]",
    title: "Ragas: Automated Evaluation of Retrieval Augmented Generation",
    authors: "Shahul Es, Jithin James, Luis Espinosa-Anke, Steven Schockaert",
    venueOrPublisher: "arXiv:2309.15217 (EACL 2024 System Demonstrations)",
    year: 2023,
    url: "https://arxiv.org/abs/2309.15217",
    summary: "Introduced reference-free evaluation metrics for RAG: Faithfulness, Answer Relevance, Context Relevance, and Context Recall using LLM-assisted verification."
  },
  {
    id: "liu2024lost",
    key: "[6]",
    title: "Lost in the Middle: How Language Models Use Long Contexts",
    authors: "Nelson F. Liu, Kevin Lin, John Hewitt, Ashwin Paranjape, Michele Bevilacqua, Fabio Petroni, Percy Liang",
    venueOrPublisher: "Transactions of the Association for Computational Linguistics (TACL), Vol. 12, pp. 157–173, arXiv:2307.03172",
    year: 2024,
    url: "https://arxiv.org/abs/2307.03172",
    summary: "Demonstrated that language model recall degrades significantly when target relevant information is located in the middle of long input contexts (the 'U-shaped recall curve')."
  },
  {
    id: "owasp2025llm",
    key: "[7]",
    title: "OWASP Top 10 for Large Language Model Applications and Generative AI",
    authors: "OWASP Foundation (Led by Steve Wilson, Scott Arbaugh, et al.)",
    venueOrPublisher: "OWASP Standards Publication (v2.0, 2025)",
    year: 2025,
    url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    summary: "Authoritative security guidance identifying LLM01: Prompt Injection, LLM02: Sensitive Information Disclosure, LLM06: Excessive Agency, and LLM08: Vector and Embedding Weaknesses."
  },
  {
    id: "reimers2019sbert",
    key: "[8]",
    title: "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks",
    authors: "Nils Reimers, Iryna Gurevych",
    venueOrPublisher: "Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing (EMNLP 2019), arXiv:1908.10084",
    year: 2019,
    url: "https://arxiv.org/abs/1908.10084",
    summary: "Introduced Siamese and triplet network structures to generate semantically meaningful sentence embeddings that can be compared using cosine similarity at scale."
  },
  {
    id: "malkov2020hnsw",
    key: "[9]",
    title: "Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs",
    authors: "Yu. A. Malkov, D. A. Yashunin",
    venueOrPublisher: "IEEE Transactions on Pattern Analysis and Machine Intelligence, Vol. 42, No. 4, pp. 824-836",
    year: 2020,
    url: "https://doi.org/10.1109/TPAMI.2018.2889473",
    summary: "The foundational mathematical and algorithmic paper describing HNSW graph structures for sub-linear logarithmic approximate nearest neighbor vector indexing."
  },
  {
    id: "khattab2020colbert",
    key: "[10]",
    title: "ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT",
    authors: "Omar Khattab, Matei Zaharia",
    venueOrPublisher: "Proceedings of the 43rd International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR '20), arXiv:2004.12832",
    year: 2020,
    url: "https://arxiv.org/abs/2004.12832",
    summary: "Proposed late-interaction token-level similarity (MaxSim) that retains fine-grained token representations while allowing fast vector pre-computation."
  }
];

export interface RetrievalStrategyComparison {
  name: string;
  mechanism: string;
  strengths: string;
  weaknesses: string;
  latencyImpact: string;
  computeCost: string;
  bestUseCase: string;
}

export const RETRIEVAL_STRATEGIES: RetrievalStrategyComparison[] = [
  {
    name: "Lexical Search (BM25)",
    mechanism: "Term frequency saturation (k1) and inverse document length penalization (b) over an inverted index.",
    strengths: "Exact token matching, handles part numbers, acronyms, code snippets, error codes, zero vector embedding latency.",
    weaknesses: "Vocabulary mismatch problem (cannot map synonyms or semantic intent), sensitive to typos and phrasing variations.",
    latencyImpact: "Very Low (1–5 ms)",
    computeCost: "Negligible (CPU only)",
    bestUseCase: "SKU lookups, legal statute identifiers, exact log/error codes, financial line-item queries."
  },
  {
    name: "Dense Vector Search (DPR / Bi-Encoders)",
    mechanism: "Maps queries and passages into a shared high-dimensional vector space (e.g., 384–1536 dim) with cosine/inner product similarity.",
    strengths: "Captures semantic meaning, synonyms, conceptual analogies, and multilinguality across diverse phrasing.",
    weaknesses: "Can drift on exact tokens, hallucinate relevance on rare identifiers, out-of-domain vocabulary degradation.",
    latencyImpact: "Moderate (15–35 ms including query embedding inference)",
    computeCost: "Moderate (GPU/CPU inference for query embedding + ANN traversal)",
    bestUseCase: "Conceptual natural language queries, advisory questions, unstructured policy interpretation."
  },
  {
    name: "Hybrid Search (BM25 + Dense + RRF)",
    mechanism: "Executes parallel sparse and dense retrievals, normalizing ranks via Reciprocal Rank Fusion: RRF_score = Σ 1/(k + rank_i).",
    strengths: "Mitigates weaknesses of both; ensures exact IDs are retrieved while capturing broad semantic intent.",
    weaknesses: "Requires maintaining two separate index stores; parameter tuning (k factor, dense/sparse weighting).",
    latencyImpact: "Low-to-Moderate (20–40 ms parallel execution)",
    computeCost: "Moderate (Inverted index CPU + Embedding model GPU/CPU)",
    bestUseCase: "General enterprise search, knowledge bases containing both formal nomenclature and conceptual descriptions."
  },
  {
    name: "Metadata Pre-Filtering + Dense ANN",
    mechanism: "Applies Boolean constraints (tenant_id, department, access_level, updated_at) prior to or within graph traversal.",
    strengths: "Guarantees strict tenant isolation, eliminates unauthorized documents before retrieval, shrinks candidate search space.",
    weaknesses: "Standard pre-filtering can cause graph disconnection in poorly configured HNSW (isolated clusters); requires single-stage filtered HNSW.",
    latencyImpact: "Low (5–15 ms additional filtering overhead)",
    computeCost: "Low (Bitset masking or payload lookups)",
    bestUseCase: "Multi-tenant SaaS, RBAC-governed enterprise repositories, time-bounded compliance searches."
  },
  {
    name: "Cross-Encoder Reranking",
    mechanism: "Feeds candidate pairs (query, candidate_chunk) jointly through all transformer layers for deep token cross-attention.",
    strengths: "Highest scoring precision; captures intricate query-context relationships that bi-encoders miss.",
    weaknesses: "High computational complexity O(k * (L_q + L_d)^2); cannot be precomputed; adds significant inference latency.",
    latencyImpact: "High (50–150 ms for top-25 candidate passages)",
    computeCost: "High (Requires dedicated GPU or optimized ONNX runtime)",
    bestUseCase: "Two-stage retrieval pipelines where precision at rank 1–5 directly dictates generation quality."
  },
  {
    name: "Query Rewriting & HyDE",
    mechanism: "Uses an LLM to generate hypothetical answers (HyDE) or decompose complex multi-part queries into sub-queries.",
    strengths: "Bridging the semantic gap between a terse user query and dense, detailed technical passages.",
    weaknesses: "Adds an entire upfront LLM generation step (200–600 ms); risk of propagating hypothetical hallucinations into retrieval.",
    latencyImpact: "Very High (250–800 ms added prior to retrieval)",
    computeCost: "High (LLM prompt tokens + completion tokens)",
    bestUseCase: "Short, ambiguous user prompts or complex multi-hop research questions in expert systems."
  }
];
