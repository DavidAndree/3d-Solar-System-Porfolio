import Tesseract from '../Tesseract';

interface FourthDimensionPanelProps {
  visible: boolean;
}

const concepts = [
  {
    title: 'TIME AS SPACE',
    description: 'Near the singularity, time becomes a traversable spatial dimension. Past and future coexist as locations.',
  },
  {
    title: 'WARPED GEOMETRY',
    description: 'Spacetime curves infinitely inward. Parallel lines converge. Euclidean rules dissolve.',
  },
  {
    title: 'INFINITE DENSITY',
    description: 'All matter compresses to a dimensionless point. Physics as we know it ceases to apply.',
  },
  {
    title: 'QUANTUM FOAM',
    description: 'At Planck scale, spacetime itself becomes turbulent. Reality fluctuates between states of existence.',
  },
];

export default function FourthDimensionPanel({ visible }: FourthDimensionPanelProps) {
  return (
    <div className={`panel-container ${visible ? 'panel-visible' : 'panel-hidden'}`}>
      <div className="hud-panel max-w-md">
        <div className="panel-header">
          <span className="text-orange-400">SINGULARITY</span> // BEYOND SPACETIME
        </div>

        <div
          className="mt-5 border border-white/5 rounded bg-black/40 overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.3s',
          }}
        >
          {visible && <Tesseract />}
          <div className="text-center pb-3">
            <span className="text-[8px] font-mono tracking-[0.25em] text-cyan-400/60">
              TESSERACT // 4D HYPERCUBE PROJECTION
            </span>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs text-gray-400 leading-relaxed">
           Code for Tresseract this here
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {concepts.map((concept, i) => (
            <div
              key={concept.title}
              className="fourth-dim-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(6px)',
                transition: `all 0.4s ease ${i * 100 + 500}ms`,
              }}
            >
              <div className="text-[8px] font-mono tracking-[0.15em] text-orange-400/80 mb-1">
                {concept.title}
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
