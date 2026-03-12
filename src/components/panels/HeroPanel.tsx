interface HeroPanelProps {
  visible: boolean;
}

export default function HeroPanel({ visible }: HeroPanelProps) {
  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-lg">
        <div className="panel-header">
          <span className="text-amber-400">SYS</span> // IDENTITY CORE
        </div>

        <div className="mt-8">
          <h1 className="text-4xl font-bold tracking-tight text-white font-sans">
            David Alvarado
          </h1>
          <p className="text-base text-cyan-400 mt-2 font-mono">
            CS Student & Creative Engineer
          </p>
        </div>

        <div className="mt-8 space-y-1">
          <div className="status-row">
            <span className="status-label">SYSTEM STATUS</span>
            <span className="status-value text-emerald-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
              AVAILABLE FOR WORK
            </span>
          </div>
          <div className="status-row">
            <span className="status-label">LOCATION</span>
            <span className="status-value">KALAMAZOO, MI</span>
          </div>
          <div className="status-row">
            <span className="status-label">SPECIALIZATION</span>
            <span className="status-value">SOFTWARE / ML / AI</span>
          </div>
          <div className="status-row">
            <span className="status-label">UPTIME</span>
            <span className="status-value">3+ YEARS</span>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <a href="mailto:hello@alexchen.dev" className="hud-button">
            EMAIL ME
          </a>
          <a href="#" className="hud-button-outline">
            DOWNLOAD CV
          </a>
        </div>
      </div>
    </div>
  );
}
