import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  FolderGit2,
  Plus,
  Layers,
  FileCode,
  CheckCircle,
  Clock,
  ExternalLink,
  Bot,
  Sparkles
} from "lucide-react";

export const ZeroProjectsScreen = () => {
  const { theme } = useZero();
  const [projects] = useState([
    {
      id: "zero-ui",
      name: "ZERO OS — Living Observatory",
      workspace: "Personal workspace",
      description: "Next-generation personal intelligence operating interface featuring 3D holographic anime AI, plush mascot, orbital controls, and deep glassmorphism.",
      agentsAssigned: ["Researcher", "Organizer", "Builder"],
      progress: 94,
      artifacts: 15,
      updated: "Just now"
    },
    {
      id: "gateway-protocol",
      name: "Gateway Bridge & IPC Harness",
      workspace: "Engineering & Architecture",
      description: "Low-latency WebSocket protocol bridging UI requests to background worker agents and screen intelligence services.",
      agentsAssigned: ["Builder"],
      progress: 82,
      artifacts: 8,
      updated: "2 hours ago"
    },
    {
      id: "quantum-reasoning",
      name: "Reasoning Benchmarks Ingestion",
      workspace: "Deep Research Lab",
      description: "Automated extraction and vectorization of 2026 reasoning papers into Zero's 8-layer cognitive memory.",
      agentsAssigned: ["Researcher", "Analyst"],
      progress: 65,
      artifacts: 24,
      updated: "Yesterday"
    }
  ]);

  return (
    <div className="relative w-full h-full flex flex-col pt-16 pb-6 px-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Projects & Workspaces Hub
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                3 ACTIVE PROJECTS
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Coordinated workspaces containing agent delegations, file artifacts, and project milestones.
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
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="flex-1 zero-glass-panel rounded-3xl p-6 border border-slate-800 mt-5 overflow-y-auto shadow-2xl space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
          <span>ACTIVE PROJECTS IN WORKSPACE</span>
          <span className="text-cyan-400">Git Isolated</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      {proj.workspace}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5 flex items-center gap-2">
                      {proj.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                    {proj.progress}%
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${proj.progress}%`,
                      background: `linear-gradient(90deg, ${theme.accentPrimary}, ${theme.accentSecondary})`
                    }}
                  />
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{proj.agentsAssigned.join(", ")}</span>
                  </div>
                  <span>{proj.artifacts} Artifacts</span>
                  <span>{proj.updated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
