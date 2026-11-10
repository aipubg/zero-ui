import React from "react";
import { useZero } from "../../context/ZeroContext";
import { ZeroParticleField } from "./ZeroParticleField";
import { ZeroHolographicCompanion } from "./ZeroHolographicCompanion";
import { ZeroMascotCompanion } from "./ZeroMascotCompanion";
import { ZeroOrbitNavigation } from "./ZeroOrbitNavigation";
import { ZeroContextPanel } from "./ZeroContextPanel";
import {
  Sliders,
  Palette,
  Image as ImageIcon,
  Maximize2
} from "lucide-react";

export const ZeroObservatoryScene = () => {
  const { currentEnv, theme, navigateTo, spatialRailExpanded } = useZero();

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center select-none">
      {/* Layer 1: High Resolution Atmospheric Environment Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none scale-105"
        style={{
          backgroundImage: `url(${currentEnv.path})`,
          filter: "brightness(0.55) contrast(1.1) saturate(1.2)"
        }}
      />

      {/* Layer 2: Deep Midnight Sanctuary Vignette & Gradients for Crisp Text Contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(3, 7, 18, 0.25) 0%, rgba(3, 7, 18, 0.75) 65%, #030712 100%)`
        }}
      />

      {/* Layer 3: Dynamic Theme-Colored Ambient Bloom / Glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-[100%] blur-[120px] pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(ellipse at center, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 50%, transparent 80%)`
        }}
      />

      {/* Layer 4: Interactive Floating Starlight & Petals Particle Field */}
      <ZeroParticleField />

      {/* Layer 5: Greeting Header (Exact Reference Image 1 copy & typography) */}
      <div
        className="absolute top-20 pointer-events-none z-10 flex flex-col items-start animate-in fade-in duration-500 transition-all"
        style={{
          left: spatialRailExpanded ? "17.5rem" : "5.5rem"
        }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-display">
          Good Evening,
        </h1>
        <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-2 mt-0.5">
          <span
            className="text-transparent bg-clip-text font-black"
            style={{
              backgroundImage: `linear-gradient(135deg, #e0aaff 0%, #c084fc 100%)`
            }}
          >
            Owner
          </span>
          <span className="text-amber-300 text-2xl animate-pulse">✦</span>
        </h2>
        <p className="text-xs text-slate-300/80 italic font-medium tracking-wide mt-2">
          “Think · Build · Automate With ZERO.”
        </p>
      </div>

      {/* Layer 6: Center Stage — Holographic AI Companion */}
      <div className="relative z-15 flex items-center justify-center -mt-6">
        <ZeroHolographicCompanion />
      </div>

      {/* Layer 7: Plush Robot Mascot & Sleeping Kitten on Velvet Rug */}
      <ZeroMascotCompanion />

      {/* Layer 8: Radial / Orbital Interactive Navigation Ring (7 Canonical Nodes) */}
      <ZeroOrbitNavigation />

      {/* Layer 9: Floor ZERO Core Monogram & Radiant Sonic Wave Filaments */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto z-20 select-none">
        <svg className="w-48 h-10 opacity-80" viewBox="0 0 180 36">
          <path
            d="M 180 18 Q 120 4 80 18 T 0 18"
            fill="none"
            stroke="url(#sonicGlowLeft)"
            strokeWidth="2.5"
          />
          <path
            d="M 180 18 Q 130 30 90 18 T 10 18"
            fill="none"
            stroke="url(#sonicGlowLeft)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <defs>
            <linearGradient id="sonicGlowLeft" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Glowing ZERO Ring Emblem */}
        <button
          onClick={() => navigateTo("chat")}
          className="relative w-15 h-15 rounded-full flex items-center justify-center mx-2 group cursor-pointer transition-all duration-300 hover:scale-110"
          title="Open ZERO Core Intelligence"
        >
          <div className="absolute inset-0 rounded-full blur-lg bg-cyan-400/60 group-hover:bg-purple-500/70 transition-colors" />
          <div className="relative w-13 h-13 rounded-full border-2 border-cyan-300/90 bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,242,254,0.8)]">
            <div className="w-7 h-7 rounded-full border-2 border-dashed border-cyan-200 group-hover:rotate-90 transition-transform duration-700 flex items-center justify-center">
              <span className="font-extrabold text-base text-white font-mono">Ø</span>
            </div>
          </div>
        </button>

        <svg className="w-48 h-10 opacity-80" viewBox="0 0 180 36">
          <path
            d="M 0 18 Q 60 4 100 18 T 180 18"
            fill="none"
            stroke="url(#sonicGlowRight)"
            strokeWidth="2.5"
          />
          <path
            d="M 0 18 Q 50 30 90 18 T 170 18"
            fill="none"
            stroke="url(#sonicGlowRight)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <defs>
            <linearGradient id="sonicGlowRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Layer 10: Quick Tools Dock (Bottom Right) */}
      <div className="absolute bottom-5 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full zero-glass-pill border border-slate-700/60 shadow-xl z-20 pointer-events-auto backdrop-blur-xl">
        <button
          onClick={() => navigateTo("settings")}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Settings"
        >
          <Sliders className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigateTo("appearance")}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Color Themes"
        >
          <Palette className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigateTo("appearance")}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Observatory Backgrounds"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen().catch(() => {});
            }
          }}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Layer 11: Floating Contextual Drawer (When an orbital node is selected) */}
      <ZeroContextPanel />
    </div>
  );
};
