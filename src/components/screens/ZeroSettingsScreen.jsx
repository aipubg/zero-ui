import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Sliders,
  Search,
  User,
  Shield,
  Key,
  Mic,
  Monitor,
  Cloud,
  Network,
  Cpu,
  Brain,
  Zap,
  Terminal,
  Info,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  Palette
} from "lucide-react";

export const ZeroSettingsScreen = () => {
  const { theme, navigateTo } = useZero();
  const [activeTab, setActiveTab] = useState("general");
  const [searchFilter, setSearchFilter] = useState("");

  const sections = [
    {
      group: "Core & Experience",
      items: [
        { id: "general", label: "General Preferences", icon: Sliders },
        { id: "appearance", label: "Appearance & Studio", icon: Palette, shortcut: true },
        { id: "talk", label: "Voice, Speech & Audio", icon: Mic },
        { id: "notifications", label: "System Notifications", icon: Zap }
      ]
    },
    {
      group: "Intelligence & Engine",
      items: [
        { id: "models", label: "Model Fabric & Providers", icon: Cpu },
        { id: "memory", label: "Memory & Vector Layers", icon: Brain },
        { id: "skills", label: "Installed Skills", icon: Terminal },
        { id: "mcp", label: "MCP & Plugin Bridges", icon: Network }
      ]
    },
    {
      group: "System & Infrastructure",
      items: [
        { id: "gateway", label: "OpenClaw Gateway & IPC", icon: Cloud },
        { id: "devices", label: "Connected Devices & Displays", icon: Monitor },
        { id: "privacy", label: "Privacy, Data & Approvals", icon: Shield },
        { id: "secrets", label: "API Keys & Secrets Vault", icon: Key },
        { id: "about", label: "About Zero Architecture", icon: Info }
      ]
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col pt-16 pb-6 px-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Settings & System Configuration
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                GATEWAY 3.8 AUTHORITATIVE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Manage system permissions, model routes, audio hardware, security vaults, and observation protocols.
            </p>
          </div>
        </div>

        {/* Settings Search Input */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search configuration settings..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Main Split Layout: Categorized Navigation & Configuration Surface */}
      <div className="flex-1 grid grid-cols-4 gap-6 pt-5 overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="col-span-1 zero-glass-panel rounded-3xl p-4 border border-slate-800 space-y-4 overflow-y-auto">
          {sections.map((sec) => (
            <div key={sec.group} className="space-y-1">
              <div className="px-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                {sec.group}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.select();
                      if (item.shortcut) {
                        navigateTo(item.id);
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-200 font-semibold border border-cyan-500/40"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-300" />
                      <span>{item.label}</span>
                    </div>
                    {isSelected && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Configuration Canvas */}
        <div className="col-span-3 zero-glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between overflow-y-auto shadow-2xl">
          <div className="space-y-6">
            {/* Header of Active Section */}
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display capitalize">
                {activeTab.replace("-", " ")} Configuration
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Authoritative preferences persisted in ZERO local database.
              </p>
            </div>

            {/* General Tab */}
            {activeTab === "general" && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200 text-sm">Autonomous Mode</div>
                    <div className="text-slate-400 text-xs">Allow agents to plan and execute subtasks without turn-by-turn prompts.</div>
                  </div>
                  <ToggleRight className="w-8 h-8 text-emerald-400 cursor-pointer" />
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200 text-sm">Computer Control Permission Guard</div>
                    <div className="text-slate-400 text-xs">Require confirmation token before taking control of mouse or keyboard.</div>
                  </div>
                  <ToggleRight className="w-8 h-8 text-emerald-400 cursor-pointer" />
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200 text-sm">Background Screen Perception</div>
                    <div className="text-slate-400 text-xs">Perform low-frequency optical character recognition on active desktop window.</div>
                  </div>
                  <ToggleRight className="w-8 h-8 text-emerald-400 cursor-pointer" />
                </div>
              </div>
            )}

            {/* Talk / Voice Tab */}
            {activeTab === "talk" && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="font-bold text-slate-200 text-sm">Microphone Input Hardware</div>
                  <select className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200">
                    <option>Default System Microphone (Realtek High Definition Audio)</option>
                    <option>USB Studio Condenser Mic (24-bit 96kHz)</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="font-bold text-slate-200 text-sm">Text-To-Speech Synthesizer</div>
                  <select className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200">
                    <option>ZERO Natural Ethereal (Female Warm Hologram) · Default</option>
                    <option>ZERO Crystal Studio (Crisp Futuristic)</option>
                    <option>ElevenLabs Neural Streaming Bridge</option>
                  </select>
                </div>
              </div>
            )}

            {/* Secrets & Keys Tab */}
            {activeTab === "secrets" && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="font-bold text-slate-200 text-sm">OpenAI API Key</div>
                  <input
                    type="password"
                    defaultValue="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 font-mono"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="font-bold text-slate-200 text-sm">Anthropic API Key</div>
                  <input
                    type="password"
                    defaultValue="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 font-mono"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="font-bold text-slate-200 text-sm">Google Gemini API Key</div>
                  <input
                    type="password"
                    defaultValue="AIzaSyxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 font-mono"
                  />
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-4 text-xs">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="text-sm font-bold text-white font-display">ZERO — Personal Intelligence Operating System</div>
                  <p className="text-slate-300 leading-relaxed">
                    ZERO combines an intelligent 3D holographic presence, autonomous swarms, screen perception, and orbital navigation inside a futuristic celestial sanctuary.
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                    <div>Living Observatory: v3.8.0-release</div>
                    <div>Gateway Protocol: OpenClaw 2026.10</div>
                    <div>Hardware Acceleration: WebGL + Web Audio + Canvas2D</div>
                  </div>
                </div>
              </div>
            )}

            {/* Fallback for other tabs */}
            {!["general", "talk", "secrets", "about"].includes(activeTab) && (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                <Sliders className="w-8 h-8 text-cyan-400 mx-auto" />
                <h4 className="text-sm font-bold text-white capitalize">{activeTab} Configuration Ready</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Gateway protocol settings for this section are active and synchronizing with your local daemons.
                </p>
              </div>
            )}
          </div>

          {/* Footer Save Changes */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              onClick={() => sound.hover()}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => sound.select()}
              className="px-5 py-2 rounded-xl text-xs font-bold text-black shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 100%)`
              }}
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
