import { skillCategories } from '../../data';

interface SkillsPanelProps {
  visible: boolean;
}

export default function SkillsPanel({ visible }: SkillsPanelProps) {
  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-md">
        <div className="panel-header">
          <span className="text-gray-400">MERCURY</span> // PROCESSING CORES
        </div>

        <p className="text-xs text-gray-500 mt-4 font-mono leading-relaxed">
          Runtime capabilities across primary technology domains.
        </p>

        <div className="mt-6 space-y-5">
          {skillCategories.map((group, gi) => (
            <div
              key={group.category}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: `all 0.4s ease ${gi * 100 + 150}ms`,
              }}
            >
              <div className="text-[9px] font-mono tracking-[0.2em] text-gray-600 mb-2">
                {group.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
