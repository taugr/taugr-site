import type { CollectionEntry } from 'astro:content';
import type { SpeakingTalk } from '../data/speaking';
import type { TeachingItem } from '../data/teaching';

export type Locale = 'en' | 'es' | 'hy';
export type RouteKey =
  | 'home'
  | 'essays'
  | 'projects'
  | 'teaching'
  | 'speaking'
  | 'about'
  | 'archive';

export const LOCALES: Record<
  Locale,
  { path: string; tag: string; og: string; endonym: string; short: string }
> = {
  en: { path: '', tag: 'en', og: 'en_US', endonym: 'English', short: 'EN' },
  es: {
    path: 'es',
    tag: 'es-ES',
    og: 'es_ES',
    endonym: 'Español',
    short: 'ES',
  },
  hy: {
    path: 'hy',
    tag: 'hy-AM',
    og: 'hy_AM',
    endonym: 'Հայերեն',
    short: 'ՀՅ',
  },
};

export const ROUTES: Record<RouteKey, string> = {
  home: '/',
  essays: '/essays/',
  projects: '/projects/',
  teaching: '/teaching/',
  speaking: '/speaking/',
  about: '/about/',
  archive: '/archive/',
};

export function localeFromPath(pathname: string): Locale {
  if (/^\/es(?:\/|$)/.test(pathname)) return 'es';
  if (/^\/hy(?:\/|$)/.test(pathname)) return 'hy';
  return 'en';
}

export function localizedPath(locale: Locale, route: RouteKey): string {
  const path = ROUTES[route];
  if (locale === 'en') return path;
  return path === '/' ? `/${locale}/` : `/${locale}${path}`;
}

export function exactRouteKey(pathname: string): RouteKey | undefined {
  const locale = localeFromPath(pathname);
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;

  return (Object.entries(ROUTES) as [RouteKey, string][]).find(
    ([, routePath]) => `${prefix}${routePath}` === normalized,
  )?.[0];
}

export function closestRouteKey(pathname: string): RouteKey {
  const locale = localeFromPath(pathname);
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const localPath = pathname.slice(prefix.length) || '/';
  if (localPath.startsWith('/essays/')) return 'essays';
  if (localPath.startsWith('/archive/')) return 'archive';
  if (localPath.startsWith('/teaching/')) return 'teaching';
  if (localPath.startsWith('/speaking/')) return 'speaking';
  if (localPath.startsWith('/projects/')) return 'projects';
  if (localPath.startsWith('/about/')) return 'about';
  return 'home';
}

const en = {
  site: {
    name: 'Tom Auger (taugr)',
    footerName: 'Tom Auger',
    description: 'Coding, researching, and teaching with AI',
    primaryNavigation: 'Primary navigation',
    chooseLanguage: 'Choose language',
    archive: 'archive',
    rss: 'rss',
  },
  nav: {
    home: 'home',
    essays: 'essays',
    projects: 'projects',
    teaching: 'teaching',
    speaking: 'speaking',
    about: 'about',
  },
  theme: {
    toggle: 'Toggle dark mode',
    light: 'light',
    dark: 'dark',
  },
  home: {
    title: 'Tom Auger (taugr) — coding, research, teaching, and projects',
    heading: 'I build, research,\nand teach with AI.',
    intro:
      'I’m Lead AI Engineer at the TUMO Center for Creative Technologies, a free educational program where teens build skills in technology and design.',
    explore: 'Explore my work',
    aboutTom: 'About Tom',
    aboutLabel: 'About Tom Auger',
    name: 'Tom Auger',
    tagline: 'Coding, researching, and teaching with AI.',
    roles: 'Engineer, researcher, educator, speaker, and open-source builder.',
    selectedProjects: 'Selected projects',
    viewAll: 'View all',
    recent: 'Recent teaching & speaking',
    teaching: 'Teaching',
    speaking: 'Speaking',
  },
  projects: {
    title: 'Projects — taugr',
    heading: 'Projects',
    description: 'A selection of my products, tools, and research.',
    github: 'github',
    site: 'site',
    status: { prototype: 'prototype', archived: 'archived' },
  },
  teaching: {
    title: 'Teaching — taugr',
    heading: 'Teaching',
    description: 'Learning labs, workshops, and masterclasses.',
  },
  speaking: {
    title: 'Speaking — taugr',
    heading: 'Speaking',
    description: 'Recent talks and panels.',
  },
  about: {
    title: 'About — taugr',
    heading: 'About',
    description: 'About taugr.',
    intro:
      "Hi, I'm Tom Auger, Lead AI Engineer at the TUMO Center for Creative Technologies, a free educational program where teens build skills in technology and design.",
    interests:
      'My technical interests are in AI and cyber security. Occasionally I run workshops teaching AI to teens around the world.',
    contactBefore:
      'If you spot an error, or have comments or questions, email me at',
    quote: "You can't be normal and expect abnormal returns.",
    logo: 'logo',
  },
  essays: {
    title: 'Essays — taugr',
    heading: 'Essays',
    description: 'Essays and experiments.',
    englishNotice: 'Articles are currently available in English.',
    english: 'English',
  },
  archivePage: {
    title: 'Archive — taugr',
    heading: 'Archive',
    description: 'Older writing and notes.',
    archivedFrom: 'archived from old blog',
    englishNotice: 'Archived articles are currently available in English.',
    english: 'English',
  },
  lightbox: {
    open: 'Open larger image for',
    close: 'Close image',
    previous: 'Previous image',
    next: 'Next image',
    image: 'image',
    of: 'of',
  },
  notFound: {
    title: 'Not Found — taugr',
    message: "This page doesn't exist.",
    home: 'Back to home',
  },
  linkLabels: {} as Record<string, string>,
};

export type Messages = typeof en;

