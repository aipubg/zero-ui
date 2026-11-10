import React from "react";
import { useZero } from "../../context/ZeroContext";
import { ZeroParticleField } from "./ZeroParticleField";
import { ZeroHolographicCompanion } from "./ZeroHolographicCompanion";
import { ZeroMascotCompanion } from "./ZeroMascotCompanion";
import { ZeroOrbitNavigation } from "./ZeroOrbitNavigation";
import { ZeroContextPanel } from "./ZeroContextPanel";

export const ZeroObservatoryScene = () => {
  const { currentEnv, theme } = useZero();

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

      {/* Layer 5: Greeting Header (Elegant, unobtrusive, placed in high atmosphere) */}
      <div className="absolute top-16 left-24 pointer-events-none z-10 flex flex-col items-start">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full zero-glass-pill border border-slate-700/60 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-200">
            OBSERVATORY SANCTUARY · SYNCHRONIZED
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 font-display">
          <span>Good Evening,</span>
          <span
            className="text-transparent bg-clip-text font-black"
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentPrimary} 0%, ${theme.accentTertiary} 100%)`
            }}
          >
            Owner
          </span>
          <span className="text-amber-300 text-2xl animate-pulse">✦</span>
        </h1>
        <p className="text-xs text-slate-300/80 font-medium tracking-wide mt-0.5">
          "Think · Build · Automate with ZERO"
        </p>
      </div>

      {/* Layer 6: Center Stage — Holographic AI Companion */}
      <div className="relative z-15 flex items-center justify-center -mt-6">
        <ZeroHolographicCompanion />
      </div>

      {/* Layer 7: Plush Robot Mascot & Companion */}
      <ZeroMascotCompanion />

      {/* Layer 8: Radial / Orbital Interactive Navigation Ring */}
      <ZeroOrbitNavigation />

      {/* Layer 9: Floating Contextual Drawer (When an orbital node is selected) */}
      <ZeroContextPanel />
    </div>
  );
};
