import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Monitor,
  Play,
  Pause,
  RotateCw,
  Maximize2,
  Shield,
  Layers,
  Eye,
  CheckCircle,
  Clock,
  Terminal,
  MousePointer,
  ChevronDown
} from "lucide-react";

export const ZeroComputerScreen = () => {
  const { theme } = useZero();
  const [controlActive, setControlActive] = useState(true);
  const [activeDisplay, setActiveDisplay] = useState("Display 1 (1920×1080)");
  const [fullscreen, setFullscreen] = useState(false);

  const actionHistory = [
    { time: "22:24:12", action: "CLICK", target: "VS Code Editor - Tab 2", status: "Executed" },
    { time: "22:24:08", action: "KEYSTROKE", target: "Ctrl + S (Saved workspace changes)", status: "Executed" },
    { time: "22:23:45", action: "SCREEN_OCR", target: "Extracted test output from terminal panel", status: "Success" },
    { time: "22:23:10", action: "WINDOW_FOCUS", target: "Chrome DevTools", status: "Executed" }
  ];

  const displays = [
    "Display 1 (1920×1080) · Primary",
    "Display 2 (2560×1440) · UltraWide",
    "Display 3 (1366×768) · Sidecar Tablet"
  ];

  return (
    <div className="relative w-full h-full flex flex-col pt-16 pb-6 px-12 select-none">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Computer Control & Vision Intelligence
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                HOLD BRIDGE ACTIVE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Autonomous desktop execution with screen perception and permission guards.
            </p>
          </div>
        </div>

        {/* Display Selector & Takeover Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-mono text-slate-200">
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={activeDisplay}
              onChange={(e) => setActiveDisplay(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              {displays.map(d => (
                <option key={d} value={d} className="bg-slate-900 text-slate-200">
                  {d}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              sound.select();
              setControlActive(!controlActive);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              controlActive
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
            }`}
          >
            {controlActive ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Takeover</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Resume Control</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split Layout: Screen Preview & Action Audit Timeline */}
      <div className="flex-1 grid grid-cols-3 gap-6 pt-5 overflow-hidden">
        {/* Left 2 Cols: Live Computer Canvas */}
        <div className="col-span-2 flex flex-col justify-between zero-glass-panel rounded-3xl p-4 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Top Canvas Bar */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200 font-semibold">{activeDisplay}</span>
              <span className="text-slate-500">· 60 FPS</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-300">Perception: OCR + Segmenter</span>
              <button
                onClick={() => setFullscreen(!fullscreen)}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                title="Toggle Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Screen Preview with Autonomous Cursor Simulation */}
          <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-700 bg-black flex items-center justify-center">
            <img
              src="/assets/ref-original-system.jpg"
              alt="Live Screen Stream"
              className="w-full h-full object-cover opacity-90"
            />

            {/* AI Simulated Mouse Cursor */}
            <div
              className="absolute pointer-events-none transition-all duration-700 flex items-center gap-2"
              style={{
                top: "42%",
                left: "48%"
              }}
            >
              <MousePointer className="w-6 h-6 text-cyan-400 fill-cyan-400 filter drop-shadow-[0_0_8px_var(--zero-glow)]" />
              <div className="px-2 py-0.5 rounded bg-black/90 border border-cyan-400/60 text-[10px] font-mono text-cyan-200 shadow-lg">
                Zero Operator
              </div>
            </div>

            {/* Screen Scanning Grid Effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(0,242,254,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,242,254,0.2) 1px, transparent 1px)",
                backgroundSize: "32px 32px"
              }}
            />
          </div>

          {/* Bottom Live Diagnostic Bar */}
          <div className="pt-3 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span>Hold Token: <strong className="text-slate-200">hlt_992a01f</strong></span>
              <span>Input Mode: <strong className="text-cyan-300">Human-Supervised</strong></span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Permission Guard: Enabled</span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Audit Stream & Device Diagnostics */}
        <div className="flex flex-col gap-4 overflow-hidden">
          {/* Screen Intelligence Status Card */}
          <div className="zero-glass-panel rounded-3xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-300 font-semibold border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Screen Intelligence</span>
              </div>
              <span className="text-emerald-400">Watching</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Focused Application:</span>
                <span className="text-slate-200 font-mono font-medium">Visual Studio Code</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Active Window:</span>
                <span className="text-slate-200 font-mono font-medium">zero-shell.js</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Perceived Elements:</span>
                <span className="text-cyan-300 font-mono font-medium">142 bounding boxes</span>
              </div>
            </div>
          </div>

          {/* Action Audit Stream */}
          <div className="flex-1 zero-glass-panel rounded-3xl p-4 border border-slate-800 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-300 font-semibold border-b border-slate-800 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>Action Audit Stream</span>
                </div>
                <span className="text-[10px] text-slate-400">Real-time</span>
              </div>

              <div className="space-y-2.5 overflow-y-auto max-h-72 pr-1">
                {actionHistory.map((act, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-300 font-semibold">{act.action}</span>
                      <span className="text-[10px] text-slate-500">{act.time}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] font-sans">{act.target}</p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                      <CheckCircle className="w-3 h-3" />
                      <span>{act.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => sound.hover()}
              className="mt-3 w-full py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              Export Complete Audit Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
