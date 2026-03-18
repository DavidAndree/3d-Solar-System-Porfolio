import { useState, useRef, useCallback } from 'react';
import { gallery } from '../../data';

interface GalleryPanelProps {
  visible: boolean;
}

interface HoverState {
  image: string;
  title: string;
  rect: DOMRect;
}

function GalleryImage({
  src,
  alt,
  className,
  onHoverStart,
  onHoverEnd,
}: {
  src: string;
  alt: string;
  className: string;
  onHoverStart: (image: string, title: string, rect: DOMRect) => void;
  onHoverEnd: () => void;
}) {
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (imgRef.current) {
      onHoverStart(src, alt, imgRef.current.getBoundingClientRect());
    }
  };

  return (
    <div
      ref={imgRef}
      className="overflow-hidden rounded border border-white/5 group-hover:border-yellow-500/30 transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onHoverEnd}
    >
      <img
        src={src}
        alt={alt}
        className={className}
      />
    </div>
  );
}

export default function GalleryPanel({ visible }: GalleryPanelProps) {
  const featured = gallery[0];
  const phoneScreens = gallery.slice(1, 4);
  const bottom = gallery[4];
  const [hovered, setHovered] = useState<HoverState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHoverStart = useCallback((image: string, title: string, rect: DOMRect) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered({ image, title, rect });
  }, []);

  const handleHoverEnd = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setHovered(null);
    }, 150);
  }, []);

  const imgClass = "w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-105";

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
              <GalleryImage
                src={featured.image}
                alt={featured.title}
                className={imgClass}
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
                className={imgClass}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
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
                <GalleryImage
                  src={item.image}
                  alt={item.title}
                  className={imgClass}
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
                className="w-full h-36 object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
