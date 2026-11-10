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
    <div className="relative w-[720px] h-[760px] flex items-center justify-center select-none pointer-events-none z-15">
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
          className={`absolute top-10 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
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

        {/* Independent Transparent Holographic AI Genie Asset with Responsive Proportions */}
        <div 
          className="relative w-[clamp(380px,36vw,600px)] h-[clamp(440px,58vh,690px)] flex items-center justify-center animate-hologram-float"
        >
          <img
            src="/assets/hologram-genie-alpha.png"
            alt="ZERO Autonomous AI Genie Companion"
            className="w-full h-full object-contain pointer-events-none"
            style={{
              filter: `contrast(1.06) brightness(1.05) drop-shadow(0 16px 32px rgba(0,0,0,0.45))`
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
              className="absolute top-[35%] right-20 w-28 h-28 rounded-full border-2 animate-ping opacity-75 pointer-events-none"
              style={{ borderColor: theme.accentPrimary }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
