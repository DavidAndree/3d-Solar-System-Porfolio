import { gallery } from '../../data';

interface GalleryPanelProps {
  visible: boolean;
}

export default function GalleryPanel({ visible }: GalleryPanelProps) {
  const featured = gallery[0];
  const phoneScreens = gallery.slice(1, 4);
  const bottom = gallery[4];

  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-xl">
        <div className="panel-header">
          <span className="text-yellow-500">VENUS</span> // VISUAL OUTPUT
        </div>

        <p className="text-xs text-gray-500 mt-4 font-mono leading-relaxed">
          Some of my projects and interest here. Me just sitting in my room making "cool" stuff and sharing it with the world. This is like my "gallery" of things that I find interesting and want to share.
        </p>

        <div className="mt-6 space-y-3">
          <div
            className="flex gap-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.4s ease 200ms',
            }}
          >
            <div className="gallery-card group cursor-pointer w-1/2">
              <div className="overflow-hidden rounded border border-white/5 group-hover:border-yellow-500/30 transition-colors">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-2">
                <h4 className="text-xs text-white font-mono">{featured.title}</h4>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{featured.category}</p>
              </div>
            </div>

            <div
              className="gallery-card group cursor-pointer w-1/2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.4s ease 300ms',
              }}
            >
              <div className="overflow-hidden rounded border border-white/5 group-hover:border-yellow-500/30 transition-colors">
                <img
                  src={phoneScreens[0].image}
                  alt={phoneScreens[0].title}
                  className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-2">
                <h4 className="text-xs text-white font-mono">{phoneScreens[0].title}</h4>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{phoneScreens[0].category}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {phoneScreens.slice(1).map((item, i) => (
              <div
                key={item.title}
                className="gallery-card group cursor-pointer w-1/2"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(10px)',
                  transition: `all 0.4s ease ${(i + 2) * 100 + 200}ms`,
                }}
              >
                <div className="overflow-hidden rounded border border-white/5 group-hover:border-yellow-500/30 transition-colors">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2">
                  <h4 className="text-xs text-white font-mono">{item.title}</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

          {bottom && (
            <div
              className="gallery-card group cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.4s ease 600ms',
              }}
            >
              <div className="overflow-hidden rounded border border-white/5 group-hover:border-yellow-500/30 transition-colors">
                <img
                  src={bottom.image}
                  alt={bottom.title}
                  className="w-full h-36 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-2">
                <h4 className="text-xs text-white font-mono">{bottom.title}</h4>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{bottom.category}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
