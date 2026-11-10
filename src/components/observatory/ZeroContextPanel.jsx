import React from "react";
import { useZero } from "../../context/ZeroContext";
import { ORBIT_CAPABILITIES } from "../../theme/tokens";
import { sound } from "../../utils/audio";
import {
  X,
  ExternalLink,
  Sparkles,
  Bot,
  Brain,
  Cpu,
  Zap,
  Monitor,
  Blocks,
  CheckCircle,
  Play,
  RotateCw
} from "lucide-react";

export const ZeroContextPanel = () => {
  const { selectedCapability, setSelectedCapability, navigateTo, theme } = useZero();

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedCapability(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedCapability]);

  if (!selectedCapability) return null;

  const cap = ORBIT_CAPABILITIES.find(c => c.id === selectedCapability);
  if (!cap) return null;

  const handleClose = () => {
    sound.select();
    setSelectedCapability(null);
  };

  const handleOpenFull = () => {
    sound.select();
    setSelectedCapability(null);
    navigateTo(selectedCapability);
  };

  return (
    <div
      className="absolute right-8 top-28 bottom-28 w-96 zero-glass-panel rounded-3xl p-6 z-30 flex flex-col justify-between shadow-2xl border backdrop-blur-2xl animate-in slide-in-from-right duration-300"
      style={{
        borderColor: theme.borderHighlight,
        boxShadow: `0 16px 48px 0 rgba(0,0,0,0.6), 0 0 24px ${theme.glow}`
      }}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-inner"
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                borderColor: cap.color
              }}
            >
              <Sparkles className="w-5 h-5" style={{ color: cap.color }} />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Spatial Capability Node
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                {cap.label}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono">
                  {cap.badge}
                </span>
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Close contextual view (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Contextual Content based on Node */}
        <div className="mt-5 space-y-4">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 text-xs leading-relaxed text-slate-300">
            {cap.shortDesc}
          </div>

          {selectedCapability === "memory" && (
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Recent Semantic Insights
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />
                  <div>
                    <strong className="text-slate-100">Project Zero UI:</strong>
                    <p className="text-slate-400 text-[11px]">User requested Living Observatory redesign with plush robot.</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5" />
                  <div>
                    <strong className="text-slate-100">Model Preferences:</strong>
                    <p className="text-slate-400 text-[11px]">Primary router set to Nemotron 3.5 Lightning with Gemini fallback.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCapability === "agents" && (
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Active Specialist Workforce</span>
                <span className="text-cyan-400">3 Working</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-cyan-400" />
                    <span className="font-medium text-slate-200">Researcher</span>
                  </div>
                  <span className="text-[11px] text-cyan-400 font-mono">78%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-400" />
                    <span className="font-medium text-slate-200">Organizer</span>
                  </div>
                  <span className="text-[11px] text-purple-400 font-mono">35%</span>
                </div>
              </div>
            </div>
          )}

          {selectedCapability === "models" && (
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Active Fabric Routing
              </div>
              <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-cyan-200">nemotron-3.5-lightning</div>
                  <div className="text-[10px] text-slate-400">Local Gateway · 42 tok/s</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-900/60 border border-emerald-400 text-emerald-300 text-[10px]">
                  Online
                </span>
              </div>
            </div>
          )}

          {selectedCapability === "computer" && (
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Display 1 (Primary)</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Preview
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black aspect-video flex items-center justify-center">
                <img
                  src="/assets/ref-original-system.jpg"
                  alt="Desktop Preview"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] font-mono text-cyan-300">Observation Stream Active</span>
                </div>
              </div>
            </div>
          )}

          {selectedCapability === "automations" && (
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Next Scheduled Jobs
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-200">Daily Research Digest</div>
                  <div className="text-[10px] text-slate-400">Cron: 0 9 * * *</div>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">in 14m</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation CTA */}
      <div className="pt-4 border-t border-slate-800/80">
        <button
          onClick={handleOpenFull}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02]"
          style={{
            background: `linear-gradient(135deg, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 100%)`,
            color: "#050b14",
            boxShadow: `0 0 20px ${theme.glow}`
          }}
        >
          <span>Open Full {cap.label} Workspace</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
