import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Brain,
  Database,
  Cpu,
  BrainCircuit,
  Sparkles,
} from 'lucide-react';

export const PROFILE = {
  name: 'Nyiko Given Vumani',
  tagline: 'BSc Mathematics & Computer Science | Aspiring Data Scientist & AI Engineer',
  github: 'https://github.com/nyikogivenvumani-web',
  githubHandle: 'nyikogivenvumani-web',
  email: '', // placeholder — fill in when available
  linkedin: '', // placeholder — fill in when available
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
] as const;

export const ABOUT_STATS = [
  { label: 'BSc Mathematics & Computer Science', value: 'UNISA' },
  { label: 'Data Science Focus', value: 'Core' },
  { label: 'AI/ML Interest', value: 'Active' },
  { label: 'Software Development', value: 'Building' },
];

export type SkillCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  skills: Skill[];
};

export type Skill = {
  name: string;
  desc: string;
  level: number; // 0-100, kept realistic
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    icon: Code2,
    blurb: 'Languages I use to write logic, systems and analysis.',
    skills: [
      { name: 'Python', desc: 'Data science, scripting & ML', level: 75 },
      { name: 'C++', desc: 'Algorithms & data structures', level: 55 },
      { name: 'JavaScript', desc: 'Interactive web applications', level: 70 },
      { name: 'TypeScript', desc: 'Typed modern web apps', level: 60 },
      { name: 'SQL', desc: 'Relational data & queries', level: 65 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Sparkles,
    blurb: 'Building responsive, accessible interfaces.',
    skills: [
      { name: 'HTML', desc: 'Semantic structure', level: 80 },
      { name: 'CSS', desc: 'Layout & styling', level: 75 },
      { name: 'JavaScript', desc: 'DOM & interactivity', level: 70 },
      { name: 'React', desc: 'Component-based UIs', level: 65 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Database,
    blurb: 'APIs and services that power applications.',
    skills: [
      { name: 'Node.js', desc: 'Server-side JavaScript', level: 60 },
      { name: 'REST APIs', desc: 'Service communication', level: 65 },
      { name: 'Supabase', desc: 'Postgres & auth platform', level: 60 },
    ],
  },
  {
    id: 'data-ai',
    title: 'Data & AI',
    icon: BrainCircuit,
    blurb: 'Where mathematics meets machine intelligence.',
    skills: [
      { name: 'Python', desc: 'Pandas, NumPy, scikit-learn', level: 75 },
      { name: 'Data Analysis', desc: 'Exploration & insight', level: 70 },
      { name: 'Machine Learning', desc: 'Models & evaluation', level: 55 },
      { name: 'Artificial Intelligence', desc: 'Concepts & applications', level: 55 },
      { name: 'Statistics', desc: 'Inference & probability', level: 70 },
      { name: 'Mathematics', desc: 'Algebra, calculus, logic', level: 80 },
    ],
  },
  {
    id: 'cloud-tools',
    title: 'Cloud & Tools',
    icon: Cpu,
    blurb: 'Tooling I rely on day to day.',
    skills: [
      { name: 'Git', desc: 'Version control', level: 70 },
      { name: 'GitHub', desc: 'Collaboration & hosting', level: 75 },
      { name: 'Microsoft Azure', desc: 'Cloud platform — learning', level: 35 },
      { name: 'VS Code', desc: 'Primary editor', level: 85 },
    ],
  },
];

export type ExperienceItem = {
  title: string;
  tag: string;
  description: string;
  icon: LucideIcon;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Software Development / AI Learning',
    tag: 'Independent Projects',
    description:
      'Building web applications and learning modern software engineering technologies — from frontend interfaces to backend services and databases. Currently developing practical skills across the full stack.',
    icon: Code2,
  },
  {
    title: 'AI & Machine Learning',
    tag: 'Currently developing',
    description:
      'Practical learning in Artificial Intelligence, Machine Learning and Data Science. Applying mathematical foundations — statistics, linear algebra and calculus — to build and evaluate models.',
    icon: Brain,
  },
  {
    title: 'Technology Projects',
    tag: 'Independent Projects',
    description:
      'Working on multiple technology concepts aimed at solving real-world South African problems, from funding access to public safety and digital infrastructure.',
    icon: Sparkles,
  },
];

export const EDUCATION = {
  institution: 'University of South Africa (UNISA)',
  degree: 'BSc Mathematics and Computer Science',
  status: 'In progress',
  areas: [
    'Mathematics',
    'Computer Science',
    'Algorithms',
    'Programming',
    'Statistics',
    'Data Science',
    'Artificial Intelligence',
  ],
};

export const CURRENTLY_LEARNING = [
  'Advanced Python',
  'Data Science',
  'Machine Learning',
  'AI Software Engineering',
  'Microsoft Azure',
  'Backend Development',
  'Cloud Technologies',
];

export const CONSOLE_LINES = [
  { cmd: 'whoami', out: 'Mathematics + Computer Science + AI' },
  { cmd: 'current_focus', out: 'Data Science | Machine Learning | Software Engineering' },
  { cmd: 'ls projects/', out: 'fundlink-sa  safespace-sa  taxi-association  habit-tracker' },
  { cmd: 'cat mission.txt', out: 'Build technology that solves real-world problems.' },
];
