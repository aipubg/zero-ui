import React, { useState, useEffect } from "react";
import { useZero } from "../../context/ZeroContext";
import { ORBIT_CAPABILITIES } from "../../theme/tokens";
import { sound } from "../../utils/audio";
import {
  Brain,
  Bot,
  Cpu,
  Zap,
  Monitor,
  Sparkles,
  Blocks,
  Search,
  FolderGit2
} from "lucide-react";

const ICON_MAP = {
  Brain,
  Bot,
  Cpu,
  Zap,
  Monitor,
  Sparkles,
  Blocks,
  Search,
  FolderGit2
};

export const ZeroOrbitNavigation = () => {
  const { theme, selectedCapability, setSelectedCapability, reducedMotion } = useZero();
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Slow continuous orbital revolution when not paused or hovering
  useEffect(() => {
    if (reducedMotion || selectedCapability || isHovered) return;
    const interval = setInterval(() => {
      setRotationOffset(prev => (prev + 0.15) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [reducedMotion, selectedCapability, isHovered]);

  const rx = 340; // horizontal radius
  const ry = 190; // vertical perspective radius

  const handleNodeClick = (cap) => {
    sound.select();
    if (selectedCapability === cap.id) {
      setSelectedCapability(null);
    } else {
      setSelectedCapability(cap.id);
    }
  };

  const handleNodeHover = (cap) => {
    sound.hover();
    setHoveredNode(cap);
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredNode(null);
      }}
    >
      {/* SVG Elliptical Orbital Rails & Glowing Vector Arcs */}
      <svg
        className="absolute w-[800px] h-[480px] pointer-events-none overflow-visible"
        viewBox="-400 -240 800 480"
      >
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.accentPrimary} stopOpacity="0.6" />
            <stop offset="50%" stopColor={theme.accentSecondary} stopOpacity="0.25" />
            <stop offset="100%" stopColor={theme.accentTertiary} stopOpacity="0.5" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Primary Elliptical Orbit Track */}
        <ellipse
          cx="0"
          cy="0"
          rx={rx}
          ry={ry}
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          filter="url(#glowFilter)"
          className="opacity-70"
        />

        {/* Inner Secondary Orbital Ring */}
        <ellipse
          cx="0"
          cy="0"
          rx={rx * 0.72}
          ry={ry * 0.72}
          fill="none"
          stroke={theme.accentPrimary}
          strokeWidth="0.75"
          strokeOpacity="0.25"
          strokeDasharray="3 9"
        />

        {/* Active Node Laser Connector Lines */}
        {selectedCapability && (() => {
          const activeCap = ORBIT_CAPABILITIES.find(c => c.id === selectedCapability);
          if (!activeCap) return null;
          const rad = ((activeCap.angle + rotationOffset) * Math.PI) / 180;
          const nx = rx * Math.cos(rad);
          const ny = ry * Math.sin(rad);
          return (
            <g>
              <line
                x1="0"
                y1="0"
                x2={nx}
                y2={ny}
                stroke={theme.accentPrimary}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="animate-pulse"
                filter="url(#glowFilter)"
              />
              <circle
                cx={nx}
                cy={ny}
                r="30"
                fill="none"
                stroke={theme.accentPrimary}
                strokeWidth="1.5"
                opacity="0.8"
                className="animate-ping"
              />
            </g>
          );
        })()}
      </svg>

      {/* Floating Orbital Interactive Capability Nodes */}
      {ORBIT_CAPABILITIES.map((cap) => {
        const rad = ((cap.angle + rotationOffset) * Math.PI) / 180;
        const x = rx * Math.cos(rad);
        const y = ry * Math.sin(rad);
        const isSelected = selectedCapability === cap.id;
        const isHover = hoveredNode?.id === cap.id;
        const IconComponent = ICON_MAP[cap.icon] || Sparkles;

        // Depth scale: nodes further in the back (negative y) are slightly smaller
        const depthScale = 0.88 + ((y + ry) / (ry * 2)) * 0.24;

        return (
          <div
            key={cap.id}
            style={{
              transform: `translate3d(${x}px, ${y}px, 0) scale(${depthScale})`,
              transition: isHovered ? "transform 0.15s ease" : "none"
            }}
            className="absolute pointer-events-auto flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => handleNodeClick(cap)}
            onMouseEnter={() => handleNodeHover(cap)}
          >
            {/* Luminous Node Core */}
            <div
              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSelected
                  ? "scale-125 ring-2 ring-cyan-300 shadow-[0_0_28px_var(--zero-glow)] bg-cyan-950/80"
                  : "hover:scale-115 hover:shadow-[0_0_20px_var(--zero-glow)] bg-slate-950/75"
              }`}
              style={{
                border: `1.5px solid ${isSelected ? theme.accentPrimary : "rgba(255, 255, 255, 0.18)"}`,
                backdropFilter: "blur(12px)"
              }}
            >
              {/* Outer micro orbital pulse */}
              <div
                className="absolute inset-0 rounded-full border border-dashed opacity-0 group-hover:opacity-80 animate-spin"
                style={{
                  borderColor: cap.color,
                  animationDuration: "8s"
                }}
              />

              {/* Icon */}
              <IconComponent
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  color: isSelected ? "#ffffff" : cap.color,
                  filter: isSelected ? `drop-shadow(0 0 8px ${cap.color})` : "none"
                }}
              />

              {/* Active selection dot */}
              {isSelected && (
                <span
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"
                  style={{ backgroundColor: theme.accentPrimary }}
                />
              )}
            </div>

            {/* Minimal Holographic Label Pill (No bulky box!) */}
            <div
              className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300 pointer-events-none flex items-center gap-1.5 ${
                isSelected
                  ? "bg-cyan-500/25 border border-cyan-400 text-white shadow-lg"
                  : isHover
                  ? "bg-slate-900/90 border border-slate-600 text-slate-100"
                  : "bg-slate-950/60 border border-slate-800/80 text-slate-300 opacity-80"
              }`}
            >
              <span>{cap.label}</span>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </div>

            {/* Hover Micro-Badge with Quick Status */}
            {isHover && !isSelected && (
              <div className="absolute top-16 px-2 py-0.5 rounded-md bg-black/90 border border-slate-700 text-[10px] text-cyan-200 whitespace-nowrap shadow-xl animate-fade-in">
                {cap.shortDesc}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
