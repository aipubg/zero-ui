import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Mic,
  MicOff,
  Paperclip,
  Send,
  Maximize2,
  Cpu,
  Sparkles,
  ChevronDown
} from "lucide-react";

export const ZeroCommandBar = () => {
  const {
    theme,
    addMessage,
    activeModel,
    setActiveModel,
    isListening,
    setIsListening,
    navigateTo,
    currentScreen
  } = useZero();

  const [input, setInput] = useState("");
  const [modelDropdown, setModelDropdown] = useState(false);

  const availableModels = [
    { id: "nemotron-3.5-lightning", label: "Nemotron 3.5 Lightning (Local Gateway)", speed: "Fast · 42 tok/s" },
    { id: "zero-core-v3", label: "ZERO-1 Core Omniscient", speed: "Reasoning · High-fidelity" },
    { id: "claude-3-7-sonnet", label: "Claude 3.7 Sonnet (Hybrid)", speed: "Deep Logic & Code" },
    { id: "gpt-4o", label: "GPT-4o (Cloud Fabric)", speed: "Multimodal Engine" },
    { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro (Google)", speed: "1M Context Window" }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    addMessage(text);
    if (currentScreen !== "chat") {
      // Smoothly jump to focused conversation if desired or stay in command center
      navigateTo("chat");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleMic = () => {
    sound.select();
    setIsListening(!isListening);
  };

  const quickPrompts = [
    "Control my computer",
    "Automate a workflow",
    "Deep research & analyze",
    "Delegate to agent team"
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-40 select-none">
      {/* Quick Intent Pills (Discreet, minimal, elegant) */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => {
              sound.hover();
              setInput(prompt);
            }}
            className="px-3 py-1 rounded-full zero-glass-pill text-[11px] font-medium text-slate-300 hover:text-white hover:border-cyan-400/60 transition-all cursor-pointer shadow-md"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Floating Conversational Command Console */}
      <div
        className="relative zero-glass-panel rounded-3xl p-2.5 border shadow-2xl backdrop-blur-3xl flex flex-col gap-2 transition-all duration-300"
        style={{
          borderColor: isListening ? theme.accentPrimary : theme.border,
          boxShadow: `0 12px 40px 0 rgba(0, 0, 0, 0.7), 0 0 ${isListening ? "30px" : "16px"} ${
            isListening ? theme.glow : "rgba(0,0,0,0.5)"
          }`
        }}
      >
        {/* Model Selector Bar & Expand conversation button */}
        <div className="flex items-center justify-between px-3 pt-1 text-xs text-slate-400">
          <div className="relative">
            <button
              onClick={() => {
                sound.select();
                setModelDropdown(!modelDropdown);
              }}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400 text-[11px] font-mono text-slate-300 transition-colors"
            >
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>{activeModel}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {modelDropdown && (
              <div
                className="absolute bottom-full mb-2 left-0 w-72 zero-glass-panel rounded-2xl p-2 z-50 shadow-2xl border"
                style={{ borderColor: theme.borderHighlight }}
              >
                <div className="px-3 py-1 text-[10px] font-mono uppercase text-slate-400">
                  Select Routing Model
                </div>
                {availableModels.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      sound.select();
                      setActiveModel(m.id);
                      setModelDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex flex-col ${
                      activeModel === m.id
                        ? "bg-cyan-500/20 text-cyan-200 font-semibold"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <span>{m.label}</span>
                    <span className="text-[10px] font-mono text-slate-400">{m.speed}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500">
              Shift + Enter for multiline
            </span>
            <button
              onClick={() => navigateTo("chat")}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Expand into full Conversation Workspace"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Input Textarea & Action Controls */}
        <div className="flex items-end gap-2 px-1">
          {/* File Attachment Action */}
          <button
            type="button"
            onClick={() => sound.hover()}
            className="p-2 rounded-2xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Attach file, screenshot or code snippet"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Voice Microphone Toggle */}
          <button
            type="button"
            onClick={toggleMic}
            className={`p-2 rounded-2xl transition-all ${
              isListening
                ? "bg-cyan-500 text-black shadow-[0_0_16px_var(--zero-glow)] scale-105"
                : "hover:bg-white/10 text-slate-400 hover:text-cyan-300"
            }`}
            title={isListening ? "Mute Microphone" : "Voice Command Mode"}
          >
            {isListening ? (
              <Mic className="w-4 h-4 animate-pulse" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          {/* Text Input Box */}
          <div className="flex-1 relative flex items-center">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isListening
                  ? "Listening to your voice... Speak your request"
                  : "Tell ZERO what to do..."
              }
              className="w-full bg-transparent resize-none py-1.5 px-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none max-h-28 font-medium"
            />
          </div>

          {/* Submit Action Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!input.trim() && !isListening}
            className={`p-2.5 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center ${
              input.trim() || isListening
                ? "hover:scale-105 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            }`}
            style={{
              background: `linear-gradient(135deg, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 100%)`,
              color: "#030712",
              boxShadow: input.trim() ? `0 0 16px ${theme.glow}` : "none"
            }}
            title="Dispatch Command (Enter)"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
