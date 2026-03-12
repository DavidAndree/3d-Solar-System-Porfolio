import type { CelestialId } from '../types';
import HeroPanel from './panels/HeroPanel';
import SkillsPanel from './panels/SkillsPanel';
import GalleryPanel from './panels/GalleryPanel';
import AboutPanel from './panels/AboutPanel';
import ProjectsPanel from './panels/ProjectsPanel';
import ExperiencePanel from './panels/ExperiencePanel';
import TestimonialsPanel from './panels/TestimonialsPanel';
import WritingsPanel from './panels/WritingsPanel';
import ContactPanel from './panels/ContactPanel';
import FourthDimensionPanel from './panels/FourthDimensionPanel';

interface HUDOverlayProps {
  focusTarget: CelestialId | null;
}

export default function HUDOverlay({ focusTarget }: HUDOverlayProps) {
  return (
    <div className="hud-overlay">
      <HeroPanel visible={focusTarget === 'sun'} />
      <SkillsPanel visible={focusTarget === 'mercury'} />
      <GalleryPanel visible={focusTarget === 'venus'} />
      <AboutPanel visible={focusTarget === 'earth'} />
      <ProjectsPanel visible={focusTarget === 'mars'} />
      <ExperiencePanel visible={focusTarget === 'jupiter'} />
      <TestimonialsPanel visible={focusTarget === 'saturn'} />
      <WritingsPanel visible={focusTarget === 'uranus'} />
      <ContactPanel visible={focusTarget === 'neptune'} />
      <FourthDimensionPanel visible={focusTarget === 'blackhole'} />
    </div>
  );
}
