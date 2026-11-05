/**
 * Balazhan.kz — балабақшаның барлық деректері осы файлда.
 * Все данные детского сада хранятся в этом файле: меняйте значения здесь,
 * и они обновятся на всём сайте (в обеих версиях и на обоих языках).
 */

export const locales = ["kk", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "kk";
export type Localized = Record<Locale, string>;

const geo = { lat: 43.228863, lon: 76.793568 };
const firmId = "70000001035845615";

export const siteConfig = {
  name: "Balazhan.kz",
  legalName: { kk: "«Balazhan.kz» ЖШС", ru: "ТОО «Balazhan.kz»" } as Localized,

  address: {
    kk: "Алматы қаласы, Наурызбай ауданы, Қалқаман шағынауданы, Айбергенова көшесі, 2Д",
    ru: "Казахстан, Алматы, Наурызбайский район, микрорайон Калкаман, улица Айбергенова, 2Д",
  } as Localized,
  /** Поля адреса для микроразметки schema.org */
  addressParts: {
    street: "улица Айбергенова, 2Д",
    locality: "Алматы",
    region: "Наурызбайский район, микрорайон Калкаман",
    country: "KZ",
  },
  geo,

  phone: { display: "+7 702 968 55 55", tel: "+77029685555" },

  whatsapp: {
    number: "77029685555",
    message: {
      kk: "Сәлеметсіз бе! Balazhan.kz балабақшасы туралы ақпарат алғым келеді.",
      ru: "Здравствуйте! Хочу получить информацию о детском саде Balazhan.kz.",
    } as Localized,
  },

  hours: {
    label: { kk: "Дүйсенбі–жұма, 07:00–18:30", ru: "Понедельник–пятница, 07:00–18:30" } as Localized,
    opens: "07:00",
    closes: "18:30",
  },

  facts: { groups: 3, ageFrom: 2, ageTo: 5, meals: 5 },

  /** Название в Instagram. Точной ссылки на профиль пока нет, поэтому показываем его текстом. */
  instagram: "Balazhan.kz",

  twoGis: {
    firmId,
    card: `https://2gis.kz/almaty/firm/${firmId}`,
    gallery: `https://2gis.kz/almaty/gallery/firm/${firmId}/photoId/30258560270665427`,
    route: `https://2gis.kz/almaty/directions/points/%7C${geo.lon}%2C${geo.lat}%3B${firmId}`,
    mapWidget: `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(
      JSON.stringify({
        pos: { lat: geo.lat, lon: geo.lon, zoom: 16 },
        opt: { city: "almaty" },
        org: firmId,
      }),
    )}`,
  },

  /**
   * Google Drive сілтемесі. Бос болса, сайт «Жақында қолжетімді болады» деп көрсетеді.
   * Вставьте сюда ссылку на папку Google Drive — кнопка «Посмотреть документы» заработает сама.
   */
  documentsUrl: "https://drive.google.com/drive/folders/1Jwugy90C3UOd216fEQnMMAPqQWL0r2Fk",

  /**
   * Предварительные названия и возраст групп — это не подтверждённое расписание сада.
   * Когда появятся официальные данные, поменяйте их здесь.
   */
  groups: [
    {
      id: "small",
      art: "sprout",
      name: { kk: "Кіші топ", ru: "Младшая группа" },
      age: { kk: "2–3 жас", ru: "2–3 года" },
      description: {
        kk: "Бұл жаста бала айналасын қызығып таниды, сөздік қорын байытады және өз бетінше әрекет етуге алғашқы қадам жасайды.",
        ru: "В этом возрасте ребёнок с интересом открывает мир вокруг, пополняет словарный запас и делает первые шаги к самостоятельности.",
      },
    },
    {
      id: "middle",
      art: "sapling",
      name: { kk: "Ортаңғы топ", ru: "Средняя группа" },
      age: { kk: "3–4 жас", ru: "3–4 года" },
      description: {
        kk: "Бала құрдастарымен бірге ойнауға, ойын сөзбен жеткізуге және «неге?» деген сұрақтарға жауап іздеуге ынталы болады.",
        ru: "Дети с удовольствием играют со сверстниками, учатся выражать мысли словами и ищут ответы на бесконечные «почему?».",
      },
    },
    {
      id: "senior",
      art: "tree",
      name: { kk: "Ересек топ", ru: "Старшая группа" },
      age: { kk: "4–5 жас", ru: "4–5 лет" },
      description: {
        kk: "Қиялы дамып, сұрақтары тереңдей түседі: бала өз ойын айтуға, ойын ережелерін сақтауға және бастаған ісін аяқтауға үйренеді.",
        ru: "Развивается воображение, вопросы становятся глубже: ребёнок учится высказывать своё мнение, соблюдать правила игры и доводить начатое до конца.",
      },
    },
  ] as const satisfies readonly {
    id: string;
    art: "sprout" | "sapling" | "tree";
    name: Localized;
    age: Localized;
    description: Localized;
  }[],

  gallery: {
    /** Сколько фотографий показано сразу и сколько добавляет кнопка «Показать больше» */
    initialCount: 6,
    step: 6,
  },
};

export const whatsappUrl = (locale: Locale) =>
  `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.message[locale])}`;

export const telUrl = `tel:${siteConfig.phone.tel}`;

export const localePath = (locale: Locale) => (locale === defaultLocale ? "/" : `/${locale}`);

export const siteUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
})();

export const sectionIds = ["home", "about", "groups", "lessons", "gallery", "documents", "contacts"] as const;
export type SectionId = (typeof sectionIds)[number];
