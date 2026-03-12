import { useState, useEffect, useCallback } from 'react';
import SceneCanvas from './components/SceneCanvas';
import HUDOverlay from './components/HUDOverlay';
import NavBar from './components/NavBar';
import type { CelestialId } from './types';

export default function App() {
  const [focusTarget, setFocusTarget] = useState<CelestialId | null>(null);

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setFocusTarget(null);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  return (
    <div className="app">
      <header className="hud-header">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono text-gray-500 tracking-[0.2em]">
            SOLAR PORTFOLIO v2.1
          </span>
        </div>
        <button
          onClick={() => setFocusTarget(null)}
          className={`text-[10px] font-mono tracking-wider transition-colors duration-300 ${
            focusTarget
              ? 'text-gray-400 hover:text-cyan-400'
              : 'text-gray-700'
          }`}
        >
          [ESC] OVERVIEW
        </button>
      </header>

      <SceneCanvas focusTarget={focusTarget} onFocus={setFocusTarget} />
      <HUDOverlay focusTarget={focusTarget} />
      <NavBar focusTarget={focusTarget} onFocus={setFocusTarget} />
    </div>
  );
}
