import { useState, useRef, useCallback } from 'react';
import { posts } from '../../data';

interface WritingsPanelProps {
  visible: boolean;
}

interface HoverState {
  image: string;
  caption: string;
}

export default function WritingsPanel({ visible }: WritingsPanelProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [enlarged, setEnlarged] = useState<HoverState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const featured = posts[0];
  const grid = posts.slice(1);

  const handleEnlargeStart = useCallback((image: string, caption: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setEnlarged({ image, caption });
  }, []);

  const handleEnlargeEnd = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setEnlarged(null);
    }, 150);
  }, []);

  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-sm">
        <div className="panel-header">
          <span className="text-teal-400">URANUS</span> // FEED
        </div>

        <p className="text-xs text-gray-500 mt-4 font-mono leading-relaxed">
          Snapshots from the field -- what I'm building, learning, and doing.
        </p>

        <div className="mt-5 space-y-2.5">
          {featured && (
            <div
              className="feed-card group cursor-pointer relative overflow-hidden rounded-sm"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.96)',
                transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1) 150ms',
              }}
              onMouseEnter={() => {
                setHoveredIdx(0);
                handleEnlargeStart(featured.image, featured.caption);
              }}
              onMouseLeave={() => {
                setHoveredIdx(null);
                handleEnlargeEnd();
              }}
            >
              <div className={`overflow-hidden ${featured.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-video'}`}>
                <img
                  src={featured.image}
                  alt={featured.caption}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(to top, rgba(6,8,15,0.92) 0%, rgba(6,8,15,0.3) 50%, transparent 100%)',
                  opacity: hoveredIdx === 0 ? 1 : 0.6,
                }}
              />

              <div className="absolute top-2 left-2">
                <span className="feed-tag">{featured.tag}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p
                  className="text-[10px] font-mono text-gray-200 leading-snug transition-all duration-300"
                  style={{
                    opacity: hoveredIdx === 0 ? 1 : 0,
                    transform: hoveredIdx === 0 ? 'translateY(0)' : 'translateY(6px)',
                  }}
                >
                  {featured.caption}
                </p>
                <span className="text-[8px] font-mono text-gray-500 mt-1 block">{featured.date}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            {grid.map((post, i) => {
              const idx = i + 1;
              return (
                <div
                  key={idx}
                  className="feed-card group cursor-pointer relative overflow-hidden rounded-sm"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.96)',
                    transition: `all 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 80 + 150}ms`,
                  }}
                  onMouseEnter={() => {
                    setHoveredIdx(idx);
                    handleEnlargeStart(post.image, post.caption);
                  }}
                  onMouseLeave={() => {
                    setHoveredIdx(null);
                    handleEnlargeEnd();
                  }}
                >
                  <div className={`overflow-hidden ${post.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'}`}>
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(6,8,15,0.92) 0%, rgba(6,8,15,0.3) 50%, transparent 100%)',
                      opacity: hoveredIdx === idx ? 1 : 0.6,
                    }}
                  />

                  <div className="absolute top-2 left-2">
                    <span className="feed-tag">{post.tag}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <p
                      className="text-[10px] font-mono text-gray-200 leading-snug transition-all duration-300"
                      style={{
                        opacity: hoveredIdx === idx ? 1 : 0,
                        transform: hoveredIdx === idx ? 'translateY(0)' : 'translateY(6px)',
                      }}
                    >
                      {post.caption}
                    </p>
                    <span className="text-[8px] font-mono text-gray-500 mt-1 block">{post.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {enlarged && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        >
          <div
            className="relative max-w-[80vw] max-h-[80vh] rounded-lg overflow-hidden border border-teal-400/40 shadow-2xl shadow-teal-400/10"
            style={{
              animation: 'galleryZoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <img
              src={enlarged.image}
              alt={enlarged.caption}
              className="block max-w-[80vw] max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
              <p className="text-xs text-white font-mono">{enlarged.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
