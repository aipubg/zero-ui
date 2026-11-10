import React, { useState, useEffect, useRef } from "react";
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
  Blocks
} from "lucide-react";

const ICON_MAP = {
  Brain,
  Bot,
  Cpu,
  Zap,
  Monitor,
  Sparkles,
  Blocks
};

export const ZeroOrbitNavigation = () => {
  const { theme, selectedCapability, setSelectedCapability, reducedMotion } = useZero();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({ rx: 340, ry: 190 });

  const nodeRefs = useRef({});
  const rotationAngleRef = useRef(0);
  const isPausedRef = useRef(false);
  const animFrameIdRef = useRef(null);

  // 1. Viewport-Responsive Radius Calculation
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Responsive elliptical dimensions that scale naturally from 1366x768 to 2560x1440
      const rx = Math.min(420, Math.max(250, w * 0.23));
      const ry = Math.min(220, Math.max(135, h * 0.19));
      setDimensions({ rx, ry });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update pause ref when hover or selection changes (avoids re-binding the rAF loop)
  useEffect(() => {
    isPausedRef.current = !!(selectedCapability || hoveredNode || reducedMotion);
  }, [selectedCapability, hoveredNode, reducedMotion]);

  // 2. High-Performance requestAnimationFrame Loop (Direct DOM Transform — Zero React Rerenders!)
  useEffect(() => {
    const { rx, ry } = dimensions;

    const animateOrbit = () => {
      if (!isPausedRef.current) {
        rotationAngleRef.current = (rotationAngleRef.current + 0.18) % 360;
      }

      const rot = rotationAngleRef.current;

      ORBIT_CAPABILITIES.forEach((cap) => {
        const el = nodeRefs.current[cap.id];
        if (!el) return;

        const rad = ((cap.angle + rot) * Math.PI) / 180;
        const x = rx * Math.cos(rad);
        const y = ry * Math.sin(rad);

        // Genuine 3D Depth Perception:
        // Depth factor ranges from 0.0 (deep in back) to 1.0 (close in front)
        const depth = (y + ry) / (ry * 2);
        const scale = 0.82 + depth * 0.35;
        const opacity = 0.6 + depth * 0.4;
        const zIndex = Math.floor(10 + depth * 20);

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
  }, [dimensions]);

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
            <stop offset="0%" stopColor={theme.accentPrimary} stopOpacity="0.75" />
            <stop offset="50%" stopColor={theme.accentSecondary} stopOpacity="0.25" />
            <stop offset="100%" stopColor={theme.accentTertiary} stopOpacity="0.65" />
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
          strokeWidth="1.75"
          strokeDasharray="8 10"
          filter="url(#vectorGlow)"
          className="opacity-70"
        />

        {/* Inner Coordinate Ring */}
        <ellipse
          cx="0"
          cy="0"
          rx={dimensions.rx * 0.76}
          ry={dimensions.ry * 0.76}
          fill="none"
          stroke={theme.accentPrimary}
          strokeWidth="0.75"
          strokeOpacity="0.2"
          strokeDasharray="4 12"
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
            {/* Luminous Core Ring (No bulky box!) */}
            <div
              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSelected
                  ? "ring-2 ring-cyan-300 shadow-[0_0_28px_var(--zero-glow)] bg-cyan-950/90 scale-120"
                  : isHover
                  ? "scale-115 shadow-[0_0_20px_var(--zero-glow)] bg-slate-900/90"
                  : "bg-slate-950/80"
              }`}
              style={{
                border: `1.5px solid ${
                  isSelected
                    ? theme.accentPrimary
                    : isHover
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(255, 255, 255, 0.18)"
                }`,
                backdropFilter: "blur(14px)"
              }}
            >
              {/* Outer micro-dashed orbit spinner */}
              <div
                className="absolute inset-0 rounded-full border border-dashed opacity-0 group-hover:opacity-80 animate-spin pointer-events-none"
                style={{
                  borderColor: cap.color,
                  animationDuration: "8s"
                }}
              />

              {/* Node Icon */}
              <Icon
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  color: isSelected ? "#ffffff" : cap.color,
                  filter: isSelected ? `drop-shadow(0 0 10px ${cap.color})` : "none"
                }}
              />

              {/* Active selection ping dot */}
              {isSelected && (
                <span
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"
                  style={{ backgroundColor: theme.accentPrimary }}
                />
              )}
            </div>

            {/* Minimal Holographic Floating Label */}
            <div
              className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300 pointer-events-none flex items-center gap-1.5 ${
                isSelected
                  ? "bg-cyan-500/30 border border-cyan-400 text-white shadow-lg"
                  : isHover
                  ? "bg-slate-900/95 border border-slate-600 text-slate-100 shadow-md"
                  : "bg-slate-950/60 border border-slate-800/80 text-slate-300 opacity-80"
              }`}
            >
              <span>{cap.label}</span>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </div>

            {/* Hover Micro Status Badge */}
            {isHover && !isSelected && (
              <div className="absolute top-16 px-2.5 py-1 rounded-lg bg-black/95 border border-slate-700 text-[10px] text-cyan-200 whitespace-nowrap shadow-2xl pointer-events-none animate-in fade-in duration-200 z-50">
                {cap.shortDesc}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
