import { posts } from '../../data';

interface WritingsPanelProps {
  visible: boolean;
}

export default function WritingsPanel({ visible }: WritingsPanelProps) {
  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-sm">
        <div className="panel-header">
          <span className="text-teal-400">URANUS</span> // FEED
        </div>

        <p className="text-xs text-gray-500 mt-4 font-mono leading-relaxed">
          Snapshots from the field -- what I'm building, learning, and doing.
        </p>

        <div className="mt-5 space-y-1.5">
          {posts.map((post, i) => (
            <div
              key={i}
              className="group flex items-start gap-3 px-3 py-3 rounded border border-white/5 hover:border-teal-400/20 hover:bg-teal-400/[0.02] transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: `all 0.35s ease ${i * 60 + 150}ms`,
              }}
            >
              <span className="text-[9px] font-mono text-gray-600 mt-0.5 w-4 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="feed-tag flex-shrink-0">{post.tag}</span>
                  <span className="text-[8px] font-mono text-gray-600">{post.date}</span>
                </div>
                <p className="text-[11px] font-mono text-gray-300 mt-1.5 leading-relaxed">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
