import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Bot,
  Plus,
  Play,
  Pause,
  Sliders,
  Cpu,
  Sparkles,
  CheckCircle,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Search,
  Terminal
} from "lucide-react";

export const ZeroAgentsScreen = () => {
  const { theme } = useZero();
  const [selectedAgent, setSelectedAgent] = useState("researcher");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const agents = [
    {
      id: "researcher",
      name: "Researcher",
      role: "Knowledge & Intelligence Specialist",
      model: "nemotron-3.5-lightning",
      status: "Working",
      progress: 78,
      currentTask: "Analyzing Q3 AI Frontier Benchmarks across arXiv",
      tools: ["web_search", "paper_crawler", "semantic_embedder", "markdown_synthesizer"],
      icon: Search,
      color: "#00f2fe"
    },
    {
      id: "organizer",
      name: "Organizer",
      role: "Workspace & File Curator",
      model: "nemotron-3.5-lightning",
      status: "Working",
      progress: 35,
      currentTask: "Sorting and deduplicating assets in workspace",
      tools: ["file_indexer", "vector_cluster", "deduplicator"],
      icon: Layers,
      color: "#9d4edd"
    },
    {
      id: "builder",
      name: "Builder",
      role: "Code & Environment Engineer",
      model: "claude-3-7-sonnet",
      status: "Idle",
      progress: 100,
      currentTask: "Waiting for next code generation task",
      tools: ["shell_exec", "code_linter", "git_bridge", "test_runner"],
      icon: Terminal,
      color: "#ffd166"
    },
    {
      id: "operator",
      name: "Operator",
      role: "Autonomous Desktop Supervisor",
      model: "zero-core-v3",
      status: "Idle",
      progress: 0,
      currentTask: "Screen perception ready on Display 1",
      tools: ["screen_capture", "ocr_engine", "mouse_controller", "keyboard_inject"],
      icon: Bot,
      color: "#06d6a0"
    },
    {
      id: "analyst",
      name: "Analyst",
      role: "Metrics & Data Synthesizer",
      model: "gpt-4o",
      status: "Idle",
      progress: 0,
      currentTask: "Observatory telemetry and log watcher",
      tools: ["metrics_collector", "anomaly_detector", "chart_renderer"],
      icon: Sparkles,
      color: "#f72585"
    }
  ];

  const current = agents.find(a => a.id === selectedAgent) || agents[0];

  return (
    <div className="relative w-full h-full flex flex-col pt-16 pb-6 px-12 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-purple-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Autonomous Agent Workforce
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                3 WORKING · 2 IDLE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Specialized AI teammates coordinating under Zero's supervisor protocol.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.select();
            setShowCreateModal(true);
          }}
          className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 100%)`,
            color: "#030712"
          }}
        >
          <Plus className="w-4 h-4" />
          <span>Deploy New Agent</span>
        </button>
      </div>

      {/* Main Split Layout: Agent Roster & Detailed Workspace Profile */}
      <div className="flex-1 grid grid-cols-3 gap-6 pt-5 overflow-hidden">
        {/* Left Column: Agents Directory Roster */}
        <div className="col-span-1 zero-glass-panel rounded-3xl p-4 border border-slate-800 flex flex-col justify-between overflow-hidden shadow-2xl">
          <div className="space-y-3 overflow-y-auto pr-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              ROSTER ({agents.length} SPECIALISTS)
            </div>

            {agents.map((agent) => {
              const Icon = agent.icon;
              const isSelected = selectedAgent === agent.id;
              return (
                <div
                  key={agent.id}
                  onClick={() => {
                    sound.hover();
                    setSelectedAgent(agent.id);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400/80 shadow-[0_0_16px_var(--zero-glow)]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center border"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          borderColor: agent.color
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: agent.color }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                          {agent.name}
                          {agent.status === "Working" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">{agent.model}</div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        agent.status === "Working"
                          ? "bg-cyan-950 text-cyan-300 border border-cyan-800"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>

                  {agent.status === "Working" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span className="truncate max-w-[180px]">{agent.currentTask}</span>
                        <span className="text-cyan-300 font-bold">{agent.progress}%</span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-cyan-400"
                          style={{ width: `${agent.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>Swarm Mode: Active</span>
            <span className="text-emerald-400">Zero Gateway OK</span>
          </div>
        </div>

        {/* Right 2 Columns: Selected Agent Detailed Workspace & Delegation Graph */}
        <div className="col-span-2 zero-glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between shadow-2xl overflow-hidden">
          <div className="space-y-6 overflow-y-auto pr-2">
            {/* Header Profile */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xl"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    borderColor: current.color,
                    boxShadow: `0 0 20px ${current.color}40`
                  }}
                >
                  <current.icon className="w-7 h-7" style={{ color: current.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {current.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{current.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      Model: {current.model}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                      Isolated Worktree: Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => sound.select()}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Configure</span>
                </button>
              </div>
            </div>

            {/* Current Work & Live Telemetry */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Current Execution Objective
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                  <span>{current.currentTask}</span>
                  <span className="text-cyan-400 font-mono">{current.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${current.progress}%`,
                      background: `linear-gradient(90deg, ${theme.accentPrimary}, ${theme.accentSecondary})`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Assigned Tools & Permission Capabilities */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Authorized Capabilities & Tools ({current.tools.length})
              </div>
              <div className="grid grid-cols-2 gap-2">
                {current.tools.map((tool) => (
                  <div
                    key={tool}
                    className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-cyan-300">{tool}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Swarm Delegation Hierarchy Graph */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Delegation Topology
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-around text-xs font-mono">
                <div className="flex flex-col items-center gap-1">
                  <div className="px-3 py-1.5 rounded-xl bg-cyan-950 border border-cyan-500 text-cyan-200 font-bold">
                    ZERO Coordinator
                  </div>
                  <span className="text-[10px] text-slate-500">Supervisor</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600" />
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="px-3 py-1.5 rounded-xl border font-bold"
                    style={{ borderColor: current.color, color: current.color }}
                  >
                    {current.name}
                  </div>
                  <span className="text-[10px] text-slate-500">Autonomous Worker</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600" />
                <div className="flex flex-col items-center gap-1">
                  <div className="px-3 py-1.5 rounded-xl bg-purple-950 border border-purple-500 text-purple-200 font-bold">
                    Workspace Artifacts
                  </div>
                  <span className="text-[10px] text-slate-500">Outputs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              onClick={() => sound.hover()}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Pause Agent
            </button>
            <button
              onClick={() => sound.select()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-black"
              style={{
                background: `linear-gradient(135deg, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 100%)`
              }}
            >
              Assign New Subtask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
