import React, { useState, useEffect } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Search,
  Home,
  MessageSquare,
  Monitor,
  Cpu,
  Bot,
  Brain,
  Zap,
  Sparkles,
  Blocks,
  Sliders,
  Palette,
  X,
  ArrowRight
} from "lucide-react";

export const ZeroCommandPalette = () => {
  const {
    searchPaletteOpen,
    setSearchPaletteOpen,
    navigateTo,
    theme
  } = useZero();

  const [query, setQuery] = useState("");

  const items = [
    { id: "home", title: "Living Observatory (Home)", category: "Workspace", icon: Home },
    { id: "chat", title: "Command Chat & Assistant", category: "Workspace", icon: MessageSquare },
    { id: "computer", title: "Computer Control & Vision", category: "Workspace", icon: Monitor },
    { id: "automations", title: "Automations & Schedules", category: "Workspace", icon: Zap },
    { id: "models", title: "Model Fabric & Providers", category: "Intelligence", icon: Cpu },
    { id: "agents", title: "Agent Workforce", category: "Intelligence", icon: Bot },
    { id: "memory", title: "Memory & Knowledge Graph", category: "Intelligence", icon: Brain },
    { id: "skills", title: "Skill Library", category: "Intelligence", icon: Sparkles },
    { id: "plugins", title: "Plugin Bridges & MCPs", category: "Intelligence", icon: Blocks },
    { id: "appearance", title: "Appearance & Companions Studio", category: "System", icon: Palette },
    { id: "settings", title: "Settings & System Config", category: "System", icon: Sliders }
  ];

  const filtered = items.filter(it =>
    it.title.toLowerCase().includes(query.toLowerCase()) ||
    it.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!searchPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div
        className="w-full max-w-xl zero-glass-panel rounded-3xl p-4 border shadow-2xl space-y-3"
        style={{
          borderColor: theme.borderHighlight,
          boxShadow: `0 24px 60px rgba(0,0,0,0.8), 0 0 32px ${theme.glow}`
        }}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-3 pb-3 border-b border-slate-800">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a screen, capability, agent, or command..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
          />
          <button
            onClick={() => setSearchPaletteOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.select();
                  navigateTo(item.id);
                  setSearchPaletteOpen(false);
                }}
                className="w-full p-2.5 rounded-2xl hover:bg-white/10 text-left flex items-center justify-between text-xs transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-cyan-300 group-hover:border-cyan-500/50">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200 group-hover:text-white">
                      {item.title}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {item.category}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>

        {/* Footer Hotkeys */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Navigate with arrows or mouse</span>
          <span>Esc to Close</span>
        </div>
      </div>
    </div>
  );
};
