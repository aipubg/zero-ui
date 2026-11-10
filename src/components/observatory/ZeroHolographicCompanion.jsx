import React, { useState, useEffect } from "react";
import { useZero } from "../../context/ZeroContext";

export const ZeroHolographicCompanion = () => {
  const { theme, hologramGlow, hologramVisible, isListening } = useZero();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Subtle 3D spatial tilt reacting to user mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMouseOffset({ x: x * 6, y: y * 4 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!hologramVisible) return null;

  return (
    <div
      className="relative flex items-center justify-center pointer-events-none select-none z-15"
      style={{
        transform: `perspective(1000px) rotateY(${mouseOffset.x}deg) rotateX(${-mouseOffset.y}deg)`,
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {/* Luminous energy field & floor dais glow beneath character */}
      <div
        className="absolute -bottom-16 w-[480px] h-[120px] rounded-[100%] blur-3xl opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 50%, transparent 80%)`,
          boxShadow: `0 0 ${hologramGlow * 0.8}px ${theme.glow}`
        }}
      />

      {/* Floating 3D Concentric Dais Rings on the Floor */}
      <div className="absolute -bottom-12 flex items-center justify-center pointer-events-none">
        <div
          className="w-80 h-28 rounded-[100%] border border-cyan-400/40 animate-orbit-slow"
          style={{
            borderColor: theme.accentPrimary,
            boxShadow: `0 0 16px ${theme.glow}, inset 0 0 16px ${theme.glow}`
          }}
        />
        <div
          className="absolute w-60 h-20 rounded-[100%] border border-purple-400/30"
          style={{
            borderColor: theme.accentSecondary,
            boxShadow: `0 0 12px ${theme.glowSecondary}`
          }}
        />
        <div
          className="absolute w-40 h-12 rounded-[100%] border border-amber-300/40 animate-pulse-glow"
          style={{
            borderColor: theme.accentTertiary
          }}
        />
      </div>

      {/* Central Holographic Presence Aura */}
      <div
        className="relative flex flex-col items-center justify-center animate-hologram-float"
        style={{
          filter: `drop-shadow(0 0 ${hologramGlow * 0.3}px ${theme.glow})`
        }}
      >
        {/* Hologram Light Column / Atmospheric Beam */}
        <div
          className="absolute -top-24 w-72 h-[520px] rounded-full blur-2xl opacity-25 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 60%, transparent 85%)`
          }}
        />

        {/* Outer Celestial Ring Halo behind Head */}
        <div
          className="absolute top-12 w-64 h-64 rounded-full border border-dashed opacity-40 animate-spin"
          style={{
            borderColor: theme.accentTertiary,
            animationDuration: "45s",
            boxShadow: `0 0 20px ${theme.glowSecondary}`
          }}
        />

        {/* Luminous Star Orb Floating in AI's Hand */}
        <div className="absolute top-[48%] right-24 pointer-events-none z-30">
          <div
            className="w-12 h-12 rounded-full relative flex items-center justify-center animate-pulse-glow"
            style={{
              background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${theme.accentPrimary} 45%, ${theme.accentSecondary} 90%)`,
              boxShadow: `0 0 35px 8px ${theme.glow}, 0 0 15px #fff`
            }}
          >
            {/* Orbital micro-rings around the star orb */}
            <div
              className="absolute w-20 h-7 rounded-full border border-cyan-300/80 -rotate-12 animate-orbit-slow"
              style={{ borderColor: theme.accentPrimary }}
            />
            <div
              className="absolute w-16 h-6 rounded-full border border-amber-300/70 rotate-45"
              style={{ borderColor: theme.accentTertiary }}
            />
          </div>
        </div>

        {/* Living Holographic Character Artwork Canvas with Smooth Blending */}
        <div className="relative w-[500px] h-[520px] overflow-hidden flex items-center justify-center">
          <img
            src="/assets/env-sanctuary.jpg"
            alt="ZERO Autonomous AI Companion"
            className="w-full h-full object-cover object-center pointer-events-none"
            style={{
              clipPath: "ellipse(48% 48% at 50% 50%)",
              filter: `${theme.hologramFilter} contrast(1.05)`,
              maskImage: "radial-gradient(circle at 50% 48%, black 45%, rgba(0,0,0,0.85) 65%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 48%, black 45%, rgba(0,0,0,0.85) 65%, transparent 78%)"
            }}
          />

          {/* Holographic Scanline Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 242, 254, 0.15) 3px, rgba(0, 242, 254, 0.15) 4px)"
            }}
          />

          {/* Voice Listening Active Wave Ring Overlay */}
          {isListening && (
            <div
              className="absolute inset-10 rounded-full border-2 border-cyan-400 animate-ping opacity-60"
              style={{ borderColor: theme.accentPrimary }}
            />
          )}
        </div>

        {/* Subtitle / Status Glow Badge */}
        <div className="absolute bottom-6 flex items-center gap-2 px-4 py-1.5 rounded-full zero-glass-pill border border-cyan-400/30">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: theme.accentPrimary }}
          />
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-200">
            {isListening ? "Listening..." : "ZERO · Living Intelligence"}
          </span>
          <span className="text-[10px] text-amber-300/80 font-mono">v3.8</span>
        </div>
      </div>
    </div>
  );
};
