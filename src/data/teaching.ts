import type { ContentLink, ContentMedia } from './content';

export type TeachingItem = {
  title: string;
  format: string;
  host: string;
  date: string;
  location: string;
  description: string;
  media: ContentMedia[];
  links: ContentLink[];
};

export const teachingItems: TeachingItem[] = [
  {
    title: 'TUMO Gunma AI Learning Lab',
    format: '',
    host: 'Storytelling x AI',
    date: 'Nov 1-3, 2025',
    location: 'Takasaki, Japan',
    description:
      'A three-day AI learning lab where students used generative AI tools to create short Disney-quality movies, ending with a final premiere.',
    media: [
      {
        src: '/img/teaching/gunma-ai-lab-photo-2.jpg',
        alt: 'TUMO Gunma AI learning lab session photo',
        label: 'session photo',
      },
      {
        src: '/img/teaching/gunma-ai-lab-poster.jpg',
        alt: 'TUMO Gunma AI learning lab poster',
        label: 'poster',
      },
      {
        src: '/img/teaching/gunma-ai-lab-photo-3.webp',
        alt: 'TUMO Gunma AI learning lab group photo',
        label: 'group photo',
      },
    ],
    links: [
      {
        href: 'https://www.pref.gunma.jp/site/houdou/726117.html',
        label: 'official',
        icon: 'globe',
      },
      { href: '/img/teaching/gunma-flyer.pdf', label: 'flyer', icon: 'file' },
      {
        href: 'https://www.instagram.com/p/DQ81rIHElCR/',
        label: 'reel',
        icon: 'video',
      },
    ],
  },
  {
    title: 'TUMO Mumbai Generative AI Workshop',
    format: '',
    host: 'TUMO and Shikha Academy',
    date: 'May 2025',
    location: 'Mumbai, India',
    description:
      'A pilot workshop on multimodal AI through code generation, configuring AI agents, coding interactive websites, and creating visuals and songs.',
    media: [
      {
        src: '/img/teaching/tumo-mumbai-workshop.webp',
        alt: 'TUMO Mumbai generative AI workshop',
        label: 'video',
      },
    ],
    links: [
      {
        href: 'https://www.youtube.com/watch?v=lBOiCDEvW4U',
        label: 'video',
        icon: 'video',
      },
      {
        href: 'https://www.linkedin.com/posts/tumo-center-for-creative-technologies_our-chief-development-officer-pegor-papazian-activity-7331906798842490880-ShV3',
        label: 'linkedin',
        icon: 'linkedin',
      },
    ],
  },
  {
    title: 'AI Agent Chatroom / Talking AI Avatars',
    format: 'Alt July learning lab',
    host: 'TUMO',
    date: 'July 2025',
    location: 'TUMO',
    description:
      'A learning lab where students used OpenAI Agent SDK, Cursor, and Next.js to create talking AI avatars and moderated multi-agent chatrooms.',
    media: [
      {
        src: '/img/teaching/ai-agent-chatroom-group.jpg',
        alt: 'Students from AI Agent Chatroom learning lab',
        label: 'group photo',
      },
      {
        src: '/img/teaching/ai-agent-chatroom-queens.jpg',
        alt: 'Legacy of Armenian Queens presentation from AI Agent Chatroom learning lab',
        label: 'presentation',
      },
      {
        src: '/img/teaching/ai-agent-chatroom-code.jpg',
        alt: 'AI character chat interface and code from AI Agent Chatroom learning lab',
        label: 'chat interface',
      },
      {
        src: '/img/teaching/ai-agent-chatroom-slide.jpg',
        alt: 'AI Characters Chatroom slide from learning lab',
        label: 'chatroom slide',
      },
      {
        src: '/img/teaching/ai-agent-chatroom-students.jpg',
        alt: 'Students working on AI character dialogue interface',
        label: 'students',
      },
    ],
    links: [
      {
        href: 'https://www.linkedin.com/posts/tumo-center-for-creative-technologies_in-an-ambitious-alt-july-learning-lab-at-activity-7355938619024367618-hOS0',
        label: 'source',
        icon: 'globe',
      },
      {
        href: 'https://www.instagram.com/p/DMsRu34NfKp/',
        label: 'post',
        icon: 'image',
      },
    ],
  },
  {
    title: 'AI/Teens GenAI Hackathon',
    format: 'Hands-on hackathon',
    host: 'TUMO GenAI Conference',
    date: 'Mar 15, 2025',
    location: 'TUMO Yerevan',
    description:
      'An eight-hour hands-on lab where students built GenAI-powered websites and platforms, including projects that generated books.',
    media: [
      {
        src: '/img/teaching/ai-teens-genai-hackathon.webp',
        alt: 'AI/Teens GenAI Hackathon students at TUMO Yerevan',
        label: 'hackathon',
      },
      {
        src: '/img/teaching/ai-teens-genai-hackathon-2.webp',
        alt: 'Students presenting during the AI/Teens GenAI Hackathon',
        label: 'presentation',
      },
    ],
    links: [
      {
        href: 'https://www.linkedin.com/posts/tumo-center-for-creative-technologies_march-15-at-tumo-yerevan-was-an-absolute-activity-7307378685995565056-d8iR',
        label: 'source',
        icon: 'globe',
      },
      {
        href: 'https://www.instagram.com/p/DHTMrreNXcp/',
        label: 'post',
        icon: 'image',
      },
    ],
  },
  {
    title: 'Masterlab IA Generatives',
    format: 'Masterlab',
    host: 'TUMO Paris',
    date: 'Spring break 2024',
    location: 'TUMO Paris, Forum des images',
    description:
      'A generative AI masterlab where students used OpenAI APIs, React, ChatGPT, Midjourney, and MusicGen to create AI-generated illustrations, stories, music, and interactive web galleries.',
    media: [
      {
        src: '/img/teaching/tumo-paris-generative-ai-masterlab-1.jpg',
        alt: 'TUMO Paris generative AI masterlab workshop photo',
        label: 'workshop photo',
      },
      {
        src: '/img/teaching/tumo-paris-generative-ai-masterlab-2.jpg',
        alt: 'Tom Auger working with a student during the TUMO Paris generative AI masterlab',
        label: 'workshop photo',
      },
    ],
    links: [
      {
        href: 'https://paris.tumo.fr/masterlab-ia-generatives-avec-tom-auger/',
        label: 'official',
        icon: 'globe',
      },
      {
        href: 'https://www.youtube.com/watch?v=pGaPXml2_aE',
        label: 'video',
        icon: 'video',
      },
      {
        href: 'https://www.instagram.com/p/C6G-w3wMLUI/',
        label: 'post',
        icon: 'image',
      },
    ],
  },
  {
    title: 'Data Analysis with ChatGPT Code Interpreter',
    format: 'Workshop',
    host: 'TUMO AI education program',
    date: 'Sep 23, 2023',
    location: 'TUMO',
    description:
      'A workshop on using ChatGPT Advanced Data Analysis to analyze open datasets, create visualizations, and build dashboards without writing code.',
    media: [
      {
        src: '/img/speaking/code-interpreter-workshop.webp',
        alt: 'Data Analysis with ChatGPT Code Interpreter workshop image',
        label: 'workshop',
      },
    ],
    links: [
      {
        href: 'https://tumo.ai/education/program',
        label: 'program',
        icon: 'globe',
      },
      { href: '/speaking/aisymposium/', label: 'resources', icon: 'file' },
    ],
  },
  {
    title: 'Generative AI Learning Labs',
    format: 'Learning lab series',
    host: 'TUMO',
    date: 'Summer 2023',
    location: 'Yerevan, Gyumri, Dilijan, and Kapan',
    description:
      'A series of labs where students used JavaScript with tools such as DALL-E, Jukebox, and ChatGPT to create generators for music, art, poetry, recipes, and other outputs.',
    media: [
      {
        src: '/img/teaching/generative-ai-learning-labs-dilijan.jpeg',
        alt: 'Students in the TUMO Dilijan generative AI learning lab',
        label: 'Dilijan lab',
      },
      {
        src: '/img/teaching/generative-ai-learning-labs.webp',
        alt: 'Students in a TUMO generative AI learning lab',
        label: 'learning lab',
      },
    ],
    links: [
      {
        href: 'https://www.linkedin.com/posts/tumo-center-for-creative-technologies_tumo-generativeai-activity-7092451468309340160-ps-r',
        label: 'source',
        icon: 'globe',
      },
      {
        href: 'https://www.instagram.com/reel/CvRvLOTN5lv/',
        label: 'reel',
        icon: 'video',
      },
    ],
  },
  {
    title: 'Information Retrieval and Text Analysis',
    format: 'Programming learning lab',
    host: 'TUMO',
    date: 'February 2023',
    location: 'Yerevan and Gyumri',
    description:
      'A programming lab where TUMO students learned how to build search indexes, create a search algorithm, and build their own search engines.',
    media: [
      {
        src: '/img/teaching/information-retrieval-text-analysis.webp',
        alt: 'Students presenting their Information Retrieval and Text Analysis projects at TUMO',
        label: 'student presentations',
      },
      {
        src: '/img/teaching/information-retrieval-text-analysis-2.webp',
        alt: 'Students in the Information Retrieval and Text Analysis learning lab at TUMO',
        label: 'learning lab',
      },
    ],
    links: [
      {
        href: 'https://tumo.org/project/information-retrieval-and-text-analysis/',
        label: 'official',
        icon: 'globe',
      },
      {
        href: 'https://www.youtube.com/watch?v=e5W3IZTB32U',
        label: 'video',
        icon: 'video',
      },
      { href: '/teaching/tumo2023/', label: 'archive', icon: 'file' },
    ],
  },
];
