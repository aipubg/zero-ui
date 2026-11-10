import React, { useState, useEffect, useRef } from "react";
import { useZero } from "../../context/ZeroContext";
import { ORBIT_CAPABILITIES } from "../../theme/tokens";
import { sound } from "../../utils/audio";
import {
  Brain,
  Search,
  Box,
  Code,
  Zap,
  Users,
  Layers,
  Sparkles
} from "lucide-react";

const ICON_MAP = {
  Brain,
  Search,
  FolderGit2: Box,
  Box,
  Code,
  Zap,
  Bot: Users,
  Users,
  Cpu: Layers,
  Layers,
  Sparkles
};

export const ZeroOrbitNavigation = () => {
  const { theme, selectedCapability, setSelectedCapability, reducedMotion } = useZero();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({ rx: 350, ry: 195 });

  const nodeRefs = useRef({});
  const timeRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // 1. Viewport-Responsive Radius Calculation
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Elliptical dimensions that scale naturally across viewports, perfectly framing the Genie
      const rx = Math.min(460, Math.max(280, w * 0.24));
      const ry = Math.min(270, Math.max(160, h * 0.245));
      setDimensions({ rx, ry });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. High-Performance requestAnimationFrame Loop with Harmonic Floating Physics
  useEffect(() => {
    const { rx, ry } = dimensions;

    const animateOrbit = () => {
      timeRef.current += 0.02;
      const t = timeRef.current;

      ORBIT_CAPABILITIES.forEach((cap, idx) => {
        const el = nodeRefs.current[cap.id];
        if (!el) return;

        // Subtle individual breathing float
        const floatY = reducedMotion ? 0 : Math.sin(t * 0.8 + idx * 0.95) * 4;
        const floatX = reducedMotion ? 0 : Math.cos(t * 0.6 + idx * 0.95) * 2;

        const rad = (cap.angle * Math.PI) / 180;
        const x = rx * Math.cos(rad) + floatX;
        const y = ry * Math.sin(rad) + floatY;

        // Depth calculation: nodes lower down appear slightly closer
        const depth = (y + ry) / (ry * 2);
        const scale = cap.isFeatured ? 1.05 : 0.88 + depth * 0.22;
        const opacity = 0.85 + depth * 0.15;
        const zIndex = Math.floor(20 + depth * 20);

        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
      });

      animFrameIdRef.current = requestAnimationFrame(animateOrbit);
    };

    animFrameIdRef.current = requestAnimationFrame(animateOrbit);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [dimensions, reducedMotion]);

  const handleNodeClick = (cap) => {
    sound.select();
    setSelectedCapability(selectedCapability === cap.id ? null : cap.id);
  };

  const handleNodeHover = (cap) => {
    sound.hover();
    setHoveredNode(cap);
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20"
      onMouseLeave={() => setHoveredNode(null)}
    >
      {/* Dynamic Responsive SVG Elliptical Rails */}
      <svg
        className="absolute pointer-events-none overflow-visible"
        style={{
          width: dimensions.rx * 2 + 100,
          height: dimensions.ry * 2 + 60
        }}
        viewBox={`${-dimensions.rx - 50} ${-dimensions.ry - 30} ${
          dimensions.rx * 2 + 100
        } ${dimensions.ry * 2 + 60}`}
      >
        <defs>
          <linearGradient id="orbitGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ffd166" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9d4edd" stopOpacity="0.6" />
          </linearGradient>
          <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Primary Luminous Elliptical Orbit Track */}
        <ellipse
          cx="0"
          cy="0"
          rx={dimensions.rx}
          ry={dimensions.ry}
          fill="none"
          stroke="url(#orbitGlowGradient)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          filter="url(#vectorGlow)"
          className="opacity-60"
        />

        {/* Inner Subtle Coordinate Ring */}
        <ellipse
          cx="0"
          cy="0"
          rx={dimensions.rx * 0.82}
          ry={dimensions.ry * 0.82}
          fill="none"
          stroke="#ffd166"
          strokeWidth="0.75"
          strokeOpacity="0.25"
          strokeDasharray="3 9"
        />
      </svg>

      {/* Floating Spatial Nodes */}
      {ORBIT_CAPABILITIES.map((cap) => {
        const isSelected = selectedCapability === cap.id;
        const isHover = hoveredNode?.id === cap.id;
        const Icon = ICON_MAP[cap.icon] || Sparkles;

        return (
          <div
            key={cap.id}
            data-orbit-id={cap.id}
            ref={(el) => (nodeRefs.current[cap.id] = el)}
            onClick={() => handleNodeClick(cap)}
            onMouseEnter={() => handleNodeHover(cap)}
            className="absolute pointer-events-auto flex flex-col items-center justify-center cursor-pointer group select-none will-change-transform"
          >
            {cap.isFeatured ? (
              /* Canonical Featured Amber "Create" Pill */
              <div
                className={`relative px-7 py-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? "ring-2 ring-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.9)] scale-110 bg-gradient-to-b from-amber-500/50 to-amber-900/80"
                    : isHover
                    ? "scale-105 shadow-[0_0_35px_rgba(245,158,11,0.7)] bg-gradient-to-b from-amber-500/40 to-amber-950/70"
                    : "shadow-[0_0_25px_rgba(245,158,11,0.45)] bg-gradient-to-b from-amber-500/30 to-slate-950/80"
                }`}
                style={{
                  border: "1.5px solid rgba(251, 191, 36, 0.85)",
                  backdropFilter: "blur(16px)"
                }}
              >
                <div className="flex items-center gap-1.5 text-amber-200">
                  <span className="font-mono font-bold text-sm tracking-tight">&lt;/&gt;</span>
                </div>
                <span className="text-[12px] font-bold tracking-wider text-white uppercase drop-shadow-md">
                  Create
                </span>
              </div>
            ) : (
              /* Canonical Circular Glass Disc Node */
              <div className="flex flex-col items-center">
                <div
                  className={`relative w-13 h-13 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? "ring-2 ring-cyan-300 shadow-[0_0_28px_var(--zero-glow)] bg-cyan-950/90 scale-115"
                      : isHover
                      ? "scale-110 shadow-[0_0_20px_var(--zero-glow)] bg-slate-900/90"
                      : "bg-slate-950/80 hover:bg-slate-900/80"
                  }`}
                  style={{
                    border: `1.5px solid ${
                      isSelected
                        ? theme.accentPrimary
                        : isHover
                        ? "rgba(255, 255, 255, 0.45)"
                        : "rgba(255, 255, 255, 0.22)"
                    }`,
                    backdropFilter: "blur(14px)"
                  }}
                >
                  <Icon
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      color: isSelected ? "#ffffff" : cap.color,
                      filter: isSelected ? `drop-shadow(0 0 10px ${cap.color})` : "none"
                    }}
                  />
                </div>

                {/* Subtle Floating Label Directly Underneath Node */}
                <span
                  className="mt-1.5 text-xs font-medium text-slate-200 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  style={{
                    color: isSelected ? "#ffffff" : isHover ? theme.accentPrimary : "rgba(241, 245, 249, 0.9)"
                  }}
                >
                  {cap.label}
                </span>
              </div>
            )}

            {/* Hover Context Tooltip */}
            {isHover && !isSelected && (
              <div className="absolute -top-9 px-3 py-1 rounded-lg bg-black/95 border border-slate-700 text-[11px] text-cyan-200 whitespace-nowrap shadow-2xl pointer-events-none animate-in fade-in duration-200 z-50">
                {cap.shortDesc}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
