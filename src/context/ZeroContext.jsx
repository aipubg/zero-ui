import React, { createContext, useContext, useState, useEffect } from "react";
import { THEMES, ENVIRONMENTS, MASCOT_PRESETS, ORBIT_CAPABILITIES } from "../theme/tokens";
import { sound } from "../utils/audio";

const ZeroContext = createContext(null);

export const ZeroProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [themeId, setThemeId] = useState("astral-violet");
  const [envId, setEnvId] = useState("sanctuary");
  const [hologramGlow, setHologramGlow] = useState(85);
  const [particleDensity, setParticleDensity] = useState(70);
  const [hologramVisible, setHologramVisible] = useState(true);
  const [mascotPreset, setMascotPreset] = useState("cream-blue");
  const [mascotVisible, setMascotVisible] = useState(true);
  const [mascotEmotion, setMascotEmotion] = useState("happy");
  const [activeModel, setActiveModel] = useState("nemotron-3.5-lightning");
  const [activeWorkspace, setActiveWorkspace] = useState("Personal workspace");
  const [liveOpsOpen, setLiveOpsOpen] = useState(true);
  const [liveOpsTab, setLiveOpsTab] = useState("tasks");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchPaletteOpen, setSearchPaletteOpen] = useState(false);
  const [spatialRailExpanded, setSpatialRailExpanded] = useState(false);

  const theme = THEMES[themeId] || THEMES["astral-violet"];
  const currentEnv = ENVIRONMENTS.find(e => e.id === envId) || ENVIRONMENTS[0];
  const mascotConfig = MASCOT_PRESETS.find(m => m.id === mascotPreset) || MASCOT_PRESETS[0];

  // Dynamic CSS variables applied to root document
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--zero-accent-primary", theme.accentPrimary);
    root.style.setProperty("--zero-accent-secondary", theme.accentSecondary);
    root.style.setProperty("--zero-accent-tertiary", theme.accentTertiary);
    root.style.setProperty("--zero-glow", theme.glow);
    root.style.setProperty("--zero-glow-secondary", theme.glowSecondary);
    root.style.setProperty("--zero-glass", theme.glass);
    root.style.setProperty("--zero-surface", theme.surface);
    root.style.setProperty("--zero-surface-solid", theme.surfaceSolid);
    root.style.setProperty("--zero-border", theme.border);
    root.style.setProperty("--zero-border-highlight", theme.borderHighlight);
    root.style.setProperty("--zero-text", theme.text);
    root.style.setProperty("--zero-muted", theme.muted);
    root.style.setProperty("--zero-orbit", theme.orbit);
    root.style.setProperty("--zero-character-accent", theme.characterAccent);
  }, [theme]);

  // Global hotkeys (Ctrl+K for global palette, Esc for closing modals)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchPaletteOpen(prev => !prev);
        sound.select();
      } else if (e.key === "Escape") {
        setSearchPaletteOpen(false);
        setSelectedCapability(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigateTo = (screen, capability = null) => {
    sound.select();
    setCurrentScreen(screen);
    if (capability !== undefined) {
      setSelectedCapability(capability);
    }
  };

  const toggleSound = () => {
    const next = sound.toggleSound();
    setSoundEnabled(next);
    if (next) sound.select();
  };

  // Mock initial tasks
  const [tasks, setTasks] = useState([
    {
      id: "task-1",
      title: "Synthesize Q3 AI Frontier Benchmarks",
      agent: "Researcher",
      progress: 78,
      status: "running",
      time: "2m ago",
      icon: "Search"
    },
    {
      id: "task-2",
      title: "Sort and Deduplicate Workspace Files",
      agent: "Organizer",
      progress: 35,
      status: "running",
      time: "6m ago",
      icon: "Folder"
    },
    {
      id: "task-3",
      title: "Run Nightly Computer Health & Backup Audit",
      agent: "Builder",
      progress: 100,
      status: "completed",
      time: "12m ago",
      icon: "CheckCircle"
    }
  ]);

  // Mock Chat Messages
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      role: "assistant",
      timestamp: "10:22 PM",
      content: "Good evening, Owner. All 14 model routes are calibrated, your local computer hold bridge is active, and the Living Observatory is synchronized. What would you like to achieve today?",
      tools: null
    },
    {
      id: "msg-2",
      role: "user",
      timestamp: "10:24 PM",
      content: "Let's review our active agent workforce and inspect the display control feed for any background jobs.",
      tools: null
    },
    {
      id: "msg-3",
      role: "assistant",
      timestamp: "10:24 PM",
      content: "Certainly. I have checked your active specialists and observed the primary desktop feed. Researcher is currently 78% through the Q3 frontier benchmark extraction, and Organizer is organizing workspace assets in the background.",
      tools: [
        {
          name: "agent_runtime:query_status",
          status: "success",
          result: "Active agents: 3/5. Researcher, Organizer, Builder executing smoothly."
        },
        {
          name: "computer_control:inspect_screen",
          status: "success",
          result: "Display 1 (1920x1080) active. Chrome window in focus, terminal background task idle."
        }
      ]
    }
  ]);

  const addMessage = (content) => {
    sound.pulse();
    const newMsg = {
      id: `msg-${Date.now()}`,
      role: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      content
    };
    setMessages(prev => [...prev, newMsg]);

    // Simulate AI response
    setTimeout(() => {
      sound.select();
      setMascotEmotion("happy");
      const aiReply = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        content: `I've received your directive: "${content}". Engaging coordinated model fabric and orchestrating autonomous workflows across the observatory.`,
        tools: [
          {
            name: "gateway_fabric:dispatch",
            status: "success",
            result: `Dispatched intent to ${activeModel}. Execution underway.`
          }
        ]
      };
      setMessages(prev => [...prev, aiReply]);
    }, 900);
  };

  return (
    <ZeroContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        navigateTo,
        selectedCapability,
        setSelectedCapability,
        themeId,
        setThemeId,
        theme,
        envId,
        setEnvId,
        currentEnv,
        hologramGlow,
        setHologramGlow,
        particleDensity,
        setParticleDensity,
        hologramVisible,
        setHologramVisible,
        mascotPreset,
        setMascotPreset,
        mascotConfig,
        mascotVisible,
        setMascotVisible,
        mascotEmotion,
        setMascotEmotion,
        activeModel,
        setActiveModel,
        activeWorkspace,
        setActiveWorkspace,
        liveOpsOpen,
        setLiveOpsOpen,
        liveOpsTab,
        setLiveOpsTab,
        soundEnabled,
        toggleSound,
        reducedMotion,
        setReducedMotion,
        isListening,
        setIsListening,
        searchPaletteOpen,
        setSearchPaletteOpen,
        spatialRailExpanded,
        setSpatialRailExpanded,
        tasks,
        setTasks,
        messages,
        addMessage
      }}
    >
      {children}
    </ZeroContext.Provider>
  );
};

export const useZero = () => {
  const context = useContext(ZeroContext);
  if (!context) throw new Error("useZero must be used within a ZeroProvider");
  return context;
};
