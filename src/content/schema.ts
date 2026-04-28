export type ContentField = {
  key: string;
  label: string;
  multiline?: boolean;
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
          { key: 'cta_secondary', label: 'Кнопка — вторичная', fallback: 'Как это работает' },
        ],
      },
      {
        id: 'idea',
        title: 'Блок «Идея»',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Манифест · 01' },
        ],
      },
      {
        id: 'how',
        title: 'Блок «Как это работает»',
        fields: [
          { key: 'kicker', label: 'Надзаголовок', fallback: 'Как это работает · 08' },
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Шесть шагов' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'к своему жилью.' },
        ],
      },
      {
        id: 'cta',
        title: 'Финальный призыв',
        fields: [
          { key: 'title', label: 'Заголовок', multiline: true, fallback: 'Стань первым.' },
          { key: 'desc', label: 'Описание', multiline: true, fallback: 'Получи стартовый пакет КМ и забронируй место в первом квартале.' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Оставить заявку' },
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
          { key: 'subtitle', label: 'Подзаголовок', multiline: true, fallback: 'Программа, которая превращает твою активность в реальные метры жилья.' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Начать майнить' },
        ],
      },
      {
        id: 'final',
        title: 'Финальный призыв',
        fields: [
          { key: 'title_1', label: 'Заголовок — строка 1', fallback: 'Начните майнить' },
          { key: 'title_2', label: 'Заголовок — строка 2 (акцент)', fallback: 'свою квартиру' },
          { key: 'title_3', label: 'Заголовок — строка 3', fallback: 'уже сегодня.' },
          { key: 'cta_primary', label: 'Кнопка — главная', fallback: 'Оставить заявку' },
        ],
      },
    ],
  },
];