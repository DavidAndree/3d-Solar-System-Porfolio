import { ExternalLink } from 'lucide-react';
import { projects } from '../../data';

interface ProjectsPanelProps {
  visible: boolean;
}

export default function ProjectsPanel({ visible }: ProjectsPanelProps) {
  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-lg">
        <div className="panel-header">
          <span className="text-red-400">MARS</span> // FRONTIER OPS
        </div>

        <p className="text-xs text-gray-500 mt-4 font-mono leading-relaxed">
          Active missions and deployed systems. Each project represents
          a frontier exploration in technology.
        </p>

        <div className="mt-6 space-y-3">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="project-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: `all 0.3s ease ${i * 80 + 200}ms`,
              }}
            >
              <div className="flex items-start justify-between">
                <h4 className="text-white font-mono text-xs">{project.title}</h4>
                <a
                  href={project.link}
                  className="text-gray-600 hover:text-cyan-400 transition-colors flex-shrink-0 ml-3"
                >
                  <ExternalLink size={12} />
                </a>
              </div>
              <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{project.description}</p>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://github.com/DavidAndree"
          target="_blank"
          rel="noopener noreferrer"
          className="hud-button mt-6 inline-flex items-center gap-2"
        >
          <ExternalLink size={12} />
          WARP TO GITHUB
        </a>
      </div>
    </div>
  );
}
