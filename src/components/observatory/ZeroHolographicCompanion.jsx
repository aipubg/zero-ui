import React, { useState, useEffect } from "react";
import { useZero } from "../../context/ZeroContext";
import { ZeroThreeHologram } from "./ZeroThreeHologram";
import { Sparkles, Mic, Activity, CheckCircle, AlertCircle } from "lucide-react";

export const ZeroHolographicCompanion = () => {
  const {
    theme,
    hologramGlow,
    hologramVisible,
    isListening,
    companionState = "idle"
  } = useZero();

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Subtle 3D perspective parallax tracking mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMouseOffset({ x: x * 5, y: y * 3 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!hologramVisible) return null;

  // Active state determination
  const activeState = isListening ? "listening" : companionState;

  return (
    <div className="relative w-[640px] h-[640px] flex items-center justify-center select-none pointer-events-none z-15">
      {/* 1. Three.js WebGL 3D Dais, Light Pillar & Volumetric Particles */}
      <ZeroThreeHologram companionState={activeState} />

      {/* 2. Character Presence Container with 3D Depth Tilting */}
      <div
        className="relative flex flex-col items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mouseOffset.x}deg) rotateX(${-mouseOffset.y}deg)`,
          filter: `drop-shadow(0 0 ${hologramGlow * 0.35}px ${theme.glow})`
        }}
      >
        {/* State-specific Energy Halo Radiating Behind Character Head */}
        <div
          className={`absolute top-10 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            activeState === "listening"
              ? "opacity-60 scale-125"
              : activeState === "thinking"
              ? "opacity-50 scale-110"
              : "opacity-35 scale-100"
          }`}
          style={{
            background: `radial-gradient(circle at center, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 45%, transparent 75%)`
          }}
        />

        {/* Outer Circular Celestial Starlight Ring behind Head */}
        <div
          className="absolute top-16 w-72 h-72 rounded-full border border-dashed opacity-40 animate-spin pointer-events-none"
          style={{
            borderColor: theme.accentTertiary,
            animationDuration: "50s",
            boxShadow: `0 0 20px ${theme.glowSecondary}`
          }}
        />

        {/* Independent Transparent Holographic AI Genie Asset with Smooth Energy Fade */}
        <div 
          className="relative w-[480px] h-[540px] flex items-center justify-center animate-hologram-float"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.6) 84%, rgba(0,0,0,0.15) 94%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.6) 84%, rgba(0,0,0,0.15) 94%, transparent 100%)"
          }}
        >
          <img
            src="/assets/hologram-genie-alpha.png"
            alt="ZERO Autonomous AI Genie Companion"
            className="w-full h-full object-contain pointer-events-none"
            style={{
              filter: `contrast(1.08) brightness(1.04) drop-shadow(0 12px 24px rgba(0,0,0,0.5))`
            }}
          />

          {/* Procedural Holographic Scanline Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 242, 254, 0.25) 4px, rgba(0, 242, 254, 0.25) 5px)",
              maskImage: "radial-gradient(ellipse at center, black 60%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 95%)"
            }}
          />

          {/* Active Voice Listening Acoustic Wave Ripple */}
          {activeState === "listening" && (
            <div
              className="absolute top-[48%] right-28 w-24 h-24 rounded-full border-2 animate-ping opacity-75 pointer-events-none"
              style={{ borderColor: theme.accentPrimary }}
            />
          )}
        </div>

        {/* Subtitle / Holographic Status Indicator Pill */}
        <div
          className="absolute -bottom-4 flex items-center gap-2 px-4 py-1.5 rounded-full zero-glass-pill border shadow-xl backdrop-blur-xl"
          style={{
            borderColor: theme.borderHighlight,
            boxShadow: `0 0 16px ${theme.glow}`
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: theme.accentPrimary }}
          />
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-200">
            {activeState === "listening"
              ? "ZERO · Listening to Voice"
              : activeState === "thinking"
              ? "ZERO · Synthesizing Intent"
              : activeState === "completed"
              ? "ZERO · Task Completed"
              : "ZERO · Living Intelligence"}
          </span>
          <span className="text-[10px] text-amber-300 font-mono font-bold">
            v3.8
          </span>
        </div>
      </div>
    </div>
  );
};
