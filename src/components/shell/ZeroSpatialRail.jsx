import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Code,
  Monitor,
  Zap,
  LayoutDashboard,
  Brain,
  Search,
  Layers,
  Users,
  Sparkles,
  Blocks,
  Settings,
  Globe,
  FlaskConical,
  Sliders,
  Info,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

export const ZeroSpatialRail = () => {
  const {
    currentScreen,
    navigateTo,
    spatialRailExpanded,
    setSpatialRailExpanded,
    theme
  } = useZero();

  const [searchFilter, setSearchFilter] = useState("");

  const sections = [
    {
      title: "WORKSPACE",
      items: [
        { id: "home", label: "Command", icon: Code, screen: "home" },
        { id: "computer", label: "Computer", icon: Monitor, screen: "computer" },
        { id: "automations", label: "Automations", icon: Zap, screen: "automations" },
        { id: "dashboards", label: "Dashboards", icon: LayoutDashboard, screen: "projects" }
      ]
    },
    {
      title: "INTELLIGENCE",
      items: [
        { id: "memory", label: "Memory", icon: Brain, screen: "memory" },
        { id: "search", label: "Search", icon: Search, screen: "search" },
        { id: "models", label: "Models", icon: Layers, screen: "models" },
        { id: "agents", label: "Agents", icon: Users, screen: "agents" },
        { id: "skills", label: "Skills", icon: Sparkles, screen: "skills" },
        { id: "plugins", label: "Plugins", icon: Blocks, screen: "plugins" }
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { id: "settings", label: "Settings", icon: Settings, screen: "settings" },
        { id: "infrastructure", label: "Infrastructure", icon: Globe, screen: "settings" },
        { id: "labs", label: "Labs", icon: FlaskConical, screen: "appearance" },
        { id: "advanced", label: "Advanced", icon: Sliders, screen: "settings" },
        { id: "about", label: "About Zero", icon: Info, screen: "design-system" }
      ]
    }
  ];

  return (
    <aside
      className={`fixed left-4 top-18 bottom-6 z-30 flex flex-col justify-between zero-glass-panel rounded-3xl p-3 transition-all duration-300 select-none shadow-2xl backdrop-blur-3xl ${
        spatialRailExpanded ? "w-60" : "w-14"
      }`}
      style={{
        borderColor: theme.border,
        boxShadow: `0 16px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.1)`
      }}
    >
      {/* Top Search Input & Collapse Toggle */}
      <div className="space-y-2 pt-1 pb-2 border-b border-slate-800/80">
        <div className="flex items-center justify-between">
          {spatialRailExpanded && (
            <div className="relative flex-1 mr-2">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search... Ctrl+F"
                className="w-full pl-8 pr-2 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400/80 transition-colors"
              />
            </div>
          )}
          <button
            data-nav-toggle="true"
            onClick={() => {
              sound.select();
              setSpatialRailExpanded(!spatialRailExpanded);
            }}
            className={`p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer ${
              !spatialRailExpanded ? "mx-auto" : ""
            }`}
            title={spatialRailExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {spatialRailExpanded ? (
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-4 py-2 custom-scrollbar">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-1">
            {spatialRailExpanded && (
              <div className="px-2 text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-1">
                {sec.title}
              </div>
            )}
            {sec.items
              .filter(item => !searchFilter || item.label.toLowerCase().includes(searchFilter.toLowerCase()))
              .map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.screen;

                return (
                  <button
                    key={item.id}
                    data-nav-id={item.id}
                    aria-label={item.label}
                    onClick={() => {
                      sound.select();
                      navigateTo(item.screen);
                    }}
                    onMouseEnter={() => sound.hover()}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs transition-all group cursor-pointer ${
                      isActive
                        ? "bg-purple-600/30 text-white font-semibold border border-purple-400/50 shadow-[0_0_16px_rgba(168,85,247,0.4)]"
                        : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? "text-purple-300" : "text-slate-400 group-hover:text-cyan-300"
                      }`}
                    />
                    {spatialRailExpanded && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
          </div>
        ))}
      </div>

      {/* Bottom Connected Status & Profile */}
      <div className="pt-2 border-t border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between px-2 text-[11px] text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {spatialRailExpanded && <span>Connected</span>}
          </div>
          {spatialRailExpanded && (
            <button className="text-slate-500 hover:text-slate-300 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>

        {spatialRailExpanded && (
          <div
            onClick={() => navigateTo("settings")}
            className="flex items-center justify-between p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                Ø
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-200 group-hover:text-white">Owner</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online
                </div>
              </div>
            </div>
            <div className="text-slate-400 group-hover:text-white pr-1">▼</div>
          </div>
        )}
      </div>
    </aside>
  );
};
