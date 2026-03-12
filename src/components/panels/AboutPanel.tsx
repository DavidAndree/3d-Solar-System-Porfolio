interface AboutPanelProps {
  visible: boolean;
}

export default function AboutPanel({ visible }: AboutPanelProps) {
  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel glass-panel max-w-lg">
        <div className="panel-header">
          <span className="text-blue-400">EARTH</span> // ORIGIN DATA
        </div>

        <div className="mt-6 space-y-4 text-gray-300 text-sm leading-relaxed font-sans">
          <p>
            Full-stack engineer with 8+ years of experience building digital
            experiences at the intersection of design and technology. I specialize
            in creating immersive web applications, real-time systems, and 3D
            visualizations.
          </p>
          <p>
            My journey started with a B.S. in Computer Science from MIT, followed
            by roles at startups and Fortune 500 companies where I led teams
            building products used by millions.
          </p>
          <p>
            When I'm not coding, you'll find me exploring astrophotography,
            contributing to open-source projects, or experimenting with generative art.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { value: '8+', label: 'YEARS EXP' },
            { value: '50+', label: 'PROJECTS' },
            { value: '12', label: 'CLIENTS' },
            { value: '3', label: 'PATENTS' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: `all 0.4s ease ${i * 80 + 300}ms`,
              }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
