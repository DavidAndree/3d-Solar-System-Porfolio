import { testimonials } from '../../data';

interface TestimonialsPanelProps {
  visible: boolean;
}

export default function TestimonialsPanel({ visible }: TestimonialsPanelProps) {
  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-md">
        <div className="panel-header">
          <span className="text-yellow-300">SATURN</span> // SIGNAL INTERCEPTS
        </div>

        <p className="text-xs text-gray-500 mt-4 font-mono leading-relaxed">
          Transmissions received from collaborators and commanding officers.
        </p>

        <div className="mt-6 space-y-4">
          {testimonials.map((item, i) => (
            <div
              key={item.name}
              className="testimonial-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: `all 0.4s ease ${i * 120 + 200}ms`,
              }}
            >
              <p className="text-[11px] text-gray-300 leading-relaxed italic">
                "{item.text}"
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-yellow-900/30 border border-yellow-700/30 flex items-center justify-center">
                  <span className="text-[8px] text-yellow-400 font-mono">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-[10px] text-white font-mono">{item.name}</div>
                  <div className="text-[9px] text-gray-600 font-mono">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
