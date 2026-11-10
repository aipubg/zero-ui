import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Code,
  Brain,
  Search,
  Users,
  Sparkles,
  Blocks,
  Monitor,
  Zap,
  LayoutDashboard,
  Layers,
  Settings,
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

  // Clean, uncrowded navigation items directly matching Reference Image 1 & 8
  const navItems = [
    { id: "command", label: "Command", icon: Code, screen: "home", isPrimary: true },
    { id: "memory", label: "Memory", icon: Brain, screen: "memory" },
    { id: "search", label: "Search", icon: Search, screen: "search" },
    { id: "agents", label: "Agents", icon: Users, screen: "agents" },
    { id: "skills", label: "Skills", icon: Sparkles, screen: "skills" },
    { id: "plugins", label: "Plugins", icon: Blocks, screen: "plugins" },
    { id: "computer", label: "Computer Control", icon: Monitor, screen: "computer" },
    { id: "automations", label: "Automations", icon: Zap, screen: "automations" },
    { id: "dashboards", label: "Dashboards", icon: LayoutDashboard, screen: "projects" },
    { id: "models", label: "Models", icon: Layers, screen: "models" },
  ];

  const bottomItems = [
    { id: "settings", label: "Settings", icon: Settings, screen: "settings" },
    { id: "about", label: "About Zero", icon: Info, screen: "design-system" },
  ];

  return (
    <aside
      className={`fixed left-4 top-18 bottom-5 z-30 flex flex-col justify-between rounded-3xl p-3 transition-all duration-300 select-none shadow-2xl backdrop-blur-3xl ${
        spatialRailExpanded ? "w-54" : "w-14"
      }`}
      style={{
        backgroundColor: "rgba(8, 12, 28, 0.45)",
        border: "1px solid rgba(147, 197, 253, 0.16)",
        boxShadow: `0 16px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)`
      }}
    >
      {/* Search Input & Collapse Toggle */}
      <div className="space-y-2 pt-0.5 pb-2 border-b border-slate-800/60">
        <div className="flex items-center justify-between">
          {spatialRailExpanded && (
            <div className="relative flex-1 mr-2">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search... Ctrl+F"
                className="w-full pl-8 pr-2 py-1.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400/80 transition-colors"
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

      {/* Main Navigation Stream (Clean, uncrowded, elegant matching Image 1) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-1 py-2 custom-scrollbar">
        {navItems
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
                    ? "bg-purple-600/35 text-white font-semibold border border-purple-400/60 shadow-[0_0_16px_rgba(168,85,247,0.45)]"
                    : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-115 ${
                    isActive ? "text-purple-300" : "text-slate-400 group-hover:text-cyan-300"
                  }`}
                />
                {spatialRailExpanded && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}

        {/* Divider */}
        <div className="my-2 border-t border-slate-800/60" />

        {/* Bottom Utility Items */}
        {bottomItems
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
                    ? "bg-purple-600/35 text-white font-semibold border border-purple-400/60 shadow-[0_0_16px_rgba(168,85,247,0.45)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-115 ${
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

      {/* Connected Status & Profile Badge */}
      <div className="pt-2 border-t border-slate-800/60 space-y-2">
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
            className="flex items-center justify-between p-1.5 rounded-2xl bg-slate-900/50 border border-slate-800/70 hover:border-slate-700 transition-all cursor-pointer group"
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
            <div className="text-slate-400 group-hover:text-white pr-1 text-[10px]">▼</div>
          </div>
        )}
      </div>
    </aside>
  );
};
