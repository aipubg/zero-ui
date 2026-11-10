import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Search,
  Globe,
  FileText,
  Bookmark,
  ExternalLink,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Copy
} from "lucide-react";

export const ZeroSearchScreen = () => {
  const { theme } = useZero();
  const [query, setQuery] = useState("Quantum Computing benchmarks in Frontier LLMs 2026");
  const [searching, setSearching] = useState(false);

  const results = [
    {
      title: "arXiv:2603.11904 — Autonomous Reasoning Frontiers in Hybrid Architectures",
      source: "arxiv.org/abs/2603.11904",
      date: "Nov 2026",
      snippet: "Comprehensive evaluation of 14 reasoning model backbones on complex symbolic verification and computer-use agent tasks.",
      badge: "High Credibility"
    },
    {
      title: "DeepMind AlphaReasoning: Formal Mathematical Synthesis at Scale",
      source: "deepmind.google/research/alphareasoning",
      date: "Oct 2026",
      snippet: "Demonstrating 94.2% on olympiad-grade formal proofs with continuous test-time compute scaling.",
      badge: "Verified"
    },
    {
      title: "ZERO OS Memory Architecture: Hierarchical Cognitive Embeddings",
      source: "zero-system/docs/memory-hierarchy",
      date: "Local Doc",
      snippet: "Design specification for 8-layer cognitive persistence across episodic sessions and autonomous background agents.",
      badge: "Local Knowledge"
    }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    sound.select();
    setSearching(true);
    setTimeout(() => setSearching(false), 800);
  };

  return (
    <div className="relative w-full h-full flex flex-col pt-16 pb-6 px-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Deep Research & Web Intelligence
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                MULTI-SOURCE CRAWLER
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Autonomous research agent with real-time web search, document synthesis, and citation verification.
            </p>
          </div>
        </div>
      </div>

      {/* Main Search Omnibar */}
      <div className="pt-5 pb-4">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <Globe className="absolute left-4 w-5 h-5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter research topic, question, or file search query..."
            className="w-full pl-12 pr-32 py-3 rounded-2xl zero-glass-panel border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-medium"
          />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2 rounded-xl text-xs font-bold text-black cursor-pointer shadow-md"
            style={{
              background: `linear-gradient(135deg, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 100%)`
            }}
          >
            {searching ? "Crawling..." : "Deep Search"}
          </button>
        </form>
      </div>

      {/* Search Results & Live Synthesis Notes */}
      <div className="flex-1 grid grid-cols-3 gap-6 overflow-hidden">
        {/* Results List */}
        <div className="col-span-2 zero-glass-panel rounded-3xl p-5 border border-slate-800 space-y-4 overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
            <span>SYNTHESIZED RESULTS (3 CITATIONS)</span>
            <span className="text-emerald-400">Semantic Reranker Active</span>
          </div>

          {results.map((res, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-sm font-bold text-slate-100 hover:text-cyan-300 cursor-pointer flex items-center gap-1.5">
                  <span>{res.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 shrink-0">
                  {res.badge}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{res.snippet}</p>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                <span>{res.source}</span>
                <span>{res.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Synthesis Scratchpad */}
        <div className="col-span-1 zero-glass-panel rounded-3xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-300 font-semibold border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>AI Research Scratchpad</span>
              </div>
              <span className="text-cyan-400">Live</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans space-y-2">
              <p>
                <strong>Key Synthesis:</strong> 2026 reasoning breakthroughs focus on dynamic test-time search and multi-agent verification topologies.
              </p>
              <p className="text-slate-400 text-[11px]">
                Zero's integrated Gateway provides automatic fallback routing between local latency-critical agents and cloud frontier reasoners.
              </p>
            </div>
          </div>

          <button
            onClick={() => sound.select()}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span>Save to Persistent Memory</span>
          </button>
        </div>
      </div>
    </div>
  );
};
