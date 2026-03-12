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

        <div className="mt-5 flex gap-4">
          <div className="profile-image-wrapper flex-shrink-0">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="David Alvardo"
              className="w-24 h-24 rounded-sm object-cover border border-white/10"
            />
            <div className="mt-1.5 text-center">
              <span className="text-[7px] font-mono tracking-widest text-gray-600">REPLACE ME</span>
            </div>
          </div>

          <div className="space-y-3 text-gray-300 text-sm leading-relaxed font-sans">
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
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { value: '4+', label: 'YEARS EXP' },
            { value: '50+', label: 'PROJECTS' },
            { value: '∞', label: 'HOURS IN FIELD' },
            { value: '2', label: 'CELSIUS DRANKED' },
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
