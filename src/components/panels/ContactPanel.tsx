import { ExternalLink } from 'lucide-react';

interface ContactPanelProps {
  visible: boolean;
}

const links = [
  { label: 'EMAIL', value: 'davidalvaradoc0106@gmail.com', href: 'mailto:davidalvaradoc0106@gmail.com' },
  { label: 'GITHUB', value: 'github.com/DavidAndree', href: 'https://github.com/DavidAndree' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/davidalvaradocontreras', href: 'https://linkedin.com/in/davidalvaradocontreras' },
  { label: 'HIMALAYAS', value: '@davidalvarado', href: 'https://himalayas.app/@davidalvarado' },
];

export default function ContactPanel({ visible }: ContactPanelProps) {
  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-sm">
        <div className="panel-header">
          <span className="text-blue-400">NEPTUNE</span> // DEEP LINK
        </div>

        <p className="text-xs text-gray-500 mt-4 font-mono leading-relaxed">
          Open communication channels. All frequencies monitored.
        </p>

        <div className="mt-6 space-y-2">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(6px)',
                transition: `all 0.35s ease ${i * 80 + 200}ms`,
              }}
            >
              <div>
                <div className="text-[9px] font-mono tracking-[0.15em] text-gray-600 mb-0.5">
                  {link.label}
                </div>
                <div className="text-xs font-mono text-gray-300 group-hover:text-cyan-300 transition-colors">
                  {link.value}
                </div>
              </div>
              <ExternalLink size={12} className="text-gray-700 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
            </a>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/5">
          <div className="text-[9px] font-mono tracking-[0.15em] text-gray-600 mb-2">
            SIGNAL STATUS
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400">
              ALL CHANNELS OPEN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
