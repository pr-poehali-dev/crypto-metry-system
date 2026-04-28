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