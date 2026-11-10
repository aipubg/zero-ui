import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Search,
  Bell,
  Grid,
  Sun,
  Moon,
  Mic,
  Sparkles,
  Minus,
  Square,
  X
} from "lucide-react";

export const ZeroTopNav = () => {
  const {
    navigateTo,
    theme,
    setSearchPaletteOpen,
    themeId,
    setThemeId,
    soundEnabled,
    toggleSound
  } = useZero();

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: "Memory Layer Synchronized", time: "2m ago", desc: "Added 18 contextual embeddings from chat." },
    { id: 2, title: "Automation Succeeded", time: "6m ago", desc: "Daily research digest compiled into scratchpad." },
    { id: 3, title: "Display Hold Ready", time: "12m ago", desc: "Zero Computer observation bridge is active." }
  ];

  const toggleTheme = () => {
    sound.select();
    const themeKeys = ["astral-violet", "celestial-cyan", "emerald-sanctuary", "cosmic-amethyst"];
    const nextIdx = (themeKeys.indexOf(themeId) + 1) % themeKeys.length;
    setThemeId(themeKeys[nextIdx]);
  };

  return (
    <header className="absolute top-0 left-0 right-0 h-14 px-6 z-40 flex items-center justify-between select-none">
      {/* Left: ZERO OS Brand Monogram */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2.5 group cursor-pointer"
          title="Return to Living Observatory Home"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.surface} 0%, rgba(0,0,0,0.8) 100%)`,
              borderColor: theme.accentPrimary,
              boxShadow: `0 0 16px ${theme.glow}`
            }}
          >
            <span className="font-extrabold text-sm text-cyan-300 font-mono">Ø</span>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wider font-display text-white">
                ZERO OS
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono">
                v3.2
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-slate-400">
              PERSONAL INTELLIGENCE
            </span>
          </div>
        </button>
      </div>

      {/* Center: Global Omnibar (Exact Reference Image 1 copy & styling) */}
      <div className="flex-1 max-w-xl mx-8">
        <button
          onClick={() => {
            sound.select();
            setSearchPaletteOpen(true);
          }}
          className="w-full flex items-center justify-between px-4 py-2 rounded-full zero-glass-panel border hover:border-cyan-400/60 transition-all text-xs text-slate-300 group shadow-lg cursor-pointer"
          style={{ borderColor: "rgba(255, 255, 255, 0.16)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-slate-300 group-hover:text-white transition-colors">
              Ask ZERO anything... research, build, automate, or create...
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Mic className="w-3.5 h-3.5 text-slate-400 hover:text-cyan-300 transition-colors" />
            <kbd className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-300">
              Ctrl | K
            </kbd>
          </div>
        </button>
      </div>

      {/* Right: Quick Tools & Window Controls */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              sound.select();
              setNotificationsOpen(!notificationsOpen);
            }}
            className="relative p-2 rounded-full zero-glass-pill text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="System Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
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

        {/* 3x3 App Grid Shortcut */}
        <button
          onClick={() => navigateTo("projects")}
          className="p-2 rounded-full zero-glass-pill text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Workspaces & Applications"
        >
          <Grid className="w-4 h-4" />
        </button>

        {/* Theme Toggle (Sun/Moon) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full zero-glass-pill text-amber-300 hover:text-amber-100 transition-colors cursor-pointer"
          title="Cycle Celestial Lighting & Theme"
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* Desktop Window Controls */}
        <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
          <button className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer" title="Minimize">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer" title="Maximize">
            <Square className="w-3 h-3" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer" title="Close">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
