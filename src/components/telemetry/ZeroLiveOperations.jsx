import React from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Activity,
  CheckCircle,
  Zap,
  Code,
  Box,
  ChevronRight,
  Sparkles,
  Layers,
  Bot
} from "lucide-react";

export const ZeroLiveOperations = () => {
  const {
    liveOpsOpen,
    setLiveOpsOpen,
    theme,
    navigateTo
  } = useZero();

  const handleToggle = () => {
    sound.select();
    setLiveOpsOpen(!liveOpsOpen);
  };

  if (!liveOpsOpen) {
    return (
      <button
        onClick={handleToggle}
        className="fixed right-5 top-20 z-30 flex items-center gap-2.5 px-3 py-2 rounded-full zero-glass-panel border group cursor-pointer shadow-2xl hover:scale-105 transition-all"
        style={{
          borderColor: theme.accentPrimary,
          boxShadow: `0 0 20px ${theme.glow}`
        }}
        title="Expand Live Operations"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: theme.accentPrimary }}
          />
          <span
            className="relative inline-flex rounded-full h-2.5 w-2.5"
            style={{ backgroundColor: theme.accentPrimary }}
          />
        </span>
        <Activity className="w-4 h-4 text-cyan-300" />
        <span className="text-xs font-semibold text-slate-200 font-mono">
          Live Ops (3)
        </span>
      </button>
    );
  }

  return (
    <aside className="fixed right-6 top-18 w-80 z-30 flex flex-col justify-start gap-3 select-none pointer-events-auto">
      {/* 1. System Overview Card */}
      <div
        onClick={() => {
          sound.select();
          navigateTo("settings");
        }}
        className="zero-glass-panel rounded-2xl p-3.5 border flex items-center justify-between cursor-pointer group hover:border-cyan-400/60 transition-all shadow-xl backdrop-blur-2xl"
        style={{ borderColor: theme.border }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-100 tracking-wide font-sans">
            System Overview
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-semibold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Operational
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* 2. Active Agents Card */}
      <div
        onClick={() => {
          sound.select();
          navigateTo("agents");
        }}
        className="zero-glass-panel rounded-2xl p-4 border flex flex-col gap-3 cursor-pointer group hover:border-cyan-400/60 transition-all shadow-xl backdrop-blur-2xl"
        style={{ borderColor: theme.border }}
      >
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-100 tracking-wide font-sans">
              Active Agents (3/5)
            </h3>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </div>

        <div className="space-y-3">
          {/* Agent 1: Researcher */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-[11px] font-bold">
                  🤖
                </div>
                <div>
                  <div className="font-semibold text-slate-100 text-xs leading-none">Researcher</div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Analyzing AI trends 2026...</div>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-cyan-300">72%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500" style={{ width: "72%" }} />
            </div>
          </div>

          {/* Agent 2: Organizer */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-300 text-[11px] font-bold">
                  🤖
                </div>
                <div>
                  <div className="font-semibold text-slate-100 text-xs leading-none">Organizer</div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Sorting project files...</div>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-cyan-300">35%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500" style={{ width: "35%" }} />
            </div>
          </div>

          {/* Agent 3: Builder */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 text-[11px] font-bold">
                  🤖
                </div>
                <div>
                  <div className="font-semibold text-slate-100 text-xs leading-none">Builder</div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Setting up environment...</div>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-purple-300">18%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" style={{ width: "18%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Recent Activity Card */}
      <div
        className="zero-glass-panel rounded-2xl p-4 border flex flex-col gap-2.5 shadow-xl backdrop-blur-2xl"
        style={{ borderColor: theme.border }}
      >
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-slate-100 tracking-wide font-sans">
              Recent Activity
            </h3>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-200 text-[11px]">Memory synchronized</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">2m ago</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-200 text-[11px]">Automation executed</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">6m ago</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-slate-200 text-[11px]">Project "Zero" updated</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">8m ago</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-200 text-[11px]">Agent task completed</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">12m ago</span>
          </div>
        </div>
      </div>

      {/* 4. Bonsai Philosophy Quote Card */}
      <div
        className="zero-glass-panel rounded-2xl p-4 border flex items-center justify-between shadow-xl backdrop-blur-2xl relative overflow-hidden"
        style={{ borderColor: theme.border }}
      >
        <div className="flex-1 pr-3">
          <p className="text-[11px] italic font-serif leading-relaxed text-slate-200">
            “Innovation is a journey, not a destination.”
          </p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold mt-1">
            — ZERO
          </p>
        </div>

        {/* Luminous Purple Starlight Bonsai Tree */}
        <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 rounded-full blur-md bg-purple-500/25 pointer-events-none" />
          <svg className="w-14 h-14" viewBox="0 0 100 100">
            {/* Ceramic Pot */}
            <path d="M 28 82 L 72 82 L 66 94 L 34 94 Z" fill="#b45309" stroke="#fef08a" strokeWidth="1.5" />
            <rect x="25" y="78" width="50" height="4" rx="2" fill="#d97706" />
            {/* Trunk */}
            <path d="M 50 78 Q 44 64 54 52 Q 62 42 48 34" fill="none" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 52 54 Q 38 46 34 38" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            <path d="M 50 44 Q 62 36 68 28" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            {/* Glowing Violet Foliage Clouds */}
            <circle cx="34" cy="36" r="14" fill="#a855f7" opacity="0.85" filter="drop-shadow(0 0 8px #c084fc)" />
            <circle cx="48" cy="28" r="16" fill="#c084fc" opacity="0.9" filter="drop-shadow(0 0 10px #e879f9)" />
            <circle cx="68" cy="26" r="13" fill="#9333ea" opacity="0.8" filter="drop-shadow(0 0 8px #c084fc)" />
            {/* Sparkling Blossoms */}
            <circle cx="44" cy="24" r="2" fill="#ffffff" />
            <circle cx="56" cy="30" r="2" fill="#fbcfe8" />
            <circle cx="32" cy="34" r="1.5" fill="#ffffff" />
            <circle cx="70" cy="24" r="1.5" fill="#fdf4ff" />
          </svg>
        </div>
      </div>
    </aside>
  );
};
