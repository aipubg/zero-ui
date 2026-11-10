import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Search,
  ChevronDown,
  Bell,
  Sliders,
  Volume2,
  VolumeX,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle,
  ExternalLink
} from "lucide-react";

export const ZeroTopNav = () => {
  const {
    activeWorkspace,
    setActiveWorkspace,
    activeModel,
    theme,
    navigateTo,
    soundEnabled,
    toggleSound,
    setSearchPaletteOpen
  } = useZero();

  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const workspaces = [
    "Personal workspace",
    "Engineering & Architecture",
    "Deep Research Lab",
    "Automated Ops"
  ];

  const notifications = [
    { id: 1, title: "Memory Layer Synchronized", time: "2m ago", desc: "Added 18 contextual embeddings from chat." },
    { id: 2, title: "Automation Succeeded", time: "6m ago", desc: "Daily research digest compiled into scratchpad." },
    { id: 3, title: "Display Hold Ready", time: "12m ago", desc: "Zero Computer observation bridge is active." }
  ];

  return (
    <header className="absolute top-0 left-0 right-0 h-14 px-6 z-40 flex items-center justify-between select-none">
      {/* Left: ZERO Brand & Workspace Switcher */}
      <div className="flex items-center gap-5">
        {/* Brand Logo */}
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2.5 group cursor-pointer"
          title="Return to Living Observatory Home"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.surface} 0%, rgba(0,0,0,0.8) 100%)`,
              borderColor: theme.accentPrimary,
              boxShadow: `0 0 16px ${theme.glow}`
            }}
          >
            {/* Zero Monogram Ring */}
            <div
              className="w-4 h-4 rounded-full border-2 border-dashed group-hover:rotate-45 transition-transform duration-500"
              style={{ borderColor: theme.accentPrimary }}
            />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wider font-display text-white">
                ZERO
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono">
                OS
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-slate-400">
              PERSONAL INTELLIGENCE
            </span>
          </div>
        </button>

        {/* Workspace Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              sound.select();
              setWorkspaceOpen(!workspaceOpen);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full zero-glass-pill border border-slate-700/60 hover:border-slate-500 text-xs font-medium text-slate-200 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="max-w-[140px] truncate">{activeWorkspace}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {workspaceOpen && (
            <div
              className="absolute left-0 mt-2 w-56 zero-glass-panel rounded-2xl p-2 z-50 shadow-2xl border"
              style={{ borderColor: theme.borderHighlight }}
            >
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Switch Workspace
              </div>
              {workspaces.map((ws) => (
                <button
                  key={ws}
                  onClick={() => {
                    sound.select();
                    setActiveWorkspace(ws);
                    setWorkspaceOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    activeWorkspace === ws
                      ? "bg-cyan-500/20 text-cyan-200 font-semibold"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span>{ws}</span>
                  {activeWorkspace === ws && (
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center: Global Command / Search Trigger Omnibar */}
      <div className="flex-1 max-w-xl mx-8">
        <button
          onClick={() => {
            sound.select();
            setSearchPaletteOpen(true);
          }}
          className="w-full flex items-center justify-between px-4 py-2 rounded-full zero-glass-panel border hover:border-cyan-400/60 transition-all text-xs text-slate-300 group shadow-lg"
          style={{ borderColor: "rgba(255, 255, 255, 0.12)" }}
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-slate-400 group-hover:text-slate-200 transition-colors">
              Ask ZERO anything... or search models, files, automations
            </span>
          </div>
          <kbd className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-400">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right: Telemetry Indicators & Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Model Route Pill */}
        <button
          onClick={() => navigateTo("models")}
          className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full zero-glass-pill border border-slate-800 text-[11px] font-mono text-slate-300 hover:border-amber-400/50 transition-colors"
          title="Active Model Fabric Route"
        >
          <Cpu className="w-3 h-3 text-amber-300" />
          <span>{activeModel.split("-")[0]}</span>
        </button>

        {/* Connection Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full zero-glass-pill border border-emerald-500/30 text-[11px] font-medium text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Connected</span>
          <span className="text-[10px] font-mono text-emerald-400/80">14ms</span>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="p-2 rounded-full zero-glass-pill text-slate-400 hover:text-white transition-colors"
          title={soundEnabled ? "Mute interface audio" : "Enable interface audio"}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-cyan-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              sound.select();
              setNotificationsOpen(!notificationsOpen);
            }}
            className="relative p-2 rounded-full zero-glass-pill text-slate-400 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </button>

          {notificationsOpen && (
            <div
              className="absolute right-0 mt-2 w-80 zero-glass-panel rounded-2xl p-3 z-50 shadow-2xl border"
              style={{ borderColor: theme.borderHighlight }}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-semibold text-slate-200">
                <span>Recent System Alerts</span>
                <span className="text-[10px] font-mono text-cyan-400">3 new</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between font-medium text-slate-200">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Appearance & Studio Shortcut */}
        <button
          onClick={() => navigateTo("appearance")}
          className="p-2 rounded-full zero-glass-pill text-slate-400 hover:text-white hover:border-purple-400 transition-colors"
          title="Customize Appearance & Companions"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
        </button>

        {/* Settings Shortcut */}
        <button
          onClick={() => navigateTo("settings")}
          className="p-2 rounded-full zero-glass-pill text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
          title="Open Settings"
        >
          <Sliders className="w-4 h-4 text-cyan-300" />
        </button>

        {/* User Profile Avatar */}
        <div
          onClick={() => navigateTo("settings")}
          className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full zero-glass-pill border border-slate-700 cursor-pointer hover:border-slate-500 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
            Ø
          </div>
          <span className="text-xs font-semibold text-slate-200">Owner</span>
        </div>
      </div>
    </header>
  );
};
