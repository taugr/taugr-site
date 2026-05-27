import type { ContentLink, ContentMedia } from './content';

export type SpeakingTalk = {
  title: string;
  event: string;
  date: string;
  location: string;
  description: string;
  media: ContentMedia[];
  links: ContentLink[];
};

export const speakingTalks: SpeakingTalk[] = [
  {
    title: 'Your New AI Co-Worker',
    event: 'AI Onramp by TUMO Labs',
    date: 'Apr 17, 2026, 19:00',
    location: 'TUMO Labs, Yerevan, Armenia',
    description:
      'A practical session on applying AI to everyday work processes, choosing what to automate first, turning AI into an autonomous working unit, and structuring prompts.',
    media: [
      {
        src: '/img/speaking/your-new-ai-coworker.webp',
        alt: 'Your New AI Co-Worker session photo',
        label: 'session photo',
      },
      {
        src: '/img/speaking/ai-coworker-flyer.jpg',
        alt: 'Your New AI Co-Worker AI Onramp flyer',
        label: 'flyer',
      },
    ],
    links: [
      { href: 'https://luma.com/y6ns6030', label: 'event', icon: 'globe' },
      { href: 'https://tumolabs.ai/en/', label: 'program', icon: 'globe' },
      {
        href: 'https://www.linkedin.com/posts/tumo-labs_the-wide-variety-of-ai-tools-and-models-can-activity-7454786541601628160-krK-',
        label: 'recap',
        icon: 'globe',
      },
    ],
  },
  {
    title: 'Engineering AI for Education',
    event: 'DataFest Yerevan 2025',
    date: 'Sep 12-13, 2025',
    location: 'Woods Center, Yerevan, Armenia',
    description:
      'A talk on how TUMO is engineering AI-driven applications that guide self-learning, adapt to each student’s pace and interests, and empower personalized learning paths.',
    media: [
      {
        src: '/img/speaking/datafest-yerevan-2025-talk.webp',
        alt: 'Engineering AI for Education talk at DataFest Yerevan 2025',
        label: 'talk photo',
      },
      {
        src: '/img/speaking/datafest-yerevan-2025-flyer.jpeg',
        alt: 'DataFest Yerevan 2025 Engineering AI for Education flyer',
        label: 'flyer',
      },
    ],
    links: [
      {
        href: 'https://datafest.am/2025/agenda',
        label: 'agenda',
        icon: 'globe',
      },
      {
        href: 'https://docs.google.com/presentation/d/183JsFgBXJxmGZ23c6IF-kMhStK9-7OA1mIt2G-HpInw/edit?usp=sharing',
        label: 'slides',
        icon: 'slides',
      },
      {
        href: 'https://www.youtube.com/watch?v=z35cZYnj4jY',
        label: 'video',
        icon: 'video',
      },
    ],
  },
  {
    title: 'Digital Forensics: Detecting Illegal Content at Scale',
    event: 'Security BSides Yerevan 2025',
    date: 'Jun 14-15, 2025',
    location: 'Yerevan, Armenia',
    description:
      'A talk on the technologies, strategies, and cryptographic techniques used to identify illegal content across large collections of hidden data.',
    media: [
      {
        src: '/img/speaking/bsides-yerevan-2025-talk.jpeg',
        alt: 'Digital Forensics talk at BSides Yerevan 2025',
        label: 'talk photo',
      },
      {
        src: '/img/speaking/bsides-yerevan-2025.webp',
        alt: 'BSides Yerevan 2025 speaker flyer',
        label: 'flyer',
      },
    ],
    links: [
      { href: 'https://luma.com/xu70avh8', label: 'event', icon: 'globe' },
    ],
  },
  {
    title: 'AI-Driven Learning: The Future of Education',
    event: 'AI Conf 2024 Armenia',
    date: 'Oct 12, 2024, 10:00',
    location: 'Gabriel Sundukyan National Academic Theater, Yerevan, Armenia',
    description:
      'A conference talk on how AI can transform learning and education.',
    media: [
      {
        src: '/img/speaking/ai-conf-2024-main.webp',
        alt: 'Tom Auger speaking at AI Conf 2024 Armenia',
        label: 'talk photo',
      },
      {
        src: '/img/speaking/ai-conf-2024-speaker.jpg',
        alt: 'AI Conf 2024 Armenia speaker flyer for Tom Auger',
        label: 'speaker flyer',
      },
    ],
    links: [
      {
        href: 'https://darpass.com/event/ai-conf-2024/',
        label: 'event',
        icon: 'globe',
      },
      { href: 'https://aiconf.am/', label: 'site', icon: 'globe' },
      {
        href: 'https://www.linkedin.com/posts/tumo-center-for-creative-technologies_guess-whos-taking-the-stage-at-ai-conf-2024-activity-7250490553253916673-QK8V',
        label: 'linkedin',
        icon: 'linkedin',
      },
    ],
  },
  {
    title: 'Education Re-launched Through AI',
    event: 'WCIT 2024 / DigiTec',
    date: 'Oct 6, 2024, 15:10',
    location: 'Karen Demirchyan Sports and Concert Complex, Yerevan, Armenia',
    description:
      'A WCIT 2024 / DigiTec session on AI and education, part of the AI in Action theme and the broader Power of Mind program.',
    media: [
      {
        src: '/img/speaking/wcit-2024-talk.webp',
        alt: 'Education Re-launched Through AI talk at WCIT 2024 DigiTec',
        label: 'talk photo',
      },
      {
        src: '/img/speaking/wcit-2024-digitec.jpg',
        alt: 'WCIT 2024 DigiTec event cover',
        label: 'event cover',
      },
      {
        src: '/img/speaking/wcit-2024-session.jpeg',
        alt: 'Education Re-launched Through AI session at WCIT 2024 DigiTec',
        label: 'session',
      },
    ],
    links: [
      {
        href: 'https://www.facebook.com/wcit2024.digitec/',
        label: 'event',
        icon: 'globe',
      },
    ],
  },
  {
    title: 'Digital Forensics: Surveillance vs Privacy',
    event: 'Hackshabti',
    date: 'Feb 22, 2024, 19:00',
    location: 'CyHub Armenia, Teryan 105/1, 6th floor, Yerevan, Armenia',
    description:
      'A Hackshabti talk on digital forensics, surveillance, privacy, and the tensions between investigation capabilities and civil liberties.',
    media: [
      {
        src: '/img/speaking/hackshabti-flyer.webp',
        alt: 'Hackshabti Digital Forensics: Surveillance vs Privacy flyer',
        label: 'flyer',
      },
      {
        src: '/img/speaking/hackshabti.webp',
        alt: 'Digital Forensics: Surveillance vs Privacy talk at Hackshabti',
        label: 'talk photo',
      },
    ],
    links: [
      {
        href: 'https://www.facebook.com/cyhubarmenia',
        label: 'event',
        icon: 'globe',
      },
    ],
  },
  {
    title: "Generative AI: How It's Changing the World",
    event: 'AI talk resources',
    date: 'Jul 20, 2023, 19:30',
    location: 'Gyumri and Dilijan, Armenia',
    description:
      'Prompt examples and practical resources from a public talk introducing generative AI and how to use it for writing, learning, planning, and coding.',
    media: [
      {
        src: '/img/speaking/genaichangetheworld.webp',
        alt: "Generative AI: How It's Changing the World presentation image",
        label: 'presentation',
      },
      {
        src: '/img/speaking/aichangingtheworld.webp',
        alt: "Generative AI: How It's Changing the World flyer",
        label: 'flyer',
      },
    ],
    links: [
      { href: '/speaking/aitalk/', label: 'resources', icon: 'file' },
      {
        href: 'https://tomauger.gitlab.io/aitalk/',
        label: 'original',
        icon: 'globe',
      },
    ],
  },
];
