import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Home,
  MessageSquare,
  Monitor,
  FolderGit2,
  Activity,
  Layers,
  ChevronRight,
  ChevronLeft,
  Bot,
  Cpu,
  Brain,
  Search,
  Zap,
  Sparkles,
  Blocks,
  Palette,
  Sliders,
  Grid
} from "lucide-react";

export const ZeroSpatialRail = () => {
  const {
    currentScreen,
    navigateTo,
    spatialRailExpanded,
    setSpatialRailExpanded,
    liveOpsOpen,
    setLiveOpsOpen,
    theme
  } = useZero();

  const [hoveredPrimary, setHoveredPrimary] = useState(null);

  // 5 Primary Spatial Edge Destinations
  const primaryDestinations = [
    { id: "home", label: "Living Observatory", icon: Home, badge: "Home" },
    { id: "chat", label: "Command Chat", icon: MessageSquare, badge: "Chat" },
    { id: "computer", label: "Computer Control", icon: Monitor, badge: "Screen" },
    { id: "projects", label: "Workspaces Hub", icon: FolderGit2, badge: "Projects" },
    {
      id: "operations_toggle",
      label: "Live Operations",
      icon: Activity,
      badge: "Telemetry",
      isAction: true,
      onClick: () => {
        sound.select();
        setLiveOpsOpen(!liveOpsOpen);
      }
    }
  ];

  // Secondary Categorized Capabilities (Available when Rail is Expanded)
  const secondaryCategories = [
    {
      title: "Intelligence & Workforce",
      items: [
        { id: "agents", label: "Agent Workforce", icon: Bot, count: "3 Active" },
        { id: "models", label: "Model Fabric", icon: Cpu, count: "14 Models" },
        { id: "memory", label: "Memory Layers", icon: Brain, count: "8 Layers" },
        { id: "search", label: "Deep Research", icon: Search, count: "Multi-hop" }
      ]
    },
    {
      title: "Extensions & Ops",
      items: [
        { id: "automations", label: "Automations", icon: Zap, count: "4 Scheduled" },
        { id: "skills", label: "Skill Library", icon: Sparkles, count: "12 Installed" },
        { id: "plugins", label: "Plugin Bridges", icon: Blocks, count: "6 Active" }
      ]
    },
    {
      title: "Studio & Preferences",
      items: [
        { id: "appearance", label: "Appearance & Studio", icon: Palette, count: "Themes" },
        { id: "design-system", label: "Design System", icon: Grid, count: "Tokens" },
        { id: "settings", label: "Settings Center", icon: Sliders, count: "Config" }
      ]
    }
  ];

  return (
    <aside
      className={`fixed left-4 top-20 bottom-8 z-30 flex flex-col justify-between zero-glass-panel rounded-3xl p-2 transition-all duration-300 select-none shadow-2xl backdrop-blur-3xl ${
        spatialRailExpanded ? "w-64" : "w-14"
      }`}
      style={{
        borderColor: theme.border,
        boxShadow: `0 16px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)`
      }}
    >
      {/* Top Expansion Toggle */}
      <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-800/80">
        {spatialRailExpanded && (
          <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-300 font-bold pl-2">
            SPATIAL EDGE
          </span>
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
          title={spatialRailExpanded ? "Collapse Rail" : "Expand Capability Suite"}
        >
          {spatialRailExpanded ? (
            <ChevronLeft className="w-4 h-4 text-cyan-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          )}
        </button>
      </div>

      {/* Rail Navigation Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 py-1">
        {/* Primary Unobtrusive Edge Icons */}
        <div className="space-y-1.5">
          {spatialRailExpanded && (
            <div className="px-2 text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">
              PRIMARY
            </div>
          )}

          {primaryDestinations.map((dest) => {
            const Icon = dest.icon;
            const isActive = currentScreen === dest.id;

            return (
              <div key={dest.id} className="relative">
                <button
                  data-nav-id={dest.id}
                  aria-label={dest.label}
                  onClick={() => {
                    if (dest.isAction) {
                      dest.onClick();
                    } else {
                      navigateTo(dest.id);
                    }
                  }}
                  onMouseEnter={() => {
                    sound.hover();
                    setHoveredPrimary(dest.id);
                  }}
                  onMouseLeave={() => setHoveredPrimary(null)}
                  className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-2xl transition-all group cursor-pointer ${
                    isActive
                      ? "bg-cyan-500/20 text-white font-semibold shadow-[0_0_16px_var(--zero-glow)]"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                  }`}
                  style={{
                    border: isActive
                      ? `1px solid ${theme.borderHighlight}`
                      : "1px solid transparent"
                  }}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                      style={{
                        backgroundColor: theme.accentPrimary,
                        boxShadow: `0 0 10px ${theme.glow}`
                      }}
                    />
                  )}

                  <div className="flex items-center justify-center w-6 h-6 mx-auto">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-115 ${
                        isActive ? "text-cyan-300" : ""
                      }`}
                      style={{
                        color: isActive ? theme.accentPrimary : undefined
                      }}
                    />
                  </div>

                  {spatialRailExpanded && (
                    <span className="text-xs truncate font-medium">
                      {dest.label}
                    </span>
                  )}
                </button>

                {/* Hover Tooltip when Collapsed */}
                {!spatialRailExpanded && hoveredPrimary === dest.id && (
                  <div
                    className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl zero-glass-panel border text-xs font-semibold text-white whitespace-nowrap z-50 shadow-2xl pointer-events-none flex items-center gap-2"
                    style={{
                      borderColor: theme.borderHighlight,
                      boxShadow: `0 0 16px ${theme.glow}`
                    }}
                  >
                    <span>{dest.label}</span>
                    <span className="text-[10px] font-mono text-cyan-300">
                      {dest.badge}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Secondary Capabilities (Visible when expanded) */}
        {spatialRailExpanded && (
          <div className="space-y-4 pt-2 border-t border-slate-800/80 animate-in fade-in duration-200">
            {secondaryCategories.map((cat) => (
              <div key={cat.title} className="space-y-1">
                <div className="px-2 text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                  {cat.title}
                </div>
                {cat.items.map((sub) => {
                  const SubIcon = sub.icon;
                  const isSubActive = currentScreen === sub.id;
                  return (
                    <button
                      key={sub.id}
                      data-nav-id={sub.id}
                      aria-label={sub.label}
                      onClick={() => navigateTo(sub.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                        isSubActive
                          ? "bg-cyan-500/15 text-cyan-200 font-semibold border border-cyan-400/40"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <SubIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{sub.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {sub.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Status Dot */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center">
        {spatialRailExpanded ? (
          <div className="w-full flex items-center justify-between px-2 text-[10px] font-mono text-slate-500">
            <span>ZERO 3.8</span>
            <span className="text-emerald-400 font-semibold">● ACTIVE</span>
          </div>
        ) : (
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: theme.accentPrimary,
              boxShadow: `0 0 10px ${theme.glow}`
            }}
            title="Spatial Edge Active"
          />
        )}
      </div>
    </aside>
  );
};
