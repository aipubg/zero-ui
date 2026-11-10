import React from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  LayoutGrid,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Sparkles,
  Layers,
  Palette,
  Terminal,
  Type,
  Maximize2
} from "lucide-react";

export const ZeroDesignSystemScreen = () => {
  const { theme } = useZero();

  const states = [
    { name: "DEFAULT", class: "bg-slate-900/60 border-slate-700 text-slate-300" },
    { name: "HOVER", class: "bg-slate-800 border-cyan-400 text-white shadow-[0_0_12px_var(--zero-glow)]" },
    { name: "ACTIVE / SELECTED", class: "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_18px_var(--zero-glow)]" },
    { name: "CONNECTED", class: "bg-emerald-950/80 border-emerald-500/60 text-emerald-300" },
    { name: "PARTIAL / WARNING", class: "bg-amber-950/80 border-amber-500/60 text-amber-300" },
    { name: "ERROR / CRITICAL", class: "bg-rose-950/80 border-rose-500/60 text-rose-300" },
    { name: "DISABLED", class: "bg-slate-950/40 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed" }
  ];

  return (
    <div className="relative w-full h-full flex flex-col pt-16 pb-6 px-12 select-none overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              ZERO OS — Living Observatory Design System & Tokens
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                SPEC v3.8 · PRODUCTION
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Interactive design tokens, typography scales, glassmorphism layers, and semantic UI states.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Design System Sections */}
      <div className="grid grid-cols-2 gap-6 pt-5">
        {/* Section 1: Semantic Color Tokens */}
        <div className="zero-glass-panel rounded-3xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-300 font-semibold border-b border-slate-800 pb-2">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>Semantic Color Tokens</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl shadow" style={{ backgroundColor: theme.accentPrimary }} />
              <div>
                <div className="font-bold text-slate-200">--zero-accent-primary</div>
                <div className="text-[10px] text-slate-400">{theme.accentPrimary}</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl shadow" style={{ backgroundColor: theme.accentSecondary }} />
              <div>
                <div className="font-bold text-slate-200">--zero-accent-secondary</div>
                <div className="text-[10px] text-slate-400">{theme.accentSecondary}</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl shadow" style={{ backgroundColor: theme.accentTertiary }} />
              <div>
                <div className="font-bold text-slate-200">--zero-accent-tertiary</div>
                <div className="text-[10px] text-slate-400">{theme.accentTertiary} (Antique Gold)</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl shadow bg-emerald-500" />
              <div>
                <div className="font-bold text-slate-200">--zero-status-optimal</div>
                <div className="text-[10px] text-slate-400">#10b981 (Connected OK)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Typography Scales */}
        <div className="zero-glass-panel rounded-3xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-300 font-semibold border-b border-slate-800 pb-2">
            <Type className="w-4 h-4 text-purple-400" />
            <span>Typography Hierarchy</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Display Heading 1 · Space Grotesk 32px</span>
              <div className="text-2xl font-extrabold text-white font-display">
                ZERO Living Observatory
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Section Subtitle · Plus Jakarta Sans 16px</span>
              <div className="text-sm font-semibold text-slate-200">
                Personal intelligence operating system with spatial radial nodes
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Telemetry & Tokens · JetBrains Mono 12px</span>
              <div className="text-xs font-mono text-cyan-300">
                gateway.protocol.v3.8 --connected --latency=14ms --tok_rate=42/s
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Semantic Component States */}
        <div className="col-span-2 zero-glass-panel rounded-3xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-300 font-semibold border-b border-slate-800 pb-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Standardized Component & Interaction States</span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {states.map((st) => (
              <div
                key={st.name}
                className={`p-3.5 rounded-2xl border text-xs flex flex-col justify-between ${st.class}`}
              >
                <div className="font-mono font-bold tracking-wider text-[11px] mb-1">
                  {st.name}
                </div>
                <div className="text-[10px] opacity-80">Interactive Element State</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Motion Curves & Glassmorphism Guidelines */}
        <div className="col-span-2 zero-glass-panel rounded-3xl p-5 border border-slate-800 space-y-3">
          <div className="text-xs font-mono uppercase text-slate-300 font-semibold border-b border-slate-800 pb-2">
            Motion Physics & Glassmorphism Principles
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed font-sans">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <strong className="text-cyan-200 font-mono">Cubic-Bezier Curves:</strong>
              <p className="text-[11px] text-slate-400">Smooth cubic-bezier(0.16, 1, 0.3, 1) ease for natural physical inertia on modals and contextual drawers.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <strong className="text-purple-200 font-mono">Restrained Glow:</strong>
              <p className="text-[11px] text-slate-400">Glow is applied strictly to communicate interactive hierarchy, active state, and live status, not generic neon noise.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <strong className="text-amber-200 font-mono">Accessibility & Contrast:</strong>
              <p className="text-[11px] text-slate-400">Deep midnight vignette layers guarantee WCAG AAA text contrast across complex background observatory paintings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
