import { Github } from 'lucide-react';
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
          <p className="text-xs text-gray-400 leading-relaxed mb-3">
            Code for the Tesseract lives here:
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/10 bg-white/5 text-xs font-mono text-gray-300 hover:border-orange-400/40 hover:text-orange-400 transition-all duration-300"
          >
            <Github size={14} />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
