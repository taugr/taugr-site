import type { Locale } from '../i18n';

type Story = {
  problem: string;
  decision: string;
  result: string;
  alt?: string;
};
export const storyLabels: Record<
  Locale,
  {
    problem: string;
    decision: string;
    result: string;
    details: string;
    image: string;
  }
> = {
  en: {
    problem: 'The problem',
    decision: 'How I built it',
    result: 'What it enables',
    details: 'Behind the project',
    image: 'View full screenshot',
  },
  es: {
    problem: 'El problema',
    decision: 'Cómo lo construí',
    result: 'Qué permite hacer',
    details: 'Detrás del proyecto',
    image: 'Ver captura completa',
  },
  hy: {
    problem: 'Խնդիրը',
    decision: 'Ինչպես եմ կառուցել',
    result: 'Ինչ է հնարավոր անել',
    details: 'Նախագծի մասին ավելին',
    image: 'Դիտել ամբողջ պատկերը',
  },
};

// Source: each project's README. Describe implemented capabilities, not adoption or measured impact.
export const projectStories: Record<string, Record<Locale, Story>> = {
  scranbook: {
    en: {
      problem:
        'Keep a useful food diary without making an account or handing a service the whole diary.',
      decision:
        'I store entries and photos in the browser with IndexedDB. Manual entry works without AI; photo analysis is an explicit action that sends the selected photo to the configured model provider.',
      result:
        'Log meals, edit nutrition estimates, and export or restore a backup. The diary works without a dedicated application backend.',
      alt: 'Scranbook’s empty diary, with an invitation to add a first meal.',
    },
    es: {
      problem:
        'Llevar un diario de comidas útil sin crear una cuenta ni entregar todo el diario a un servicio.',
      decision:
        'Guardo las entradas y fotos en el navegador con IndexedDB. El registro manual funciona sin IA; el análisis de fotos es una acción explícita que envía la foto seleccionada al proveedor configurado.',
      result:
        'Registrar comidas, corregir estimaciones nutricionales y exportar o restaurar una copia de seguridad, sin un servidor dedicado para el diario.',
      alt: 'El diario vacío de Scranbook invita a añadir la primera comida.',
    },
    hy: {
      problem:
        'Վարել սննդի օգտակար օրագիր՝ առանց հաշիվ ստեղծելու կամ ամբողջ օրագիրը որևէ ծառայության փոխանցելու։',
      decision:
        'Գրառումներն ու լուսանկարները պահում եմ դիտարկչում՝ IndexedDB-ի միջոցով։ Ձեռքով գրանցումն աշխատում է առանց ԱԲ-ի։ Լուսանկարի վերլուծությունը առանձին գործողություն է, որն ընտրված լուսանկարն ուղարկում է կարգավորված մոդելի մատակարարին։',
      result:
        'Գրանցել կերակուրներ, ուղղել սննդային գնահատականները և արտահանել կամ վերականգնել պահուստային պատճենը՝ առանց օրագրի համար առանձին սերվերի։',
      alt: 'Scranbook-ի դատարկ օրագիրը՝ առաջին կերակուրն ավելացնելու առաջարկով։',
    },
  },
  'neuk-bike': {
    en: {
      alt: 'Bike Neuks showing cycle parking around Edinburgh Waverley, with a map and nearby parking list.',
      problem:
        'Finding somewhere to leave a bike means navigating parking data spread across council records and OpenStreetMap.',
      decision:
        'I combine those sources in a browser-based map and split the parking data into small geographic chunks, so the app loads the area in view instead of the entire catalogue.',
      result:
        'Find and compare nearby parking, plan a cycle route, save routes, and export GPX files. The map covers the UK, Ireland, Spain, and Armenia.',
    },
    es: {
      alt: 'Bike Neuks muestra aparcamientos para bicicletas cerca de Edinburgh Waverley, con un mapa y una lista de lugares cercanos.',
      problem:
        'Encontrar dónde dejar la bici requiere consultar datos repartidos entre registros municipales y OpenStreetMap.',
      decision:
        'Combino esas fuentes en un mapa en el navegador y divido los datos en pequeños bloques geográficos, para cargar la zona visible en lugar del catálogo completo.',
      result:
        'Encontrar y comparar aparcamientos cercanos, planificar rutas ciclistas, guardarlas y exportarlas en GPX. El mapa cubre Reino Unido, Irlanda, España y Armenia.',
    },
    hy: {
      alt: 'Bike Neuks-ը ցույց է տալիս Էդինբուրգի Ուեյվերլի կայարանի մոտ գտնվող հեծանվային կայանատեղերը՝ քարտեզով և մոտակա վայրերի ցանկով։',
      problem:
        'Հեծանիվը կայանելու տեղ գտնելու համար պետք է օգտվել համայնքային գրանցամատյաններում և OpenStreetMap-ում ցրված տվյալներից։',
      decision:
        'Այդ աղբյուրները միավորում եմ դիտարկչում աշխատող քարտեզում և տվյալները բաժանում փոքր աշխարհագրական հատվածների, որպեսզի հավելվածը բեռնի տեսանելի տարածքը՝ ամբողջ ցանկի փոխարեն։',
      result:
        'Գտնել և համեմատել մոտակա կայանատեղերը, պլանավորել ու պահպանել հեծանվային երթուղիներ և արտահանել GPX ֆայլեր։ Քարտեզն ընդգրկում է Մեծ Բրիտանիան, Իռլանդիան, Իսպանիան և Հայաստանը։',
    },
  },
  vuemarkik: {
    en: {
      problem:
        'Markdown in a Vue app needs to work with real components, plugins, and streamed updates while handling untrusted content safely.',
      decision:
        'I render Vue VNodes instead of injecting HTML, sanitize the final syntax tree after plugins, and provide separate synchronous, asynchronous, and reactive rendering APIs.',
      result:
        'Use custom Vue components, code highlighting, maths, and diagrams inside Markdown. During incomplete streamed input, the reactive renderer keeps the last successful render.',
      alt: 'VueMarkik documentation showing a Vue Markdown component and its rendered output.',
    },
    es: {
      problem:
        'El Markdown en una aplicación Vue debe admitir componentes, plugins y actualizaciones en streaming, y tratar de forma segura el contenido no confiable.',
      decision:
        'Renderizo VNodes de Vue en lugar de inyectar HTML, saneo el árbol sintáctico final después de los plugins y ofrezco APIs síncronas, asíncronas y reactivas.',
      result:
        'Usar componentes Vue propios, resaltado de código, matemáticas y diagramas en Markdown. Ante datos incompletos en streaming, el renderizador reactivo conserva el último resultado válido.',
      alt: 'Documentación de VueMarkik con un componente Vue de Markdown y su resultado renderizado.',
    },
    hy: {
      problem:
        'Vue հավելվածում Markdown-ը պետք է աշխատի իրական բաղադրիչների, հավելումների և հոսքային թարմացումների հետ՝ անվտանգ մշակելով անվստահելի բովանդակությունը։',
      decision:
        'HTML ներարկելու փոխարեն արտապատկերում եմ Vue VNode-եր, հավելումներից հետո մաքրում վերջնական շարահյուսական ծառը և տրամադրում համաժամանակյա, անհամաժամանակյա ու ռեակտիվ API-ներ։',
      result:
        'Markdown-ում օգտագործել սեփական Vue բաղադրիչներ, կոդի գունավորում, բանաձևեր և գծապատկերներ։ Անավարտ հոսքային մուտքի դեպքում ռեակտիվ արտապատկերիչը պահպանում է վերջին հաջող արդյունքը։',
      alt: 'VueMarkik-ի փաստաթղթերը՝ Vue Markdown բաղադրիչով և արտապատկերված արդյունքով։',
    },
  },
};
