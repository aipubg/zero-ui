import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import { Sparkles, Heart } from "lucide-react";

export const ZeroMascotCompanion = () => {
  const {
    mascotVisible,
    spatialRailExpanded,
    mascotEmotion,
    setMascotEmotion,
    theme
  } = useZero();

  const [speechBubble, setSpeechBubble] = useState("All 3 background agents are cruising along! 🚀");
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
          className="absolute -top-16 left-6 px-4 py-2 rounded-2xl zero-glass-panel border text-xs font-semibold text-slate-100 flex items-center gap-2 shadow-2xl animate-bounce backdrop-blur-2xl whitespace-nowrap z-30"
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

      {/* Invisible Interactive Hit-Zone with Subtle Glow Ring over the Mascot */}
      <div
        data-mascot="true"
        onClick={handleMascotClick}
        onMouseEnter={() => sound.hover()}
        className={`group relative cursor-pointer w-48 h-48 rounded-full flex items-center justify-center transition-transform duration-300 ${
          isBouncing
            ? "scale-105 -translate-y-2"
            : "hover:scale-102"
        }`}
        title="ZERO Buddy & Kitten (Click to interact)"
      >
        {/* Soft interactive hover glow rim on rug */}
        <div className="absolute inset-0 rounded-full border border-purple-400/0 group-hover:border-purple-400/50 group-hover:shadow-[0_0_24px_rgba(168,85,247,0.35)] transition-all duration-500 pointer-events-none" />

        {/* Emotion ripple on click */}
        {isBouncing && (
          <div
            className="absolute inset-4 rounded-full border-2 border-cyan-400 animate-ping pointer-events-none opacity-80"
            style={{ borderColor: theme.accentPrimary }}
          />
        )}
      </div>
    </div>
  );
};
