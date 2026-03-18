import { useState, useCallback, useRef } from 'react';
import { gallery } from '../../data';

interface GalleryPanelProps {
  visible: boolean;
}

interface HoverState {
  image: string;
  title: string;
}

function GalleryImage({
  src,
  alt,
  aspect,
  onHoverStart,
  onHoverEnd,
}: {
  src: string;
  alt: string;
  aspect?: string;
  onHoverStart: (image: string, title: string) => void;
  onHoverEnd: () => void;
}) {
  const handleMouseEnter = () => {
    onHoverStart(src, alt);
  };

  const aspectClass = aspect === 'phone'
    ? 'aspect-[3/4]'
    : aspect === 'portrait'
      ? 'aspect-[4/3]'
      : aspect === 'landscape'
        ? 'aspect-[16/9]'
        : 'aspect-[4/3]';

  return (
    <div
      className={`overflow-hidden rounded border border-white/5 group-hover:border-yellow-500/30 transition-all duration-500 ${aspectClass}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onHoverEnd}
    />
  );
}

export default function GalleryPanel({ visible }: GalleryPanelProps) {
  const featured = gallery[0];
  const phoneScreens = gallery.slice(1, 4);
  const bottom = gallery[4];
  const [hovered, setHovered] = useState<HoverState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHoverStart = useCallback((image: string, title: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered({ image, title });
  }, []);

  const handleHoverEnd = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setHovered(null);
    }, 150);
  }, []);

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
            className="flex gap-3 items-start"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.4s ease 200ms',
            }}
          >
            <div className="gallery-card group cursor-pointer w-1/2">
              <GalleryImage
                src={featured.image}
                alt={featured.title}
                aspect={featured.aspect}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
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
              <GalleryImage
                src={phoneScreens[0].image}
                alt={phoneScreens[0].title}
                aspect={phoneScreens[0].aspect}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
              <div className="mt-2">
                <h4 className="text-xs text-white font-mono">{phoneScreens[0].title}</h4>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{phoneScreens[0].category}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-start">
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
                <GalleryImage
                  src={item.image}
                  alt={item.title}
                  aspect={item.aspect}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                />
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
              <GalleryImage
                src={bottom.image}
                alt={bottom.title}
                aspect={bottom.aspect}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
              <div className="mt-2">
                <h4 className="text-xs text-white font-mono">{bottom.title}</h4>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{bottom.category}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {hovered && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        >
          <div
            className="relative max-w-[80vw] max-h-[80vh] rounded-lg overflow-hidden border border-yellow-500/40 shadow-2xl shadow-yellow-500/10"
            style={{
              animation: 'galleryZoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <img
              src={hovered.image}
              alt={hovered.title}
              className="block max-w-[80vw] max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
              <p className="text-xs text-white font-mono">{hovered.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
