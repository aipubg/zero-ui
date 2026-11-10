import React, { useState, useRef, useEffect } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Send,
  Paperclip,
  Mic,
  Cpu,
  ChevronDown,
  Sparkles,
  CheckCircle,
  Copy,
  Terminal,
  Maximize2,
  Minimize2,
  Trash2,
  Bot
} from "lucide-react";

export const ZeroChatScreen = () => {
  const {
    messages,
    addMessage,
    theme,
    activeModel,
    setActiveModel,
    isListening,
    setIsListening,
    navigateTo
  } = useZero();

  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    addMessage(text);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    sound.hover();
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-4 px-24 select-none">
      {/* Background Subdued Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{
          backgroundImage: "url(/assets/env-sanctuary.jpg)",
          filter: "blur(20px)"
        }}
      />

      {/* Top Session Header with Compact Mini-Companion HUD */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          {/* Mini Companion Avatar */}
          <div
            onClick={() => navigateTo("home")}
            className="w-10 h-10 rounded-2xl overflow-hidden border cursor-pointer hover:scale-105 transition-transform"
            style={{
              borderColor: theme.accentPrimary,
              boxShadow: `0 0 14px ${theme.glow}`
            }}
            title="Return to Living Observatory"
          >
            <img
              src="/assets/env-sanctuary.jpg"
              alt="ZERO AI"
              className="w-full h-full object-cover"
              style={{ filter: theme.hologramFilter }}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white font-display">
                ZERO · Living Session
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                Context: 24.2k tokens
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Active model: <span className="text-cyan-300 font-mono">{activeModel}</span> · Low latency gateway
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full zero-glass-pill text-xs text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-400 transition-colors"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Return to Observatory</span>
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="relative z-10 flex-1 overflow-y-auto py-6 pr-4 space-y-6">
        {messages.map((msg) => {
          const isAI = msg.role === "assistant";
          return (
            <div
              key={msg.id}
              className={`flex gap-4 ${isAI ? "items-start" : "items-start flex-row-reverse"}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border shadow-lg ${
                  isAI
                    ? "bg-slate-950 border-cyan-400/50 text-cyan-300"
                    : "bg-purple-950 border-purple-400/50 text-purple-200"
                }`}
                style={{
                  boxShadow: isAI ? `0 0 12px ${theme.glow}` : "none"
                }}
              >
                {isAI ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-bold font-mono">You</span>
                )}
              </div>

              {/* Message Bubble & Content */}
              <div
                className={`max-w-2xl rounded-3xl p-5 border text-sm leading-relaxed backdrop-blur-2xl shadow-xl space-y-3 ${
                  isAI
                    ? "zero-glass-panel border-slate-800 text-slate-100"
                    : "bg-cyan-950/40 border-cyan-500/30 text-slate-100 ml-auto"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/60 pb-2">
                  <span className="font-semibold text-slate-300">
                    {isAI ? "ZERO Intelligence" : "Owner"}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="text-slate-200 text-sm whitespace-pre-wrap font-sans">
                  {msg.content}
                </div>

                {/* Simulated Tool Execution Progress Cards */}
                {msg.tools && (
                  <div className="space-y-2 pt-2">
                    {msg.tools.map((tool, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl p-3 bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-cyan-300 font-semibold">
                          <div className="flex items-center gap-2">
                            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Tool Call: {tool.name}</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                            Executed
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] pl-5">
                          {tool.result}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Message Action Footer */}
                <div className="flex items-center justify-end gap-2 pt-1 text-[11px] text-slate-400">
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="p-1 rounded-lg hover:bg-white/10 hover:text-slate-200 transition-colors flex items-center gap-1"
                    title="Copy message"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedId === msg.id ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer Input Area */}
      <div className="relative z-10 w-full max-w-3xl mx-auto pt-2">
        <div
          className="zero-glass-panel rounded-3xl p-3 border shadow-2xl flex flex-col gap-2"
          style={{ borderColor: theme.border }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => sound.hover()}
              className="p-2 rounded-2xl hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsListening(!isListening)}
              className={`p-2 rounded-2xl ${
                isListening ? "bg-cyan-500 text-black shadow-lg" : "hover:bg-white/10 text-slate-400"
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Message ZERO... or ask to run workflows across your computer"
              className="flex-1 bg-transparent px-2 py-1 text-sm text-white placeholder-slate-500 focus:outline-none"
            />

            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="p-2.5 rounded-2xl font-bold transition-all shadow-md cursor-pointer disabled:opacity-30"
              style={{
                background: `linear-gradient(135deg, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 100%)`,
                color: "#030712"
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
