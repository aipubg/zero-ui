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
      className="absolute bottom-6 z-20 select-none pointer-events-auto transition-all duration-300"
      style={{
        left: spatialRailExpanded ? "17.5rem" : "5rem"
      }}
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

        {/* Mascot & Kitten Character Container with Viewport Responsive Dimensions */}
        <div
          className={`relative w-[clamp(140px,13vw,210px)] h-[clamp(140px,13vw,210px)] flex items-center justify-center ${
            reducedMotion ? "" : "animate-mascot-idle"
          }`}
        >
          {/* Genuine Independent Transparent Robot Mascot & Sleeping Kitten Asset */}
          <img
            src="/assets/robot-mascot-alpha.png"
            alt="ZERO Buddy Robot Mascot with Sleeping Kitten"
            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)]"
          />

          {/* Interactive Emotion Ripple on Click */}
          {isBouncing && (
            <div
              className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full border-2 border-cyan-400 animate-ping pointer-events-none opacity-80"
              style={{ borderColor: theme.accentPrimary }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
