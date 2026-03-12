import type { PlanetConfig } from './types';

export const planets: PlanetConfig[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    label: 'MERCURY // TECH STACK',
    orbitRadius: 4.5,
    size: 0.35,
    color: '#b0b0b0',
    emissive: '#4a4a4a',
    speed: 0.15,
    offset: 0,
  },
  {
    id: 'venus',
    name: 'Venus',
    label: 'VENUS // GALLERY',
    orbitRadius: 7,
    size: 0.5,
    color: '#e8c56d',
    emissive: '#8a6d2b',
    speed: 0.1,
    offset: Math.PI * 0.7,
  },
  {
    id: 'earth',
    name: 'Earth',
    label: 'EARTH // BIO',
    orbitRadius: 10,
    size: 0.55,
    color: '#4da6ff',
    emissive: '#1a4a7a',
    speed: 0.07,
    offset: Math.PI * 1.3,
  },
  {
    id: 'mars',
    name: 'Mars',
    label: 'MARS // PROJECTS',
    orbitRadius: 13,
    size: 0.45,
    color: '#d45d3c',
    emissive: '#6a2010',
    speed: 0.05,
    offset: Math.PI * 0.3,
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    label: 'JUPITER // CAREER',
    orbitRadius: 18,
    size: 1.1,
    color: '#c88b3a',
    emissive: '#6a4410',
    speed: 0.03,
    offset: Math.PI * 1.1,
  },
  {
    id: 'saturn',
    name: 'Saturn',
    label: 'SATURN // REVIEWS',
    orbitRadius: 23,
    size: 0.9,
    color: '#e8d19a',
    emissive: '#7a6830',
    speed: 0.022,
    offset: Math.PI * 0.5,
    rings: {
      innerRadius: 1.3,
      outerRadius: 2.2,
      color: '#d4c08a',
      opacity: 0.35,
    },
  },
  {
    id: 'uranus',
    name: 'Uranus',
    label: 'URANUS // BLOG',
    orbitRadius: 28,
    size: 0.65,
    color: '#73c5d0',
    emissive: '#2a5a60',
    speed: 0.016,
    offset: Math.PI * 1.7,
  },
  {
    id: 'neptune',
    name: 'Neptune',
    label: 'NEPTUNE // CONTACT',
    orbitRadius: 33,
    size: 0.6,
    color: '#3955c4',
    emissive: '#1a2a6a',
    speed: 0.012,
    offset: Math.PI * 0.9,
  },
];

export const skillCategories = [
  {
    category: 'SYSTEMS & LANGUAGES',
    // The lifeblood (Earth)
    items: ['C', 'C++', 'Assembly', 'Python', 'Git','JavaScript', 'Linux', 'Swift', 'Typescript'],
  },
  {
    category: 'FRONTEND & UI',
    // The surface visuals (Venus)
    items: ['React', 'Web Dev', 'GUIs'],
  },
  {
    category: 'BACKEND & DATABASE',
    // The infrastructure (Mars)
    items: ['Django', 'Flask', 'API Integration', 'Docker', 'Supabase', 'PostgreSQL',     'MongoDB'],
  },
  {
    category: 'AUTOMATION & AI ',
    // Complex systems (Jupiter)
    items: ['N8N', 'OpenCV', 'OpenClaw', 'TensorFlow', 'PyTorch'],
  },
  {
    category: 'REAL LIFE',
    // The governing forces (Saturn)
    items: ['Team Leadership', 'Team Collaboration', 'Start-up Operations', 'Sales Skills','Effective Public Speaker', 'Problem-solving Aptitude', 'Adaptive Learner'],
  },
];

export const projects = [
  {
    title: 'Neural Interface',
    description: 'AI-powered real-time data visualization platform with WebGL rendering.',
    tech: ['React', 'Three.js', 'Python', 'TensorFlow'],
    link: '#',
  },
  {
    title: 'Quantum Ledger',
    description: 'Decentralized transaction system with zero-knowledge proof verification.',
    tech: ['Rust', 'TypeScript', 'PostgreSQL'],
    link: '#',
  },
  {
    title: 'Horizon OS',
    description: 'Cross-platform task management system with real-time collaboration.',
    tech: ['React', 'Node.js', 'WebSocket', 'Redis'],
    link: '#',
  },
  {
    title: 'Signal Flow',
    description: 'Audio processing engine with spectral analysis and ML-driven enhancement.',
    tech: ['Python', 'C++', 'WebAudio API'],
    link: '#',
  },
];

export const gallery = [
  {
    title: 'Nebula Dashboard',
    category: 'UI/UX',
    image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Crystal Interface',
    category: 'Web Design',
    image: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Aurora Concept',
    category: 'Brand Identity',
    image: 'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Deep Field',
    category: 'Data Viz',
    image: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const experience = [
  {
    role: '???',
    company: '?',
    period: '20?? - PRESENT',
    description: 'Only time will decide.',
  },
  {
    role: 'Computer Support Technician',
    company: 'Kalamazoo Valley Community College',
    period: '2024 - PRESENT',
    description: 'Maintained 500+ systems and automated IT workflows using Power Automate to ensure high uptime lab operations and rapid technical resolution. Front Desk + Ticketing Systems.',
  },
  {
    role: 'Founder',
    company: 'XDA Media',
    period: '2024 - 2026',
    description: 'B2B Lead Gen Automation for Jewelers and Watch Dealers.',
  },
  {
    role: 'Computer Information Systems Tutor',
    company: 'Kalamazoo Valley Community College',
    period: '2023 - 2024',
    description: 'Simplified complex CIS algorithms and programming concepts into clear, actionable explanations for students.',
  },
];

export const testimonials = [
  {
    name: 'Jia Seed ',
    role: 'Founder, Jam',
    text: "One of the most talented engineers I've worked with. Combines deep technical knowledge with an extraordinary eye for design.",
  },
  {
    name: 'Eliseo Guerra',
    role: 'Veteran/ CEO @ ComputerLab',
    text: 'Does stuff',
  },
  {
    name: 'Dr. Elena Vasquez',
    role: 'Director, MIT Media Lab',
    text: 'A rare combination of engineering rigor and creative vision. Their research work continues to push boundaries.',
  },
];

export const posts = [
  {
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Late night coding sessions building something new',
    tag: 'DEV',
    date: '2026.03',
  },
  {
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Working on a new automation pipeline',
    tag: 'BUILD',
    date: '2026.02',
  },
  {
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Exploring new tools and frameworks',
    tag: 'LEARN',
    date: '2026.01',
  },
  {
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Fresh perspective from the outdoors',
    tag: 'LIFE',
    date: '2025.12',
  },
  {
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Pair programming and whiteboard sessions',
    tag: 'TEAM',
    date: '2025.11',
  },
  {
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Deep dive into systems programming',
    tag: 'DEV',
    date: '2025.10',
  },
];
