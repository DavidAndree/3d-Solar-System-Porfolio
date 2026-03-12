import { useState } from 'react';
import { posts } from '../../data';

interface WritingsPanelProps {
  visible: boolean;
}

export default function WritingsPanel({ visible }: WritingsPanelProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const featured = posts[0];
  const grid = posts.slice(1);

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
              onMouseEnter={() => setHoveredIdx(0)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="aspect-video overflow-hidden">
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
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="aspect-square overflow-hidden">
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
    </div>
  );
}