const es: Messages = {
  site: {
    name: 'Tom Auger (taugr)',
    footerName: 'Tom Auger',
    description: 'Programación, investigación y enseñanza con IA',
    primaryNavigation: 'Navegación principal',
    chooseLanguage: 'Elegir idioma',
    archive: 'archivo',
    rss: 'rss',
  },
  nav: {
    home: 'inicio',
    essays: 'artículos',
    projects: 'proyectos',
    teaching: 'docencia',
    speaking: 'charlas',
    about: 'sobre mí',
  },
  theme: {
    toggle: 'Cambiar el tema de color',
    light: 'claro',
    dark: 'oscuro',
  },
  home: {
    title:
      'Tom Auger (taugr) — programación, investigación, docencia y proyectos',
    heading: 'Creo, investigo\ny enseño con IA.',
    intro:
      'Soy ingeniero principal de IA en el Centro TUMO de Tecnologías Creativas, un programa educativo gratuito donde los adolescentes desarrollan habilidades tecnológicas y de diseño.',
    explore: 'Explora mi trabajo',
    aboutTom: 'Sobre Tom',
    aboutLabel: 'Sobre Tom Auger',
    name: 'Tom Auger',
    tagline: 'Programación, investigación y enseñanza con IA.',
    roles:
      'Ingeniero, investigador, educador, ponente y creador de software libre.',
    selectedProjects: 'Proyectos destacados',
    viewAll: 'Ver todos',
    recent: 'Docencia y charlas recientes',
    teaching: 'Docencia',
    speaking: 'Charlas',
  },
  projects: {
    title: 'Proyectos — taugr',
    heading: 'Proyectos',
    description:
      'Una selección de mis productos, herramientas e investigaciones.',
    github: 'github',
    site: 'sitio web',
    status: { prototype: 'prototipo', archived: 'archivado' },
  },
  teaching: {
    title: 'Docencia — taugr',
    heading: 'Docencia',
    description: 'Laboratorios de aprendizaje, talleres y clases magistrales.',
  },
  speaking: {
    title: 'Charlas — taugr',
    heading: 'Charlas',
    description: 'Charlas, mesas redondas y apariciones recientes.',
  },
  about: {
    title: 'Sobre mí — taugr',
    heading: 'Sobre mí',
    description: 'Sobre Tom Auger.',
    intro:
      'Hola, soy Tom Auger, ingeniero principal de IA en el Centro TUMO de Tecnologías Creativas, un programa educativo gratuito donde los adolescentes desarrollan habilidades tecnológicas y de diseño.',
    interests:
      'Mis intereses técnicos se centran en la IA y la ciberseguridad. De vez en cuando imparto talleres de IA para adolescentes de todo el mundo.',
    contactBefore:
      'Si encuentras algún error o tienes comentarios o preguntas, escríbeme a',
    quote: 'No puedes ser normal y esperar resultados extraordinarios.',
    logo: 'logotipo',
  },
  essays: {
    title: 'Artículos — taugr',
    heading: 'Artículos',
    description: 'Artículos y experimentos.',
    englishNotice: 'Por ahora, los artículos están disponibles en inglés.',
    english: 'Inglés',
  },
  archivePage: {
    title: 'Archivo — taugr',
    heading: 'Archivo',
    description: 'Textos y notas anteriores.',
    archivedFrom: 'archivado del blog anterior',
    englishNotice:
      'Por ahora, los artículos archivados están disponibles en inglés.',
    english: 'Inglés',
  },
  lightbox: {
    open: 'Abrir una imagen más grande de',
    close: 'Cerrar imagen',
    previous: 'Imagen anterior',
    next: 'Imagen siguiente',
    image: 'imagen',
    of: 'de',
  },
  notFound: {
    title: 'Página no encontrada — taugr',
    message: 'Esta página no existe.',
    home: 'Volver al inicio',
  },
  linkLabels: {
    event: 'evento',
    program: 'programa',
    recap: 'resumen',
    agenda: 'programa',
    slides: 'diapositivas',
    video: 'vídeo',
    site: 'sitio web',
    linkedin: 'LinkedIn',
    resources: 'recursos',
    original: 'original',
    official: 'sitio oficial',
    github: 'GitHub',
    flyer: 'folleto',
    reel: 'vídeo corto',
    source: 'fuente',
    post: 'publicación',
    archive: 'archivo',
  },
};

const hy: Messages = {
  site: {
    name: 'Թոմ Օգեր (taugr)',
    footerName: 'Թոմ Օգեր',
    description: 'ԱԲ-ով ծրագրավորում, հետազոտություն և դասավանդում',
    primaryNavigation: 'Հիմնական նավարկում',
    chooseLanguage: 'Ընտրել լեզուն',
    archive: 'արխիվ',
    rss: 'rss',
  },
  nav: {
    home: 'գլխավոր',
    essays: 'հոդվածներ',
    projects: 'նախագծեր',
    teaching: 'դասավանդում',
    speaking: 'ելույթներ',
    about: 'իմ մասին',
  },
  theme: {
    toggle: 'Փոխել գունային թեման',
    light: 'բաց',
    dark: 'մուգ',
  },
  home: {
    title:
      'Թոմ Օգեր (taugr) — ծրագրավորում, հետազոտություն, դասավանդում և նախագծեր',
    heading: 'ԱԲ-ով ստեղծում, հետազոտում\nև դասավանդում եմ։',
    intro:
      'Ես Թումո ստեղծարար տեխնոլոգիաների կենտրոնի արհեստական բանականության առաջատար ինժեներն եմ։ Թումոն անվճար կրթական ծրագիր է, որտեղ դեռահասները զարգացնում են տեխնոլոգիական և դիզայներական հմտություններ։',
    explore: 'Դիտել իմ աշխատանքները',
    aboutTom: 'Թոմի մասին',
    aboutLabel: 'Թոմ Օգերի մասին',
    name: 'Թոմ Օգեր',
    tagline: 'ԱԲ-ով ծրագրավորում, հետազոտություն և դասավանդում։',
    roles:
      'Ինժեներ, հետազոտող, մանկավարժ, բանախոս և բաց կոդով նախագծերի հեղինակ։',
    selectedProjects: 'Ընտրված նախագծեր',
    viewAll: 'Դիտել բոլորը',
    recent: 'Վերջին դասընթացներն ու ելույթները',
    teaching: 'Դասավանդում',
    speaking: 'Ելույթներ',
  },
  projects: {
    title: 'Նախագծեր — taugr',
    heading: 'Նախագծեր',
    description: 'Իմ նախագծերի, գործիքների և հետազոտությունների ընտրանին։',
    github: 'github',
    site: 'կայք',
    status: { prototype: 'նախատիպ', archived: 'արխիվացված' },
  },
  teaching: {
    title: 'Դասավանդում — taugr',
    heading: 'Դասավանդում',
    description:
      'Ուսումնական լաբորատորիաներ, աշխատարաններ ու վարպետության դասեր։',
  },
  speaking: {
    title: 'Ելույթներ — taugr',
    heading: 'Ելույթներ',
    description:
      'Վերջին ելույթները, պանելային քննարկումները և հանրային միջոցառումները։',
  },
  about: {
    title: 'Իմ մասին — taugr',
    heading: 'Իմ մասին',
    description: 'Թոմ Օգերի մասին։',
    intro:
      'Ողջույն, ես Թոմ Օգերն եմ՝ Թումո ստեղծարար տեխնոլոգիաների կենտրոնի արհեստական բանականության առաջատար ինժեները։ Թումոն անվճար կրթական ծրագիր է, որտեղ դեռահասները զարգացնում են տեխնոլոգիական և դիզայներական հմտություններ։',
    interests:
      'Իմ տեխնիկական հետաքրքրությունների կենտրոնում արհեստական բանականությունն ու կիբեռանվտանգությունն են։ Երբեմն աշխարհի տարբեր երկրներում դեռահասների համար արհեստական բանականության աշխատարաններ եմ վարում։',
    contactBefore:
      'Եթե սխալ նկատեք կամ մեկնաբանություններ ու հարցեր ունենաք, գրեք ինձ՝',
    quote: 'Չես կարող սովորական լինել և արտասովոր արդյունքներ ակնկալել։',
    logo: 'տարբերանշան',
  },
  essays: {
    title: 'Հոդվածներ — taugr',
    heading: 'Հոդվածներ',
    description: 'Հոդվածներ և փորձարկումներ։',
    englishNotice: 'Առայժմ հոդվածները հասանելի են միայն անգլերենով։',
    english: 'Անգլերեն',
  },
  archivePage: {
    title: 'Արխիվ — taugr',
    heading: 'Արխիվ',
    description: 'Ավելի վաղ գրված նյութեր և նշումներ։',
    archivedFrom: 'հին բլոգից արխիվացված',
    englishNotice: 'Առայժմ արխիվային հոդվածները հասանելի են միայն անգլերենով։',
    english: 'Անգլերեն',
  },
  lightbox: {
    open: 'Բացել մեծ պատկերը՝',
    close: 'Փակել պատկերը',
    previous: 'Նախորդ պատկերը',
    next: 'Հաջորդ պատկերը',
    image: 'պատկեր',
    of: '/',
  },
  notFound: {
    title: 'Էջը չի գտնվել — taugr',
    message: 'Այս էջը գոյություն չունի։',
    home: 'Վերադառնալ գլխավոր էջ',
  },
  linkLabels: {
    event: 'միջոցառում',
    program: 'ծրագիր',
    recap: 'ամփոփում',
    agenda: 'օրակարգ',
    slides: 'սահիկներ',
    video: 'տեսանյութ',
    site: 'կայք',
    linkedin: 'LinkedIn',
    resources: 'նյութեր',
    original: 'բնօրինակ',
    official: 'պաշտոնական կայք',
    github: 'GitHub',
    flyer: 'թռուցիկ',
    reel: 'կարճ տեսանյութ',
    source: 'աղբյուր',
    post: 'գրառում',
    archive: 'արխիվ',
  },
};

