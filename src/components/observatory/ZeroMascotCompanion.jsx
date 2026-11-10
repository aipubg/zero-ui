import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import { Sparkles, Heart } from "lucide-react";

export const ZeroMascotCompanion = () => {
  const { theme, mascotVisible, mascotConfig, mascotEmotion, setMascotEmotion } = useZero();
  const [speechBubble, setSpeechBubble] = useState("Ready for adventure, Owner! ✨");
  const [showBubble, setShowBubble] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);

  if (!mascotVisible) return null;

  const handleMascotClick = () => {
    sound.mascotChirp();
    setIsWiggling(true);
    setShowBubble(true);

    const quotes = [
      "All systems purring smoothly! 🚀",
      "I'm keeping watch over your background agents!",
      "Need a tea break? Zero and I have everything covered! ☕",
      "Memory synchronization at 100%! 🧠",
      "High-five, Owner! Let's build something epic!"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeechBubble(randomQuote);
    setMascotEmotion("happy");

    setTimeout(() => setIsWiggling(false), 600);
    setTimeout(() => setShowBubble(false), 4500);
  };

  return (
    <div className="absolute left-14 bottom-24 z-20 select-none">
      {/* Interactive Speech / Reaction Bubble */}
      {showBubble && (
        <div
          className="absolute -top-16 left-6 px-3.5 py-2 rounded-2xl zero-glass-panel border text-xs font-medium text-slate-100 flex items-center gap-2 shadow-2xl animate-bounce"
          style={{
            borderColor: theme.accentPrimary,
            boxShadow: `0 0 16px ${theme.glow}`
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
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

      {/* Mascot Container */}
      <div
        onClick={handleMascotClick}
        onMouseEnter={() => sound.hover()}
        className={`group relative cursor-pointer flex flex-col items-center transition-transform duration-300 ${
          isWiggling ? "scale-110 rotate-3" : "hover:scale-105"
        }`}
        title="Zero's Robot Mascot & Companion (Click to interact)"
      >
        {/* Soft Glowing Cushion Mat on Floor */}
        <div
          className="absolute -bottom-3 w-40 h-10 rounded-[100%] blur-sm opacity-70 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${theme.accentSecondary} 0%, transparent 75%)`
          }}
        />

        {/* Mascot + Sleeping Kitten Artwork Container */}
        <div className="relative w-36 h-36 flex items-center justify-center animate-mascot-idle">
          {/* Headphone Ear Glow Ring */}
          <div
            className="absolute -top-1 left-2 w-7 h-7 rounded-full border-2 border-cyan-400 opacity-80 group-hover:scale-110 transition-transform"
            style={{
              borderColor: theme.accentPrimary,
              boxShadow: `0 0 12px ${theme.glow}`
            }}
          />
          <div
            className="absolute -top-1 right-2 w-7 h-7 rounded-full border-2 border-cyan-400 opacity-80 group-hover:scale-110 transition-transform"
            style={{
              borderColor: theme.accentPrimary,
              boxShadow: `0 0 12px ${theme.glow}`
            }}
          />

          {/* Character illustration render */}
          <img
            src="/assets/env-robot-desk.jpg"
            alt="Zero Robot Mascot"
            className="w-32 h-32 object-contain drop-shadow-2xl rounded-full"
            style={{
              clipPath: "circle(46% at 50% 50%)",
              filter: "contrast(1.1) brightness(1.05)"
            }}
          />

          {/* Expressive LED Eyes Overlay */}
          <div className="absolute top-[38%] flex items-center justify-center gap-5 pointer-events-none">
            {mascotEmotion === "happy" && (
              <>
                <div
                  className="w-3.5 h-2 rounded-t-full border-t-2"
                  style={{ borderColor: theme.accentPrimary }}
                />
                <div
                  className="w-3.5 h-2 rounded-t-full border-t-2"
                  style={{ borderColor: theme.accentPrimary }}
                />
              </>
            )}
            {mascotEmotion === "thinking" && (
              <>
                <div
                  className="w-2.5 h-2.5 rounded-full border border-dashed animate-spin"
                  style={{ borderColor: theme.accentTertiary }}
                />
                <div
                  className="w-2.5 h-2.5 rounded-full border border-dashed animate-spin"
                  style={{ borderColor: theme.accentTertiary }}
                />
              </>
            )}
            {mascotEmotion === "curious" && (
              <>
                <div
                  className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse"
                  style={{ backgroundColor: theme.accentPrimary }}
                />
                <div
                  className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse"
                  style={{ backgroundColor: theme.accentPrimary }}
                />
              </>
            )}
          </div>

          {/* Sleeping kitten curled up beside robot */}
          <div className="absolute -right-2 -bottom-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-[10px] text-slate-300 font-medium">
            <span>🐾</span>
            <span>sleepy</span>
          </div>
        </div>

        {/* Mascot Name Badge */}
        <div className="mt-1 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] font-medium text-slate-300 shadow-md">
          <Heart className="w-2.5 h-2.5 text-pink-400 fill-pink-400" />
          <span>ZERO Buddy</span>
        </div>
      </div>
    </div>
  );
};
