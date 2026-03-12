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
            Computer Science student pationate about software development, machine learning, AI, math, and physics. I'm David Alvardo btw and this is like my little "space" to share my projects, repos, things about me, experience, to amaze my employers.
          </p>
          <p>
            My journey started with a B.S. in Computer Science from Western Michigan University, followed
            by roles at startups (myself) and ideas that I had and made them into real products.
          </p>
          <p>
            When I'm not coding, you'll find me in some capacity getting closer to my goals.
            Also I am in insane shape.
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
