import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const IMG = {
  hero:         'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/939bf158-8c5c-4537-a627-3dde0a668a67.jpg',
  family:       'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/8da1fb4b-1f5b-43bd-b575-1cb685a4559b.jpg',
  facade:       'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/4ef15db0-f71b-48b6-9dc1-4ec6ecd3215e.jpg',
  interior:     'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/b766f1e4-a092-485c-bc5d-de43c887b537.jpg',
  people:       'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/9bccae58-7e24-4954-9a88-cafac7295442.jpg',
  drone:        'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/ece81cb5-b93c-45d8-a492-abb6edf6ea0f.jpg',
  district:     'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/841a898e-bf89-4aa5-b069-25c9e0233c37.jpg',
  complex:      'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/8256c94c-8ef3-4db7-8d5f-195bc03671ef.jpg',
  construction: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/65fd4b2c-c552-449f-8152-13624dee3b44.jpg',
  couple:       'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/daa465db-44b8-401e-b607-3c0266d01b09.jpg',
};

const nav = [
  { id: 'idea',   label: 'Идея' },
  { id: 'system', label: 'Система' },
  { id: 'you',    label: 'Участнику' },
  { id: 'money',  label: 'Финансы' },
  { id: 'how',    label: 'Как работает' },
  { id: 'join',   label: 'Вступить' },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scroll = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-lg border-b border-border/60">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-18 py-3 flex items-center justify-between">
          <button onClick={() => scroll('hero')} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-foreground text-background flex items-center justify-center serif font-black">К</div>
            <div className="flex flex-col items-start leading-tight">
              <span className="serif text-lg font-black tracking-tight">КриптоМетры</span>
              <span className="text-[10px] text-muted-foreground sans tracking-widest uppercase">народная платформа жилья</span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map(n => (
              <button
                key={n.id}
                onClick={() => scroll(n.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors sans"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              className="bg-foreground hover:bg-foreground/90 text-background sans font-semibold h-10 px-5"
              onClick={() => scroll('join')}
            >
              Получить КМ
              <Icon name="ArrowRight" size={15} className="ml-2" />
            </Button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMenuOpen(v => !v)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-white px-6 py-5 flex flex-col gap-4">
            {nav.map(n => (
              <button key={n.id} onClick={() => scroll(n.id)} className="text-left text-base font-medium sans py-1">
                {n.label}
              </button>
            ))}
            <Button className="bg-foreground text-background w-full sans mt-2" onClick={() => scroll('join')}>
              Получить КМ
            </Button>
          </div>
        )}
      </header>

      {/* HERO — полноэкранный */}
      <section id="hero" className="relative h-screen min-h-[720px] overflow-hidden">
        <div className="absolute inset-0 img-overlay">
          <img src={IMG.hero} alt="Жилой квартал" className="w-full h-full object-cover scale-105" />
        </div>

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-36 pt-28">
          <div className="max-w-4xl animate-fade-up">
            <span className="chip mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Открытие первых программ — Май 2026
            </span>

            <h1 className="display text-white text-[13vw] sm:text-[10vw] lg:text-[8.5rem] mb-8">
              Майним<br />
              <span className="italic">недвижимость</span>
            </h1>

            <p className="text-white/85 text-xl lg:text-2xl max-w-2xl leading-relaxed mb-10 sans font-light">
              Устал переплачивать — и решил строить по уму.
              Зайди в систему <em className="italic">раньше рынка</em>, объединись с другими,
              получи жильё как <span className="font-semibold">будущий заказчик</span>.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-foreground sans font-semibold text-base px-10 h-14"
                onClick={() => scroll('join')}
              >
                Получить КМ
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 sans font-semibold text-base px-10 h-14 bg-transparent"
                onClick={() => scroll('idea')}
              >
                Что это такое
              </Button>
            </div>
          </div>
        </div>

        {/* нижняя полоса с цифрами */}
        <div className="absolute bottom-0 inset-x-0 z-10 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 grid grid-cols-3 divide-x divide-border">
            {[
              { val: 'до 30%', sub: 'ниже рынка',          icon: 'TrendingDown' },
              { val: '24/7',   sub: 'деньги на ладони',    icon: 'Eye' },
              { val: '0%',     sub: 'рассрочка до 20 лет', icon: 'Unlock' },
            ].map(s => (
              <div key={s.val} className="px-4 sm:px-6 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center shrink-0">
                  <Icon name={s.icon} size={18} className="text-accent" />
                </div>
                <div>
                  <p className="serif text-xl sm:text-3xl font-black leading-none">{s.val}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground sans mt-1">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ТИКЕР */}
      <div className="bg-foreground text-background py-5 overflow-hidden">
        <div className="marquee-track">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-12 items-center shrink-0">
              {[
                'Вы не дольщик — Вы заказчик',
                'Когда девелопмент становится системой',
                'Все деньги на ладони',
                'Без ипотечной кабалы',
                'Народный путь к своему жилью',
                'Приедь на стройку сам',
                'Платим за работу — не за обещания',
              ].map(t => (
                <span key={t + k} className="flex items-center gap-12 serif text-xl italic whitespace-nowrap">
                  {t}
                  <span className="w-2 h-2 bg-accent rounded-full shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* МАНИФЕСТ */}
      <section className="py-28 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="hover-scale-img relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl">
              <img src={IMG.family} alt="Семья у дома" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <p className="kicker mb-6">Манифест</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-7xl mb-10">
              Когда обычная квартира <span className="italic">слишком дорогая</span>, появляется другая модель.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed sans mb-8 max-w-2xl">
              Ты платишь не только за бетон и стены. В цену зашиты чужие кредиты,
              реклама, риски и жирная наценка. КриптоМетры — попытка развернуть логику.
              Не покупать в конце по полной. <span className="text-foreground font-semibold">А входить раньше.</span>
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              {[
                { val: '1', t: 'Объединяемся' },
                { val: '2', t: 'Покупаем землю' },
                { val: '3', t: 'Строим под себя' },
              ].map(item => (
                <div key={item.val}>
                  <p className="serif text-5xl font-black text-accent leading-none mb-3">{item.val}</p>
                  <p className="sans font-semibold text-base">{item.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ИДЕЯ — ВЫ ЗАКАЗЧИК */}
      <section id="idea" className="py-28 px-6 lg:px-10 section-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <p className="kicker mb-6">Ключевая идея</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-7xl">
                Вы не дольщик.<br />Вы — <span className="italic">заказчик</span>.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-lg text-muted-foreground leading-relaxed sans">
                Дольщику продают то, что уже решили построить без него. Пайщик входит
                раньше и участвует в системе как человек, под которого создаётся проект.
                Мы возвращаем человеку роль заказчика.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative bg-white rounded-2xl p-10 overflow-hidden">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="UserX" size={22} className="text-muted-foreground" />
                </div>
                <span className="kicker" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Старая модель
                </span>
              </div>
              <h3 className="serif text-3xl font-black mb-6">Дольщик</h3>
              <ul className="space-y-4">
                {[
                  'Приходит последним — по полной цене',
                  'Молчит и подписывает то, что принесли',
                  'Не видит, куда идут деньги',
                  'Остаётся один на один с рисками',
                ].map(t => (
                  <li key={t} className="flex items-start gap-3 text-base text-muted-foreground">
                    <Icon name="X" size={16} className="text-red-400 mt-1 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative bg-foreground text-background rounded-2xl p-10 overflow-hidden">
              <div className="absolute -right-10 -top-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="UserCheck" size={22} className="text-white" />
                </div>
                <span className="kicker">Новая модель</span>
              </div>
              <h3 className="serif text-3xl font-black mb-6 relative">Заказчик-пайщик</h3>
              <ul className="space-y-4 relative">
                {[
                  'Входит раньше рынка — до наценки',
                  'Влияет и контролирует процесс',
                  'Видит каждый рубль 24/7',
                  'Идёт к своему жилью по другой логике',
                ].map(t => (
                  <li key={t} className="flex items-start gap-3 text-base text-white/90">
                    <Icon name="Check" size={16} className="text-accent mt-1 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* БОЛЬШОЕ ФОТО */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <div className="absolute inset-0 img-overlay-soft">
          <img src={IMG.drone} alt="Жилой квартал сверху" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-end pb-16">
          <div className="text-white max-w-2xl">
            <p className="chip mb-6">Город</p>
            <h3 className="display text-4xl sm:text-5xl lg:text-6xl mb-4">
              Не один дом. <span className="italic">Целые кварталы.</span>
            </h3>
            <p className="text-lg text-white/80 sans max-w-xl">
              Это не очередной объект застройщика. Это платформа, через которую люди строят для себя — вместе.
            </p>
          </div>
        </div>
      </section>

      {/* СИСТЕМА */}
      <section id="system" className="py-28 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-7">
              <p className="kicker mb-6">Как устроена система</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-7xl">
                Как по-старинке.<br /><span className="italic">Только с технологиями.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 flex items-end">
              <p className="text-lg text-muted-foreground leading-relaxed sans">
                Земля, профессиональный девелопер, прозрачные финансы и люди, которые заказывают — а не покупают.
                Каждый элемент системы работает на участника.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', label: 'Земля',     sub: 'Основа проекта',               text: 'Базовый актив системы. Не повод для перепродажи и спекуляции.', img: IMG.drone },
              { n: '02', label: 'Девелопер', sub: 'Профессионал, не носитель риска', text: 'Строит — не тонет в кредитах. Работает по fee-модели без лишней нагрузки.', img: IMG.construction },
              { n: '03', label: 'Финансы',   sub: 'Кристально публично',          text: 'Все движения денег, этапы, документы и события видны участникам.', img: IMG.facade },
              { n: '04', label: 'Участники', sub: 'Будущие заказчики',            text: 'Не дольщики. Не покупатели. Люди, под которых создаётся проект.', img: IMG.people },
            ].map(card => (
              <div key={card.n} className="hover-scale-img group relative rounded-2xl overflow-hidden bg-foreground aspect-[3/4]">
                <img src={card.img} alt={card.label} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/0" />
                <div className="relative z-10 p-7 h-full flex flex-col justify-between text-white">
                  <span className="serif text-4xl font-black text-white/30">{card.n}</span>
                  <div>
                    <p className="kicker !text-accent mb-2">{card.sub}</p>
                    <h3 className="serif text-3xl font-black mb-3">{card.label}</h3>
                    <p className="text-sm text-white/80 leading-relaxed sans">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-secondary rounded-2xl px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Icon name="Lightbulb" size={32} className="text-accent shrink-0" />
            <p className="sans text-lg leading-relaxed flex-1">
              Если девелопмент можно собрать как систему — рынок меняется.{' '}
              <span className="text-muted-foreground">Если нет — публично покажем, где и почему он ломается.</span>
            </p>
          </div>
        </div>
      </section>

      {/* УЧАСТНИКУ */}
      <section id="you" className="py-28 px-6 lg:px-10 section-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="kicker mb-6">Что получает участник</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-7xl max-w-3xl">
              Шесть причин<br />войти <span className="italic">раньше других</span>.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/12] hover-scale-img">
              <img src={IMG.interior} alt="Интерьер" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="chip mb-4">Дом, в котором удобно жить</p>
                <h3 className="serif text-4xl font-black mb-3">Платим за работу. <span className="italic">Не за обещания.</span></h3>
                <p className="text-white/80 sans max-w-xl">Реальный результат, который можно увидеть и потрогать. Реальные квадратные метры, а не красивый рендер в буклете.</p>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-5">
              {[
                { icon: 'BadgePercent', title: 'Не переплачивает',          desc: 'Банки, реклама, лишние прокладки — мимо.' },
                { icon: 'HardHat',      title: 'Может приехать на стройку', desc: 'Своими глазами увидеть, как идут работы.' },
                { icon: 'Smartphone',   title: 'Все деньги на ладони',      desc: 'Каждый рубль системы виден 24/7.' },
              ].map(b => (
                <div key={b.title} className="bg-white rounded-2xl p-6 card-lift flex gap-5 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon name={b.icon} size={22} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="sans font-bold text-base mb-1.5">{b.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 mt-5">
            {[
              { icon: 'Vote',         title: 'Имеет право влиять',   desc: 'Не сидит молча, пока всё решили без него.' },
              { icon: 'CheckCircle',  title: 'Реальный контроль',    desc: 'Открытый контур и цифровой журнал событий.' },
              { icon: 'Unlock',       title: 'Без ипотечной кабалы', desc: 'Беспроцентная рассрочка до 20 лет. Своя логика.' },
            ].map(b => (
              <div key={b.title} className="bg-white rounded-2xl p-7 card-lift">
                <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center mb-5">
                  <Icon name={b.icon} size={22} className="text-background" />
                </div>
                <h4 className="sans font-bold text-lg mb-2">{b.title}</h4>
                <p className="text-base text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОЗРАЧНОСТЬ */}
      <section className="relative">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[500px] lg:min-h-[700px]">
            <img src={IMG.couple} alt="Пара у новостройки" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="bg-foreground text-background px-6 lg:px-16 py-20 flex flex-col justify-center">
            <p className="kicker !text-accent mb-6">Прозрачность</p>
            <h2 className="display text-white text-5xl lg:text-7xl mb-8">
              Все деньги<br /><span className="italic">на ладони.</span>
            </h2>
            <p className="text-white/70 text-xl leading-relaxed sans mb-10 max-w-lg">
              Кристально публично. Все деньги системы — у тебя в смартфоне 24/7.
            </p>

            <div className="space-y-0 mb-10 max-w-lg">
              {[
                { icon: 'DollarSign', text: 'Сколько собрано и сколько на счёте' },
                { icon: 'ArrowRight', text: 'Куда ушёл каждый платёж' },
                { icon: 'Building2',  text: 'Что строится и что в резерве' },
                { icon: 'Lock',       text: 'Шифрование и цифровой журнал действий' },
                { icon: 'Link',       text: 'Блокчейн-фиксация ключевых событий' },
                { icon: 'Bot',        text: 'ИИ-контроль движения средств' },
              ].map(row => (
                <div key={row.text} className="flex items-center gap-4 py-4 border-b border-white/10 last:border-0">
                  <Icon name={row.icon} size={18} className="text-accent shrink-0" />
                  <span className="sans text-white/90">{row.text}</span>
                </div>
              ))}
            </div>

            <div className="border-l-2 border-accent pl-5">
              <p className="serif text-2xl italic text-white">«Не доверяйте нам. Смотрите сами.»</p>
            </div>
          </div>
        </div>
      </section>

      {/* ФИНАНСЫ */}
      <section id="money" className="py-28 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-6">
              <p className="kicker mb-6">Финансы</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-7xl">
                Без ипотечной<br /><span className="italic">кабалы.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-lg text-muted-foreground sans leading-relaxed">
                Вместо банковской удавки — своя логика.
                Инструменты, которые работают на участника, а не на чужой процент.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { icon: 'Calendar',  label: 'Рассрочка',     sub: 'Беспроцентная до 20 лет' },
              { icon: 'PiggyBank', label: 'Накопительная', sub: 'Программа без переплат' },
              { icon: 'Handshake', label: 'Субсидии',      sub: 'Коммерческие от партнёров' },
              { icon: 'Layers',    label: 'Криптотека',    sub: 'Новый инструмент входа' },
            ].map(c => (
              <div key={c.label} className="bg-secondary rounded-2xl p-8 card-lift">
                <div className="w-14 h-14 bg-foreground rounded-full flex items-center justify-center mb-6">
                  <Icon name={c.icon} size={24} className="text-background" />
                </div>
                <p className="sans font-bold text-lg mb-1.5">{c.label}</p>
                <p className="text-sm text-muted-foreground">{c.sub}</p>
              </div>
            ))}
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            <img src={IMG.complex} alt="ЖК" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/92" />
            <div className="relative z-10 text-background p-10 lg:p-14 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="kicker !text-accent mb-6">Пример на цифрах</p>
                <h3 className="display text-4xl lg:text-5xl text-white mb-6">
                  Как рынок <span className="italic">съедает</span> ваши деньги
                </h3>
                <p className="text-white/60 text-base sans mb-8">
                  Квартира за 10 млн на рынке. Из чего состоит цена:
                </p>
                <ul className="space-y-3">
                  {['Дорогая земля', 'Банковские проценты застройщика', 'Реклама и продажи', 'Девелоперская прибыль', 'Ипотека сверху — годы обязательств'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/70 sans">
                      <span className="text-red-400 font-bold text-lg">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="bg-white rounded-2xl p-10 text-foreground shadow-2xl">
                  <p className="kicker mb-4">Через КриптоМетры</p>
                  <p className="number-xxl text-accent mb-4">−30%</p>
                  <p className="sans text-muted-foreground leading-relaxed mb-4">
                    Цель системы — дать участнику путь к жилью до 30% ниже рынка за счёт другой модели входа,
                    накопления, контроля и организации.
                  </p>
                  <p className="text-xs text-muted-foreground/70 sans border-t border-border pt-4">
                    Модельный пример, не обещание фиксированной цены. Условия зависят от проекта и программы.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ШАГИ */}
      <section id="how" className="py-28 px-6 lg:px-10 section-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16 max-w-3xl">
            <p className="kicker mb-6">Как это работает</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-7xl mb-6">
              Шесть шагов<br /><span className="italic">к своему жилью.</span>
            </h2>
            <p className="text-lg text-muted-foreground sans leading-relaxed">
              Скидываемся. Покупаем землю. Нанимаем девелопера. Контролируем стройку. Принимаем результат. Живём.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { n: '01', title: 'Покупаешь КМ',          desc: 'И входишь в систему как будущий участник. Цифровой ключ системы.' },
              { n: '02', title: 'Получаешь доступ',      desc: 'К закрытому контуру, карте проектов и личному кабинету.' },
              { n: '03', title: 'Следишь за площадками', desc: 'Выбираешь, куда тебе реально интересно зайти.' },
              { n: '04', title: 'Открывается программа', desc: 'По проекту — получаешь доступ по правилам системы.' },
              { n: '05', title: 'Движешься к жилью',     desc: 'Как будущий пайщик, а не запоздавший покупатель.' },
              { n: '06', title: 'Если планы изменились', desc: 'КМ всё равно даёт выгоду у партнёров при покупке обычной квартиры.' },
            ].map((s, i) => (
              <div key={s.n} className="bg-white rounded-2xl px-8 py-7 shadow-sm flex items-center gap-8 card-lift group">
                <span className="serif text-5xl sm:text-6xl font-black text-border/60 leading-none w-16 shrink-0 group-hover:text-accent transition-colors">{s.n}</span>
                <div className="flex-1">
                  <h3 className="sans font-bold text-xl mb-1">{s.title}</h3>
                  <p className="text-base text-muted-foreground">{s.desc}</p>
                </div>
                <Icon name={i === 5 ? 'Flag' : 'ArrowRight'} size={22} className="text-muted-foreground shrink-0 hidden md:block group-hover:text-accent transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАЧЕСТВО + ДВА ПУТИ */}
      <section className="py-28 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-10">
          <div className="relative rounded-2xl overflow-hidden min-h-[500px]">
            <img src={IMG.people} alt="Команда" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/50 to-transparent" />
            <div className="relative z-10 p-10 h-full flex flex-col justify-end text-white">
              <p className="kicker mb-5">Отбор</p>
              <h3 className="display text-4xl lg:text-5xl mb-6">
                Строят только те,<br /><span className="italic">кто прошёл отбор.</span>
              </h3>
              <p className="text-white/80 sans mb-6 max-w-lg">
                В систему допускаются только аккредитованные девелоперы и подрядчики.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-lg">
                {[
                  'Опыт и объекты',
                  'Репутация',
                  'Прозрачные сметы',
                  'Открытый контур',
                  'Цифровой контроль',
                  'Ответственность',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/90 sans">
                    <Icon name="Check" size={14} className="text-accent shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-secondary rounded-2xl p-10">
              <p className="kicker mb-5">Два пути одного КМ</p>
              <h3 className="serif text-4xl font-black mb-8">Выбирай, как<br />двигаться.</h3>
              <div className="space-y-5">
                <div className="bg-white rounded-xl p-6 border-l-4 border-accent">
                  <p className="sans font-bold text-lg mb-2">Народный путь</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Идёшь к своей квартире через кооперативную логику. Входишь раньше. Платишь меньше. Контролируешь сам.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 border-l-4 border-foreground/20">
                  <p className="sans font-bold text-lg mb-2">Классический путь</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Хочешь купить сейчас? Получи специальные условия у партнёров системы. КМ всё равно работает в плюс.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-foreground text-background rounded-2xl p-10">
              <div className="flex items-start gap-5">
                <Icon name="Sparkles" size={28} className="text-accent shrink-0" />
                <div>
                  <h3 className="serif text-3xl font-black mb-2">Майним через участие</h3>
                  <p className="text-white/70 sans leading-relaxed">
                    Система растёт на людях, охвате и рекомендациях. Участвуешь — растишь свой путь к квартире.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="relative py-32 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 img-overlay">
          <img src={IMG.district} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto text-center text-white">
          <span className="chip mb-8">
            <Icon name="AlertCircle" size={14} className="text-accent" />
            Система в стадии тестирования • Не является офертой
          </span>

          <h2 className="display text-6xl sm:text-7xl lg:text-9xl mb-8">
            Войди в систему<br /><span className="italic">раньше рынка.</span>
          </h2>

          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed mb-12 sans">
            КМ — цифровой ключ системы. Вход в контур будущего пайщика.
            Место в очереди, которая движется по другой логике.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white sans font-bold text-base px-12 h-16">
              Получить КМ
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent sans font-semibold text-base px-12 h-16">
              Написать нам
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-white/60 sans flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Открытие первых программ — Май 2026
            </div>
            <span className="hidden sm:inline">•</span>
            <div>Москва и регионы пилотных запусков</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-16 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-accent flex items-center justify-center serif font-black text-white">К</div>
                <div>
                  <p className="serif text-xl font-black">КриптоМетры</p>
                  <p className="text-[10px] text-white/50 sans tracking-widest uppercase">народная платформа жилья</p>
                </div>
              </div>
              <p className="text-white/60 text-sm sans max-w-md leading-relaxed">
                Вы не дольщик. Вы — заказчик. Народная система, через которую можно реально идти к своей квартире по другой логике.
              </p>
            </div>
            <div>
              <p className="kicker !text-white/40 mb-4">Разделы</p>
              <div className="flex flex-col gap-3">
                {nav.map(n => (
                  <button key={n.id} onClick={() => scroll(n.id)} className="text-left text-sm text-white/70 hover:text-white transition-colors sans">
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="kicker !text-white/40 mb-4">Контакты</p>
              <div className="flex flex-col gap-3 text-sm text-white/70 sans">
                <span>hello@cryptometers.ru</span>
                <span>Москва</span>
                <span>Telegram-канал</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/40 text-xs sans">© 2026 КриптоМетры. Все права защищены.</p>
            <p className="text-white/40 text-xs sans">Система в стадии тестирования. Не является публичной офертой.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
