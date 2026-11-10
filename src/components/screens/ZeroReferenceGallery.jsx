import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers
} from "lucide-react";

export const ZeroReferenceGallery = () => {
  const { theme, setEnvId, navigateTo } = useZero();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const references = [
    {
      title: "Image 01: Living Sanctuary & Celestial Arch",
      file: "/assets/media_1794334808779_a57f2227.jpg",
      env: "sanctuary",
      verdict: "PRIMARY MASTERPIECE INSPIRATION",
      preserved: "Central genie AI holding glowing star orb, plush mascot on floor cushion with sleeping kitten, moonlit waterfall castle, orbital rings.",
      improved: "Eliminated bulky rounded rectangular cards around orbit in favor of thin-ring circular nodes; eliminated ugly vertical sidebar and bottom dock."
    },
    {
      title: "Image 08: Westminster Gothic Observatory",
      file: "/assets/media_1794334841692_8a94b212.jpg",
      env: "cathedral",
      verdict: "ARCHITECTURAL CATHEDRAL ENVIRONMENT",
      preserved: "Soaring gothic cathedral arched windows, distant moonlit Big Ben & palaces, plush mascot in foreground.",
      improved: "Replaced oversized floating glass cards with lightweight holographic vector paths and compact interactive symbols."
    },
    {
      title: "Image 11: Moonlit Library & Cherry Blossoms",
      file: "/assets/media_1794334847149_a109b870.jpg",
      env: "library",
      verdict: "MAGICAL SCHOLAR SANCTUARY",
      preserved: "Warm candlelit bookshelves, gold lantern lighting, blossoms, cozy fantasy atmosphere.",
      improved: "Removed redundant bottom workspace cards and moved system monitoring into single collapsible Live Operations panel."
    },
    {
      title: "Image 12: Robot Companion Tactical Study Desk",
      file: "/assets/media_1794334848664_8eab8b08.jpg",
      env: "desk",
      verdict: "MASCOT & DESKTOP SUPERVISION",
      preserved: "Expressive plush robot in study chair, glowing holographic screens, multi-window monitoring.",
      improved: "Created dedicated Computer Control screen with live hold token, OCR telemetry, and action audit trail."
    },
    {
      title: "Image 06: Cybernetic Wireframe Avatar",
      file: "/assets/media_1794334837399_aca638c5.jpg",
      env: "cyber",
      verdict: "FUTURISTIC VECTOR 3D HEAD",
      preserved: "Pure 3D vector wireframe profile, concentric coordinate rings, minimal cyber aesthetic.",
      improved: "Integrated into selectable holographic style presets for users who prefer minimal dark tech over fantasy."
    },
    {
      title: "Image 15: Baseline ZERO System (Feature Source)",
      file: "/assets/media_1794334855140_85c619d0.jpg",
      env: "sanctuary",
      verdict: "ORIGINAL FEATURE & ROUTE REFERENCE",
      preserved: "All functional capabilities: Command, Computer, Automations, Memory, Models, Agents, Skills, Plugins, Telemetry.",
      improved: "Complete visual redesign! Replaced generic flat cards and dark sidebar with living observatory spatial interface."
    }
  ];

  const current = references[selectedIdx];

  return (
    <div className="relative w-full h-full flex flex-col pt-4 pb-6 px-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-400">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Visual Reference Synthesis & Design Audit
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300">
                15 EXPLORATION CONCEPTS ANALYZED
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Interactive audit showing how owner feedback was synthesized into the unified Living Observatory interface.
            </p>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 grid grid-cols-3 gap-6 pt-5 overflow-hidden">
        {/* Concept Thumbnails */}
        <div className="col-span-1 zero-glass-panel rounded-3xl p-4 border border-slate-800 space-y-3 overflow-y-auto">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800">
            DESIGN EXPLORATION GALLERY
          </div>

          {references.map((ref, idx) => (
            <div
              key={idx}
              onClick={() => {
                sound.select();
                setSelectedIdx(idx);
              }}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                selectedIdx === idx
                  ? "bg-slate-900 border-amber-400 shadow-md"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <img
                src={ref.file}
                alt={ref.title}
                className="w-14 h-11 rounded-xl object-cover border border-slate-700 shrink-0"
              />
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-100 line-clamp-1">{ref.title}</div>
                <div className="text-[10px] font-mono text-amber-300/80 mt-0.5">{ref.verdict}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Reference Synthesis Breakdown */}
        <div className="col-span-2 zero-glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between overflow-y-auto shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest">
                  {current.verdict}
                </span>
                <h3 className="text-lg font-bold text-white font-display mt-0.5">
                  {current.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  sound.select();
                  setEnvId(current.env);
                  navigateTo("home");
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-black flex items-center gap-1.5 shadow"
                style={{
                  background: `linear-gradient(135deg, ${theme.accentPrimary} 0%, ${theme.accentTertiary} 100%)`
                }}
              >
                <span>Apply Environment to Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* High Resolution Image Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-black aspect-video flex items-center justify-center">
              <img
                src={current.file}
                alt={current.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Design Decisions Audit Breakdown */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle className="w-4 h-4" />
                  <span>PRESERVED & ELEVATED</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {current.preserved}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                <div className="flex items-center gap-2 font-bold text-cyan-300">
                  <Sparkles className="w-4 h-4" />
                  <span>IMPROVED & MODERNIZED</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {current.improved}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
