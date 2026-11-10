import React from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Activity,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Bot,
  ExternalLink,
  ShieldCheck,
  Zap,
  Radio,
  Sliders
} from "lucide-react";

export const ZeroLiveOperations = () => {
  const {
    liveOpsOpen,
    setLiveOpsOpen,
    liveOpsTab,
    setLiveOpsTab,
    tasks,
    theme,
    navigateTo,
    runtimeMode,
    setRuntimeMode
  } = useZero();

  const handleToggle = () => {
    sound.select();
    setLiveOpsOpen(!liveOpsOpen);
  };

  // If collapsed: render the sleek floating indicator orb
  if (!liveOpsOpen) {
    return (
      <button
        onClick={handleToggle}
        className="fixed right-5 top-20 z-30 flex items-center gap-2.5 px-3 py-2 rounded-full zero-glass-panel border group cursor-pointer shadow-2xl hover:scale-105 transition-all"
        style={{
          borderColor: theme.accentPrimary,
          boxShadow: `0 0 20px ${theme.glow}`
        }}
        title="Expand Live Operations & Telemetry"
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
    <aside
      className="fixed right-4 top-20 bottom-8 w-80 z-30 flex flex-col justify-between zero-glass-panel rounded-3xl p-4 shadow-2xl select-none border backdrop-blur-3xl animate-in slide-in-from-right duration-300"
      style={{
        borderColor: theme.border,
        boxShadow: `0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)`
      }}
    >
      {/* Header & Tabs */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h2 className="text-xs font-bold tracking-wider font-mono uppercase text-slate-100">
              Live Operations
            </h2>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-600/50 text-amber-300">
              {runtimeMode.toUpperCase()}
            </span>
            <button
              onClick={handleToggle}
              className="p-1 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Collapse Operations Panel"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 mt-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          {[
            { id: "tasks", label: "Tasks", count: tasks.filter(t => t.status === "running").length },
            { id: "computer", label: "Computer", count: "Live" },
            { id: "system", label: "System", count: "98%" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.select();
                setLiveOpsTab(tab.id);
              }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                liveOpsTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] font-mono opacity-80">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3">
        {/* TAB 1: TASKS */}
        {liveOpsTab === "tasks" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>ACTIVE DELEGATIONS</span>
              <button
                onClick={() => navigateTo("agents")}
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>

            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {task.title}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      task.status === "running"
                        ? "bg-cyan-950 text-cyan-300 border border-cyan-800"
                        : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                    }`}
                  >
                    {task.progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${task.progress}%`,
                      background:
                        task.status === "running"
                          ? `linear-gradient(90deg, ${theme.accentPrimary}, ${theme.accentSecondary})`
                          : "#10b981",
                      boxShadow: `0 0 8px ${theme.glow}`
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Agent: {task.agent}</span>
                  <span>{task.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: COMPUTER */}
        {liveOpsTab === "computer" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>DESKTOP SUPERVISION</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>

            {/* Desktop Preview Card */}
            <div
              onClick={() => navigateTo("computer")}
              className="group relative rounded-2xl overflow-hidden border border-slate-700/80 bg-black aspect-video cursor-pointer"
            >
              <img
                src="/assets/ref-original-system.jpg"
                alt="Live Computer Stream"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-2.5">
                <div>
                  <div className="text-xs font-bold text-white">Display 1</div>
                  <div className="text-[10px] font-mono text-slate-300">1920 × 1080 · 60fps</div>
                </div>
                <button
                  className="px-2 py-1 rounded-lg bg-cyan-500/80 text-black text-[10px] font-bold group-hover:bg-cyan-400 transition-colors"
                >
                  Inspect
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Hold Bridge:</span>
                <span className="text-emerald-400 font-mono font-medium">Ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Screen OCR:</span>
                <span className="text-cyan-300 font-mono font-medium">120ms Latency</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Window in Focus:</span>
                <span className="text-slate-200 font-mono font-medium">Visual Studio Code</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM */}
        {liveOpsTab === "system" && (
          <div className="space-y-3">
            <div className="text-[11px] font-mono text-slate-400 uppercase">
              HARDWARE & GATEWAY TELEMETRY
            </div>

            {/* System Dial Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-1">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>CPU LOAD</span>
                </div>
                <div className="text-lg font-bold font-mono text-cyan-200">18%</div>
                <div className="w-full h-1 rounded-full bg-slate-800 mt-1">
                  <div className="h-full bg-cyan-400 rounded-full w-[18%]" />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-1">
                  <Activity className="w-3 h-3 text-purple-400" />
                  <span>RAM USAGE</span>
                </div>
                <div className="text-lg font-bold font-mono text-purple-200">6.2 / 16 GB</div>
                <div className="w-full h-1 rounded-full bg-slate-800 mt-1">
                  <div className="h-full bg-purple-400 rounded-full w-[38%]" />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-1">
                  <HardDrive className="w-3 h-3 text-amber-400" />
                  <span>STORAGE</span>
                </div>
                <div className="text-lg font-bold font-mono text-amber-200">68% Full</div>
                <div className="w-full h-1 rounded-full bg-slate-800 mt-1">
                  <div className="h-full bg-amber-400 rounded-full w-[68%]" />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-1">
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span>NETWORK</span>
                </div>
                <div className="text-xs font-bold font-mono text-emerald-200">↓ 12.4 MB/s</div>
                <div className="text-[10px] font-mono text-slate-400">↑ 3.8 MB/s</div>
              </div>
            </div>

            {/* Health Verification */}
            <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-emerald-200">All Systems Operational</div>
                <div className="text-[10px] text-slate-400 font-mono">Gateway Protocol v3.8 · 0 Errors</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer System Health Badge */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>GATEWAY HEALTH</span>
        <span className="text-emerald-400 font-semibold">98% OPTIMAL</span>
      </div>
    </aside>
  );
};
