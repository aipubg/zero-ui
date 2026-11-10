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
  Box,
  Code,
  Zap,
  Users,
  Layers,
  Sparkles
};

export const ZeroOrbitNavigation = () => {
  const { theme, selectedCapability, setSelectedCapability, reducedMotion } = useZero();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({ rx: 430, ry: 215 });

  const nodeRefs = useRef({});
  const timeRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // 1. Viewport-Responsive Radius Calculation (Matching Image 2 Perspective Arc)
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const rx = Math.min(450, Math.max(300, w * 0.225));
      const ry = Math.min(235, Math.max(150, h * 0.20));
      setDimensions({ rx, ry });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. High-Performance rAF Loop with Harmonic 3D Floating Physics
  useEffect(() => {
    const { rx, ry } = dimensions;

    const animateOrbit = () => {
      timeRef.current += 0.02;
      const t = timeRef.current;

      ORBIT_CAPABILITIES.forEach((cap, idx) => {
        const el = nodeRefs.current[cap.id];
        if (!el) return;

        // Subtle harmonic floating breathing
        const floatY = reducedMotion ? 0 : Math.sin(t * 0.75 + idx * 0.95) * 3.0;
        const floatX = reducedMotion ? 0 : Math.cos(t * 0.55 + idx * 0.95) * 1.5;

        const rad = (cap.angle * Math.PI) / 180;
        const x = rx * Math.cos(rad) + floatX;
        const y = ry * Math.sin(rad) + floatY;

        // Depth perspective calculation
        const depth = (y + ry) / (ry * 2);
        const scale = cap.isFeatured ? 1.08 : 0.92 + depth * 0.16;
        const opacity = 0.88 + depth * 0.12;
        const zIndex = Math.floor(20 + depth * 20);

        // 3D Perspective tilt based on left/center/right position (Image 2 style)
        const rotY = x < -40 ? 12 : x > 40 ? -12 : 0;
        const rotX = 10 - depth * 6;

        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) perspective(800px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
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
      {/* 3D Perspective Elliptical Orbital Rails (Matching Image 2) */}
      <svg
        className="absolute pointer-events-none overflow-visible"
        style={{
          width: dimensions.rx * 2 + 80,
          height: dimensions.ry * 2 + 60
        }}
        viewBox={`${-dimensions.rx - 40} ${-dimensions.ry - 30} ${
          dimensions.rx * 2 + 80
        } ${dimensions.ry * 2 + 60}`}
      >
        <defs>
          <linearGradient id="orbitStarlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#818cf8" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.85" />
          </linearGradient>
          <filter id="orbitFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Primary Radiant Starlight Ring Track (Exact alignment with nodes) */}
        <ellipse
          cx="0"
          cy="0"
          rx={dimensions.rx}
          ry={dimensions.ry}
          fill="none"
          stroke="url(#orbitStarlightGradient)"
          strokeWidth="1.8"
          strokeDasharray="6 8"
          filter="url(#orbitFilter)"
          className="opacity-80"
        />

        {/* Crisp Inner Guide Ring */}
        <ellipse
          cx="0"
          cy="0"
          rx={dimensions.rx * 0.88}
          ry={dimensions.ry * 0.88}
          fill="none"
          stroke="#00f2fe"
          strokeWidth="0.8"
          strokeOpacity="0.35"
          strokeDasharray="2 6"
        />

        {/* Glowing Anchor Beads on Track */}
        {ORBIT_CAPABILITIES.map((cap) => {
          const rad = (cap.angle * Math.PI) / 180;
          const bx = dimensions.rx * Math.cos(rad);
          const by = dimensions.ry * Math.sin(rad);
          return (
            <circle
              key={cap.id}
              cx={bx}
              cy={by}
              r={cap.isFeatured ? 4 : 2.5}
              fill={cap.isFeatured ? "#fbbf24" : "#00f2fe"}
              opacity={0.8}
            />
          );
        })}
      </svg>

      {/* 3D Tactile Holographic Capability Shields (Exact Match to Image 2) */}
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
              /* Center Bottom: Featured Amber-Gold "Create" Shield (Image 2) */
              <div
                className={`relative px-7 py-2.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? "ring-2 ring-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.95)] scale-110 bg-gradient-to-b from-amber-500/50 to-amber-950/90"
                    : isHover
                    ? "scale-105 shadow-[0_0_32px_rgba(245,158,11,0.8)] bg-gradient-to-b from-amber-500/40 to-amber-950/80"
                    : "shadow-[0_0_24px_rgba(245,158,11,0.55)] bg-gradient-to-b from-amber-500/25 to-slate-950/85"
                }`}
                style={{
                  border: "1.75px solid rgba(251, 191, 36, 0.9)",
                  backdropFilter: "blur(20px)"
                }}
              >
                <div className="flex items-center gap-1.5 text-amber-200">
                  <span className="font-mono font-bold text-base tracking-tight">&lt;/&gt;</span>
                </div>
                <span className="text-[11px] font-extrabold tracking-wider text-white uppercase drop-shadow-md">
                  Create
                </span>
              </div>
            ) : (
              /* Surrounding 3D Holographic Glass Shields (Image 2 Style) */
              <div
                className={`relative px-4 py-2 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 min-w-[90px] ${
                  isSelected
                    ? "ring-2 ring-cyan-300 shadow-[0_0_28px_rgba(0,242,254,0.7)] bg-cyan-950/90 scale-110"
                    : isHover
                    ? "scale-105 shadow-[0_0_22px_rgba(0,242,254,0.5)] bg-slate-900/90 border-cyan-400/80"
                    : "bg-slate-950/70 hover:bg-slate-900/80 shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                }`}
                style={{
                  border: `1.5px solid ${
                    isSelected
                      ? theme.accentPrimary
                      : isHover
                      ? "rgba(0, 242, 254, 0.75)"
                      : "rgba(147, 197, 253, 0.25)"
                  }`,
                  backdropFilter: "blur(18px)"
                }}
              >
                <Icon
                  className="w-4 h-4 mb-0.5 transition-transform duration-300 group-hover:scale-115"
                  style={{
                    color: isSelected ? "#ffffff" : cap.color,
                    filter: isSelected ? `drop-shadow(0 0 8px ${cap.color})` : "none"
                  }}
                />
                <span
                  className="text-[10.5px] font-semibold tracking-wide transition-colors"
                  style={{
                    color: isSelected ? "#ffffff" : isHover ? "#ffffff" : "rgba(241, 245, 249, 0.9)"
                  }}
                >
                  {cap.label}
                </span>
              </div>
            )}

            {/* Hover Context Tooltip */}
            {isHover && !isSelected && (
              <div className="absolute -top-9 px-2.5 py-1 rounded-lg bg-black/95 border border-slate-700 text-[10px] text-cyan-200 whitespace-nowrap shadow-2xl pointer-events-none animate-in fade-in duration-200 z-50">
                {cap.shortDesc}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
