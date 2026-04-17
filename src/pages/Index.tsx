import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const LOGO = 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/bucket/e42b3898-d2ef-44ff-b94f-465207ab3b2c.png';

const IMG = {
  hero:         'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/5c0dd528-7c93-496e-ba0e-0b2819fffdf3.jpg',
  heroAlt:      'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/3777d51d-6f35-49fe-b01c-7405b7969b9a.jpg',
  facade:       'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/69b330c1-3d3a-4d4d-b57f-f04577aef5f3.jpg',
  courtyard:    'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/a1e9741a-b47b-4051-b444-8f8d230dce2e.jpg',
  interior:     'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/c1d78dc4-4016-4a88-ae41-cbf78c95d653.jpg',
  construction: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/30dedd12-75b7-4cd5-afde-1343d43091ed.jpg',
  family:       'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/8da1fb4b-1f5b-43bd-b575-1cb685a4559b.jpg',
  people:       'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/9bccae58-7e24-4954-9a88-cafac7295442.jpg',
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 glass-lite border-b border-border/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-18 py-3 flex items-center justify-between">
          <button onClick={() => scroll('hero')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 rounded-lg bg-[hsl(var(--neon))]/10 blur-md group-hover:bg-[hsl(var(--neon))]/30 transition-all" />
              <img src={LOGO} alt="КриптоМетры" className="relative w-10 h-10 object-contain" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="serif text-lg font-black tracking-tight text-white">
                Крипто<span className="neon-text">Метры</span>
              </span>
              <span className="text-[10px] text-muted-foreground sans tracking-widest uppercase">народная платформа жилья</span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map(n => (
              <button
                key={n.id}
                onClick={() => scroll(n.id)}
                className="text-sm text-muted-foreground hover:text-[hsl(var(--neon))] transition-colors sans"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              className="btn-neon sans font-semibold h-10 px-5 rounded-md"
              onClick={() => scroll('join')}
            >
              Получить КМ
              <Icon name="ArrowRight" size={15} className="ml-2" />
            </Button>
          </div>

          <button className="lg:hidden p-2 text-white" onClick={() => setMenuOpen(v => !v)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border glass px-6 py-5 flex flex-col gap-4">
            {nav.map(n => (
              <button key={n.id} onClick={() => scroll(n.id)} className="text-left text-base font-medium sans py-1 text-white">
                {n.label}
              </button>
            ))}
            <Button className="btn-neon w-full sans mt-2" onClick={() => scroll('join')}>
              Получить КМ
            </Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative h-screen min-h-[760px] overflow-hidden">
        <div className="absolute inset-0 img-overlay-hero">
          <img src={IMG.hero} alt="Квартал" className="w-full h-full object-cover scale-105" />
        </div>

        {/* floating glow orbs */}
        <div className="glow-orb w-[500px] h-[500px] top-20 -left-40 animate-glow-pulse" />
        <div className="glow-orb w-[400px] h-[400px] bottom-20 right-10 animate-glow-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-40 pt-28">
          <div className="max-w-4xl animate-fade-up">
            <span className="chip mb-8">
              <span className="w-1.5 h-1.5 bg-[hsl(var(--neon))] rounded-full animate-pulse shadow-[0_0_12px_hsl(var(--neon))]" />
              Майнинг метров • Запуск Май 2026
            </span>

            <h1 className="display text-[12vw] sm:text-[9vw] lg:text-[9rem] mb-8 neon-gradient-text">
              Майним<br />
              <span className="italic-neon serif">недвижимость</span>
            </h1>

            <p className="text-white/80 text-xl lg:text-2xl max-w-2xl leading-relaxed mb-12 sans font-light">
              Устал переплачивать — и решил строить по уму.
              Зайди в систему <em className="italic-neon not-italic font-medium">раньше рынка</em>, объединись с другими,
              получи жильё как <span className="text-white font-semibold">будущий заказчик</span>.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="btn-neon sans font-semibold text-base px-10 h-14 rounded-md"
                onClick={() => scroll('join')}
              >
                Получить КМ
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
              <Button
                size="lg"
                className="btn-ghost sans font-semibold text-base px-10 h-14 rounded-md"
                onClick={() => scroll('idea')}
              >
                <Icon name="PlayCircle" size={18} className="mr-2" />
                Что это такое
              </Button>
            </div>
          </div>
        </div>

        {/* нижняя neon-полоса со статистикой */}
        <div className="absolute bottom-0 inset-x-0 z-10 border-t border-[hsl(var(--neon))]/20 glass">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 grid grid-cols-3 divide-x divide-white/10">
            {[
              { val: 'до 30%', sub: 'ниже рынка',          icon: 'TrendingDown' },
              { val: '24/7',   sub: 'деньги на ладони',    icon: 'Eye' },
              { val: '0%',     sub: 'рассрочка 20 лет',    icon: 'Unlock' },
            ].map(s => (
              <div key={s.val} className="px-4 sm:px-6 flex items-center gap-3 sm:gap-4">
                <div className="w-11 h-11 rounded-full bg-[hsl(var(--neon))]/10 flex items-center justify-center shrink-0 border border-[hsl(var(--neon))]/30 shadow-[0_0_20px_hsl(var(--neon)/0.25)]">
                  <Icon name={s.icon} size={18} className="text-[hsl(var(--neon))]" />
                </div>
                <div>
                  <p className="serif text-2xl sm:text-3xl font-black leading-none neon-gradient-text">{s.val}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground sans mt-1 uppercase tracking-widest">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ТИКЕР */}
      <div className="relative bg-[hsl(var(--neon))] text-black py-5 overflow-hidden">
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
                  <span className="w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* МАНИФЕСТ */}
      <section className="relative py-28 px-6 lg:px-10 grid-bg-fade">
        <div className="glow-orb w-[600px] h-[600px] top-20 right-[-10%] opacity-70" />

        <div className="relative max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 animate-fade-up">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] hover-scale-img">
              <img src={IMG.courtyard} alt="Двор" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />
              <div className="absolute top-6 left-6 chip">
                <Icon name="Sparkles" size={12} />
                Живой квартал
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="serif italic text-xl">«Где хочется жить,<br />а не просто существовать»</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10 animate-fade-up-1">
            <p className="kicker mb-6">Манифест</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-7xl mb-10 text-white">
              Когда обычная квартира <span className="italic-neon">слишком дорогая</span>, появляется <span className="italic text-white/90">другая модель</span>.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed sans mb-8 max-w-2xl">
              Ты платишь не только за бетон и стены. В цену зашиты чужие кредиты,
              реклама, риски и жирная наценка. КриптоМетры — попытка развернуть логику.
              Не покупать в конце по полной. <span className="text-white font-semibold">А входить раньше.</span>
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              {[
                { val: '01', t: 'Объединяемся' },
                { val: '02', t: 'Покупаем землю' },
                { val: '03', t: 'Строим под себя' },
              ].map(item => (
                <div key={item.val}>
                  <p className="serif italic text-6xl font-black leading-none mb-3 neon-text">{item.val}</p>
                  <p className="sans font-semibold text-base text-white">{item.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ИДЕЯ — ВЫ ЗАКАЗЧИК */}
      <section id="idea" className="relative py-28 px-6 lg:px-10 section-mid">
        <div className="glow-orb w-[500px] h-[500px] bottom-0 left-[-10%]" />

        <div className="relative max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <p className="kicker mb-6">Ключевая идея</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-7xl text-white">
                Вы не дольщик.<br />Вы — <span className="italic-neon">заказчик</span>.
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
            {/* Dолщик */}
            <div className="relative rounded-2xl p-10 overflow-hidden glass">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <Icon name="UserX" size={22} className="text-muted-foreground" />
                </div>
                <span className="kicker text-muted-foreground" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Старая модель
                </span>
              </div>
              <h3 className="serif text-4xl font-black mb-6 text-white/80">Дольщик</h3>
              <ul className="space-y-4">
                {[
                  'Приходит последним — по полной цене',
                  'Молчит и подписывает то, что принесли',
                  'Не видит, куда идут деньги',
                  'Остаётся один на один с рисками',
                ].map(t => (
                  <li key={t} className="flex items-start gap-3 text-base text-muted-foreground">
                    <Icon name="X" size={16} className="text-red-400/70 mt-1 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Заказчик */}
            <div className="relative rounded-2xl p-10 overflow-hidden card-neon">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-[hsl(var(--neon))]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[hsl(var(--neon))] rounded-full flex items-center justify-center shadow-[0_0_24px_hsl(var(--neon)/0.5)]">
                  <Icon name="UserCheck" size={22} className="text-black" />
                </div>
                <span className="kicker">Новая модель</span>
              </div>
              <h3 className="serif text-4xl font-black mb-6 relative text-white">
                Заказчик<span className="italic-neon">-пайщик</span>
              </h3>
              <ul className="space-y-4 relative">
                {[
                  'Входит раньше рынка — до наценки',
                  'Влияет и контролирует процесс',
                  'Видит каждый рубль 24/7',
                  'Идёт к своему жилью по другой логике',
                ].map(t => (
                  <li key={t} className="flex items-start gap-3 text-base text-white/90">
                    <Icon name="Check" size={16} className="text-[hsl(var(--neon))] mt-1 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* БОЛЬШОЕ ФОТО */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <div className="absolute inset-0 img-overlay-soft img-vignette">
          <img src={IMG.heroAlt} alt="Квартал ночью" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-end pb-20">
          <div className="text-white max-w-2xl animate-fade-up">
            <p className="chip mb-6">
              <Icon name="Building2" size={12} />
              Город
            </p>
            <h3 className="display text-4xl sm:text-5xl lg:text-7xl mb-4">
              Не один дом.<br /><span className="italic-neon">Целые кварталы.</span>
            </h3>
            <p className="text-xl text-white/80 sans max-w-xl">
              Это не очередной объект застройщика. Это платформа, через которую люди строят для себя — вместе.
            </p>
          </div>
        </div>
      </section>

      {/* СИСТЕМА */}
      <section id="system" className="relative py-28 px-6 lg:px-10">
        <div className="glow-orb w-[500px] h-[500px] top-40 right-[-5%]" />

        <div className="relative max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-7">
              <p className="kicker mb-6">Как устроена система</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-7xl text-white">
                Как по-старинке.<br /><span className="italic-neon">Только с технологиями.</span>
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
              { n: '01', label: 'Земля',     sub: 'Основа проекта',               text: 'Базовый актив системы. Не повод для перепродажи и спекуляции.', img: IMG.heroAlt },
              { n: '02', label: 'Девелопер', sub: 'Профессионал, не носитель риска', text: 'Строит — не тонет в кредитах. Работает по fee-модели без лишней нагрузки.', img: IMG.construction },
              { n: '03', label: 'Финансы',   sub: 'Кристально публично',          text: 'Все движения денег, этапы, документы и события видны участникам.', img: IMG.facade },
              { n: '04', label: 'Участники', sub: 'Будущие заказчики',            text: 'Не дольщики. Не покупатели. Люди, под которых создаётся проект.', img: IMG.people },
            ].map(card => (
              <div key={card.n} className="card-neon hover-scale-img group relative rounded-2xl overflow-hidden aspect-[3/4]">
                <img src={card.img} alt={card.label} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
                <div className="relative z-10 p-7 h-full flex flex-col justify-between text-white">
                  <span className="serif italic text-5xl font-black text-[hsl(var(--neon))]/60">{card.n}</span>
                  <div>
                    <p className="kicker mb-2">{card.sub}</p>
                    <h3 className="serif text-3xl font-black mb-3">{card.label}</h3>
                    <p className="text-sm text-white/70 leading-relaxed sans">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 glass rounded-2xl px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 border-l-4 border-[hsl(var(--neon))]">
            <Icon name="Lightbulb" size={32} className="text-[hsl(var(--neon))] shrink-0 float-slow" />
            <p className="sans text-lg leading-relaxed flex-1 text-white/90">
              Если девелопмент можно собрать как систему — рынок меняется.{' '}
              <span className="text-muted-foreground">Если нет — публично покажем, где и почему он ломается.</span>
            </p>
          </div>
        </div>
      </section>

      {/* УЧАСТНИКУ */}
      <section id="you" className="relative py-28 px-6 lg:px-10 section-mid">
        <div className="glow-orb w-[600px] h-[600px] top-0 left-[20%] opacity-80" />

        <div className="relative max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="kicker mb-6">Что получает участник</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-7xl max-w-3xl text-white">
              Шесть причин<br />войти <span className="italic-neon">раньше других</span>.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/12] hover-scale-img card-neon">
              <img src={IMG.interior} alt="Интерьер" className="w-full h-full object-cover opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="chip mb-4">Дом, в котором удобно жить</p>
                <h3 className="serif text-4xl font-black mb-3">
                  Платим за работу. <span className="italic-neon">Не за обещания.</span>
                </h3>
                <p className="text-white/80 sans max-w-xl">
                  Реальный результат, который можно увидеть и потрогать. Реальные квадратные метры, а не красивый рендер в буклете.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-5">
              {[
                { icon: 'BadgePercent', title: 'Не переплачивает',          desc: 'Банки, реклама, лишние прокладки — мимо.' },
                { icon: 'HardHat',      title: 'Может приехать на стройку', desc: 'Своими глазами увидеть, как идут работы.' },
                { icon: 'Smartphone',   title: 'Все деньги на ладони',      desc: 'Каждый рубль системы виден 24/7.' },
              ].map(b => (
                <div key={b.title} className="card-neon rounded-2xl p-6 flex gap-5 items-start">
                  <div className="w-12 h-12 bg-[hsl(var(--neon))]/10 rounded-xl flex items-center justify-center shrink-0 border border-[hsl(var(--neon))]/30 shadow-[0_0_20px_hsl(var(--neon)/0.2)]">
                    <Icon name={b.icon} size={22} className="text-[hsl(var(--neon))]" />
                  </div>
                  <div>
                    <h4 className="sans font-bold text-base mb-1.5 text-white">{b.title}</h4>
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
              <div key={b.title} className="card-neon rounded-2xl p-7">
                <div className="w-12 h-12 bg-[hsl(var(--neon))] rounded-xl flex items-center justify-center mb-5 shadow-[0_0_28px_hsl(var(--neon)/0.45)]">
                  <Icon name={b.icon} size={22} className="text-black" />
                </div>
                <h4 className="sans font-bold text-lg mb-2 text-white">{b.title}</h4>
                <p className="text-base text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОЗРАЧНОСТЬ — сплит */}
      <section className="relative">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[500px] lg:min-h-[720px]">
            <img src={IMG.couple} alt="Пара у новостройки" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-background/5" />
          </div>
          <div className="relative px-6 lg:px-16 py-20 flex flex-col justify-center bg-gradient-to-br from-background via-[hsl(160_22%_8%)] to-background overflow-hidden">
            <div className="glow-orb w-[400px] h-[400px] -right-20 -top-20 opacity-70" />

            <div className="relative">
              <p className="kicker mb-6">Прозрачность</p>
              <h2 className="display text-white text-5xl lg:text-7xl mb-8">
                Все деньги<br /><span className="italic-neon">на ладони.</span>
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
                  <div key={row.text} className="flex items-center gap-4 py-4 border-b border-white/10 last:border-0 group">
                    <Icon name={row.icon} size={18} className="text-[hsl(var(--neon))] shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="sans text-white/90">{row.text}</span>
                  </div>
                ))}
              </div>

              <div className="tall-line pl-6">
                <p className="serif text-3xl italic text-white">«Не доверяйте нам.<br /><span className="italic-neon">Смотрите сами.</span>»</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ФИНАНСЫ */}
      <section id="money" className="relative py-28 px-6 lg:px-10 grid-bg-fade">
        <div className="glow-orb w-[600px] h-[600px] bottom-20 right-0 opacity-60" />

        <div className="relative max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-6">
              <p className="kicker mb-6">Финансы</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-7xl text-white">
                Без ипотечной<br /><span className="italic-neon">кабалы.</span>
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
              <div key={c.label} className="card-neon rounded-2xl p-8">
                <div className="w-14 h-14 bg-[hsl(var(--neon))]/10 rounded-full flex items-center justify-center mb-6 border border-[hsl(var(--neon))]/30 shadow-[0_0_24px_hsl(var(--neon)/0.2)]">
                  <Icon name={c.icon} size={24} className="text-[hsl(var(--neon))]" />
                </div>
                <p className="sans font-bold text-lg mb-1.5 text-white">{c.label}</p>
                <p className="text-sm text-muted-foreground">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* БОЛЬШОЙ БЛОК С ЦИФРАМИ */}
          <div className="relative rounded-3xl overflow-hidden border border-[hsl(var(--neon))]/20">
            <img src={IMG.heroAlt} alt="ЖК" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-[hsl(160_25%_7%)]/95 to-background" />
            <div className="glow-orb w-[500px] h-[500px] bottom-0 right-0 opacity-90" />

            <div className="relative z-10 p-10 lg:p-16 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="kicker mb-6">Пример на цифрах</p>
                <h3 className="display text-4xl lg:text-6xl text-white mb-6">
                  Как рынок<br /><span className="italic-neon">съедает</span> деньги
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
                <div className="glass rounded-2xl p-10 relative overflow-hidden">
                  <div className="absolute inset-0 shimmer opacity-40" />
                  <p className="kicker mb-4 relative">Через КриптоМетры</p>
                  <p className="number-xxl mb-4 relative neon-text">−30%</p>
                  <p className="sans text-white/70 leading-relaxed mb-4 relative">
                    Цель системы — дать участнику путь к жилью до 30% ниже рынка за счёт другой модели входа,
                    накопления, контроля и организации.
                  </p>
                  <p className="text-xs text-white/35 sans border-t border-white/10 pt-4 relative">
                    Модельный пример, не обещание фиксированной цены. Условия зависят от проекта и программы.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ШАГИ */}
      <section id="how" className="relative py-28 px-6 lg:px-10 section-mid">
        <div className="glow-orb w-[500px] h-[500px] top-40 left-[-10%]" />

        <div className="relative max-w-[1200px] mx-auto">
          <div className="mb-16 max-w-3xl">
            <p className="kicker mb-6">Как это работает</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-7xl mb-6 text-white">
              Шесть шагов<br /><span className="italic-neon">к своему жилью.</span>
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
              <div key={s.n} className="card-neon rounded-2xl px-8 py-7 flex items-center gap-8 group">
                <span className="serif italic text-5xl sm:text-7xl font-black leading-none w-20 shrink-0 text-white/15 group-hover:text-[hsl(var(--neon))] transition-all duration-500 group-hover:drop-shadow-[0_0_20px_hsl(var(--neon))]">
                  {s.n}
                </span>
                <div className="flex-1">
                  <h3 className="sans font-bold text-xl mb-1 text-white">{s.title}</h3>
                  <p className="text-base text-muted-foreground">{s.desc}</p>
                </div>
                <Icon name={i === 5 ? 'Flag' : 'ArrowRight'} size={22} className="text-muted-foreground shrink-0 hidden md:block group-hover:text-[hsl(var(--neon))] group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАЧЕСТВО + ДВА ПУТИ */}
      <section className="relative py-28 px-6 lg:px-10">
        <div className="relative max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-10">
          <div className="relative rounded-2xl overflow-hidden min-h-[500px] card-neon hover-scale-img">
            <img src={IMG.people} alt="Команда" className="absolute inset-0 w-full h-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="relative z-10 p-10 h-full flex flex-col justify-end text-white">
              <p className="kicker mb-5">Отбор</p>
              <h3 className="display text-4xl lg:text-5xl mb-6">
                Строят только те,<br /><span className="italic-neon">кто прошёл отбор.</span>
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
                    <Icon name="Check" size={14} className="text-[hsl(var(--neon))] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-72 h-72 bg-[hsl(var(--neon))]/10 rounded-full blur-3xl pointer-events-none" />
              <p className="kicker mb-5 relative">Два пути одного КМ</p>
              <h3 className="serif text-4xl font-black mb-8 relative text-white">Выбирай,<br />как <span className="italic-neon">двигаться</span>.</h3>
              <div className="space-y-5 relative">
                <div className="rounded-xl p-6 bg-[hsl(var(--neon))]/5 border border-[hsl(var(--neon))]/30 border-l-4 border-l-[hsl(var(--neon))]">
                  <p className="sans font-bold text-lg mb-2 text-white">Народный путь</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Идёшь к своей квартире через кооперативную логику. Входишь раньше. Платишь меньше. Контролируешь сам.
                  </p>
                </div>
                <div className="rounded-xl p-6 bg-white/5 border border-white/10 border-l-4 border-l-white/20">
                  <p className="sans font-bold text-lg mb-2 text-white">Классический путь</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Хочешь купить сейчас? Получи специальные условия у партнёров системы. КМ всё равно работает в плюс.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-neon rounded-2xl p-10 relative overflow-hidden">
              <div className="flex items-start gap-5 relative">
                <div className="w-14 h-14 bg-[hsl(var(--neon))] rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_32px_hsl(var(--neon)/0.6)]">
                  <Icon name="Sparkles" size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="serif text-3xl font-black mb-2 text-white">Майним через участие</h3>
                  <p className="text-muted-foreground sans leading-relaxed">
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
        <div className="absolute inset-0 img-overlay img-vignette">
          <img src={IMG.hero} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="glow-orb w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2 animate-glow-pulse" />

        <div className="relative z-10 max-w-[1200px] mx-auto text-center text-white">
          <span className="chip mb-8">
            <Icon name="AlertCircle" size={14} className="text-[hsl(var(--neon))]" />
            Система в стадии тестирования • Не является офертой
          </span>

          <h2 className="display text-6xl sm:text-8xl lg:text-9xl mb-8 neon-gradient-text">
            Войди в систему<br /><span className="italic-neon serif">раньше рынка.</span>
          </h2>

          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed mb-12 sans">
            КМ — цифровой ключ системы. Вход в контур будущего пайщика.
            Место в очереди, которая движется по другой логике.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Button size="lg" className="btn-neon sans font-bold text-base px-12 h-16 rounded-md">
              Получить КМ
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
            <Button size="lg" className="btn-ghost sans font-semibold text-base px-12 h-16 rounded-md">
              Написать нам
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-white/60 sans flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[hsl(var(--neon))] rounded-full animate-pulse shadow-[0_0_12px_hsl(var(--neon))]" />
              Открытие первых программ — Май 2026
            </div>
            <span className="hidden sm:inline text-white/30">•</span>
            <div>Москва и регионы пилотных запусков</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-16 px-6 lg:px-10 border-t border-border bg-[hsl(160_25%_4%)]">
        <div className="relative max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <img src={LOGO} alt="КМ" className="w-10 h-10 object-contain" />
                <div>
                  <p className="serif text-xl font-black text-white">
                    Крипто<span className="neon-text">Метры</span>
                  </p>
                  <p className="text-[10px] text-white/50 sans tracking-widest uppercase">народная платформа жилья</p>
                </div>
              </div>
              <p className="text-white/60 text-sm sans max-w-md leading-relaxed">
                Вы не дольщик. Вы — заказчик. Народная система, через которую можно реально идти к своей квартире по другой логике.
              </p>
            </div>
            <div>
              <p className="kicker mb-4">Разделы</p>
              <div className="flex flex-col gap-3">
                {nav.map(n => (
                  <button key={n.id} onClick={() => scroll(n.id)} className="text-left text-sm text-white/70 hover:text-[hsl(var(--neon))] transition-colors sans">
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="kicker mb-4">Контакты</p>
              <div className="flex flex-col gap-3 text-sm text-white/70 sans">
                <span>hello@cryptometers.ru</span>
                <span>Москва</span>
                <span>Telegram-канал</span>
              </div>
            </div>
          </div>

          <div className="divider-neon mb-6" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/40 text-xs sans">© 2026 КриптоМетры. Все права защищены.</p>
            <p className="text-white/40 text-xs sans">Система в стадии тестирования. Не является публичной офертой.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
