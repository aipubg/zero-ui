import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Zap,
  Play,
  Pause,
  Clock,
  Calendar,
  Plus,
  CheckCircle,
  AlertTriangle,
  RotateCw,
  Terminal,
  ArrowRight
} from "lucide-react";

export const ZeroAutomationsScreen = () => {
  const { theme } = useZero();
  const [automations, setAutomations] = useState([
    {
      id: "auto-1",
      name: "Daily Research Digest",
      trigger: "Cron: Every day at 09:00",
      target: "Researcher Agent",
      status: "Active",
      lastRun: "Today, 09:00 (Success)",
      nextRun: "In 14m",
      description: "Aggregates new AI publications across arXiv and posts a concise executive summary to the scratchpad."
    },
    {
      id: "auto-2",
      name: "Workspace Artifact Deduplication",
      trigger: "Cron: Every 6 hours",
      target: "Organizer Agent",
      status: "Active",
      lastRun: "2h ago (Success)",
      nextRun: "In 4h",
      description: "Scans project folders, indexes new binary media, and cleans orphaned temporary caches."
    },
    {
      id: "auto-3",
      name: "Nightly Desktop Backup & Health Audit",
      trigger: "Cron: Every day at 02:00",
      target: "Builder Agent",
      status: "Active",
      lastRun: "Yesterday, 02:00 (Success)",
      nextRun: "Tonight at 02:00",
      description: "Verifies SQLite and ChromaDB memory integrity and syncs configuration backups."
    },
    {
      id: "auto-4",
      name: "Live Discord Webhook Sync",
      trigger: "Event: On Task Error or Alert",
      target: "Gateway Webhook",
      status: "Paused",
      lastRun: "3 days ago",
      nextRun: "Standby",
      description: "Dispatches high-priority system alerts and completion pings to designated communication channels."
    }
  ]);

  const toggleAuto = (id) => {
    sound.select();
    setAutomations(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status: a.status === "Active" ? "Paused" : "Active" } : a
      )
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col pt-4 pb-6 px-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Automations & Background Schedules
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                4 CONFIGURED · 3 ACTIVE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Autonomous cron schedules, event triggers, and recurring agent workflows.
            </p>
          </div>
        </div>

        <button
          onClick={() => sound.select()}
          className="px-4 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-2 cursor-pointer shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 100%)`
          }}
        >
          <Plus className="w-4 h-4" />
          <span>New Scheduled Workflow</span>
        </button>
      </div>

      {/* Main List */}
      <div className="flex-1 zero-glass-panel rounded-3xl p-6 border border-slate-800 mt-5 overflow-y-auto shadow-2xl space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
          <span>SCHEDULED WORKFLOWS ({automations.length})</span>
          <span className="text-emerald-400">Gateway Scheduler Active</span>
        </div>

        <div className="space-y-3">
          {automations.map((auto) => (
            <div
              key={auto.id}
              className={`p-4 rounded-2xl border transition-all space-y-3 ${
                auto.status === "Active"
                  ? "bg-slate-900/60 border-slate-800 hover:border-emerald-500/50"
                  : "bg-slate-950/40 border-slate-800/80 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-slate-100">{auto.name}</h4>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        auto.status === "Active"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {auto.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 font-sans">{auto.description}</p>
                </div>

                <button
                  onClick={() => toggleAuto(auto.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {auto.status === "Active" ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-300" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Resume</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Trigger: <strong className="text-slate-200">{auto.trigger}</strong></span>
                <span>Target: <strong className="text-cyan-300">{auto.target}</strong></span>
                <span>Next Run: <strong className="text-emerald-400">{auto.nextRun}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
