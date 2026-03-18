import { ExternalLink } from 'lucide-react';
import { gallery } from '../../data';

interface GalleryPanelProps {
  visible: boolean;
}

export default function GalleryPanel({ visible }: GalleryPanelProps) {
  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-sm">
        <div className="panel-header">
          <span className="text-yellow-500">VENUS</span> // VISUAL OUTPUT
        </div>

        <p className="text-xs text-gray-500 mt-4 font-mono leading-relaxed">
          Some of my projects and interest here. Me just sitting in my room making
          "cool" stuff and sharing it with the world.
        </p>

        <div className="mt-6 space-y-2">
          {gallery.map((item, i) => (
            <div
              key={item.title}
              className="group flex items-center justify-between px-3 py-3 rounded border border-white/5 hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition-all duration-300 cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: `all 0.35s ease ${i * 60 + 150}ms`,
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[9px] font-mono text-gray-600 w-4 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h4 className="text-xs text-white font-mono truncate">{item.title}</h4>
                  <p className="text-[9px] text-gray-600 font-mono uppercase tracking-wider mt-0.5">
                    {item.category}
                  </p>
                </div>
              </div>
              <ExternalLink
                size={10}
                className="text-gray-700 group-hover:text-yellow-500/60 transition-colors flex-shrink-0 ml-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
