import { experience } from '../../data';

interface ExperiencePanelProps {
  visible: boolean;
}

export default function ExperiencePanel({ visible }: ExperiencePanelProps) {
  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-md">
        <div className="panel-header">
          <span className="text-amber-500">JUPITER</span> // MISSION LOG
        </div>

        <p className="text-xs text-gray-500 mt-4 font-mono leading-relaxed">
          Career trajectory and operational history across systems.
        </p>

        <div className="mt-6 relative">
          <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gray-800" />

          <div className="space-y-5">
            {experience.map((item, i) => (
              <div
                key={item.company}
                className="pl-6 relative"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(8px)',
                  transition: `all 0.4s ease ${i * 100 + 200}ms`,
                }}
              >
                <div className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full border border-amber-500/50 bg-gray-900" />
                <div className="text-[9px] font-mono tracking-[0.15em] text-amber-500/70 mb-1">
                  {item.period}
                </div>
                <div className="text-xs text-white font-mono">{item.role}</div>
                <div className="text-[10px] text-gray-500 font-mono mt-0.5">{item.company}</div>
                <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
