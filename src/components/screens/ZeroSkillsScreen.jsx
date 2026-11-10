import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Sparkles,
  Search,
  Plus,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Terminal,
  FileCode,
  Layers,
  ExternalLink
} from "lucide-react";

export const ZeroSkillsScreen = () => {
  const { theme } = useZero();
  const [skills, setSkills] = useState([
    {
      id: "screen-perception",
      name: "Screen Perception & Vision",
      category: "Computer Automation",
      description: "Autonomous screen OCR, bounding box detection, and element segmentation.",
      enabled: true,
      version: "2.4.0",
      author: "Zero Core Team"
    },
    {
      id: "deep-research-crawler",
      name: "Deep Research Web Crawler",
      category: "Intelligence",
      description: "Multi-hop web search, citation extraction, and markdown report synthesis.",
      enabled: true,
      version: "1.9.1",
      author: "Zero Core Team"
    },
    {
      id: "git-worktree-agent",
      name: "Git Worktree Swarm Isolation",
      category: "Software Engineering",
      description: "Spawns isolated repository worktrees for parallel agent code generation without conflicts.",
      enabled: true,
      version: "3.1.0",
      author: "Zero Community"
    },
    {
      id: "system-hold-bridge",
      name: "Desktop Input Hold Bridge",
      category: "Computer Automation",
      description: "Low-level mouse and keyboard event injection with user emergency escape break.",
      enabled: true,
      version: "2.0.2",
      author: "Zero Core Team"
    },
    {
      id: "latex-math-renderer",
      name: "KaTeX Mathematical Synthesizer",
      category: "Science & Math",
      description: "Generates and renders complex mathematical proofs and KaTeX formulas in conversation.",
      enabled: true,
      version: "1.2.0",
      author: "DeepMind"
    },
    {
      id: "audio-speech-engine",
      name: "Web Audio Voice Synthesizer",
      category: "Perception & Voice",
      description: "Low-latency streaming text-to-speech with crystal sound effects and emotion pacing.",
      enabled: true,
      version: "2.8.0",
      author: "Zero Core Team"
    }
  ]);

  const toggleSkill = (id) => {
    sound.select();
    setSkills(prev =>
      prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col pt-4 pb-6 px-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-pink-950/60 border border-pink-500/40 text-pink-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Skill Library & Reusable Capabilities
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-950/80 border border-pink-500/40 text-pink-300">
                12 INSTALLED · 6 ACTIVE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Modular markdown instruction skills and executable scripts extending ZERO's capabilities.
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
          <span>Create Custom Skill</span>
        </button>
      </div>

      {/* Skills Grid */}
      <div className="flex-1 zero-glass-panel rounded-3xl p-6 border border-slate-800 mt-5 overflow-y-auto shadow-2xl space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
          <span>INSTALLED CAPABILITIES ({skills.length})</span>
          <span className="text-cyan-400">SKILL.md Spec v2026.10</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={`p-4 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                skill.enabled
                  ? "bg-slate-900/70 border-slate-700 hover:border-pink-400/60"
                  : "bg-slate-950/40 border-slate-800/80 opacity-60"
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      {skill.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 mt-0.5">{skill.name}</h4>
                  </div>
                  <button
                    onClick={() => toggleSkill(skill.id)}
                    className="cursor-pointer text-slate-400 hover:text-white"
                  >
                    {skill.enabled ? (
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-slate-600" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>v{skill.version} · {skill.author}</span>
                <span className={skill.enabled ? "text-emerald-400" : "text-slate-500"}>
                  {skill.enabled ? "Active" : "Disabled"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
