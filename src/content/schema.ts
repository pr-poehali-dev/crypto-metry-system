export type ContentField = {
  key: string;
  label: string;
  multiline?: boolean;
  type?: 'text' | 'image';
  fallback: string;
};

export type ContentSection = {
  id: string;
  title: string;
  fields: ContentField[];
};

export type ContentPage = {
  id: string;
  title: string;
  sections: ContentSection[];
};

const makeInfoPage = (id: string, title: string, slug: string, defaultTitle: string, defaultSubtitle: string): ContentPage => ({
  id,
  title,
  sections: [
    {
      id: 'meta',
      title: 'SEO и настройки',
      fields: [
        { key: 'slug', label: 'URL (slug)', fallback: slug },
        { key: 'seo_title', label: 'SEO title', fallback: defaultTitle + ' — КриптоМетры' },
        { key: 'seo_desc', label: 'SEO description', multiline: true, fallback: defaultSubtitle },
        { key: 'published', label: 'Статус публикации (published / draft)', fallback: 'draft' },
      ],
    },
    {
      id: 'hero',
      title: 'Обложка (Hero)',
      fields: [
        { key: 'chip', label: 'Метка над заголовком', fallback: 'КриптоМетры' },
        { key: 'title_1', label: 'Заголовок — строка 1', fallback: defaultTitle },
        { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: '' },
        { key: 'subtitle', label: 'Подзаголовок', multiline: true, fallback: defaultSubtitle },
        { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Узнать подробнее' },
        { key: 'cta_primary_url', label: 'Кнопка — ссылка', fallback: '/system' },
        { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: '' },
        { key: 'bg_image', label: 'Фон обложки', type: 'image', fallback: '' },
      ],
    },
    {
      id: 'blocks',
      title: 'Текстовые блоки',
      fields: [
        { key: 'block_1_title', label: 'Блок #1 — заголовок', fallback: '' },
        { key: 'block_1_text', label: 'Блок #1 — текст', multiline: true, fallback: '' },
        { key: 'block_2_title', label: 'Блок #2 — заголовок', fallback: '' },
        { key: 'block_2_text', label: 'Блок #2 — текст', multiline: true, fallback: '' },
        { key: 'block_3_title', label: 'Блок #3 — заголовок', fallback: '' },
        { key: 'block_3_text', label: 'Блок #3 — текст', multiline: true, fallback: '' },
      ],
    },
    {
      id: 'cta',
      title: 'Финальный призыв (CTA)',
      fields: [
        { key: 'title', label: 'Заголовок CTA', fallback: 'Хочешь узнать больше?' },
        { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Получить КМ' },
        { key: 'cta_primary_url', label: 'Кнопка — ссылка', fallback: '/mining-kvartiry' },
        { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'На главную' },
        { key: 'cta_secondary_url', label: 'Кнопка вторичная — ссылка', fallback: '/' },
      ],
    },
  ],
});

export const INFO_PAGES: ContentPage[] = [
  makeInfoPage('about', 'Что такое КриптоМетры', '/about', 'Что такое КриптоМетры', 'Распределённая система девелопмента нового поколения — участники, а не покупатели.'),
  // ─── ИИ АО КСИ ────────────────────────────────────────────────────────────
  {
    id: 'ai-ksi',
    title: 'ИИ АО КСИ',
    sections: [
      {
        id: 'meta',
        title: 'SEO и настройки',
        fields: [
          { key: 'slug', label: 'URL (slug)', fallback: '/ai-ksi' },
          { key: 'seo_title', label: 'SEO title', fallback: 'ИИ АО КСИ — интеллектуальный контур КриптоМетров' },
          { key: 'seo_desc', label: 'SEO description', multiline: true, fallback: 'Внутренний ИИ-контур проекта: как работает, с какими моделями, что накапливает.' },
          { key: 'published', label: 'Статус (published / draft)', fallback: 'published' },
        ],
      },
      {
        id: 'hero',
        title: 'Обложка',
        fields: [
          { key: 'chip', label: 'Метка', fallback: 'АО КСИ · Интеллектуальный контур' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'ИИ' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'АО КСИ' },
          { key: 'subtitle', label: 'Подзаголовок', multiline: true, fallback: 'Внутренний интеллектуальный контур проекта. Работает на внешних облачных моделях — GPT и других LLM. Каждый запрос пополняет базу знаний системы, а не обучает внешние модели.' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Как работает запрос' },
          { key: 'cta_primary_url', label: 'Кнопка — ссылка', fallback: '/how-ai' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Про АО КСИ' },
          { key: 'bg_image', label: 'Фон обложки', type: 'image', fallback: '' },
        ],
      },
      {
        id: 'what',
        title: 'Что такое ИИ АО КСИ',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: '01 · Суть' },
          { key: 'title', label: 'Заголовок', fallback: 'Не чат-бот. Контур.' },
          { key: 'text', label: 'Текст', multiline: true, fallback: 'ИИ АО КСИ — это не просто чат-бот для ответов на вопросы. Это интеллектуальный операционный контур: система классификации задач, маршрутизации запросов, накопления опыта и взаимодействия с операторами. Он встроен в рабочую инфраструктуру управляющей компании.' },
        ],
      },
      {
        id: 'models',
        title: 'Модели и инфраструктура',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: '02 · Инфраструктура' },
          { key: 'title', label: 'Заголовок', fallback: 'Облако сегодня. Свои серверы — завтра.' },
          { key: 'text', label: 'Текст', multiline: true, fallback: 'На первом этапе ИИ работает на внешних облачных LLM: GPT, Claude и других. В будущем возможен перенос на собственные серверы и локальные модели — без зависимости от внешних провайдеров.' },
          { key: 'card_1_title', label: 'Карточка #1 — заголовок', fallback: 'GPT и LLM' },
          { key: 'card_1_text', label: 'Карточка #1 — текст', fallback: 'Внешние облачные модели для обработки типовых запросов' },
          { key: 'card_2_title', label: 'Карточка #2 — заголовок', fallback: 'Операторы КСИ' },
          { key: 'card_2_text', label: 'Карточка #2 — текст', fallback: 'Люди, которые проверяют сложные запросы и обеспечивают качество' },
          { key: 'card_3_title', label: 'Карточка #3 — заголовок', fallback: 'База знаний' },
          { key: 'card_3_text', label: 'Карточка #3 — текст', fallback: 'Внутренний реестр опыта, сценарии обработки, накопленные данные' },
          { key: 'card_4_title', label: 'Карточка #4 — заголовок', fallback: 'Локальные модели' },
          { key: 'card_4_text', label: 'Карточка #4 — текст', fallback: 'Перспектива: собственные серверы и независимые модели' },
        ],
      },
      {
        id: 'knowledge',
        title: 'База знаний',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: '03 · База знаний' },
          { key: 'title', label: 'Заголовок', fallback: 'Каждый запрос — вклад в систему.' },
          { key: 'text', label: 'Текст', multiline: true, fallback: 'Ни один запрос не уходит бесследно. Он не обучает внешнюю модель напрямую — но пополняет внутренний реестр опыта КСИ: сценарии обработки, теги, категории, результаты и основания для начисления КМ. Так система становится умнее с каждым участником.' },
        ],
      },
      {
        id: 'operators',
        title: 'Операторы',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: '04 · Люди в контуре' },
          { key: 'title', label: 'Заголовок', fallback: 'ИИ работает не один.' },
          { key: 'text', label: 'Текст', multiline: true, fallback: 'За ИИ стоят операторы АО КСИ — люди, которые проверяют результаты сложных запросов, управляют качеством ответов и вносят правки. Это гибридная система: ИИ берёт скорость и объём, операторы — точность и ответственность.' },
        ],
      },
      {
        id: 'cta',
        title: 'Финальный призыв',
        fields: [
          { key: 'title', label: 'Заголовок CTA', fallback: 'Хочешь отправить запрос к ИИ?' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Как это работает' },
          { key: 'cta_primary_url', label: 'Кнопка — ссылка', fallback: '/how-ai' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'О компании АО КСИ' },
          { key: 'cta_secondary_url', label: 'Кнопка вторичная — ссылка', fallback: '/ao-ksi' },
        ],
      },
    ],
  },
  // ─── АО КСИ ───────────────────────────────────────────────────────────────
  {
    id: 'ao-ksi',
    title: 'АО КСИ — управляющая компания',
    sections: [
      {
        id: 'meta',
        title: 'SEO и настройки',
        fields: [
          { key: 'slug', label: 'URL (slug)', fallback: '/ao-ksi' },
          { key: 'seo_title', label: 'SEO title', fallback: 'АО КСИ — управляющая компания КриптоМетров' },
          { key: 'seo_desc', label: 'SEO description', multiline: true, fallback: 'АО КриптоСтройИнвест — разработчик и оператор интеллектуальной инфраструктуры проекта.' },
          { key: 'published', label: 'Статус (published / draft)', fallback: 'published' },
        ],
      },
      {
        id: 'hero',
        title: 'Обложка',
        fields: [
          { key: 'chip', label: 'Метка', fallback: 'Управляющая компания · КриптоМетры' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'АО' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'КриптоСтройИнвест' },
          { key: 'subtitle', label: 'Подзаголовок', multiline: true, fallback: 'Управляющая компания, разработчик и оператор интеллектуальной инфраструктуры проекта КриптоМетры. Центр ответственности и технологического развития.' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'ИИ АО КСИ' },
          { key: 'cta_primary_url', label: 'Кнопка — ссылка', fallback: '/ai-ksi' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Правовая модель' },
          { key: 'bg_image', label: 'Фон обложки', type: 'image', fallback: '' },
        ],
      },
      {
        id: 'mission',
        title: 'Миссия',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: '01 · Миссия' },
          { key: 'title', label: 'Заголовок', fallback: 'Центр ответственности системы.' },
          { key: 'text', label: 'Текст', multiline: true, fallback: 'АО КСИ — не просто юридическое лицо. Это операционный центр, который создаёт и обслуживает инфраструктуру: ИИ-контур, медиаплатформу, реестры, партнёрские направления и административный интерфейс. Кооператив объединяет участников — АО КСИ обеспечивает работу системы.' },
        ],
      },
      {
        id: 'functions',
        title: 'Функции',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: '02 · Что делает АО КСИ' },
          { key: 'title', label: 'Заголовок', fallback: 'Создаёт. Обслуживает. Развивает.' },
          { key: 'fn_1_title', label: 'Функция #1', fallback: 'ИИ-контур' },
          { key: 'fn_1_text', label: 'Функция #1 — описание', fallback: 'Создание и поддержка интеллектуального контура: GPT-интеграции, операторский слой, база знаний' },
          { key: 'fn_2_title', label: 'Функция #2', fallback: 'Медиаплатформа' },
          { key: 'fn_2_text', label: 'Функция #2 — описание', fallback: 'Разработка и ведение собственной медиаплатформы: контент, обучение, сообщество' },
          { key: 'fn_3_title', label: 'Функция #3', fallback: 'Операционный контур' },
          { key: 'fn_3_text', label: 'Функция #3 — описание', fallback: 'Обработка запросов участников, управление реестрами и начислением КМ' },
          { key: 'fn_4_title', label: 'Функция #4', fallback: 'Партнёрства' },
          { key: 'fn_4_text', label: 'Функция #4 — описание', fallback: 'Аккредитация девелоперов, рекламные направления, LSS и внешние интеграции' },
          { key: 'fn_5_title', label: 'Функция #5', fallback: 'Административный контур' },
          { key: 'fn_5_text', label: 'Функция #5 — описание', fallback: 'Инструменты для операторов, аналитика, управление контентом' },
          { key: 'fn_6_title', label: 'Функция #6', fallback: 'Правовая модель' },
          { key: 'fn_6_text', label: 'Функция #6 — описание', fallback: 'Юридическая архитектура проекта, защита прав участников' },
        ],
      },
      {
        id: 'cooperative',
        title: 'КСИ и кооператив',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: '03 · Разделение ролей' },
          { key: 'title', label: 'Заголовок', fallback: 'Кооператив объединяет. КСИ обеспечивает.' },
          { key: 'text', label: 'Текст', multiline: true, fallback: 'Кооператив — это участники, их права и коллективное решение. АО КСИ — это технологический и операционный партнёр, который создаёт инфраструктуру, по которой участники движутся к своему жилью.' },
        ],
      },
      {
        id: 'cta',
        title: 'Финальный призыв',
        fields: [
          { key: 'title', label: 'Заголовок CTA', fallback: 'Хочешь стать частью системы?' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Получить КМ' },
          { key: 'cta_primary_url', label: 'Кнопка — ссылка', fallback: '/mining-kvartiry' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'ИИ АО КСИ' },
          { key: 'cta_secondary_url', label: 'Кнопка вторичная — ссылка', fallback: '/ai-ksi' },
        ],
      },
    ],
  },
  makeInfoPage('fond', 'Фонд КриптоМетров', '/fond', 'Фонд КриптоМетров', 'Как устроен фонд, накопление и распределение КМ среди участников.'),
  makeInfoPage('calculator', 'Калькулятор КМ', '/calculator', 'Калькулятор КМ', 'Рассчитай, сколько КМ нужно для участия в проекте.'),
  makeInfoPage('media', 'Медиаплатформа', '/media', 'Медиаплатформа', 'Собственная медиаплатформа КриптоМетров — контент, обучение, сообщество.'),
  // ─── КАК РАБОТАЕТ ЗАПРОС К ИИ ─────────────────────────────────────────────
  {
    id: 'how-ai',
    title: 'Как работает запрос к ИИ',
    sections: [
      {
        id: 'meta',
        title: 'SEO и настройки',
        fields: [
          { key: 'slug', label: 'URL (slug)', fallback: '/how-ai' },
          { key: 'seo_title', label: 'SEO title', fallback: 'Как работает запрос к ИИ АО КСИ' },
          { key: 'seo_desc', label: 'SEO description', multiline: true, fallback: 'Путь запроса: от участника через классификатор к GPT или оператору — и обратно с единицей опыта.' },
          { key: 'published', label: 'Статус (published / draft)', fallback: 'published' },
        ],
      },
      {
        id: 'hero',
        title: 'Обложка',
        fields: [
          { key: 'chip', label: 'Метка', fallback: 'ИИ АО КСИ · Схема работы' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Путь запроса' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'к результату.' },
          { key: 'subtitle', label: 'Подзаголовок', multiline: true, fallback: 'От участника до ответа — через классификатор, GPT, операторов и реестр опыта. Каждый запрос что-то создаёт.' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Про ИИ АО КСИ' },
          { key: 'cta_primary_url', label: 'Кнопка — ссылка', fallback: '/ai-ksi' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Реестр опыта' },
          { key: 'bg_image', label: 'Фон обложки', type: 'image', fallback: '' },
        ],
      },
      {
        id: 'steps',
        title: 'Шаги маршрута',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Маршрут запроса · 9 шагов' },
          { key: 'title', label: 'Заголовок', fallback: 'Каждый запрос проходит свой путь.' },
          { key: 'step_1', label: 'Шаг 1', fallback: 'Участник отправляет запрос' },
          { key: 'step_1_desc', label: 'Шаг 1 — описание', fallback: 'Через интерфейс системы — текстом, формой или голосом' },
          { key: 'step_2', label: 'Шаг 2', fallback: 'Классификатор анализирует задачу' },
          { key: 'step_2_desc', label: 'Шаг 2 — описание', fallback: 'Внутренний ИИ-контур определяет тип, сложность и маршрут' },
          { key: 'step_3', label: 'Шаг 3', fallback: 'Простой запрос → GPT' },
          { key: 'step_3_desc', label: 'Шаг 3 — описание', fallback: 'Типовые задачи обрабатываются автоматически облачной моделью' },
          { key: 'step_4', label: 'Шаг 4', fallback: 'Сложный запрос → Оператор' },
          { key: 'step_4_desc', label: 'Шаг 4 — описание', fallback: 'Нестандартные задачи передаются оператору АО КСИ' },
          { key: 'step_5', label: 'Шаг 5', fallback: 'Подключение дополнительных моделей' },
          { key: 'step_5_desc', label: 'Шаг 5 — описание', fallback: 'При необходимости задействуются специализированные модели и советники' },
          { key: 'step_6', label: 'Шаг 6', fallback: 'Оператор проверяет результат' },
          { key: 'step_6_desc', label: 'Шаг 6 — описание', fallback: 'Человек верифицирует качество и точность ответа' },
          { key: 'step_7', label: 'Шаг 7', fallback: 'Ответ возвращается участнику' },
          { key: 'step_7_desc', label: 'Шаг 7 — описание', fallback: 'Финальный результат доставляется в удобном формате' },
          { key: 'step_8', label: 'Шаг 8', fallback: 'Создаётся единица опыта' },
          { key: 'step_8_desc', label: 'Шаг 8 — описание', fallback: 'Запрос, результат, оператор, модель и теги фиксируются в Реестре опыта' },
          { key: 'step_9', label: 'Шаг 9', fallback: 'Начисляются КМ' },
          { key: 'step_9_desc', label: 'Шаг 9 — описание', fallback: 'При наличии основания участнику начисляются КриптоМетры' },
        ],
      },
      {
        id: 'result',
        title: 'Что остаётся',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Итог' },
          { key: 'title', label: 'Заголовок', fallback: 'Запрос не исчезает.' },
          { key: 'text', label: 'Текст', multiline: true, fallback: 'Каждый завершённый запрос оставляет след в системе. Единица опыта — это не просто лог. Это строительный материал для будущего: она пополняет базу знаний, влияет на качество следующих ответов и служит основанием для начисления КМ.' },
        ],
      },
      {
        id: 'cta',
        title: 'Финальный призыв',
        fields: [
          { key: 'title', label: 'Заголовок CTA', fallback: 'Хочешь отправить свой первый запрос?' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Получить КМ' },
          { key: 'cta_primary_url', label: 'Кнопка — ссылка', fallback: '/mining-kvartiry' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Реестр опыта' },
          { key: 'cta_secondary_url', label: 'Кнопка вторичная — ссылка', fallback: '/registry-exp' },
        ],
      },
    ],
  },
  // ─── РЕЕСТР ОПЫТА ─────────────────────────────────────────────────────────
  {
    id: 'registry-exp',
    title: 'Реестр опыта',
    sections: [
      {
        id: 'meta',
        title: 'SEO и настройки',
        fields: [
          { key: 'slug', label: 'URL (slug)', fallback: '/registry-exp' },
          { key: 'seo_title', label: 'SEO title', fallback: 'Реестр опыта — КриптоМетры' },
          { key: 'seo_desc', label: 'SEO description', multiline: true, fallback: 'Каждый подтверждённый результат становится единицей опыта и фиксируется в реестре.' },
          { key: 'published', label: 'Статус (published / draft)', fallback: 'published' },
        ],
      },
      {
        id: 'hero',
        title: 'Обложка',
        fields: [
          { key: 'chip', label: 'Метка', fallback: 'КриптоМетры · Реестр опыта' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Реестр' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'опыта.' },
          { key: 'subtitle', label: 'Подзаголовок', multiline: true, fallback: 'Каждый подтверждённый результат — это единица опыта. Она фиксирует запрос, участника, оператора, модель и дату. И может служить основанием для начисления КМ.' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Как работает ИИ' },
          { key: 'cta_primary_url', label: 'Кнопка — ссылка', fallback: '/how-ai' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Реестр КМ' },
          { key: 'bg_image', label: 'Фон обложки', type: 'image', fallback: '' },
        ],
      },
      {
        id: 'unit',
        title: 'Что такое единица опыта',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: '01 · Единица опыта' },
          { key: 'title', label: 'Заголовок', fallback: 'Результат, который остаётся.' },
          { key: 'text', label: 'Текст', multiline: true, fallback: 'Единица опыта — это структурированная запись о завершённом взаимодействии. Она создаётся каждый раз, когда запрос прошёл через контур ИИ АО КСИ и был верифицирован оператором.' },
          { key: 'field_1', label: 'Поле #1', fallback: 'Запрос' },
          { key: 'field_1_desc', label: 'Поле #1 — описание', fallback: 'Исходный запрос участника' },
          { key: 'field_2', label: 'Поле #2', fallback: 'Результат' },
          { key: 'field_2_desc', label: 'Поле #2 — описание', fallback: 'Финальный ответ или решение' },
          { key: 'field_3', label: 'Поле #3', fallback: 'Участник' },
          { key: 'field_3_desc', label: 'Поле #3 — описание', fallback: 'ID или псевдоним автора запроса' },
          { key: 'field_4', label: 'Поле #4', fallback: 'Оператор' },
          { key: 'field_4_desc', label: 'Поле #4 — описание', fallback: 'Оператор АО КСИ, верифицировавший результат' },
          { key: 'field_5', label: 'Поле #5', fallback: 'Модель' },
          { key: 'field_5_desc', label: 'Поле #5 — описание', fallback: 'ИИ-модель, обработавшая запрос' },
          { key: 'field_6', label: 'Поле #6', fallback: 'Дата' },
          { key: 'field_6_desc', label: 'Поле #6 — описание', fallback: 'Временная метка верификации' },
          { key: 'field_7', label: 'Поле #7', fallback: 'Теги' },
          { key: 'field_7_desc', label: 'Поле #7 — описание', fallback: 'Категория и тематика запроса' },
          { key: 'field_8', label: 'Поле #8', fallback: 'Качество' },
          { key: 'field_8_desc', label: 'Поле #8 — описание', fallback: 'Оценка результата от 1 до 5' },
          { key: 'field_9', label: 'Поле #9', fallback: 'Основание для КМ' },
          { key: 'field_9_desc', label: 'Поле #9 — описание', fallback: 'Есть ли основание для начисления КриптоМетров' },
        ],
      },
      {
        id: 'future',
        title: 'Будущее реестра',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: '02 · Перспектива' },
          { key: 'title', label: 'Заголовок', fallback: 'Сейчас внутри. Потом — в цепи.' },
          { key: 'text', label: 'Текст', multiline: true, fallback: 'На первом этапе реестр — внутренний. Все записи хранятся в защищённой базе КСИ. В перспективе возможна hash-фиксация каждой единицы опыта и добавление блокчейн-слоя: это сделает реестр публично верифицируемым и неизменяемым.' },
          { key: 'stage_1_title', label: 'Этап #1', fallback: 'Внутренний реестр' },
          { key: 'stage_1_text', label: 'Этап #1 — описание', fallback: 'Защищённая база данных КСИ с полным контролем качества' },
          { key: 'stage_2_title', label: 'Этап #2', fallback: 'Hash-фиксация' },
          { key: 'stage_2_text', label: 'Этап #2 — описание', fallback: 'Каждая единица опыта получает уникальный хэш — цифровой отпечаток' },
          { key: 'stage_3_title', label: 'Этап #3', fallback: 'Блокчейн-слой' },
          { key: 'stage_3_text', label: 'Этап #3 — описание', fallback: 'Публичная верификация и неизменяемость через распределённый реестр' },
        ],
      },
      {
        id: 'cta',
        title: 'Финальный призыв',
        fields: [
          { key: 'title', label: 'Заголовок CTA', fallback: 'Начни создавать свои единицы опыта.' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Получить КМ' },
          { key: 'cta_primary_url', label: 'Кнопка — ссылка', fallback: '/mining-kvartiry' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Как работает ИИ' },
          { key: 'cta_secondary_url', label: 'Кнопка вторичная — ссылка', fallback: '/how-ai' },
        ],
      },
    ],
  },
  makeInfoPage('registry-km', 'Реестр КриптоМетров', '/registry-km', 'Реестр КриптоМетров', 'Публичный реестр выпущенных и распределённых КриптоМетров.'),
  makeInfoPage('cooperative', 'Кооперативная модель', '/cooperative', 'Кооперативная модель', 'Почему КриптоМетры строятся по кооперативной логике, а не по девелоперской.'),
  makeInfoPage('roadmap', 'Дорожная карта', '/roadmap', 'Дорожная карта', 'Этапы развития проекта КриптоМетры — от запуска до первого объекта.'),
  makeInfoPage('cryptoair', 'КриптоЭфир', '/cryptoair', 'КриптоЭфир', 'КриптоЭфир — цифровой актив внутри экосистемы КриптоМетров.'),
  makeInfoPage('for-members', 'Для участников', '/for-members', 'Для участников', 'Всё, что нужно знать участнику: права, обязанности, бонусы.'),
  makeInfoPage('for-advertisers', 'Для рекламодателей', '/for-advertisers', 'Для рекламодателей', 'Форматы размещения и партнёрства в экосистеме КриптоМетров.'),
  makeInfoPage('lss', 'LSS — Служба земельного поиска', '/lss', 'LSS', 'Land Search Service — система поиска и оценки земельных участков для проектов.'),
  makeInfoPage('legal', 'Правовая модель', '/legal', 'Правовая модель', 'Юридическая структура проекта, права участников и защита интересов.'),
  makeInfoPage('faq', 'FAQ', '/faq', 'Частые вопросы', 'Ответы на самые частые вопросы об участии в КриптоМетрах.'),
];

export const CONTENT_SCHEMA: ContentPage[] = [
  {
    id: 'index',
    title: 'Главная страница',
    sections: [
      {
        id: 'hero',
        title: 'Обложка (Hero)',
        fields: [
          { key: 'chip', label: 'Метка над заголовком', fallback: 'Майнинг метров · Запуск · Май 2026' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Майним' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'недвижимость' },
          { key: 'subtitle', label: 'Подзаголовок', multiline: true, fallback: 'Архитектурная платформа для тех, кто устал переплачивать — и решил строить по уму. Входи в систему' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Получить КМ' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Что это такое' },
          { key: 'stat_1_label', label: 'Статистика #1 — подпись', fallback: 'ниже рынка' },
          { key: 'stat_2_label', label: 'Статистика #2 — подпись', fallback: 'деньги на ладони' },
          { key: 'stat_3_label', label: 'Статистика #3 — подпись', fallback: 'рассрочка 20 лет' },
          { key: 'stat_4_label', label: 'Статистика #4 — подпись', fallback: 'аккредитованы' },
        ],
      },
      {
        id: 'idea',
        title: 'Манифест / Идея',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Манифест · 01' },
          { key: 'desc', label: 'Описание справа от заголовка', multiline: true, fallback: 'Ты платишь не только за бетон и стены. В цену зашиты чужие кредиты, реклама, риски и жирная наценка. КриптоМетры разворачивают логику — не покупать в конце по полной. А входить раньше.' },
        ],
      },
      {
        id: 'system',
        title: 'Архитектура системы',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Архитектура системы · 03' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Как по-старинке.' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'Только с технологиями.' },
          { key: 'desc', label: 'Описание', multiline: true, fallback: 'Земля, профессиональный девелопер, прозрачные финансы и люди, которые заказывают — а не покупают. Четыре элемента, связанные в единый контур.' },
        ],
      },
      {
        id: 'you',
        title: 'Ключевая идея (Вы — заказчик)',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Ключевая идея · 02' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Вы не дольщик.' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'Вы — заказчик.' },
        ],
      },
      {
        id: 'money',
        title: 'Финансы / Без ипотеки',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Финансы · 07' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Без ипотечной' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'кабалы.' },
          { key: 'desc', label: 'Описание', multiline: true, fallback: 'Вместо банковской удавки — своя логика. Инструменты, которые работают на участника, а не на чужой процент.' },
          { key: 'tool_1_label', label: 'Инструмент #1', fallback: 'Рассрочка' },
          { key: 'tool_1_desc', label: 'Инструмент #1 — описание', fallback: 'Беспроцентная до 20 лет' },
          { key: 'tool_2_label', label: 'Инструмент #2', fallback: 'Накопительная' },
          { key: 'tool_2_desc', label: 'Инструмент #2 — описание', fallback: 'Программа без переплат' },
          { key: 'tool_3_label', label: 'Инструмент #3', fallback: 'Субсидии' },
          { key: 'tool_3_desc', label: 'Инструмент #3 — описание', fallback: 'Коммерческие от партнёров' },
          { key: 'tool_4_label', label: 'Инструмент #4', fallback: 'Криптотека' },
          { key: 'tool_4_desc', label: 'Инструмент #4 — описание', fallback: 'Новый инструмент входа' },
        ],
      },
      {
        id: 'mining',
        title: 'Майнинг квартиры (блок на главной)',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Программа участия · Новый раздел' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Перейти на страницу майнинга' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Начать майнить' },
        ],
      },
      {
        id: 'accreditation',
        title: 'Отбор застройщиков',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Отбор · 06' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Строят только те,' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'кто прошёл отбор.' },
          { key: 'desc', label: 'Описание', multiline: true, fallback: 'В систему допускаются только аккредитованные девелоперы и подрядчики с репутацией.' },
          { key: 'criteria_1', label: 'Критерий #1', fallback: 'Опыт и объекты' },
          { key: 'criteria_2', label: 'Критерий #2', fallback: 'Репутация' },
          { key: 'criteria_3', label: 'Критерий #3', fallback: 'Прозрачные сметы' },
          { key: 'criteria_4', label: 'Критерий #4', fallback: 'Открытый контур' },
          { key: 'criteria_5', label: 'Критерий #5', fallback: 'Цифровой контроль' },
          { key: 'criteria_6', label: 'Критерий #6', fallback: 'Ответственность' },
        ],
      },
      {
        id: 'how',
        title: 'Как это работает',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Как это работает · 08' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Шесть шагов' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'к своему жилью.' },
          { key: 'desc', label: 'Описание', multiline: true, fallback: 'Скидываемся. Покупаем землю. Нанимаем девелопера. Контролируем стройку. Принимаем результат. Живём.' },
        ],
      },
      {
        id: 'cta',
        title: 'Финальный призыв',
        fields: [
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Войди в систему' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'раньше рынка.' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Получить КМ' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Написать нам' },
        ],
      },
      {
        id: 'images',
        title: 'Изображения',
        fields: [
          { key: 'logo', label: 'Логотип в шапке', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/bucket/e42b3898-d2ef-44ff-b94f-465207ab3b2c.png' },
          { key: 'hero', label: 'Фон обложки (Hero)', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/bucket/b8c94214-dc0f-4d12-b0b0-4235830f89d7.png' },
          { key: 'resort', label: 'Курорт / посёлок (блок «Манифест»)', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/8fbb118f-f75d-4354-bd66-00ab3e981d81.jpg' },
          { key: 'quarter', label: 'Жилой квартал (блок «Архитектура»)', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/e3be1098-9720-4721-b8b8-f18dbefc328c.jpg' },
          { key: 'facade', label: 'Фасад дома (блок «Вы — заказчик»)', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/275e2561-0665-4b11-a4fd-cd25607e8026.jpg' },
          { key: 'courtyard', label: 'Двор (блок «Финансы»)', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/b93a50ee-e6ce-45db-94d9-0897ae028c7b.jpg' },
          { key: 'aerial', label: 'Аэрофото (блок «Майнинг»)', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/d4c1c38f-bf46-4eb1-a5a1-9e0187887e75.jpg' },
          { key: 'interior', label: 'Интерьер (блок «Как работает»)', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/f1e60bd7-338c-4fc2-92c1-22c9c49a1025.jpg' },
          { key: 'village', label: 'Деревня (блок «Отбор»)', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/ff379895-1c9b-4d90-a62a-f4abcc281fe2.jpg' },
          { key: 'site', label: 'Стройплощадка (FAQ / Финал)', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/b7c8f3e7-b3ae-4074-baf6-76e997048aef.jpg' },
        ],
      },
    ],
  },
  {
    id: 'mining',
    title: 'Страница «Майнинг квартиры»',
    sections: [
      {
        id: 'hero',
        title: 'Обложка (Hero)',
        fields: [
          { key: 'chip', label: 'Метка над заголовком', fallback: 'Экосистема КриптоМетр · Программа участия' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Майнинг' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'квартиры' },
          { key: 'subtitle', label: 'Подзаголовок', multiline: true, fallback: 'Майни свой путь к будущему жилью уже сегодня. Участие, задания, фидбек — всё это конвертируется в КМ и двигает тебя к цели.' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Начать майнить' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Заполнить анкету квартиры' },
        ],
      },
      {
        id: 'how',
        title: 'Как это работает',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Как это работает · 01' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Три шага —' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'одна система.' },
        ],
      },
      {
        id: 'tasks',
        title: 'Начисления (задания)',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Начисления · 03' },
          { key: 'task_1_label', label: 'Задание #1', fallback: 'Регистрация' },
          { key: 'task_1_value', label: 'Задание #1 — значение', fallback: 'до 0,10 КМ' },
          { key: 'task_2_label', label: 'Задание #2', fallback: 'Подробная анкета' },
          { key: 'task_2_value', label: 'Задание #2 — значение', fallback: 'до 0,25 КМ' },
          { key: 'task_3_label', label: 'Задание #3', fallback: 'Полный диалог с системой' },
          { key: 'task_3_value', label: 'Задание #3 — значение', fallback: 'до 0,25 КМ' },
          { key: 'task_4_label', label: 'Задание #4', fallback: 'Подписка на канал' },
          { key: 'task_4_value', label: 'Задание #4 — значение', fallback: '0,01 КМ' },
          { key: 'cta_primary', label: 'Кнопка под начислениями', fallback: 'Заполнить анкету квартиры' },
        ],
      },
      {
        id: 'levels',
        title: 'Уровни пути',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Уровни пути · 05' },
          { key: 'level_1_name', label: 'Уровень #1', fallback: 'Старт' },
          { key: 'level_1_desc', label: 'Уровень #1 — описание', fallback: 'Первые шаги в системе' },
          { key: 'level_2_name', label: 'Уровень #2', fallback: 'Профиль спроса' },
          { key: 'level_2_desc', label: 'Уровень #2 — описание', fallback: 'Система узнаёт тебя' },
          { key: 'level_3_name', label: 'Уровень #3', fallback: 'Подтверждённый участник' },
          { key: 'level_3_desc', label: 'Уровень #3 — описание', fallback: 'Твой вклад виден' },
          { key: 'level_4_name', label: 'Уровень #4', fallback: 'Ядро спроса' },
          { key: 'level_4_desc', label: 'Уровень #4 — описание', fallback: 'Формируешь будущие проекты' },
          { key: 'level_5_name', label: 'Уровень #5', fallback: 'Следующий контур' },
          { key: 'level_5_desc', label: 'Уровень #5 — описание', fallback: 'Право перейти дальше' },
        ],
      },
      {
        id: 'contour',
        title: 'Следующий контур (после 100 КМ)',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'После 100 КМ · 06' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Переход' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'на следующий контур.' },
          { key: 'rule', label: 'Главное правило', multiline: true, fallback: 'Каждый намайненный КМ открывает право внести до 1 КМ целевого взноса.' },
        ],
      },
      {
        id: 'final',
        title: 'Финальный призыв',
        fields: [
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Начните майнить' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'свою квартиру' },
          { key: 'title_3', label: 'Заголовок — строка 3', fallback: 'уже сегодня.' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Начать майнить' },
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Заполнить анкету квартиры' },
        ],
      },
      {
        id: 'images',
        title: 'Изображения',
        fields: [
          { key: 'hero_bg', label: 'Фон обложки (Hero)', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/d4c1c38f-bf46-4eb1-a5a1-9e0187887e75.jpg' },
          { key: 'side_bg', label: 'Фон секции «После 100 КМ»', type: 'image', fallback: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/f1e60bd7-338c-4fc2-92c1-22c9c49a1025.jpg' },
        ],
      },
    ],
  },
];