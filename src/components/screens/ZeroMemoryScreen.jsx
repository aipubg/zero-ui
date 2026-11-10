import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Brain,
  Search,
  Filter,
  Trash2,
  Clock,
  Sparkles,
  Database,
  Layers,
  Network,
  Share2,
  Tag
} from "lucide-react";

export const ZeroMemoryScreen = () => {
  const { theme } = useZero();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const memoryLayers = [
    { id: "all", label: "All Layers", count: "3,842 items" },
    { id: "episodic", label: "Episodic (Chat & Sessions)", count: "1,420 items" },
    { id: "semantic", label: "Semantic Knowledge Base", count: "1,240 items" },
    { id: "procedural", label: "Procedural (Skills & Automations)", count: "380 items" },
    { id: "preferences", label: "Owner Preferences & Identity", count: "182 items" },
    { id: "relationships", label: "Entities & Graph Relations", count: "620 nodes" }
  ];

  const memoryItems = [
    {
      id: "mem-1",
      layer: "preferences",
      title: "UI Design Preference: Living Observatory over Flat Cards",
      summary: "Owner prefers cosmic, moonlit fantasy-observatory aesthetics with central 3D holographic anime AI and plush robot companion. Dislikes bulky rectangular cards.",
      timestamp: "Today, 10:14 PM",
      relevance: "99%",
      tags: ["design", "living-observatory", "preferences"]
    },
    {
      id: "mem-2",
      layer: "semantic",
      title: "Active Model Fabric Configuration",
      summary: "Routing prioritized to Nemotron 3.5 Lightning on local Gateway with Gemini 2.5 Pro and Claude 3.7 Sonnet for complex coding synthesis.",
      timestamp: "Today, 08:30 PM",
      relevance: "96%",
      tags: ["models", "routing", "gateway"]
    },
    {
      id: "mem-3",
      layer: "procedural",
      title: "Computer Control Hold Protocol",
      summary: "Requires user observation preview and permission guard token before executing mouse clicks or keyboard entry.",
      timestamp: "Yesterday, 11:20 PM",
      relevance: "92%",
      tags: ["computer-control", "safety", "hold-token"]
    },
    {
      id: "mem-4",
      layer: "episodic",
      title: "Discussion on Orbital Capability Nodes",
      summary: "User instructed that orbit should use luminous thin-ring circular nodes, light trails, and avoid large floating rounded boxes.",
      timestamp: "Yesterday, 04:15 PM",
      relevance: "89%",
      tags: ["orbit", "navigation", "ui-feedback"]
    }
  ];

  const filtered = memoryItems.filter(item => {
    const matchesCategory = activeCategory === "all" || item.layer === activeCategory;
    const matchesQuery = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="relative w-full h-full flex flex-col pt-16 pb-6 px-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Cognitive Memory & Knowledge Graph
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                8 LAYERS · 12.4 GB ACTIVE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Persistent contextual embeddings, episodic interactions, and entity relations across sessions.
            </p>
          </div>
        </div>

        {/* Global Memory Search */}
        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search remembered context..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Main Split Layout: Memory Layers Nav & Memory Timeline Cards */}
      <div className="flex-1 grid grid-cols-4 gap-6 pt-5 overflow-hidden">
        {/* Layer Selector */}
        <div className="col-span-1 zero-glass-panel rounded-3xl p-4 border border-slate-800 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800">
            COGNITIVE LAYERS
          </div>

          {memoryLayers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => {
                sound.select();
                setActiveCategory(layer.id);
              }}
              className={`w-full text-left p-3 rounded-2xl text-xs transition-all flex flex-col gap-0.5 ${
                activeCategory === layer.id
                  ? "bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-semibold shadow-md"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{layer.label}</span>
                {activeCategory === layer.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </div>
              <span className="text-[10px] font-mono text-slate-500">{layer.count}</span>
            </button>
          ))}
        </div>

        {/* Memory Cards Stream */}
        <div className="col-span-3 zero-glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between overflow-hidden shadow-2xl">
          <div className="space-y-4 overflow-y-auto pr-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
              <span>SHOWING {filtered.length} EMBEDDED MEMORIES</span>
              <span className="text-cyan-400">Auto-Vectorized</span>
            </div>

            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-colors space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                      Relevance {item.relevance}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{item.timestamp}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.summary}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 flex items-center gap-1"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Semantic Vector Database: ChromaDB + SQLite</span>
            <button
              onClick={() => sound.hover()}
              className="text-cyan-400 hover:underline"
            >
              Export Memory Snapshot (.json)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
