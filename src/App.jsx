import React from "react";
import { ZeroProvider } from "./context/ZeroContext";
import { ZeroAppShell } from "./components/shell/ZeroAppShell";

export default function App() {
  return (
    <ZeroProvider>
      <ZeroAppShell />
    </ZeroProvider>
  );
}
