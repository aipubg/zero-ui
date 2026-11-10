import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Home,
  MessageSquare,
  Monitor,
  Zap,
  FolderGit2,
  Brain,
  Search,
  Cpu,
  Bot,
  Sparkles,
  Blocks,
  Sliders,
  Palette,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  Image as ImageIcon
} from "lucide-react";

export const ZeroSpatialRail = () => {
  const {
    currentScreen,
    navigateTo,
    spatialRailExpanded,
    setSpatialRailExpanded,
    theme
  } = useZero();

  const [hoveredItem, setHoveredItem] = useState(null);

  const navGroups = [
    {
      title: "Workspace",
      items: [
        { id: "home", label: "Living Observatory", icon: Home, badge: null },
        { id: "chat", label: "Command Chat", icon: MessageSquare, badge: null },
        { id: "computer", label: "Computer Control", icon: Monitor, badge: "Live" },
        { id: "automations", label: "Automations", icon: Zap, badge: "2 Active" },
        { id: "projects", label: "Projects Hub", icon: FolderGit2, badge: null }
      ]
    },
    {
      title: "Intelligence",
      items: [
        { id: "memory", label: "Memory Layers", icon: Brain, badge: "8L" },
        { id: "search", label: "Deep Research", icon: Search, badge: null },
        { id: "models", label: "Model Fabric", icon: Cpu, badge: "14" },
        { id: "agents", label: "Agent Workforce", icon: Bot, badge: "3/5" },
        { id: "skills", label: "Skill Library", icon: Sparkles, badge: "12" },
        { id: "plugins", label: "Plugin Bridges", icon: Blocks, badge: "6" }
      ]
    },
    {
      title: "System",
      items: [
        { id: "appearance", label: "Appearance & Studio", icon: Palette, badge: "Themes" },
        { id: "design-system", label: "Design System", icon: LayoutGrid, badge: "Tokens" },
        { id: "settings", label: "Settings Center", icon: Sliders, badge: null },
        { id: "gallery", label: "Design Synthesis", icon: ImageIcon, badge: "Ref" }
      ]
    }
  ];

  return (
    <aside
      className={`fixed left-4 top-20 bottom-8 z-30 flex flex-col justify-between zero-glass-panel rounded-3xl p-2.5 transition-all duration-300 select-none shadow-2xl ${
        spatialRailExpanded ? "w-60" : "w-16"
      }`}
      style={{
        borderColor: theme.border,
        boxShadow: `0 12px 40px 0 rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`
      }}
    >
      {/* Top Expansion Toggle */}
      <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-800/80">
        {spatialRailExpanded && (
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 pl-2">
            SPATIAL RAIL
          </span>
        )}
        <button
          onClick={() => {
            sound.select();
            setSpatialRailExpanded(!spatialRailExpanded);
          }}
          className={`p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors ${
            !spatialRailExpanded ? "mx-auto" : ""
          }`}
          title={spatialRailExpanded ? "Collapse Rail" : "Expand Rail"}
        >
          {spatialRailExpanded ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-4 py-1">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            {spatialRailExpanded && (
              <div className="px-2.5 text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                {group.title}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => navigateTo(item.id)}
                    onMouseEnter={() => {
                      sound.hover();
                      setHoveredItem(item.id);
                    }}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-2xl transition-all group cursor-pointer ${
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
                    {/* Active micro vertical indicator */}
                    {isActive && (
                      <span
                        className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                        style={{
                          backgroundColor: theme.accentPrimary,
                          boxShadow: `0 0 10px ${theme.glow}`
                        }}
                      />
                    )}

                    <div className="flex items-center justify-center w-6 h-6">
                      <Icon
                        className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                          isActive ? "text-cyan-300" : ""
                        }`}
                        style={{
                          color: isActive ? theme.accentPrimary : undefined
                        }}
                      />
                    </div>

                    {spatialRailExpanded && (
                      <span className="text-xs truncate tracking-tight">
                        {item.label}
                      </span>
                    )}

                    {spatialRailExpanded && item.badge && (
                      <span className="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Hover Floating Tooltip when Rail is collapsed */}
                  {!spatialRailExpanded && hoveredItem === item.id && (
                    <div
                      className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl zero-glass-panel border text-xs font-semibold text-white whitespace-nowrap z-50 shadow-2xl pointer-events-none flex items-center gap-2"
                      style={{
                        borderColor: theme.borderHighlight,
                        boxShadow: `0 0 16px ${theme.glow}`
                      }}
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-mono text-cyan-300">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Status / Edition Marker */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center">
        {spatialRailExpanded ? (
          <div className="w-full flex items-center justify-between px-2 text-[10px] font-mono text-slate-500">
            <span>ZERO 3.8</span>
            <span className="text-emerald-400">● LIVE</span>
          </div>
        ) : (
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: theme.accentPrimary,
              boxShadow: `0 0 8px ${theme.glow}`
            }}
            title="ZERO Living Observatory Active"
          />
        )}
      </div>
    </aside>
  );
};
