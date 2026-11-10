import React from "react";
import { useZero } from "../../context/ZeroContext";
import { THEMES, ENVIRONMENTS, MASCOT_PRESETS } from "../../theme/tokens";
import { sound } from "../../utils/audio";
import {
  Palette,
  Sparkles,
  Bot,
  Sun,
  Moon,
  Eye,
  Sliders,
  Check,
  RotateCcw,
  Volume2,
  Layers,
  Heart
} from "lucide-react";

export const ZeroAppearanceScreen = () => {
  const {
    themeId,
    setThemeId,
    theme,
    envId,
    setEnvId,
    hologramGlow,
    setHologramGlow,
    particleDensity,
    setParticleDensity,
    hologramVisible,
    setHologramVisible,
    mascotPreset,
    setMascotPreset,
    mascotVisible,
    setMascotVisible,
    mascotEmotion,
    setMascotEmotion,
    reducedMotion,
    setReducedMotion
  } = useZero();

  return (
    <div className="relative w-full h-full flex flex-col pt-16 pb-6 px-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-purple-400">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Appearance, Atmosphere & Companion Studio
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                SYNCHRONIZED THEME ENGINE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Customize the holographic AI companion, plush robot companion, celestial observatory environment, and global design tokens.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.select();
            setThemeId("astral-violet");
            setEnvId("sanctuary");
            setHologramGlow(85);
            setParticleDensity(70);
            setMascotPreset("cream-blue");
            setMascotEmotion("happy");
          }}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs text-slate-300 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Default</span>
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="flex-1 grid grid-cols-3 gap-6 pt-5 overflow-hidden">
        {/* Col 1: Theme & Celestial Environment Presets */}
        <div className="zero-glass-panel rounded-3xl p-5 border border-slate-800 space-y-5 overflow-y-auto shadow-2xl">
          {/* Accent Color Themes */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Celestial Accent Themes</span>
            </div>

            <div className="space-y-2">
              {Object.values(THEMES).map((th) => {
                const isSelected = themeId === th.id;
                return (
                  <button
                    key={th.id}
                    onClick={() => {
                      sound.select();
                      setThemeId(th.id);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-cyan-400 shadow-[0_0_16px_var(--zero-glow)]"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Color Swatch Dots */}
                      <div className="flex items-center -space-x-1">
                        <div
                          className="w-4 h-4 rounded-full border border-black shadow"
                          style={{ backgroundColor: th.accentPrimary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-black shadow"
                          style={{ backgroundColor: th.accentSecondary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-black shadow"
                          style={{ backgroundColor: th.accentTertiary }}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-100">{th.name}</div>
                        <div className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                          {th.description}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Environment Presets */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Moon className="w-3.5 h-3.5 text-amber-300" />
              <span>Sanctuary Environment Presets</span>
            </div>

            <div className="space-y-2">
              {ENVIRONMENTS.map((env) => {
                const isSelected = envId === env.id;
                return (
                  <div
                    key={env.id}
                    onClick={() => {
                      sound.select();
                      setEnvId(env.id);
                    }}
                    className={`p-2 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? "bg-slate-900 border-cyan-400 shadow-md"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <img
                      src={env.path}
                      alt={env.name}
                      className="w-12 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-100">{env.name}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{env.desc}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0 mr-1" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Col 2: Holographic AI Character Controls */}
        <div className="zero-glass-panel rounded-3xl p-5 border border-slate-800 space-y-6 overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="text-xs font-mono uppercase text-slate-300 tracking-wider font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Holographic AI Character</span>
            </div>
            <button
              onClick={() => setHologramVisible(!hologramVisible)}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              {hologramVisible ? "Hide Character" : "Show Character"}
            </button>
          </div>

          {/* Glow Intensity Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Hologram Aura Glow</span>
              <span className="font-mono text-cyan-300">{hologramGlow}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={hologramGlow}
              onChange={(e) => setHologramGlow(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Particle Density Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Sanctuary Starlight & Petals</span>
              <span className="font-mono text-cyan-300">{particleDensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={particleDensity}
              onChange={(e) => setParticleDensity(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Reduced Motion Toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-200">Reduced Motion Mode</div>
              <div className="text-[10px] text-slate-400">Pauses orbital rotation and floating breathing physics</div>
            </div>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                reducedMotion
                  ? "bg-amber-400 text-black"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {reducedMotion ? "ON" : "OFF"}
            </button>
          </div>

          {/* Character Live Preview HUD */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-black aspect-video flex items-center justify-center">
            <img
              src="/assets/env-sanctuary.jpg"
              alt="Hologram Preview"
              className="w-full h-full object-cover"
              style={{
                filter: `${theme.hologramFilter} contrast(1.1)`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-[10px] font-mono text-cyan-300">
                Live Material Preview: {theme.name}
              </span>
            </div>
          </div>
        </div>

        {/* Col 3: Robot Mascot Customization Studio */}
        <div className="zero-glass-panel rounded-3xl p-5 border border-slate-800 space-y-6 overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="text-xs font-mono uppercase text-slate-300 tracking-wider font-semibold flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Plush Robot Mascot</span>
            </div>
            <button
              onClick={() => setMascotVisible(!mascotVisible)}
              className="text-xs font-mono text-purple-400 hover:underline"
            >
              {mascotVisible ? "Hide Mascot" : "Show Mascot"}
            </button>
          </div>

          {/* Mascot Skin Preset Selection */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Mascot Skin Palette
            </div>
            <div className="space-y-2">
              {MASCOT_PRESETS.map((m) => {
                const isSelected = mascotPreset === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      sound.mascotChirp();
                      setMascotPreset(m.id);
                    }}
                    className={`w-full p-2.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-purple-400 shadow-md"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-5 h-5 rounded-full border border-black shadow"
                        style={{ backgroundColor: m.accent }}
                      />
                      <span className="text-xs font-bold text-slate-200">{m.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* LED Eye Emotions */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              LED Eye Emotion Expressions
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["happy", "thinking", "curious"].map((emotion) => (
                <button
                  key={emotion}
                  onClick={() => {
                    sound.mascotChirp();
                    setMascotEmotion(emotion);
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                    mascotEmotion === emotion
                      ? "bg-purple-950/80 border-purple-400 text-purple-200 shadow-md"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          {/* Mascot Preview Card */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
            <img
              src="/assets/env-robot-desk.jpg"
              alt="Mascot Preview"
              className="w-14 h-14 rounded-2xl object-cover border border-purple-400/40"
            />
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>ZERO Buddy</span>
                <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
              </div>
              <p className="text-[11px] text-slate-400">Positioned tastefully on the floor cushion beside the sleeping cat.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
