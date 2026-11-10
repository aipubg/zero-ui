import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Activity,
  CheckCircle,
  Zap,
  Code,
  Box,
  ChevronRight,
  ChevronLeft,
  Bot,
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";

export const ZeroLiveOperations = () => {
  const {
    liveOpsOpen,
    setLiveOpsOpen,
    theme,
    navigateTo
  } = useZero();

  const [activeTab, setActiveTab] = useState("tasks"); // 'tasks' | 'system' | 'activity'

  const handleToggle = () => {
    sound.select();
    setLiveOpsOpen(!liveOpsOpen);
  };

  if (!liveOpsOpen) {
    return (
      <button
        onClick={handleToggle}
        className="fixed right-5 top-18 z-30 flex items-center gap-2.5 px-3.5 py-2 rounded-full border group cursor-pointer shadow-2xl hover:scale-105 transition-all backdrop-blur-2xl"
        style={{
          backgroundColor: "rgba(8, 12, 28, 0.55)",
          borderColor: "rgba(0, 242, 254, 0.4)",
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
        <Activity className="w-3.5 h-3.5 text-cyan-300" />
        <span className="text-xs font-semibold text-slate-200 font-mono tracking-wide">
          Live Ops (3)
        </span>
      </button>
    );
  }

  return (
    <aside
      className="fixed right-5 top-18 w-74 z-30 flex flex-col rounded-3xl p-3.5 select-none pointer-events-auto backdrop-blur-3xl shadow-2xl transition-all duration-300"
      style={{
        backgroundColor: "rgba(8, 12, 28, 0.45)",
        border: "1px solid rgba(147, 197, 253, 0.16)",
        boxShadow: `0 16px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)`
      }}
    >
      {/* Header: Title, Status Pill, Collapse Button */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-100 tracking-wide font-sans">
            Live Operations
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[9px] font-semibold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Connected
          </span>
          <button
            onClick={handleToggle}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Collapse Operations Panel"
          >
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Segmented Tab Controls (Image 1 style: Tasks | System | Intelligence) */}
      <div className="flex items-center gap-1 my-2.5 p-0.5 rounded-xl bg-slate-900/60 border border-slate-800/70 text-[10px] font-medium">
        <button
          onClick={() => { sound.hover(); setActiveTab("tasks"); }}
          className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
            activeTab === "tasks"
              ? "bg-purple-600/40 text-white font-bold border border-purple-400/50 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Tasks (3)
        </button>
        <button
          onClick={() => { sound.hover(); setActiveTab("system"); }}
          className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
            activeTab === "system"
              ? "bg-purple-600/40 text-white font-bold border border-purple-400/50 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          System
        </button>
        <button
          onClick={() => { sound.hover(); setActiveTab("activity"); }}
          className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
            activeTab === "activity"
              ? "bg-purple-600/40 text-white font-bold border border-purple-400/50 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Activity
        </button>
      </div>

      {/* Content Area Based on Active Tab */}
      <div className="flex-1 space-y-3 custom-scrollbar overflow-y-auto max-h-[calc(100vh-270px)] pr-0.5">
        {activeTab === "tasks" && (
          <>
            {/* 3 Active Agents */}
            <div className="space-y-2">
              {/* Agent 1: Researcher */}
              <div
                onClick={() => navigateTo("agents")}
                className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-cyan-400/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px]">🤖</span>
                    <div>
                      <div className="font-semibold text-slate-100 text-[11px] leading-tight group-hover:text-cyan-300 transition-colors">
                        Researcher
                      </div>
                      <div className="text-[9px] text-slate-400 leading-tight">
                        Analyzing AI trends 2026...
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-cyan-300">72%</span>
                </div>
                <div className="w-full h-1 rounded-full bg-slate-950/80 overflow-hidden mt-1.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                    style={{ width: "72%" }}
                  />
                </div>
              </div>

              {/* Agent 2: Organizer */}
              <div
                onClick={() => navigateTo("agents")}
                className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-cyan-400/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px]">🤖</span>
                    <div>
                      <div className="font-semibold text-slate-100 text-[11px] leading-tight group-hover:text-cyan-300 transition-colors">
                        Organizer
                      </div>
                      <div className="text-[9px] text-slate-400 leading-tight">
                        Sorting project files...
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-300">35%</span>
                </div>
                <div className="w-full h-1 rounded-full bg-slate-950/80 overflow-hidden mt-1.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500"
                    style={{ width: "35%" }}
                  />
                </div>
              </div>

              {/* Agent 3: Builder */}
              <div
                onClick={() => navigateTo("agents")}
                className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-cyan-400/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px]">🤖</span>
                    <div>
                      <div className="font-semibold text-slate-100 text-[11px] leading-tight group-hover:text-cyan-300 transition-colors">
                        Builder
                      </div>
                      <div className="text-[9px] text-slate-400 leading-tight">
                        Setting up environment...
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-purple-300">18%</span>
                </div>
                <div className="w-full h-1 rounded-full bg-slate-950/80 overflow-hidden mt-1.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: "18%" }}
                  />
                </div>
              </div>
            </div>

            {/* System Intelligence Vitals (Mini Dials Image 1 & 8 style) */}
            <div className="p-2.5 rounded-xl bg-slate-900/35 border border-slate-800/60 space-y-2">
              <div className="text-[9.5px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                System Intelligence
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="p-1.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                  <div className="text-[11px] font-bold text-cyan-300 font-mono">18%</div>
                  <div className="text-[8.5px] text-slate-400 uppercase tracking-tight">CPU</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                  <div className="text-[11px] font-bold text-purple-300 font-mono">42%</div>
                  <div className="text-[8.5px] text-slate-400 uppercase tracking-tight">RAM</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                  <div className="text-[11px] font-bold text-emerald-300 font-mono">28%</div>
                  <div className="text-[8.5px] text-slate-400 uppercase tracking-tight">GPU</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-800/50">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  ZERO Core: Ready
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Models: 5 Active
                </span>
              </div>
            </div>
          </>
        )}

        {activeTab === "system" && (
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-[11px]">Hardware Vitals</span>
                <span className="text-emerald-400 text-[10px] font-mono">92% Optimal</span>
              </div>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between text-slate-400">
                  <span>Processor</span>
                  <span className="text-slate-200 font-mono">18% · 4.2 GHz</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Memory</span>
                  <span className="text-slate-200 font-mono">6.2 / 16 GB</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Storage</span>
                  <span className="text-slate-200 font-mono">68% Available</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Thermal</span>
                  <span className="text-emerald-300 font-mono">42°C Normal</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-1.5 text-xs">
            <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-200 text-[10.5px]">Memory synchronized</span>
              </div>
              <span className="text-[9.5px] font-mono text-slate-400">2m ago</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-200 text-[10.5px]">Automation executed</span>
              </div>
              <span className="text-[9.5px] font-mono text-slate-400">6m ago</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-slate-200 text-[10.5px]">Project "Zero" updated</span>
              </div>
              <span className="text-[9.5px] font-mono text-slate-400">8m ago</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Box className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-200 text-[10.5px]">Agent task completed</span>
              </div>
              <span className="text-[9.5px] font-mono text-slate-400">12m ago</span>
            </div>
          </div>
        )}
      </div>

      {/* Philosophy Quote Pill at Bottom */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between">
        <p className="text-[10px] italic text-slate-300 font-serif leading-tight">
          “Innovation is a journey, not a destination.”
        </p>
        <span className="text-[9px] font-mono font-bold text-cyan-400 shrink-0 ml-1">
          — ZERO
        </span>
      </div>
    </aside>
  );
};
