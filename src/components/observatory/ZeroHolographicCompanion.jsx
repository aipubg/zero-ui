import React, { useState, useEffect } from "react";
import { useZero } from "../../context/ZeroContext";
import { ZeroThreeHologram } from "./ZeroThreeHologram";

export const ZeroHolographicCompanion = () => {
  const {
    theme,
    isListening,
    companionState = "idle"
  } = useZero();

  const activeState = isListening ? "listening" : companionState;

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* 1. Real-Time WebGL 3D Holographic Dais Emitter & Volumetric Light Beam */}
      <ZeroThreeHologram companionState={activeState} />

      {/* 2. Interactive Voice / Thought Energy Pulse when Listening or Speaking */}
      {activeState === "listening" && (
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border-2 border-cyan-400/80 animate-ping pointer-events-none" />
      )}
    </div>
  );
};
