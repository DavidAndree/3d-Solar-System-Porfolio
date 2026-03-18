import Tesseract from '../Tesseract';

interface FourthDimensionPanelProps {
  visible: boolean;
}

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
           Code for Tresseract this here:
          </p>
        </div>
      </div>
    </div>
  );
}
