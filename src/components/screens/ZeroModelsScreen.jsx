import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Cpu,
  CheckCircle,
  Search,
  Sliders,
  Sparkles,
  Zap,
  Globe,
  HardDrive,
  Check,
  ShieldCheck,
  Activity
} from "lucide-react";

export const ZeroModelsScreen = () => {
  const { theme, activeModel, setActiveModel } = useZero();
  const [selectedProvider, setSelectedProvider] = useState("all");

  const providers = [
    { id: "all", name: "All Providers", count: "14 Models" },
    { id: "local", name: "Local Gateway (Ollama/vLLM)", count: "4 Models" },
    { id: "nvidia", name: "NVIDIA NIM", count: "2 Models" },
    { id: "anthropic", name: "Anthropic Claude", count: "3 Models" },
    { id: "openai", name: "OpenAI", count: "3 Models" },
    { id: "google", name: "Google Gemini", count: "2 Models" }
  ];

  const models = [
    {
      id: "nemotron-3.5-lightning",
      name: "Nemotron 3.5 Lightning",
      provider: "nvidia",
      providerName: "NVIDIA NIM · Local Gateway",
      context: "128k Tokens",
      latency: "14ms",
      speed: "42 tok/s",
      badge: "Primary Fast Router",
      type: "Local / Cloud Hybrid",
      strengths: "Fast conversational responses, intent parsing, subagent tool dispatching"
    },
    {
      id: "zero-core-v3",
      name: "ZERO-1 Core Omniscient",
      provider: "local",
      providerName: "ZERO Native Architecture",
      context: "256k Tokens",
      latency: "28ms",
      speed: "35 tok/s",
      badge: "System Default",
      type: "Native Cognitive Model",
      strengths: "Computer control, high-order planning, memory synthesis"
    },
    {
      id: "claude-3-7-sonnet",
      name: "Claude 3.7 Sonnet (Hybrid)",
      provider: "anthropic",
      providerName: "Anthropic Cloud Fabric",
      context: "200k Tokens",
      latency: "240ms",
      speed: "65 tok/s",
      badge: "Coding Specialist",
      type: "Frontier Cloud API",
      strengths: "Rigorous software engineering, complex system architecture, long reasoning"
    },
    {
      id: "gpt-4o",
      name: "GPT-4o Omnimodal",
      provider: "openai",
      providerName: "OpenAI Cloud API",
      context: "128k Tokens",
      latency: "190ms",
      speed: "80 tok/s",
      badge: "Vision Engine",
      type: "Frontier Cloud API",
      strengths: "Image recognition, screen perception, data tables parsing"
    },
    {
      id: "gemini-2.5-pro",
      name: "Gemini 2.5 Pro",
      provider: "google",
      providerName: "Google DeepMind",
      context: "1M Tokens",
      latency: "320ms",
      speed: "75 tok/s",
      badge: "Massive Context",
      type: "Frontier Cloud API",
      strengths: "Repository-scale codebase ingestion, full document libraries, video comprehension"
    },
    {
      id: "deepseek-r1-local",
      name: "DeepSeek R1 Distill Qwen 32B",
      provider: "local",
      providerName: "Local Gateway · vLLM",
      context: "64k Tokens",
      latency: "45ms",
      speed: "28 tok/s",
      badge: "Offline Math & Logic",
      type: "Local Offline GPU",
      strengths: "Autonomous mathematical verification, private local processing"
    }
  ];

  const filtered = models.filter(m => selectedProvider === "all" || m.provider === selectedProvider);

  return (
    <div className="relative w-full h-full flex flex-col pt-16 pb-6 px-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Model Fabric & Gateway Routing
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                5 PROVIDERS · 14 MODELS READY
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Unified model router supporting local offline inference and cloud frontier reasoners with auto-failover.
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full zero-glass-pill border border-emerald-500/30 text-xs font-mono text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Route: {activeModel}</span>
        </div>
      </div>

      {/* Main Split Layout: Providers Filter & Models Grid */}
      <div className="flex-1 grid grid-cols-4 gap-6 pt-5 overflow-hidden">
        {/* Providers Sidebar */}
        <div className="col-span-1 zero-glass-panel rounded-3xl p-4 border border-slate-800 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800">
            PROVIDER FABRIC
          </div>

          {providers.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                sound.select();
                setSelectedProvider(p.id);
              }}
              className={`w-full text-left p-3 rounded-2xl text-xs transition-all flex flex-col gap-0.5 ${
                selectedProvider === p.id
                  ? "bg-amber-500/20 border border-amber-400 text-amber-200 font-semibold shadow-md"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{p.name}</span>
                {selectedProvider === p.id && (
                  <Check className="w-3.5 h-3.5 text-amber-300" />
                )}
              </div>
              <span className="text-[10px] font-mono text-slate-500">{p.count}</span>
            </button>
          ))}
        </div>

        {/* Models Grid */}
        <div className="col-span-3 zero-glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between overflow-hidden shadow-2xl">
          <div className="space-y-4 overflow-y-auto pr-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
              <span>AVAILABLE MODELS ({filtered.length})</span>
              <span className="text-cyan-400">Zero Gateway Routing Active</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {filtered.map((model) => {
                const isActive = activeModel === model.id;
                return (
                  <div
                    key={model.id}
                    onClick={() => {
                      sound.select();
                      setActiveModel(model.id);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                      isActive
                        ? "bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_var(--zero-glow)]"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-slate-400">
                            {model.providerName}
                          </span>
                          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2 mt-0.5">
                            {model.name}
                            {isActive && (
                              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            )}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {model.badge}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">
                        {model.strengths}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Context: {model.context}</span>
                      <span>Latency: {model.latency}</span>
                      <span className={isActive ? "text-cyan-300 font-bold" : "text-slate-500"}>
                        {isActive ? "ACTIVE ROUTE" : "Click to Select"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Dynamic Temperature & Top-P calibrated per task</span>
            <span className="text-emerald-400">Auto Fallback: ON</span>
          </div>
        </div>
      </div>
    </div>
  );
};