export const MESSAGES: Record<Locale, Messages> = { en, es, hy };

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale];
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(LOCALES[locale].tag, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export type LocalizedProject = {
  description: string;
  imageAlt: string;
};

const PROJECT_TRANSLATIONS: Record<
  Exclude<Locale, 'en'>,
  Record<string, LocalizedProject>
> = {
  es: {
    'aisdk-dt': {
      description:
        'CLI para inspeccionar archivos generations.json de Vercel AI SDK DevTools, de modo que los agentes de programación puedan consultar solicitudes, respuestas, llamadas a herramientas, tiempos y uso sin saturar el contexto.',
      imageAlt: 'Logotipo de aisdk-dt',
    },
    'climatenet-mcp': {
      description:
        'Servidor MCP retirado que proporcionaba acceso de solo lectura a datos de vigilancia ambiental de ClimateNet en Armenia.',
      imageAlt: 'Logotipo de climatenet-mcp',
    },
    cmdtime: {
      description:
        'Complemento para Oh My Zsh que muestra cuánto tardó la orden anterior mediante un indicador de tiempo compacto y legible.',
      imageAlt: 'Captura de pantalla del terminal con cmdtime',
    },
    'nest-zod': {
      description:
        'Análisis de solicitudes y serialización de respuestas para NestJS mediante Zod, con decoradores en tiempo de ejecución y metadatos opcionales de Swagger/OpenAPI.',
      imageAlt: 'Logotipo de nest-zod',
    },
    'neuk-bike': {
      description:
        'Mapa estático y adaptado a móviles para encontrar aparcamientos para bicicletas cercanos en el Reino Unido, Irlanda, España y Armenia.',
      imageAlt: 'Icono de Bike Neuks',
    },
    scranbook: {
      description:
        'Diario alimentario privado y local, con estimaciones editables de visión artificial y nutrición, almacenado en el navegador.',
      imageAlt: 'Icono de la aplicación Scranbook',
    },
    secretbox: {
      description:
        'Pequeña biblioteca .NET Standard para cifrado de clave simétrica mediante la permutación Gimli, con una API sencilla diseñada para ser fácil de usar y difícil de utilizar mal.',
      imageAlt: 'Logotipo de SecretBox',
    },
    stylemakar: {
      description:
        'Aplicación local para reescribir borradores con una voz objetivo, conservando el significado, las restricciones y los detalles concretos.',
      imageAlt: 'Logotipo de StyleMakar',
    },
    vidbgm: {
      description:
        'Generación local de música de fondo para vídeo con Magenta, creada como CLI en Rust y prototipo de escritorio con Tauri.',
      imageAlt: 'Icono de la aplicación vidbgm',
    },
    vuemarkik: {
      description:
        'Renderizado de Markdown extensible y seguro de forma predeterminada para Vue.js, basado en unified, remark y rehype.',
      imageAlt: 'Logotipo de VueMarkik',
    },
  },
  hy: {
    'aisdk-dt': {
      description:
        'Հրամանային տողի գործիք՝ Vercel AI SDK DevTools-ի generations.json ֆայլերն ուսումնասիրելու համար։ Դրանով կոդ գրող գործակալները կարող են ստանալ հարցումները, պատասխանները, գործիքների կանչերը, կատարման ժամանակն ու օգտագործման տվյալները՝ առանց համատեքստը ծանրաբեռնելու։',
      imageAlt: 'aisdk-dt-ի տարբերանշանը',
    },
    'climatenet-mcp': {
      description:
        'Շահագործումից հանված MCP սերվեր, որը թույլ էր տալիս միայն կարդալու ռեժիմով օգտվել Հայաստանում ClimateNet-ի հավաքած բնապահպանական մոնիթորինգի տվյալներից։',
      imageAlt: 'climatenet-mcp-ի տարբերանշանը',
    },
    cmdtime: {
      description:
        'Oh My Zsh-ի հավելում, որը հրամանատողում հակիրճ ու ընթեռնելի ձևով ցույց է տալիս նախորդ հրամանի կատարման տևողությունը։',
      imageAlt: 'cmdtime-ը ցուցադրող տերմինալի պատկեր',
    },
    'nest-zod': {
      description:
        'NestJS-ի հարցումների վերլուծում և պատասխանների սերիականացում Zod-ի միջոցով՝ գործարկման պահին կիրառվող դեկորատորներով և ըստ ցանկության Swagger/OpenAPI մետատվյալներով։',
      imageAlt: 'nest-zod-ի տարբերանշանը',
    },
    'neuk-bike': {
      description:
        'Ստատիկ, բջջային սարքերին հարմարեցված քարտեզ՝ Մեծ Բրիտանիայում, Իռլանդիայում, Իսպանիայում և Հայաստանում մոտակա հեծանվակայանները գտնելու համար։',
      imageAlt: 'Bike Neuks-ի պատկերակը',
    },
    scranbook: {
      description:
        'Մասնավոր սննդի օրագիր՝ պատկերների ճանաչման և սննդային արժեքների խմբագրվող գնահատումներով։ Բոլոր տվյալները պահվում են դիտարկիչում։',
      imageAlt: 'Scranbook հավելվածի պատկերակը',
    },
    secretbox: {
      description:
        'Փոքր .NET Standard գրադարան՝ Gimli փոխակերպման հիմքով սիմետրիկ բանալիով գաղտնագրման համար։ Դրա պարզ API-ն հեշտ է օգտագործել և դժվար՝ սխալ կիրառել։',
      imageAlt: 'SecretBox-ի տարբերանշանը',
    },
    stylemakar: {
      description:
        'Տեղային հավելված՝ սևագրերը ցանկալի ոճով վերաշարադրելու համար՝ պահպանելով իմաստը, սահմանափակումներն ու կոնկրետ մանրամասները։',
      imageAlt: 'StyleMakar-ի տարբերանշանը',
    },
    vidbgm: {
      description:
        'Տեսանյութերի համար ֆոնային երաժշտություն ստեղծող տեղային գործիք՝ Magenta-ի հիմքով, Rust հրամանային տողի տարբերակով և Tauri աշխատասեղանի նախատիպով։',
      imageAlt: 'vidbgm հավելվածի պատկերակը',
    },
    vuemarkik: {
      description:
        'Լռելյայն անվտանգ ու ընդլայնելի Markdown ցուցադրիչ Vue.js-ի համար՝ կառուցված unified, remark և rehype գործիքներով։',
      imageAlt: 'VueMarkik-ի տարբերանշանը',
    },
  },
};

export function localizeProject(
  project: CollectionEntry<'projects'>,
  locale: Locale,
): LocalizedProject {
  if (locale === 'en') {
    return {
      description: project.data.description,
      imageAlt: project.data.imageAlt ?? project.data.name,
    };
  }
  const translated = PROJECT_TRANSLATIONS[locale][project.id];
  if (!translated)
    throw new Error(`Missing ${locale} project translation: ${project.id}`);
  return translated;
}

type ExperienceTranslation = {
  title: string;
  secondary: string;
  format?: string;
  date: string;
  location: string;
  description: string;
};

const SPEAKING_TRANSLATIONS: Record<
  Exclude<Locale, 'en'>,
  Record<string, ExperienceTranslation>
> = {
  es: {
    'Your New AI Co-Worker': {
      title: 'Tu nuevo compañero de trabajo con IA',
      secondary: 'AI Onramp de TUMO Labs',
      date: '17 de abril de 2026, 19:00',
      location: 'TUMO Labs, Ereván, Armenia',
      description:
        'Una sesión práctica sobre cómo aplicar la IA a los procesos de trabajo cotidianos, elegir qué automatizar primero, convertir la IA en una unidad de trabajo autónoma y estructurar instrucciones.',
    },
    'Engineering AI for Education': {
      title: 'Ingeniería de IA para la educación',
      secondary: 'DataFest Ereván 2025',
      date: '12–13 de septiembre de 2025',
      location: 'Woods Center, Ereván, Armenia',
      description:
        'Una charla sobre cómo TUMO desarrolla aplicaciones basadas en IA que orientan el aprendizaje autónomo, se adaptan al ritmo y los intereses de cada estudiante y permiten itinerarios personalizados.',
    },
    'Digital Forensics: Detecting Illegal Content at Scale': {
      title: 'Informática forense: detección de contenido ilegal a gran escala',
      secondary: 'Security BSides Ereván 2025',
      date: '14–15 de junio de 2025',
      location: 'Ereván, Armenia',
      description:
        'Una charla sobre las tecnologías, estrategias y técnicas criptográficas empleadas para identificar contenido ilegal en grandes colecciones de datos ocultos.',
    },
    'AI-Driven Learning: The Future of Education': {
      title: 'Aprendizaje impulsado por IA: el futuro de la educación',
      secondary: 'AI Conf 2024 Armenia',
      date: '12 de octubre de 2024, 10:00',
      location: 'Teatro Académico Nacional Gabriel Sundukyan, Ereván, Armenia',
      description:
        'Una charla sobre cómo la IA puede transformar el aprendizaje y la educación.',
    },
    'Education Re-launched Through AI': {
      title: 'Relanzar la educación mediante la IA',
      secondary: 'WCIT 2024 / DigiTec',
      date: '6 de octubre de 2024, 15:10',
      location:
        'Complejo Deportivo y de Conciertos Karen Demirchyan, Ereván, Armenia',
      description:
        'Una sesión de WCIT 2024 / DigiTec sobre IA y educación, dentro del tema «AI in Action» y del programa general «Power of Mind».',
    },
    'Digital Forensics: Surveillance vs Privacy': {
      title: 'Informática forense: vigilancia frente a privacidad',
      secondary: 'Hackshabti',
      date: '22 de febrero de 2024, 19:00',
      location: 'CyHub Armenia, Teryan 105/1, planta 6, Ereván, Armenia',
      description:
        'Una charla de Hackshabti sobre informática forense, vigilancia, privacidad y las tensiones entre la capacidad de investigación y las libertades civiles.',
    },
    "Generative AI: How It's Changing the World": {
      title: 'IA generativa: cómo está cambiando el mundo',
      secondary: 'Recursos de la charla sobre IA',
      date: '20 de julio de 2023, 19:30',
      location: 'Gyumri y Dilijan, Armenia',
      description:
        'Ejemplos de instrucciones y recursos prácticos de una charla pública de introducción a la IA generativa y su uso para escribir, aprender, planificar y programar.',
    },
  },
  hy: {
    'Your New AI Co-Worker': {
      title: 'Ձեր նոր ԱԲ գործընկերը',
      secondary: 'TUMO Labs-ի AI Onramp',
      date: '2026 թ. ապրիլի 17, 19:00',
      location: 'TUMO Labs, Երևան, Հայաստան',
      description:
        'Գործնական հանդիպում՝ առօրյա աշխատանքում ԱԲ կիրառելու, առաջին ավտոմատացվող քայլերն ընտրելու, ԱԲ-ն ինքնավար օգնական դարձնելու և հստակ հուշումներ կազմելու մասին։',
    },
    'Engineering AI for Education': {
      title: 'Կրթության համար ԱԲ համակարգերի մշակում',
      secondary: 'DataFest Երևան 2025',
      date: '2025 թ. սեպտեմբերի 12–13',
      location: 'Woods Center, Երևան, Հայաստան',
      description:
        'Ելույթ այն մասին, թե ինչպես է Թումոն մշակում ԱԲ-ով աշխատող հավելվածներ, որոնք ուղղորդում են ինքնուրույն ուսումնառությունը, հարմարվում յուրաքանչյուր սովորողի տեմպին ու հետաքրքրություններին և ձևավորում անհատական կրթական ուղիներ։',
    },
    'Digital Forensics: Detecting Illegal Content at Scale': {
      title:
        'Թվային քրեագիտություն․ ապօրինի բովանդակության լայնածավալ հայտնաբերում',
      secondary: 'Security BSides Երևան 2025',
      date: '2025 թ. հունիսի 14–15',
      location: 'Երևան, Հայաստան',
      description:
        'Ելույթ տեխնոլոգիաների, ռազմավարությունների և գաղտնագրական մեթոդների մասին, որոնցով հնարավոր է թաքնված տվյալների մեծ հավաքածուներում ապօրինի բովանդակություն հայտնաբերել։',
    },
    'AI-Driven Learning: The Future of Education': {
      title: 'ԱԲ-ի վրա հիմնված ուսումնառություն․ կրթության ապագան',
      secondary: 'AI Conf 2024 Armenia',
      date: '2024 թ. հոկտեմբերի 12, 10:00',
      location:
        'Գաբրիել Սունդուկյանի անվան ազգային ակադեմիական թատրոն, Երևան, Հայաստան',
      description:
        'Համաժողովի ելույթ այն մասին, թե ինչպես կարող է ԱԲ-ն փոխակերպել ուսումնառությունն ու կրթությունը։',
    },
    'Education Re-launched Through AI': {
      title: 'Կրթության վերագործարկումը ԱԲ-ի միջոցով',
      secondary: 'WCIT 2024 / DigiTec',
      date: '2024 թ. հոկտեմբերի 6, 15:10',
      location:
        'Կարեն Դեմիրճյանի անվան մարզահամերգային համալիր, Երևան, Հայաստան',
      description:
        'WCIT 2024 / DigiTec-ի ելույթ ԱԲ-ի և կրթության մասին՝ «AI in Action» թեմայի և «Power of Mind» ծրագրի շրջանակում։',
    },
    'Digital Forensics: Surveillance vs Privacy': {
      title: 'Թվային քրեագիտություն․ հսկողություն ընդդեմ գաղտնիության',
      secondary: 'Hackshabti',
      date: '2024 թ. փետրվարի 22, 19:00',
      location: 'CyHub Armenia, Տերյան 105/1, 6-րդ հարկ, Երևան, Հայաստան',
      description:
        'Hackshabti-ի ելույթ թվային քրեագիտության, հսկողության, գաղտնիության և հետաքննության հնարավորությունների ու քաղաքացիական ազատությունների միջև լարվածության մասին։',
    },
    "Generative AI: How It's Changing the World": {
      title: 'Գեներատիվ ԱԲ․ ինչպես է այն փոխում աշխարհը',
      secondary: 'ԱԲ ելույթի նյութեր',
      date: '2023 թ. հուլիսի 20, 19:30',
      location: 'Գյումրի և Դիլիջան, Հայաստան',
      description:
        'Գեներատիվ ԱԲ-ի մասին հանրային ելույթի հուշումների օրինակներ և գործնական նյութեր՝ գրելու, սովորելու, պլանավորելու ու ծրագրավորելու մեջ դրա կիրառության վերաբերյալ։',
    },
  },
};

const TEACHING_TRANSLATIONS: Record<
  Exclude<Locale, 'en'>,
  Record<string, ExperienceTranslation>
> = {
  es: {
    'From Idea to Prototype': {
      title: 'De la idea al prototipo',
      secondary: 'TUMO Labs',
      format: 'Introducción a la IA',
      date: '8–19 de junio de 2026',
      location: 'TUMO Labs, Ereván',
      description:
        'Un programa introductorio de seis sesiones en el que los participantes utilizaron Claude Code y flujos de trabajo con IA para investigar, idear, planificar productos, preparar presentaciones, diseñar y crear un MVP listo para demostrar.',
    },
    'TUMO Gunma AI Learning Lab': {
      title: 'Laboratorio de aprendizaje de IA de TUMO Gunma',
      secondary: 'Narración × IA',
      date: '1–3 de noviembre de 2025',
      location: 'Takasaki, Japón',
      description:
        'Un laboratorio de IA de tres días en el que los estudiantes utilizaron herramientas de IA generativa para crear cortometrajes con calidad Disney y terminaron con un estreno final.',
    },
    'TUMO Mumbai Generative AI Workshop': {
      title: 'Taller de IA generativa de TUMO Mumbai',
      secondary: 'TUMO y Shikha Academy',
      date: 'mayo de 2025',
      location: 'Bombay, India',
      description:
        'Un taller piloto sobre IA multimodal mediante generación de código, configuración de agentes de IA, programación de sitios web interactivos y creación de imágenes y canciones.',
    },
    'AI Agent Chatroom / Talking AI Avatars': {
      title: 'Sala de chat de agentes de IA / avatares parlantes',
      secondary: 'TUMO',
      format: 'Laboratorio Alt July',
      date: 'julio de 2025',
      location: 'TUMO',
      description:
        'Un laboratorio en el que los estudiantes utilizaron OpenAI Agent SDK, Cursor y Next.js para crear avatares parlantes y salas de chat multiagente moderadas.',
    },
    'AI/Teens GenAI Hackathon': {
      title: 'Hackatón AI/Teens de IA generativa',
      secondary: 'Conferencia TUMO GenAI',
      format: 'Hackatón práctico',
      date: '15 de marzo de 2025',
      location: 'TUMO Ereván',
      description:
        'Un laboratorio práctico de ocho horas en el que los estudiantes crearon sitios web y plataformas con IA generativa, incluidos proyectos que generaban libros.',
    },
    'Masterlab IA Generatives': {
      title: 'Masterlab de IA generativa',
      secondary: 'TUMO París',
      format: 'Masterlab',
      date: 'vacaciones de primavera de 2024',
      location: 'TUMO París, Forum des images',
      description:
        'Un masterlab de IA generativa en el que los estudiantes utilizaron las API de OpenAI, React, ChatGPT, Midjourney y MusicGen para crear ilustraciones, historias, música y galerías web interactivas.',
    },
    'Data Analysis with ChatGPT Code Interpreter': {
      title: 'Análisis de datos con el intérprete de código de ChatGPT',
      secondary: 'Programa educativo de IA de TUMO',
      format: 'Taller',
      date: '23 de septiembre de 2023',
      location: 'TUMO',
      description:
        'Un taller sobre el uso de ChatGPT Advanced Data Analysis para analizar datos abiertos, crear visualizaciones y construir paneles sin escribir código.',
    },
    'Generative AI Learning Labs': {
      title: 'Laboratorios de aprendizaje de IA generativa',
      secondary: 'TUMO',
      format: 'Serie de laboratorios',
      date: 'verano de 2023',
      location: 'Ereván, Gyumri, Dilijan y Kapan',
      description:
        'Una serie de laboratorios donde los estudiantes utilizaron JavaScript con herramientas como DALL-E, Jukebox y ChatGPT para crear generadores de música, arte, poesía, recetas y otros contenidos.',
    },
    'Information Retrieval and Text Analysis': {
      title: 'Recuperación de información y análisis de textos',
      secondary: 'TUMO',
      format: 'Laboratorio de programación',
      date: 'febrero de 2023',
      location: 'Ereván y Gyumri',
      description:
        'Un laboratorio de programación donde los estudiantes de TUMO aprendieron a crear índices de búsqueda, desarrollar un algoritmo de búsqueda y construir sus propios motores de búsqueda.',
    },
  },
  hy: {
    'From Idea to Prototype': {
      title: 'Գաղափարից մինչև նախատիպ',
      secondary: 'TUMO Labs',
      format: 'ԱԲ-ի ներածական դասընթաց',
      date: '2026 թ. հունիսի 8–19',
      location: 'TUMO Labs, Երևան',
      description:
        'Վեց հանդիպումից բաղկացած ներածական դասընթաց, որի ընթացքում մասնակիցներն օգտագործեցին Claude Code-ն ու ԱԲ-ով աշխատանքային հոսքերը՝ հետազոտելու, գաղափարներ մշակելու, արտադրանք պլանավորելու, ներկայացման նյութեր ու դիզայն պատրաստելու և ցուցադրության պատրաստ MVP ստեղծելու համար։',
    },
    'TUMO Gunma AI Learning Lab': {
      title: 'Թումո Գունմայի ԱԲ ուսումնառության լաբորատորիա',
      secondary: 'Պատմասացություն × ԱԲ',
      date: '2025 թ. նոյեմբերի 1–3',
      location: 'Տակասակի, Ճապոնիա',
      description:
        'Եռօրյա ԱԲ ուսումնառության լաբորատորիա, որտեղ սովորողները գեներատիվ ԱԲ գործիքներով Disney-ի որակի կարճամետրաժ ֆիլմեր ստեղծեցին, ապա ներկայացրին դրանք եզրափակիչ պրեմիերայի ժամանակ։',
    },
    'TUMO Mumbai Generative AI Workshop': {
      title: 'Թումո Մումբայի գեներատիվ ԱԲ աշխատարան',
      secondary: 'Թումոն և Shikha Academy-ն',
      date: '2025 թ. մայիս',
      location: 'Մումբայ, Հնդկաստան',
      description:
        'Բազմամոդալ ԱԲ-ի փորձնական աշխատարան՝ կոդի գեներացման, ԱԲ գործակալների ստեղծման ու կարգաբերման, ինտերակտիվ կայքերի մշակման և պատկերների ու երգերի ստեղծման թեմաներով։',
    },
    'AI Agent Chatroom / Talking AI Avatars': {
      title: 'ԱԲ գործակալների զրուցարան / խոսող ԱԲ ավատարներ',
      secondary: 'Թումո',
      format: 'Alt July ուսումնական լաբորատորիա',
      date: '2025 թ. հուլիս',
      location: 'Թումո',
      description:
        'Ուսումնական լաբորատորիա, որտեղ սովորողները OpenAI Agent SDK-ի, Cursor-ի և Next.js-ի միջոցով ստեղծեցին խոսող ԱԲ ավատարներ և մոդերացվող բազմագործակալային զրուցարաններ։',
    },
    'AI/Teens GenAI Hackathon': {
      title: 'AI/Teens գեներատիվ ԱԲ հաքաթոն',
      secondary: 'Թումոյի GenAI համաժողով',
      format: 'Գործնական հաքաթոն',
      date: '2025 թ. մարտի 15',
      location: 'Թումո Երևան',
      description:
        'Ութժամյա գործնական լաբորատորիա, որտեղ սովորողները գեներատիվ ԱԲ-ով աշխատող կայքեր ու հարթակներ ստեղծեցին, այդ թվում՝ գրքեր ստեղծող նախագծեր։',
    },
    'Masterlab IA Generatives': {
      title: 'Գեներատիվ ԱԲ-ի վարպետության աշխատարան',
      secondary: 'Թումո Փարիզ',
      format: 'Վարպետության աշխատարան',
      date: '2024 թ. գարնանային արձակուրդներ',
      location: 'Թումո Փարիզ, Forum des images',
      description:
        'Գեներատիվ ԱԲ-ի վարպետության աշխատարան, որտեղ սովորողները OpenAI API-ների, React-ի, ChatGPT-ի, Midjourney-ի և MusicGen-ի միջոցով ստեղծեցին պատկերազարդումներ, պատմություններ, երաժշտություն և ինտերակտիվ վեբ պատկերասրահներ։',
    },
    'Data Analysis with ChatGPT Code Interpreter': {
      title: 'Տվյալների վերլուծություն ChatGPT Code Interpreter-ով',
      secondary: 'Թումոյի ԱԲ կրթական ծրագիր',
      format: 'Աշխատարան',
      date: '2023 թ. սեպտեմբերի 23',
      location: 'Թումո',
      description:
        'Աշխատարան, որի ընթացքում սովորողները ChatGPT Advanced Data Analysis-ի միջոցով վերլուծեցին բաց տվյալներ, ստեղծեցին տվյալների պատկերավորումներ և առանց կոդ գրելու կառուցեցին վահանակներ։',
    },
    'Generative AI Learning Labs': {
      title: 'Գեներատիվ ԱԲ ուսումնական լաբորատորիաներ',
      secondary: 'Թումո',
      format: 'Ուսումնական լաբորատորիաների շարք',
      date: '2023 թ. ամառ',
      location: 'Երևան, Գյումրի, Դիլիջան և Կապան',
      description:
        'Լաբորատորիաների շարք, որտեղ սովորողները JavaScript-ի և DALL-E-ի, Jukebox-ի ու ChatGPT-ի նման գործիքների միջոցով ստեղծեցին երաժշտություն, արվեստի գործեր, պոեզիա, բաղադրատոմսեր և այլ բովանդակություն գեներացնող ծրագրեր։',
    },
    'Information Retrieval and Text Analysis': {
      title: 'Տեղեկատվական որոնում և տեքստի վերլուծություն',
      secondary: 'Թումո',
      format: 'Ծրագրավորման լաբորատորիա',
      date: '2023 թ. փետրվար',
      location: 'Երևան և Գյումրի',
      description:
        'Ծրագրավորման լաբորատորիա, որտեղ Թումոյի սովորողները կառուցեցին որոնման ինդեքսներ, մշակեցին որոնման ալգորիթմ և ստեղծեցին սեփական որոնողական համակարգերը։',
    },
  },
};

export type LocalizedExperience = {
  canonicalTitle: string;
  title: string;
  secondary: string;
  format?: string;
  date: string;
  location: string;
  description: string;
  media: { src: string; alt: string; label: string }[];
  links: { href: string; label: string; icon: string }[];
};

function localizedLinkLabel(
  locale: Locale,
  label: string,
  href: string,
): string {
  if (locale === 'en') return label;
  const translated = MESSAGES[locale].linkLabels[label] ?? label;
  return href.startsWith('/')
    ? `${translated} (${MESSAGES[locale].essays.english})`
    : translated;
}

export function localizeSpeaking(
  talks: SpeakingTalk[],
  locale: Locale,
): LocalizedExperience[] {
  return talks.map((talk) => {
    const copy =
      locale === 'en' ? undefined : SPEAKING_TRANSLATIONS[locale][talk.title];
    if (locale !== 'en' && !copy)
      throw new Error(`Missing ${locale} speaking translation: ${talk.title}`);
    const title = copy?.title ?? talk.title;
    return {
      canonicalTitle: talk.title,
      title,
      secondary: copy?.secondary ?? talk.event,
      date: copy?.date ?? talk.date,
      location: copy?.location ?? talk.location,
      description: copy?.description ?? talk.description,
      media: talk.media.map((media) => ({
        ...media,
        alt:
          locale === 'en'
            ? media.alt
            : `${title} — ${MESSAGES[locale].lightbox.image}`,
        label: locale === 'en' ? media.label : MESSAGES[locale].lightbox.image,
      })),
      links: talk.links.map((link) => ({
        ...link,
        label: localizedLinkLabel(locale, link.label, link.href),
      })),
    };
  });
}

export function localizeTeaching(
  items: TeachingItem[],
  locale: Locale,
): LocalizedExperience[] {
  return items.map((item) => {
    const copy =
      locale === 'en' ? undefined : TEACHING_TRANSLATIONS[locale][item.title];
    if (locale !== 'en' && !copy)
      throw new Error(`Missing ${locale} teaching translation: ${item.title}`);
    const title = copy?.title ?? item.title;
    return {
      canonicalTitle: item.title,
      title,
      secondary: copy?.secondary ?? item.host,
      format: copy?.format ?? item.format,
      date: copy?.date ?? item.date,
      location: copy?.location ?? item.location,
      description: copy?.description ?? item.description,
      media: item.media.map((media) => ({
        ...media,
        alt:
          locale === 'en'
            ? media.alt
            : `${title} — ${MESSAGES[locale].lightbox.image}`,
        label: locale === 'en' ? media.label : MESSAGES[locale].lightbox.image,
      })),
      links: item.links.map((link) => ({
        ...link,
        label: localizedLinkLabel(locale, link.label, link.href),
      })),
    };
  });
}

export type AboutTimelineItem = {
  title: string;
  organization: string;
  date: string;
  location: string;
  note: string;
  logo: string;
  url: string;
  link?: { href: string; label: string };
};

export const ABOUT_TIMELINE: Record<Locale, AboutTimelineItem[]> = {
  en: [
    {
      title: 'Lead AI Engineer',
      organization: 'TUMO Center for Creative Technologies',
      date: 'Dec 2023 - Present',
      location: 'Yerevan, Armenia',
      note: 'Building an AI-powered learning platform for teaching AI.',
      logo: '/img/about/tumologo.webp',
      url: 'https://tumo.org/',
    },
    {
      title: 'Senior Software Developer',
      organization: 'Cyacomb',
      date: 'Sep 2021 - Aug 2023',
      location: 'Edinburgh, Scotland, UK',
      note: 'Built privacy-preserving digital forensics tools for identifying illegal content.',
      logo: '/img/about/cyacomb.png',
      url: 'https://www.cyacomb.com/company',
    },
    {
      title: "Master's degree, Computer Science",
      organization: 'The University of Edinburgh',
      date: '2020 - 2021',
      location: '',
      note: 'Focused on the intersection of AI and cybersecurity.',
      logo: '/img/about/uoe.png',
      url: 'https://informatics.ed.ac.uk/',
      link: {
        href: '/docs/tom-auger-msc-thesis-anonymizing-network-traffic-datasets.pdf',
        label:
          'MSc thesis: Anonymizing Network Traffic Datasets for Network Intrusion Detection',
      },
    },
    {
      title: 'Software Engineer',
      organization: 'MathWorks',
      date: 'Oct 2018 - Sep 2020',
      location: 'Cambridge, UK',
      note: 'Developed build and integration tooling for MATLAB and Simulink.',
      logo: '/img/about/mathworks.jpg',
      url: 'https://www.mathworks.com/',
    },
    {
      title: 'Software Developer',
      organization: 'Gas Management Services Limited',
      date: 'Oct 2015 - Oct 2018',
      location: 'Cambridge, UK',
      note: 'Developed portfolio management and secure trading systems for UK and European gas markets.',
      logo: '/img/about/gmsl.png',
      url: 'https://www.gmsl.co.uk/',
    },
    {
      title: "Bachelor's degree, Mathematics",
      organization: 'University of Cambridge',
      date: '2012 - 2015',
      location: '',
      note: 'Pure mathematics.',
      logo: '/img/about/uoc.jpeg',
      url: 'https://www.maths.cam.ac.uk/',
    },
  ],
  es: [
    {
      title: 'Ingeniero principal de IA',
      organization: 'Centro TUMO de Tecnologías Creativas',
      date: 'dic. de 2023 – actualidad',
      location: 'Ereván, Armenia',
      note: 'Desarrollo de una plataforma educativa basada en IA para enseñar inteligencia artificial.',
      logo: '/img/about/tumologo.webp',
      url: 'https://tumo.org/',
    },
    {
      title: 'Desarrollador de software sénior',
      organization: 'Cyacomb',
      date: 'sept. de 2021 – ago. de 2023',
      location: 'Edimburgo, Escocia, Reino Unido',
      note: 'Desarrollo de herramientas de informática forense que protegen la privacidad para identificar contenido ilegal.',
      logo: '/img/about/cyacomb.png',
      url: 'https://www.cyacomb.com/company',
    },
    {
      title: 'Máster en Informática',
      organization: 'Universidad de Edimburgo',
      date: '2020–2021',
      location: '',
      note: 'Especialización en la intersección entre la IA y la ciberseguridad.',
      logo: '/img/about/uoe.png',
      url: 'https://informatics.ed.ac.uk/',
      link: {
        href: '/docs/tom-auger-msc-thesis-anonymizing-network-traffic-datasets.pdf',
        label:
          'Tesis de máster: anonimización de conjuntos de datos de tráfico de red para detectar intrusiones',
      },
    },
    {
      title: 'Ingeniero de software',
      organization: 'MathWorks',
      date: 'oct. de 2018 – sept. de 2020',
      location: 'Cambridge, Reino Unido',
      note: 'Desarrollo de herramientas de compilación e integración para MATLAB y Simulink.',
      logo: '/img/about/mathworks.jpg',
      url: 'https://www.mathworks.com/',
    },
    {
      title: 'Desarrollador de software',
      organization: 'Gas Management Services Limited',
      date: 'oct. de 2015 – oct. de 2018',
      location: 'Cambridge, Reino Unido',
      note: 'Desarrollo de sistemas de gestión de carteras y negociación segura para los mercados de gas británico y europeo.',
      logo: '/img/about/gmsl.png',
      url: 'https://www.gmsl.co.uk/',
    },
    {
      title: 'Grado en Matemáticas',
      organization: 'Universidad de Cambridge',
      date: '2012–2015',
      location: '',
      note: 'Matemáticas puras.',
      logo: '/img/about/uoc.jpeg',
      url: 'https://www.maths.cam.ac.uk/',
    },
  ],
  hy: [
    {
      title: 'Արհեստական բանականության առաջատար ինժեներ',
      organization: 'Թումո ստեղծարար տեխնոլոգիաների կենտրոն',
      date: '2023 թ. դեկտեմբեր – այժմ',
      location: 'Երևան, Հայաստան',
      note: 'ԱԲ դասավանդելու համար ԱԲ-ի վրա հիմնված կրթական հարթակի մշակում։',
      logo: '/img/about/tumologo.webp',
      url: 'https://tumo.org/',
    },
    {
      title: 'Ավագ ծրագրային մշակող',
      organization: 'Cyacomb',
      date: '2021 թ. սեպտեմբեր – 2023 թ. օգոստոս',
      location: 'Էդինբուրգ, Շոտլանդիա, ՄԹ',
      note: 'Ապօրինի բովանդակություն հայտնաբերող և գաղտնիությունը պահպանող թվային քրեագիտական գործիքների մշակում։',
      logo: '/img/about/cyacomb.png',
      url: 'https://www.cyacomb.com/company',
    },
    {
      title: 'Համակարգչային գիտությունների մագիստրոսի աստիճան',
      organization: 'Էդինբուրգի համալսարան',
      date: '2020–2021',
      location: '',
      note: 'ԱԲ-ի և կիբեռանվտանգության փոխհատման ուսումնասիրություն։',
      logo: '/img/about/uoe.png',
      url: 'https://informatics.ed.ac.uk/',
      link: {
        href: '/docs/tom-auger-msc-thesis-anonymizing-network-traffic-datasets.pdf',
        label:
          'Մագիստրոսական թեզ․ ցանցային երթևեկության տվյալների անանունացում՝ ներխուժումների հայտնաբերման համար',
      },
    },
    {
      title: 'Ծրագրային ապահովման ինժեներ',
      organization: 'MathWorks',
      date: '2018 թ. հոկտեմբեր – 2020 թ. սեպտեմբեր',
      location: 'Քեմբրիջ, ՄԹ',
      note: 'MATLAB-ի և Simulink-ի կառուցման ու ինտեգրման գործիքակազմի մշակում։',
      logo: '/img/about/mathworks.jpg',
      url: 'https://www.mathworks.com/',
    },
    {
      title: 'Ծրագրային մշակող',
      organization: 'Gas Management Services Limited',
      date: '2015 թ. հոկտեմբեր – 2018 թ. հոկտեմբեր',
      location: 'Քեմբրիջ, ՄԹ',
      note: 'Պորտֆելների կառավարման և անվտանգ առևտրի համակարգերի մշակում՝ Մեծ Բրիտանիայի ու Եվրոպայի գազի շուկաների համար։',
      logo: '/img/about/gmsl.png',
      url: 'https://www.gmsl.co.uk/',
    },
    {
      title: 'Մաթեմատիկայի բակալավրի աստիճան',
      organization: 'Քեմբրիջի համալսարան',
      date: '2012–2015',
      location: '',
      note: 'Մաքուր մաթեմատիկա։',
      logo: '/img/about/uoc.jpeg',
      url: 'https://www.maths.cam.ac.uk/',
    },
  ],
};
