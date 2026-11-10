import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import { Sparkles, Heart } from "lucide-react";

export const ZeroMascotCompanion = () => {
  const {
    theme,
    mascotVisible,
    mascotEmotion,
    setMascotEmotion,
    reducedMotion,
    spatialRailExpanded
  } = useZero();

  const [speechBubble, setSpeechBubble] = useState("Hi Owner! All systems running smooth! ✨");
  const [showBubble, setShowBubble] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  if (!mascotVisible) return null;

  const handleMascotClick = () => {
    sound.mascotChirp();
    setIsBouncing(true);
    setShowBubble(true);

    const quotes = [
      "All 3 background agents are cruising along! 🚀",
      "I'm keeping watch over your gateway and memory!",
      "Zero and I are ready whenever you want to build! ☕",
      "Everything is 100% synchronized, Owner!",
      "Teamwork makes the dream work! Let's do this! ✨"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeechBubble(randomQuote);

    // Cycle emotion on click
    const emotions = ["happy", "curious", "proud", "thinking"];
    const nextEmotion = emotions[(emotions.indexOf(mascotEmotion) + 1) % emotions.length];
    setMascotEmotion(nextEmotion);

    setTimeout(() => setIsBouncing(false), 700);
    setTimeout(() => setShowBubble(false), 4500);
  };

  return (
    <div
      className={`absolute ${
        spatialRailExpanded ? "left-72" : "left-20"
      } bottom-20 z-20 select-none pointer-events-auto transition-all duration-300`}
    >
      {/* Speech / Thought Bubble */}
      {showBubble && (
        <div
          className="absolute -top-16 left-6 px-4 py-2 rounded-2xl zero-glass-panel border text-xs font-semibold text-slate-100 flex items-center gap-2 shadow-2xl animate-bounce backdrop-blur-2xl whitespace-nowrap"
          style={{
            borderColor: theme.accentPrimary,
            boxShadow: `0 0 20px ${theme.glow}`
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>{speechBubble}</span>
          <div
            className="absolute -bottom-1.5 left-8 w-3 h-3 rotate-45 border-r border-b"
            style={{
              background: theme.surfaceSolid,
              borderColor: theme.accentPrimary
            }}
          />
        </div>
      )}

      {/* Mascot Interactive Wrapper */}
      <div
        data-mascot="true"
        onClick={handleMascotClick}
        onMouseEnter={() => sound.hover()}
        className={`group relative cursor-pointer flex flex-col items-center transition-transform duration-300 ${
          isBouncing
            ? "scale-110 -translate-y-2 rotate-2"
            : "hover:scale-105 hover:-translate-y-1"
        }`}
        title="ZERO Buddy Mascot (Click to interact and change expression)"
      >
        {/* Soft Glowing Plush Floor Cushion Underneath */}
        <div
          className="absolute -bottom-4 w-44 h-12 rounded-[100%] blur-md opacity-60 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${theme.accentSecondary} 0%, transparent 75%)`
          }}
        />

        {/* Mascot Character Container */}
        <div
          className={`relative w-40 h-44 flex items-center justify-center ${
            reducedMotion ? "" : "animate-mascot-idle"
          }`}
        >
          {/* Glowing Headphone Ear Halos */}
          <div
            className="absolute top-7 left-3 w-7 h-7 rounded-full border-2 opacity-85 group-hover:scale-110 transition-transform pointer-events-none"
            style={{
              borderColor: theme.accentPrimary,
              boxShadow: `0 0 14px ${theme.glow}`
            }}
          />
          <div
            className="absolute top-7 right-3 w-7 h-7 rounded-full border-2 opacity-85 group-hover:scale-110 transition-transform pointer-events-none"
            style={{
              borderColor: theme.accentPrimary,
              boxShadow: `0 0 14px ${theme.glow}`
            }}
          />

          {/* Genuine Independent Transparent Robot Mascot Asset */}
          <img
            src="/assets/robot-mascot-alpha.png"
            alt="ZERO Buddy Robot Mascot"
            className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
          />

          {/* Precision LED Eye Expression Overlay (Accurately Aligned to Eyes) */}
          <div className="absolute top-[32%] left-[28%] right-[28%] flex items-center justify-between pointer-events-none">
            {mascotEmotion === "happy" && (
              <>
                <svg className="w-5 h-4" viewBox="0 0 20 16" fill="none">
                  <path
                    d="M3 11 C 6 4, 14 4, 17 11"
                    stroke={theme.accentPrimary}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <svg className="w-5 h-4" viewBox="0 0 20 16" fill="none">
                  <path
                    d="M3 11 C 6 4, 14 4, 17 11"
                    stroke={theme.accentPrimary}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </>
            )}

            {mascotEmotion === "thinking" && (
              <>
                <div
                  className="w-4 h-4 rounded-full border-2 border-dashed animate-spin"
                  style={{ borderColor: theme.accentTertiary }}
                />
                <div
                  className="w-4 h-4 rounded-full border-2 border-dashed animate-spin"
                  style={{ borderColor: theme.accentTertiary }}
                />
              </>
            )}

            {mascotEmotion === "curious" && (
              <>
                <div
                  className="w-4 h-4 rounded-full animate-ping"
                  style={{ backgroundColor: theme.accentPrimary }}
                />
                <div
                  className="w-4 h-4 rounded-full animate-ping"
                  style={{ backgroundColor: theme.accentPrimary }}
                />
              </>
            )}

            {mascotEmotion === "sleepy" && (
              <>
                <div className="w-4 h-1 rounded-full bg-slate-300 opacity-80" />
                <div className="w-4 h-1 rounded-full bg-slate-300 opacity-80" />
              </>
            )}

            {mascotEmotion === "proud" && (
              <>
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              </>
            )}
          </div>

          {/* Sleeping kitten curled up beside robot */}
          <div className="absolute -right-4 -bottom-1 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-700/80 text-[10px] text-slate-300 font-semibold shadow-lg">
            <span>🐾</span>
            <span>Sleepy Kitten</span>
          </div>
        </div>

        {/* Mascot Name Badge */}
        <div className="mt-1 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-950/80 border border-slate-700 text-[11px] font-semibold text-slate-200 shadow-md">
          <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
          <span>ZERO Buddy</span>
          <span className="text-[10px] font-mono text-cyan-300 capitalize">
            ({mascotEmotion})
          </span>
        </div>
      </div>
    </div>
  );
};
