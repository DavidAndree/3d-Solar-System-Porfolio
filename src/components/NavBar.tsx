import {
  Sun, Cpu, Eye, Globe, Rocket,
  Briefcase, MessageSquare, BookOpen, Send, CircleDot,
} from 'lucide-react';
import type { CelestialId } from '../types';

interface NavBarProps {
  focusTarget: CelestialId | null;
  onFocus: (id: CelestialId | null) => void;
}

const navItems: { id: CelestialId; label: string; icon: typeof Sun }[] = [
  { id: 'sun', label: 'CORE', icon: Sun },
  { id: 'mercury', label: 'SKILLS', icon: Cpu },
  { id: 'venus', label: 'GALLERY', icon: Eye },
  { id: 'earth', label: 'BIO', icon: Globe },
  { id: 'mars', label: 'PROJECTS', icon: Rocket },
  { id: 'jupiter', label: 'CAREER', icon: Briefcase },
  { id: 'saturn', label: 'REVIEWS', icon: MessageSquare },
  { id: 'uranus', label: 'BLOG', icon: BookOpen },
  { id: 'neptune', label: 'CONTACT', icon: Send },
  { id: 'blackhole', label: '4D', icon: CircleDot },
];

export default function NavBar({ focusTarget, onFocus }: NavBarProps) {
  return (
    <nav className="nav-bar">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = focusTarget === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onFocus(active ? null : item.id)}
            className={`nav-item ${active ? 'nav-item-active' : ''} ${item.id === 'blackhole' ? 'nav-item-bh' : ''}`}
          >
            <Icon size={13} strokeWidth={1.5} />
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
