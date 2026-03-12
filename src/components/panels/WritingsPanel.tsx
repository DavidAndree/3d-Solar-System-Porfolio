import { writings } from '../../data';

interface WritingsPanelProps {
  visible: boolean;
}

export default function WritingsPanel({ visible }: WritingsPanelProps) {
  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-md">
        <div className="panel-header">
          <span className="text-teal-400">URANUS</span> // DATA LOGS
        </div>

        <p className="text-xs text-gray-500 mt-4 font-mono leading-relaxed">
          Recorded transmissions and research publications from deep-field operations.
        </p>

        <div className="mt-6 space-y-3">
          {writings.map((item, i) => (
            <div
              key={item.title}
              className="writing-card group cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: `all 0.4s ease ${i * 100 + 200}ms`,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] font-mono tracking-[0.15em] px-1.5 py-0.5 border border-teal-500/20 text-teal-400 bg-teal-500/5 rounded-sm">
                      {item.category}
                    </span>
                    <span className="text-[9px] font-mono text-gray-600">{item.date}</span>
                  </div>
                  <h4 className="text-xs text-white font-mono group-hover:text-teal-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{item.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
