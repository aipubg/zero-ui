import React from "react";
import { useZero } from "../../context/ZeroContext";
import { ZeroTopNav } from "./ZeroTopNav";
import { ZeroSpatialRail } from "./ZeroSpatialRail";
import { ZeroCommandBar } from "./ZeroCommandBar";
import { ZeroLiveOperations } from "../telemetry/ZeroLiveOperations";
import { ZeroCommandPalette } from "./ZeroCommandPalette";

import { ZeroObservatoryScene } from "../observatory/ZeroObservatoryScene";
import { ZeroChatScreen } from "../screens/ZeroChatScreen";
import { ZeroComputerScreen } from "../screens/ZeroComputerScreen";
import { ZeroAgentsScreen } from "../screens/ZeroAgentsScreen";
import { ZeroMemoryScreen } from "../screens/ZeroMemoryScreen";
import { ZeroSearchScreen } from "../screens/ZeroSearchScreen";
import { ZeroModelsScreen } from "../screens/ZeroModelsScreen";
import { ZeroSkillsScreen } from "../screens/ZeroSkillsScreen";
import { ZeroPluginsScreen } from "../screens/ZeroPluginsScreen";
import { ZeroAutomationsScreen } from "../screens/ZeroAutomationsScreen";
import { ZeroProjectsScreen } from "../screens/ZeroProjectsScreen";
import { ZeroSettingsScreen } from "../screens/ZeroSettingsScreen";
import { ZeroAppearanceScreen } from "../screens/ZeroAppearanceScreen";
import { ZeroDesignSystemScreen } from "../screens/ZeroDesignSystemScreen";
import { ZeroReferenceGallery } from "../screens/ZeroReferenceGallery";

export const ZeroAppShell = () => {
  const { currentScreen, spatialRailExpanded, liveOpsOpen } = useZero();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case "home":
        return <ZeroObservatoryScene />;
      case "chat":
        return <ZeroChatScreen />;
      case "computer":
        return <ZeroComputerScreen />;
      case "agents":
        return <ZeroAgentsScreen />;
      case "memory":
        return <ZeroMemoryScreen />;
      case "search":
        return <ZeroSearchScreen />;
      case "models":
        return <ZeroModelsScreen />;
      case "skills":
        return <ZeroSkillsScreen />;
      case "plugins":
        return <ZeroPluginsScreen />;
      case "automations":
        return <ZeroAutomationsScreen />;
      case "projects":
        return <ZeroProjectsScreen />;
      case "settings":
        return <ZeroSettingsScreen />;
      case "appearance":
        return <ZeroAppearanceScreen />;
      case "design-system":
        return <ZeroDesignSystemScreen />;
      case "gallery":
        return <ZeroReferenceGallery />;
      default:
        return <ZeroObservatoryScene />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030712] text-slate-100 flex flex-col select-none">
      {/* Top Header / Omnibar */}
      <ZeroTopNav />

      {/* Main Center Stage */}
      <main
        className={`relative flex-1 w-full h-full transition-all duration-300 ${
          spatialRailExpanded ? "pl-64" : "pl-20"
        } ${liveOpsOpen && currentScreen === "home" ? "pr-84" : "pr-4"}`}
      >
        {renderActiveScreen()}
      </main>

      {/* Left Spatial Navigation Rail */}
      <ZeroSpatialRail />

      {/* Floating Conversational Command Console (Shown on Home and can jump to any task) */}
      {currentScreen === "home" && <ZeroCommandBar />}

      {/* Collapsible Right Live Operations Panel */}
      <ZeroLiveOperations />

      {/* Global Command Palette (Ctrl+K) */}
      <ZeroCommandPalette />
    </div>
  );
};
