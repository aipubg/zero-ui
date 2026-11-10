import React, { useState } from "react";
import { useZero } from "../../context/ZeroContext";
import { sound } from "../../utils/audio";
import {
  Blocks,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  ExternalLink,
  Plus,
  RefreshCw,
  FolderGit2,
  Cloud,
  Lock
} from "lucide-react";

export const ZeroPluginsScreen = () => {
  const { theme } = useZero();
  const [plugins, setPlugins] = useState([
    {
      id: "openclaw-gateway",
      name: "OpenClaw Gateway Protocol",
      type: "Core System Integration",
      status: "Connected",
      enabled: true,
      auth: "Signed In (Professor Zero)",
      description: "Authoritative gateway protocol bridging Zero UI to local execution daemons and model streams."
    },
    {
      id: "gemini-api-mcp",
      name: "Google Gemini Docs & API",
      type: "MCP Tool Server",
      status: "Connected",
      enabled: true,
      auth: "API Key Active",
      description: "Direct MCP tools for searching upstream Gemini API docs and code references."
    },
    {
      id: "chrome-devtools-plugin",
      name: "Chrome DevTools Automation",
      type: "Browser Automation",
      status: "Connected",
      enabled: true,
      auth: "Local WebSocket",
      description: "Headless Chrome DevTools and Puppeteer session automation for web tasks."
    },
    {
      id: "google-workspace",
      name: "Google Workspace (Docs, Sheets, Drive)",
      type: "Productivity",
      status: "Connected",
      enabled: true,
      auth: "OAuth Connected",
      description: "Read, draft, and synchronize documents, spreadsheets, and calendar reminders."
    },
    {
      id: "github-cli-bridge",
      name: "GitHub Ecosystem & PRs",
      type: "Developer Tools",
      status: "Connected",
      enabled: true,
      auth: "SSH Agent",
      description: "Clone, branch, review pull requests, and manage issues across connected repositories."
    },
    {
      id: "slack-discord-channels",
      name: "Communication Channels (Discord & Slack)",
      type: "Channels",
      status: "Standby",
      enabled: false,
      auth: "Bot Token Configured",
      description: "Dispatch messages, notifications, and task summaries to external team chats."
    }
  ]);

  const togglePlugin = (id) => {
    sound.select();
    setPlugins(prev =>
      prev.map(p => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col pt-4 pb-6 px-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-purple-400">
            <Blocks className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              Plugin Bridges & External Integrations
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300">
                6 CONFIGURED · 5 ONLINE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Sandboxed plugins, MCP servers, and external third-party tools connected to ZERO.
            </p>
          </div>
        </div>

        <button
          onClick={() => sound.select()}
          className="px-4 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-2 cursor-pointer shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${theme.accentPrimary} 0%, ${theme.accentSecondary} 100%)`
          }}
        >
          <Plus className="w-4 h-4" />
          <span>Install Plugin</span>
        </button>
      </div>

      {/* Plugins Grid */}
      <div className="flex-1 zero-glass-panel rounded-3xl p-6 border border-slate-800 mt-5 overflow-y-auto shadow-2xl space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
          <span>INSTALLED PLUGINS & MCPS ({plugins.length})</span>
          <span className="text-cyan-400">Secure IPC Sandbox</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {plugins.map((plugin) => (
            <div
              key={plugin.id}
              className={`p-4 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                plugin.enabled
                  ? "bg-slate-900/70 border-slate-700 hover:border-purple-400/60"
                  : "bg-slate-950/40 border-slate-800/80 opacity-60"
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      {plugin.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 mt-0.5">{plugin.name}</h4>
                  </div>
                  <button
                    onClick={() => togglePlugin(plugin.id)}
                    className="cursor-pointer text-slate-400 hover:text-white"
                  >
                    {plugin.enabled ? (
                      <ToggleRight className="w-6 h-6 text-purple-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-slate-600" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">
                  {plugin.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-cyan-300 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>{plugin.auth}</span>
                </span>
                <span className={plugin.enabled ? "text-emerald-400" : "text-slate-500"}>
                  {plugin.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
