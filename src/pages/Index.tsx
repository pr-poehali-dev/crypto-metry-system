import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/useReveal';
import { useContentSection } from '@/content/ContentContext';

const DEFAULT_LOGO = 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/bucket/e42b3898-d2ef-44ff-b94f-465207ab3b2c.png';

const DEFAULT_IMG = {
  hero:        'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/bucket/b8c94214-dc0f-4d12-b0b0-4235830f89d7.png',
  resort:      'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/8fbb118f-f75d-4354-bd66-00ab3e981d81.jpg',
  quarter:     'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/e3be1098-9720-4721-b8b8-f18dbefc328c.jpg',
  facade:      'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/275e2561-0665-4b11-a4fd-cd25607e8026.jpg',
  courtyard:   'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/b93a50ee-e6ce-45db-94d9-0897ae028c7b.jpg',
  aerial:      'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/d4c1c38f-bf46-4eb1-a5a1-9e0187887e75.jpg',
  interior:    'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/f1e60bd7-338c-4fc2-92c1-22c9c49a1025.jpg',
  village:     'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/ff379895-1c9b-4d90-a62a-f4abcc281fe2.jpg',
  site:        'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/b7c8f3e7-b3ae-4074-baf6-76e997048aef.jpg',
};

const nav = [
  { id: 'idea',    label: 'Идея' },
  { id: 'system',  label: 'Система' },
  { id: 'you',     label: 'Участнику' },
  { id: 'money',   label: 'Финансы' },
  { id: 'mining',  label: 'Майнинг' },
  { id: 'how',     label: 'Как работает' },
  { id: 'faq',     label: 'FAQ' },
  { id: 'join',    label: 'Вступить' },
];

function Ticker() {
  return (
    <div className="relative border-y border-[hsl(168_100%_50%/0.18)] bg-[#0f0f0f] overflow-hidden py-4">
      <div className="marquee-track text-ink">
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex gap-10 items-center shrink-0">
            {[
              'Вы не дольщик — вы заказчик',
              'Система. Не стройка',
              'Все деньги на ладони',
              'Без ипотечной кабалы',
              'Приехать на стройку можно лично',
              'Народный путь к своему жилью',
              'Платим за работу — не за обещания',
              'Майним метры',
            ].map(t => (
              <span key={t + k} className="flex items-center gap-10 serif text-2xl whitespace-nowrap text-ink/80">
                {t}
                <span className="w-1.5 h-1.5 bg-[hsl(var(--neon))] rounded-full shrink-0" style={{ boxShadow: '0 0 10px #3dffc4' }} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  const t_hero = useContentSection('index', 'hero');
  const t_idea = useContentSection('index', 'idea');
  const t_system = useContentSection('index', 'system');
  const t_you = useContentSection('index', 'you');
  const t_money = useContentSection('index', 'money');
  const t_mining = useContentSection('index', 'mining');
  const t_accred = useContentSection('index', 'accreditation');
  const t_how = useContentSection('index', 'how');
  const t_cta = useContentSection('index', 'cta');
  const t_img = useContentSection('index', 'images');

  const LOGO = t_img('logo', DEFAULT_LOGO);
  const IMG = {
    hero:      t_img('hero',      DEFAULT_IMG.hero),
    resort:    t_img('resort',    DEFAULT_IMG.resort),
    quarter:   t_img('quarter',   DEFAULT_IMG.quarter),
    facade:    t_img('facade',    DEFAULT_IMG.facade),
    courtyard: t_img('courtyard', DEFAULT_IMG.courtyard),
    aerial:    t_img('aerial',    DEFAULT_IMG.aerial),
    interior:  t_img('interior',  DEFAULT_IMG.interior),
    village:   t_img('village',   DEFAULT_IMG.village),
    site:      t_img('site',      DEFAULT_IMG.site),
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scroll = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#131313] text-ink overflow-x-hidden relative">

      {/* HEADER */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong border-b border-border/50' : 'bg-transparent'}`}>
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <button onClick={() => scroll('hero')} className="flex items-center gap-3 group">
            <div className="w-11 h-11 relative">
              <div className="absolute inset-0 rounded-md bg-[hsl(var(--neon))]/20 blur-lg group-hover:bg-[hsl(var(--neon))]/50 transition-all duration-500" />
              <img src={LOGO} alt="КриптоМетры" className="relative w-11 h-11 object-contain" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="serif text-lg font-bold text-ink tracking-tight">
                Крипто<span className="text-neon">Метры</span>
              </span>
              <span className="text-[10px] text-haze/60 mono-tech uppercase">Народная платформа жилья</span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative group">
              <button className="mono-tech text-[12px] uppercase tracking-[0.2em] text-haze/70 hover:text-neon transition-colors flex items-center gap-1.5">
                Главная
                <Icon name="ChevronDown" size={12} className="opacity-50 group-hover:opacity-100 transition-all group-hover:rotate-180 duration-200" />
              </button>
              {/* Dropdown */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                <div className="glass-strong border border-border/60 rounded-xl p-1.5 min-w-[160px] shadow-2xl">
                  {nav.map(n => (
                    <button
                      key={n.id}
                      onClick={() => scroll(n.id)}
                      className="w-full text-left px-3 py-2 rounded-lg mono-tech text-[11px] uppercase tracking-[0.15em] text-haze/70 hover:text-neon hover:bg-white/5 transition-colors"
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/system" className="mono-tech text-[11px] uppercase tracking-[0.2em] text-haze/80 hover:text-neon transition-colors flex items-center gap-2 px-2">
              <Icon name="LayoutGrid" size={14} />
              О системе
            </Link>
            <Link to="/cabinet" className="mono-tech text-[11px] uppercase tracking-[0.2em] text-haze/80 hover:text-neon transition-colors flex items-center gap-2 px-2">
              <Icon name="User" size={14} />
              Кабинет
            </Link>
            <Button size="sm" className="btn-neon h-10 px-6 rounded-md text-[11px]" onClick={() => scroll('join')}>
              Получить КМ
              <Icon name="ArrowRight" size={14} className="ml-2" />
            </Button>
          </div>

          <button className="lg:hidden p-2 text-ink" onClick={() => setMenuOpen(v => !v)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border glass-strong px-6 py-5 flex flex-col gap-4">
            {nav.map(n => (
              <button key={n.id} onClick={() => scroll(n.id)} className="text-left mono-tech text-sm uppercase tracking-widest py-1 text-ink">
                {n.label}
              </button>
            ))}
            <Link to="/system" className="text-left mono-tech text-sm uppercase tracking-widest py-1 text-neon" onClick={() => setMenuOpen(false)}>
              О системе
            </Link>
            <Button className="btn-neon w-full mt-2" onClick={() => scroll('join')}>Получить КМ</Button>
          </div>
        )}
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section id="hero" className="relative min-h-[900px] h-screen overflow-hidden bg-[#0d0d0d]">
        {/* image on the right side */}
        <div className="absolute inset-0">
          <img src={IMG.hero} alt="Архитектурный квартал" className="w-full h-full object-cover scale-105 animate-fade-in" />
        </div>

        {/* protective gradient — тёплое затемнение текстовой зоны */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/60 to-transparent lg:from-[#0a0a0a]/92 lg:via-[#0a0a0a]/45 lg:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent pointer-events-none" />

        <div className="orb w-[620px] h-[620px] top-20 -left-40 animate-glow" />
        <div className="orb w-[480px] h-[480px] bottom-40 right-0 animate-glow" style={{ animationDelay: '2.5s' }} />

        {/* scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5] opacity-30">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" style={{ animation: 'scan-line 8s linear infinite' }} />
        </div>

        <div className="relative z-10 h-full max-w-[1500px] mx-auto px-6 lg:px-10 flex flex-col justify-center pt-28 pb-36">
          <div className="animate-fade-up">
            <span className="chip mb-8">
              <span className="chip-dot" />
              {t_hero('chip', 'Майнинг метров · Запуск · Май 2026')}
            </span>
          </div>

          <h1 className="display text-[13vw] sm:text-[10vw] lg:text-[8.5rem] xl:text-[10rem] max-w-[1100px] leading-[0.88] animate-fade-up-1">
            <span className="neon-grad">{t_hero('title_1', 'Майним')}</span>
            <span className="block display-italic text-neon mt-[-0.04em]" style={{ textShadow: '0 0 60px hsla(164,95%,62%,0.35)' }}>
              {t_hero('title_2', 'недвижимость')}
            </span>
          </h1>

          <div className="mt-10 max-w-2xl animate-fade-up-2">
            <div className="bar-neon mb-6" />
            <p className="text-ink/90 text-lg lg:text-xl leading-relaxed font-light">
              Архитектурная платформа для тех, кто устал переплачивать —
              и решил строить по уму. Входи в систему{' '}
              <span className="italic-accent">раньше рынка</span>,
              получай жильё как <span className="text-ink font-semibold">будущий заказчик</span>.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up-3">
            <Button size="lg" className="btn-neon text-[13px] h-16 px-10 rounded-md" onClick={() => scroll('join')}>
              {t_hero('cta_primary', 'Получить КМ')}
              <Icon name="ArrowUpRight" size={18} className="ml-2" />
            </Button>
            <Button size="lg" className="btn-ghost text-[13px] h-16 px-10 rounded-md" onClick={() => scroll('idea')}>
              <Icon name="Play" size={15} className="mr-2" />
              {t_hero('cta_secondary', 'Что это такое')}
            </Button>
          </div>
        </div>

        {/* bottom stats bar */}
        <div className="absolute bottom-0 inset-x-0 z-10 border-t border-[hsla(164,95%,62%,0.22)] glass-strong">
          <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { val: 'до −30%', sub: t_hero('stat_1_label', 'ниже рынка'),       icon: 'TrendingDown' },
              { val: '24/7',    sub: t_hero('stat_2_label', 'деньги на ладони'), icon: 'Eye' },
              { val: '0%',      sub: t_hero('stat_3_label', 'рассрочка 20 лет'), icon: 'Unlock' },
              { val: '100%',    sub: t_hero('stat_4_label', 'аккредитованы'),    icon: 'ShieldCheck' },
            ].map(s => (
              <div key={s.val} className="px-4 sm:px-6 flex items-center gap-3 sm:gap-4">
                <div className="w-11 h-11 rounded-full bg-[hsl(var(--neon))]/10 flex items-center justify-center shrink-0 border border-[hsl(var(--neon))]/40" style={{ boxShadow: '0 0 24px hsla(164,95%,62%,0.22)' }}>
                  <Icon name={s.icon} size={17} className="text-neon" />
                </div>
                <div>
                  <p className="serif text-2xl sm:text-3xl font-bold leading-none neon-grad">{s.val}</p>
                  <p className="text-[10px] sm:text-[11px] text-haze/60 mono-tech mt-1 uppercase tracking-[0.25em]">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ticker />

      {/* ═══════════ БОЛЬ РЫНКА — DATA STORY ═══════════ */}
      <section className="relative py-32 px-6 lg:px-10 grid-faint-fade">
        <div className="orb w-[700px] h-[700px] top-20 right-[-15%] opacity-70" />
        <div className="wm-km" />

        <div className="relative max-w-[1500px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-20 reveal">
            <div className="lg:col-span-7">
              <p className="kicker mb-6">{t_idea('kicker', 'Манифест · 01')}</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-[6.5rem] text-ink">
                Когда обычная квартира<br />
                <span className="display-italic text-neon">слишком дорогая</span>, — появляется <span className="italic-accent" style={{ fontWeight: 400 }}>другая модель</span>.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="hairline mb-6" />
              <p className="text-haze/80 text-lg leading-relaxed whitespace-pre-line">
                {t_idea('desc', 'Ты платишь не только за бетон и стены. В цену зашиты чужие кредиты, реклама, риски и жирная наценка. КриптоМетры разворачивают логику — не покупать в конце по полной. А входить раньше.')}
              </p>
            </div>
          </div>

          {/* price anatomy */}
          <div className="relative rounded-3xl overflow-hidden panel-tonal border border-border reveal reveal-slow">
            <img src={IMG.facade} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#131313]/95 via-[#131313]/80 to-[#131313]/95" />

            <div className="relative z-10 p-8 lg:p-14 grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <p className="kicker-haze mb-4">Пример · 10 млн ₽</p>
                <h3 className="display text-4xl lg:text-6xl text-ink mb-6">
                  Из чего<br />состоит <span className="display-italic text-neon">цена</span>
                </h3>
                <p className="text-haze/70 leading-relaxed max-w-md">
                  Когда покупаешь квартиру у обычного застройщика, ты финансируешь в среднем шесть чужих процессов.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-3">
                {[
                  { label: 'Дорогая земля',              pct: 18, color: 'from-red-400/70' },
                  { label: 'Банковские проценты',        pct: 22, color: 'from-red-400/70' },
                  { label: 'Реклама и продажи',          pct: 14, color: 'from-orange-400/70' },
                  { label: 'Наценка застройщика',        pct: 20, color: 'from-orange-400/70' },
                  { label: 'Риски и простои',            pct: 8,  color: 'from-yellow-400/60' },
                  { label: 'Стройка (твой реальный дом)', pct: 18, color: 'from-[hsl(var(--neon))]/80', accent: true },
                ].map((r, i) => (
                  <div key={r.label} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`mono-tech text-[12px] uppercase tracking-[0.18em] ${r.accent ? 'text-neon' : 'text-haze/75'}`}>{r.label}</span>
                      <span className={`serif text-lg ${r.accent ? 'text-neon' : 'text-ink/80'}`}>{r.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${r.color} to-transparent`}
                        style={{ width: `${r.pct}%`, boxShadow: r.accent ? '0 0 20px hsl(var(--neon))' : 'none' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ ИДЕЯ — МАНИФЕСТ "Вы — заказчик" ═══════════ */}
      <section id="idea" className="relative py-32 px-6 lg:px-10 panel-ink">
        <div className="orb w-[700px] h-[700px] bottom-0 left-[-15%]" />

        <div className="relative max-w-[1500px] mx-auto">

          <div className="text-center mb-24 reveal">
            <p className="kicker mb-6">{t_you('kicker', 'Ключевая идея · 02')}</p>
            <h2 className="display text-[14vw] lg:text-[11rem] leading-[0.88] neon-grad">
              {t_you('title_1', 'Вы не дольщик.')}
            </h2>
            <h2 className="display-italic text-[14vw] lg:text-[11rem] leading-[0.88] text-neon mt-1" style={{ textShadow: '0 0 80px hsla(164,95%,62%,0.3)' }}>
              {t_you('title_2', 'Вы — заказчик.')}
            </h2>
            <p className="text-haze/70 text-xl max-w-2xl mx-auto mt-8 leading-relaxed">
              Дольщику продают то, что уже решили без него.
              Пайщик входит раньше и создаёт проект под себя.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 reveal">
            {/* Old model */}
            <div className="relative rounded-3xl p-10 lg:p-12 overflow-hidden glass">
              <span className="absolute top-6 right-6 mono-tech text-[10px] uppercase tracking-[0.3em] text-haze/40">Old model</span>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Icon name="UserX" size={24} className="text-haze/50" />
                </div>
                <span className="kicker-haze">Старый путь</span>
              </div>
              <h3 className="serif text-5xl font-bold mb-8 text-haze/70">Дольщик</h3>
              <ul className="space-y-4">
                {[
                  'Приходит последним — по полной цене',
                  'Молчит и подписывает то, что принесли',
                  'Не видит, куда идут деньги',
                  'Остаётся один на один с рисками',
                ].map(t => (
                  <li key={t} className="flex items-start gap-3 text-base text-haze/60">
                    <Icon name="X" size={16} className="text-red-400/60 mt-1 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* New model */}
            <div className="relative rounded-3xl p-10 lg:p-12 overflow-hidden glass-strong rim rim-hover light-sweep" style={{ borderColor: 'hsla(164,95%,62%,0.28)' }}>
              <span className="absolute top-6 right-6 mono-tech text-[10px] uppercase tracking-[0.3em] text-neon/80">New model</span>
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[hsl(var(--neon))] rounded-xl flex items-center justify-center animate-ring" style={{ boxShadow: '0 0 40px hsla(164,95%,62%,0.5)' }}>
                  <Icon name="UserCheck" size={24} className="text-black" />
                </div>
                <span className="kicker">Новый путь</span>
              </div>
              <h3 className="serif text-5xl font-bold mb-8 relative text-ink">
                Заказчик<br /><span className="display-italic text-neon">пайщик</span>
              </h3>
              <ul className="space-y-4 relative">
                {[
                  'Входит раньше рынка — до наценки',
                  'Влияет и контролирует процесс',
                  'Видит каждый рубль 24/7',
                  'Идёт к своему жилью по другой логике',
                ].map(t => (
                  <li key={t} className="flex items-start gap-3 text-base text-ink/90">
                    <Icon name="Check" size={16} className="text-neon mt-1 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ ARCHITECTURAL BIG PHOTO ═══════════ */}
      <section className="relative h-[85vh] min-h-[620px] overflow-hidden">
        <div className="absolute inset-0 img-soft img-vignette">
          <img src={IMG.aerial} alt="Квартал с воздуха" className="w-full h-full object-cover scale-105" />
        </div>
        <div className="relative z-10 h-full max-w-[1500px] mx-auto px-6 lg:px-10 flex items-end pb-24">
          <div className="text-ink max-w-3xl reveal">
            <p className="chip mb-6">
              <Icon name="Building2" size={12} />
              Архитектурная среда
            </p>
            <h3 className="display text-5xl sm:text-7xl lg:text-[8rem] mb-6">
              Не один дом.<br />
              <span className="display-italic text-neon">Целые кварталы.</span>
            </h3>
            <p className="text-xl text-haze/80 max-w-2xl">
              Это не очередной объект застройщика. Это платформа, через которую люди строят для себя —
              жилые комплексы, коттеджные деревни, курортные и mixed-use проекты.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ АРХИТЕКТУРА СИСТЕМЫ — 4 glass cards со связями ═══════════ */}
      <section id="system" className="relative py-32 px-6 lg:px-10">
        <div className="orb w-[600px] h-[600px] top-40 right-[-8%]" />
        <div className="orb w-[500px] h-[500px] bottom-20 left-[-10%] animate-glow" />

        <div className="relative max-w-[1500px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-20 reveal">
            <div className="lg:col-span-7">
              <p className="kicker mb-6">{t_system('kicker', 'Архитектура системы · 03')}</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-[7rem] text-ink">
                {t_system('title_1', 'Как по-старинке.')}<br />
                <span className="display-italic text-neon">{t_system('title_2', 'Только с технологиями.')}</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="text-lg text-haze/75 leading-relaxed whitespace-pre-line">
                {t_system('desc', 'Земля, профессиональный девелопер, прозрачные финансы и люди, которые заказывают — а не покупают. Четыре элемента, связанные в единый контур.')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* connection lines layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ln" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#3dffc4" stopOpacity="0" />
                  <stop offset="50%"  stopColor="#3dffc4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3dffc4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="25%" y1="50%" x2="50%" y2="50%" stroke="url(#ln)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="75%" y2="50%" stroke="url(#ln)" strokeWidth="1" />
            </svg>

            {[
              { n: '01', label: 'Земля',     sub: 'Основа проекта',            text: 'Базовый актив системы. Не повод для перепродажи и спекуляции.', img: IMG.courtyard, icon: 'MapPin' },
              { n: '02', label: 'Девелопер', sub: 'Профессионал, не носитель риска', text: 'Строит по fee-модели. Работает — не тонет в кредитах.', img: IMG.site, icon: 'HardHat' },
              { n: '03', label: 'Финансы',   sub: 'Кристально публично',       text: 'Все движения, этапы, документы — видны участникам 24/7.', img: IMG.facade, icon: 'Wallet' },
              { n: '04', label: 'Участники', sub: 'Будущие заказчики',          text: 'Люди, под которых создаётся проект. Не дольщики.', img: IMG.quarter, icon: 'Users' },
            ].map((card, i) => (
              <div
                key={card.n}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4.2] glass rim rim-hover reveal"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <img src={card.img} alt={card.label} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-all duration-[1.2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/80 to-[#131313]/20" />

                <div className="relative z-10 p-7 h-full flex flex-col justify-between text-ink">
                  <div className="flex items-start justify-between">
                    <span className="serif text-5xl font-bold text-[hsl(var(--neon))]/60">{card.n}</span>
                    <div className="w-10 h-10 rounded-lg bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/30 flex items-center justify-center">
                      <Icon name={card.icon} size={16} className="text-neon" />
                    </div>
                  </div>
                  <div>
                    <p className="kicker mb-2">{card.sub}</p>
                    <h3 className="serif text-3xl font-bold mb-3">{card.label}</h3>
                    <p className="text-sm text-haze/75 leading-relaxed">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 glass-strong rounded-3xl px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 border-l-4 border-[hsl(var(--neon))] reveal">
            <Icon name="Lightbulb" size={32} className="text-neon shrink-0 animate-float" />
            <p className="text-lg leading-relaxed flex-1 text-ink/90">
              Если девелопмент можно собрать как систему — рынок меняется.{' '}
              <span className="text-haze/70">Если нет — публично покажем, где и почему он ломается.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ УЧАСТНИКУ — premium feature grid ═══════════ */}
      <section id="you" className="relative py-32 px-6 lg:px-10 panel-ink">
        <div className="orb w-[700px] h-[700px] top-0 left-[20%] opacity-80" />

        <div className="relative max-w-[1500px] mx-auto">
          <div className="mb-20 reveal">
            <p className="kicker mb-6">Что получает участник · 04</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-[7rem] max-w-5xl text-ink">
              Шесть причин<br />
              войти <span className="display-italic text-neon">раньше рынка.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden aspect-[16/10] hover-zoom glass rim rim-hover reveal">
              <img src={IMG.interior} alt="Интерьер" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/50 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 text-ink">
                <p className="chip mb-4">Дом, в котором удобно жить</p>
                <h3 className="display text-5xl font-bold mb-4">
                  Платим за работу.<br />
                  <span className="display-italic text-neon">Не за обещания.</span>
                </h3>
                <p className="text-haze/80 max-w-xl">
                  Реальный результат, который можно увидеть и потрогать.
                  Реальные квадратные метры, а не красивый рендер в буклете.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-5">
              {[
                { icon: 'BadgePercent', title: 'Не переплачивает',          desc: 'Банки, реклама, прокладки — мимо.' },
                { icon: 'HardHat',      title: 'Приезжает на стройку',      desc: 'Своими глазами видит, как идут работы.' },
                { icon: 'Smartphone',   title: 'Все деньги на ладони',      desc: 'Каждый рубль системы — 24/7.' },
              ].map((b, i) => (
                <div key={b.title} className="glass rim rim-hover rounded-2xl p-6 flex gap-5 items-start reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="w-14 h-14 bg-[hsl(var(--neon))]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[hsl(var(--neon))]/30" style={{ boxShadow: '0 0 24px hsla(168,100%,50%,0.2)' }}>
                    <Icon name={b.icon} size={22} className="text-neon" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1.5 text-ink">{b.title}</h4>
                    <p className="text-sm text-haze/70 leading-relaxed">{b.desc}</p>
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
            ].map((b, i) => (
              <div key={b.title} className="glass-strong rim rim-hover rounded-3xl p-8 reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="w-14 h-14 bg-[hsl(var(--neon))] rounded-2xl flex items-center justify-center mb-6" style={{ boxShadow: '0 0 36px hsla(168,100%,50%,0.55)' }}>
                  <Icon name={b.icon} size={24} className="text-black" />
                </div>
                <h4 className="font-bold text-xl mb-2 text-ink">{b.title}</h4>
                <p className="text-base text-haze/70 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ "ВСЕ ДЕНЬГИ НА ЛАДОНИ" — phone mockup ═══════════ */}
      <section className="relative py-32 px-6 lg:px-10 overflow-hidden">
        <div className="orb w-[700px] h-[700px] -top-20 right-10 opacity-70" />

        <div className="relative max-w-[1500px] mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 reveal">
            <p className="kicker mb-6">Прозрачность · 05</p>
            <h2 className="display text-5xl lg:text-[6.5rem] text-ink mb-8">
              Все деньги<br />
              <span className="display-italic text-neon">на ладони.</span>
            </h2>
            <p className="text-haze/80 text-xl leading-relaxed mb-10 max-w-lg">
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
                <div key={row.text} className="flex items-center gap-4 py-4 border-b border-white/8 last:border-0 group">
                  <Icon name={row.icon} size={18} className="text-neon shrink-0 group-hover:scale-125 transition-transform duration-500" />
                  <span className="text-ink/85">{row.text}</span>
                </div>
              ))}
            </div>

            <div className="tall-line pl-6">
              <p className="display text-3xl italic text-ink">«Не доверяйте нам.<br /><span className="display-italic text-neon">Смотрите сами.</span>»</p>
            </div>
          </div>

          {/* PHONE MOCKUP */}
          <div className="lg:col-span-6 relative reveal reveal-slow">
            <div className="relative mx-auto max-w-[380px]">
              {/* glow behind */}
              <div className="absolute -inset-10 bg-[hsl(var(--neon))]/20 blur-3xl rounded-full animate-glow" />

              {/* phone body */}
              <div className="relative rounded-[48px] border border-white/10 bg-[#0a0a0a] p-3 shadow-[0_60px_120px_-20px_rgba(0,255,204,0.35)] animate-float">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
                <div className="relative rounded-[40px] overflow-hidden aspect-[9/19] panel-tonal">
                  {/* status bar */}
                  <div className="flex items-center justify-between px-8 pt-6 pb-4 mono-tech text-[10px] text-ink/70 tracking-widest">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <Icon name="Signal" size={10} />
                      <Icon name="Wifi" size={10} />
                      <Icon name="BatteryFull" size={12} />
                    </div>
                  </div>

                  {/* header */}
                  <div className="px-6 pb-5">
                    <p className="kicker mb-2">Проект · 001</p>
                    <p className="serif font-bold text-xl text-ink leading-tight">Квартал «Северный»</p>
                  </div>

                  {/* live balance */}
                  <div className="mx-5 rounded-2xl glass-strong p-5 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="kicker-haze" style={{ fontSize: 10 }}>В системе</span>
                      <span className="chip-dot" />
                    </div>
                    <p className="serif text-3xl font-bold neon-grad">₽ 384 192 104</p>
                    <p className="mono-tech text-[10px] text-haze/55 mt-1">Обновлено · 2 сек назад</p>
                  </div>

                  {/* bars */}
                  <div className="mx-5 rounded-2xl glass p-5 mb-4">
                    <p className="kicker-haze mb-3" style={{ fontSize: 10 }}>Этапы</p>
                    {[
                      { l: 'Земля',   p: 100 },
                      { l: 'Проект',  p: 82 },
                      { l: 'Каркас',  p: 34 },
                    ].map(x => (
                      <div key={x.l} className="mb-2 last:mb-0">
                        <div className="flex justify-between mono-tech text-[10px] text-haze/65 mb-1">
                          <span>{x.l}</span><span className="text-neon">{x.p}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#3dffc4] to-[#1af5b5] rounded-full" style={{ width: `${x.p}%`, boxShadow: '0 0 10px #3dffc4' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* transactions */}
                  <div className="mx-5 rounded-2xl glass p-4 space-y-3">
                    {[
                      { t: 'Оплата подряд',  v: '−₽ 4.2M', d: '10:04' },
                      { t: 'Взнос участник', v: '+₽ 820K', d: '09:48' },
                      { t: 'Акт выполнения', v: 'Подписан', d: '09:12' },
                    ].map(t => (
                      <div key={t.t} className="flex items-center justify-between text-[11px]">
                        <div>
                          <p className="text-ink/90">{t.t}</p>
                          <p className="mono-tech text-haze/45 text-[9px]">{t.d}</p>
                        </div>
                        <span className={`mono-tech ${t.v.startsWith('+') ? 'text-neon' : 'text-haze/80'}`}>{t.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* floating badges */}
              <div className="absolute -left-8 top-24 glass-strong rounded-xl px-4 py-3 animate-float" style={{ animationDelay: '1s' }}>
                <p className="kicker text-[9px]" style={{ letterSpacing: '0.25em' }}>On-chain</p>
                <p className="serif text-sm font-bold neon-grad mt-0.5">Log #2841</p>
              </div>
              <div className="absolute -right-4 bottom-32 glass-strong rounded-xl px-4 py-3 animate-float" style={{ animationDelay: '2.5s' }}>
                <p className="kicker-haze text-[9px]" style={{ letterSpacing: '0.25em' }}>AI-check</p>
                <p className="serif text-sm font-bold text-ink mt-0.5">OK · 100%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ АККРЕДИТАЦИЯ + ФИНАНСЫ ═══════════ */}
      <section id="money" className="relative py-32 px-6 lg:px-10 grid-faint-fade panel-ink">
        <div className="orb w-[700px] h-[700px] bottom-20 right-0 opacity-60" />

        <div className="relative max-w-[1500px] mx-auto">

          {/* Accreditation split */}
          <div className="grid lg:grid-cols-2 gap-5 mb-24">
            <div className="relative rounded-3xl overflow-hidden min-h-[520px] glass rim rim-hover reveal hover-zoom">
              <img src={IMG.village} alt="Коттеджный посёлок" className="absolute inset-0 w-full h-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-transparent" />
              <div className="relative z-10 p-10 h-full flex flex-col justify-end text-ink">
                <p className="kicker mb-5">{t_accred('kicker', 'Отбор · 06')}</p>
                <h3 className="display text-4xl lg:text-[3.8rem] mb-6">
                  {t_accred('title_1', 'Строят только те,')}<br /><span className="display-italic text-neon">{t_accred('title_2', 'кто прошёл отбор.')}</span>
                </h3>
                <p className="text-haze/85 mb-6 max-w-lg whitespace-pre-line">
                  {t_accred('desc', 'В систему допускаются только аккредитованные девелоперы и подрядчики с репутацией.')}
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-lg">
                  {[
                    t_accred('criteria_1', 'Опыт и объекты'),
                    t_accred('criteria_2', 'Репутация'),
                    t_accred('criteria_3', 'Прозрачные сметы'),
                    t_accred('criteria_4', 'Открытый контур'),
                    t_accred('criteria_5', 'Цифровой контроль'),
                    t_accred('criteria_6', 'Ответственность'),
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-ink/90">
                      <Icon name="Check" size={14} className="text-neon shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5 reveal">
              <div className="glass-strong rounded-3xl p-10 relative overflow-hidden rim">
                <div className="absolute -right-20 -top-20 w-72 h-72 bg-[hsl(var(--neon))]/15 rounded-full blur-3xl pointer-events-none" />
                <p className="kicker mb-5 relative">Два пути одного КМ</p>
                <h3 className="display text-4xl font-bold mb-8 relative text-ink">Выбирай,<br />как <span className="display-italic text-neon">двигаться</span>.</h3>
                <div className="space-y-4 relative">
                  <div className="rounded-2xl p-6 bg-[hsl(var(--neon))]/5 border border-[hsl(var(--neon))]/30 border-l-[3px] border-l-[hsl(var(--neon))]">
                    <p className="font-bold text-lg mb-2 text-ink">Народный путь</p>
                    <p className="text-haze/70 leading-relaxed">Идёшь к своей квартире через кооперативную логику. Входишь раньше. Платишь меньше. Контролируешь сам.</p>
                  </div>
                  <div className="rounded-2xl p-6 bg-white/3 border border-white/10 border-l-[3px] border-l-white/25">
                    <p className="font-bold text-lg mb-2 text-ink">Классический путь</p>
                    <p className="text-haze/70 leading-relaxed">Хочешь купить сейчас? Получи специальные условия у партнёров. КМ всё равно работает в плюс.</p>
                  </div>
                </div>
              </div>

              <div className="glass rim rim-hover rounded-3xl p-10 relative overflow-hidden">
                <div className="flex items-start gap-5 relative">
                  <div className="w-14 h-14 bg-[hsl(var(--neon))] rounded-2xl flex items-center justify-center shrink-0" style={{ boxShadow: '0 0 40px hsla(164,95%,62%,0.5)' }}>
                    <Icon name="Sparkles" size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="serif text-3xl font-bold mb-2 text-ink">Майним через участие</h3>
                    <p className="text-haze/70 leading-relaxed">Система растёт на людях, охвате и рекомендациях. Участвуешь — растишь свой путь к квартире.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* money heading */}
          <div className="grid lg:grid-cols-12 gap-10 mb-16 reveal">
            <div className="lg:col-span-6">
              <p className="kicker mb-6">{t_money('kicker', 'Финансы · 07')}</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-[7rem] text-ink">
                {t_money('title_1', 'Без ипотечной')}<br />
                <span className="display-italic text-neon">{t_money('title_2', 'кабалы.')}</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-lg text-haze/75 leading-relaxed">
                Вместо банковской удавки — своя логика. Инструменты, которые работают на участника,
                а не на чужой процент.
              </p>
            </div>
          </div>

          {/* big numbers row */}
          <div className="grid md:grid-cols-3 gap-5 mb-8 reveal">
            {[
              { big: '0%',       sub: 'рассрочка',       foot: 'Без банков' },
              { big: 'до 20',    sub: 'лет без %',       foot: 'Своя логика' },
              { big: '−30%',     sub: 'ниже рынка',      foot: 'Цель системы' },
            ].map((r, i) => (
              <div key={r.big} className="glass-strong rim rim-hover rounded-3xl p-10 relative overflow-hidden reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="absolute top-6 right-6 mono-tech text-[10px] text-haze/40 uppercase tracking-[0.25em]">{r.foot}</div>
                <p className="number-xxl neon-grad">{r.big}</p>
                <p className="mt-4 kicker-haze">{r.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: 'Calendar',  label: t_money('tool_1_label', 'Рассрочка'),     sub: t_money('tool_1_desc', 'Беспроцентная до 20 лет') },
              { icon: 'PiggyBank', label: t_money('tool_2_label', 'Накопительная'), sub: t_money('tool_2_desc', 'Программа без переплат') },
              { icon: 'Handshake', label: t_money('tool_3_label', 'Субсидии'),      sub: t_money('tool_3_desc', 'Коммерческие от партнёров') },
              { icon: 'Layers',    label: t_money('tool_4_label', 'Криптотека'),    sub: t_money('tool_4_desc', 'Новый инструмент входа') },
            ].map((c, i) => (
              <div key={c.label} className="glass rim rim-hover rounded-3xl p-8 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-14 h-14 bg-[hsl(var(--neon))]/10 rounded-2xl flex items-center justify-center mb-6 border border-[hsl(var(--neon))]/30" style={{ boxShadow: '0 0 24px hsla(168,100%,50%,0.2)' }}>
                  <Icon name={c.icon} size={24} className="text-neon" />
                </div>
                <p className="font-bold text-lg mb-1.5 text-ink">{c.label}</p>
                <p className="text-sm text-haze/65">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MINING KVARTIRY TEASER ═══════════ */}
      <section id="mining" className="relative py-32 px-6 lg:px-10 overflow-hidden panel-tonal">
        <div className="orb w-[600px] h-[600px] top-10 left-[-10%] animate-glow" />
        <div className="orb w-[500px] h-[500px] bottom-0 right-0 animate-glow" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-[1500px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end mb-12">
            <div className="lg:col-span-7 reveal">
              <p className="kicker mb-5">{t_mining('kicker', 'Программа участия · Новый раздел')}</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-[7.5rem] leading-[0.9]">
                Майнинг<br />
                <span className="display-italic text-neon" style={{ textShadow: '0 0 60px hsla(164,95%,62%,0.35)' }}>квартиры.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 reveal">
              <div className="bar-neon mb-5" />
              <p className="text-haze/85 text-lg lg:text-xl leading-relaxed">
                В КриптоМетре можно не только смотреть запуск системы, но и начать
                майнить свой путь к будущему жилью уже сейчас.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[
              {
                t: '1 КМ = 10 000 ₽',
                d: 'Внутренний расчётный номинал — видно цель в понятных цифрах.',
                icon: 'Coins',
              },
              {
                t: 'Квартира 5 млн = 500 КМ',
                d: 'Каждая квартира получает понятную цель в КМ.',
                icon: 'Target',
              },
              {
                t: 'После 100 КМ — контур',
                d: 'Открывается следующий уровень участия в системе.',
                icon: 'KeyRound',
              },
            ].map((t, i) => (
              <div key={t.t} className="glass rim rim-hover rounded-3xl p-8 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/40 flex items-center justify-center mb-5">
                  <Icon name={t.icon} size={20} className="text-neon" />
                </div>
                <div className="text-xl font-bold mb-2 leading-snug">{t.t}</div>
                <p className="text-haze/70 text-sm leading-relaxed">{t.d}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 reveal">
            <Link to="/mining-kvartiry">
              <Button size="lg" className="btn-neon text-[13px] h-16 px-10 rounded-md">
                {t_mining('cta_primary', 'Перейти на страницу майнинга')}
                <Icon name="ArrowUpRight" size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/mining-kvartiry">
              <Button size="lg" className="btn-ghost text-[13px] h-16 px-10 rounded-md">
                <Icon name="Pickaxe" size={16} className="mr-2" fallback="Hammer" />
                {t_mining('cta_secondary', 'Начать майнить')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ TIMELINE "Как это работает" ═══════════ */}
      <section id="how" className="relative py-32 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={IMG.resort} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#131313]/90 to-[#131313]" />
        </div>
        <div className="orb w-[600px] h-[600px] top-40 left-[-10%]" />

        <div className="relative max-w-[1200px] mx-auto">
          <div className="mb-20 max-w-3xl reveal">
            <p className="kicker mb-6">{t_how('kicker', 'Как это работает · 08')}</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-[7rem] mb-6 text-ink">
              {t_how('title_1', 'Шесть шагов')}<br />
              <span className="display-italic text-neon">{t_how('title_2', 'к своему жилью.')}</span>
            </h2>
            <p className="text-lg text-haze/75 leading-relaxed whitespace-pre-line">
              {t_how('desc', 'Скидываемся. Покупаем землю. Нанимаем девелопера. Контролируем стройку. Принимаем результат. Живём.')}
            </p>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[48px] top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-[hsl(var(--neon))]/40 to-transparent hidden md:block" />

            <div className="space-y-4">
              {[
                { n: '01', title: 'Покупаешь КМ',          desc: 'И входишь в систему как будущий участник. Цифровой ключ системы.' },
                { n: '02', title: 'Получаешь доступ',      desc: 'К закрытому контуру, карте проектов и личному кабинету.' },
                { n: '03', title: 'Следишь за площадками', desc: 'Выбираешь, куда тебе реально интересно зайти.' },
                { n: '04', title: 'Открывается программа', desc: 'По проекту — получаешь доступ по правилам системы.' },
                { n: '05', title: 'Движешься к жилью',     desc: 'Как будущий пайщик, а не запоздавший покупатель.' },
                { n: '06', title: 'Если планы изменились', desc: 'КМ всё равно даёт выгоду у партнёров при покупке обычной квартиры.' },
              ].map((s, i) => (
                <div key={s.n} className="glass rim rim-hover rounded-3xl px-6 md:px-8 py-6 flex items-center gap-6 md:gap-10 group reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-[hsl(var(--neon))]/20 rounded-full blur-xl group-hover:bg-[hsl(var(--neon))]/50 transition-all duration-500" />
                    <div className="relative w-[72px] h-[72px] rounded-full bg-[#0a0a0a] border border-[hsl(var(--neon))]/50 flex items-center justify-center">
                      <span className="serif text-2xl font-bold text-neon">{s.n}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-1 text-ink">{s.title}</h3>
                    <p className="text-base text-haze/70 leading-relaxed">{s.desc}</p>
                  </div>
                  <Icon name={i === 5 ? 'Flag' : 'ArrowUpRight'} size={22} className="text-haze/40 shrink-0 hidden md:block group-hover:text-neon group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ LEGAL DASHBOARD ═══════════ */}
      <section className="relative py-32 px-6 lg:px-10 panel-tonal">
        <div className="orb w-[500px] h-[500px] top-20 right-10" />

        <div className="relative max-w-[1500px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-16 reveal">
            <div className="lg:col-span-7">
              <p className="kicker mb-6">Юридический периметр · 09</p>
              <h2 className="display text-5xl lg:text-[6.5rem] text-ink">
                Всё по закону.<br />
                <span className="display-italic text-neon">Всё на виду.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="text-lg text-haze/75 leading-relaxed">
                Реестры, договоры, эскроу и цифровой журнал. Система работает в правовом поле — публично, проверяемо.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 reveal">
            {[
              { i: 'FileCheck',  t: 'ЖНК / ЖСК',         d: 'Правовая форма объединения пайщиков' },
              { i: 'Vault',      t: 'Эскроу-счета',      d: 'Средства защищены на банковском уровне' },
              { i: 'Scale',      t: 'Реестр прав',       d: 'Росреестр, ЕГРН, публичные записи' },
              { i: 'FileSignature', t: 'Цифровая подпись', d: 'КЭП и юридическая значимость каждого действия' },
            ].map((c, i) => (
              <div key={c.t} className="glass rim rim-hover rounded-2xl p-8 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                  <Icon name={c.i} size={20} className="text-neon" />
                </div>
                <p className="font-bold text-lg mb-2 text-ink">{c.t}</p>
                <p className="text-sm text-haze/65 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section id="faq" className="relative py-32 px-6 lg:px-10">
        <div className="orb w-[500px] h-[500px] bottom-0 left-0 opacity-60" />

        <div className="relative max-w-[1100px] mx-auto">
          <div className="mb-16 reveal">
            <p className="kicker mb-6">Частые вопросы · 10</p>
            <h2 className="display text-5xl lg:text-[6rem] text-ink">
              Честные <span className="display-italic text-neon">ответы.</span>
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { q: 'Это не пирамида?',                      a: 'Нет. В системе нет дохода от привлечения новых участников. Деньги идут в землю, строительство, актив. КМ — цифровой ключ входа, а не финансовая пирамида.' },
              { q: 'А если проект не построится?',          a: 'Средства хранятся на эскроу. Система открыта и проверяема. Каждый этап — публичный акт. Нельзя «исчезнуть» без следа.' },
              { q: 'Что я получаю как участник КМ?',         a: 'Право войти в программу под проект раньше рынка, по другой цене и по другой логике. Либо получить специальные условия у партнёров.' },
              { q: 'Зачем здесь блокчейн?',                 a: 'Он фиксирует ключевые события системы так, что их нельзя переписать задним числом. Это инструмент доверия, а не «крипто-понты».' },
              { q: 'Сколько стоит КМ?',                     a: 'Стоимость входа публикуется при открытии программы. Это не инвестиционный продукт, а ключ участия.' },
            ].map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section id="join" className="relative py-32 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 img-cover img-vignette">
          <img src={IMG.quarter} alt="" className="w-full h-full object-cover scale-105" />
        </div>

        <div className="orb w-[700px] h-[700px] top-0 left-1/2 -translate-x-1/2 animate-glow" />

        <div className="relative z-10 max-w-[1200px] mx-auto text-center text-ink reveal">
          <span className="chip mb-8">
            <Icon name="AlertCircle" size={12} />
            Система в стадии тестирования · Не является офертой
          </span>

          <h2 className="display text-6xl sm:text-8xl lg:text-[11rem] mb-6 neon-grad">
            {t_cta('title_1', 'Войди в систему')}
          </h2>
          <h2 className="display-italic text-6xl sm:text-8xl lg:text-[11rem] mb-10 text-neon" style={{ textShadow: '0 0 80px hsla(168,100%,50%,0.4)' }}>
            {t_cta('title_2', 'раньше рынка.')}
          </h2>

          <p className="text-haze/85 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            КМ — цифровой ключ системы. Вход в контур будущего пайщика.
            Место в очереди, которая движется по другой логике.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Button size="lg" className="btn-neon text-[13px] px-12 h-16 rounded-md">
              {t_cta('cta_primary', 'Получить КМ')}
              <Icon name="ArrowUpRight" size={18} className="ml-2" />
            </Button>
            <Button size="lg" className="btn-ghost text-[13px] px-12 h-16 rounded-md">
              {t_cta('cta_secondary', 'Написать нам')}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-haze/60 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="chip-dot" />
              Открытие первых программ — Май 2026
            </div>
            <span className="hidden sm:inline text-haze/30">·</span>
            <div>Москва и регионы пилотных запусков</div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative py-16 px-6 lg:px-10 border-t border-border bg-[#0c0c0c]">
        <div className="wm-km" />
        <div className="relative max-w-[1500px] mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <img src={LOGO} alt="КМ" className="w-11 h-11 object-contain" />
                <div>
                  <p className="serif text-xl font-bold text-ink">
                    Крипто<span className="text-neon">Метры</span>
                  </p>
                  <p className="text-[10px] text-haze/45 mono-tech tracking-widest uppercase">Народная платформа жилья</p>
                </div>
              </div>
              <p className="text-haze/60 text-sm max-w-md leading-relaxed">
                Вы не дольщик. Вы — заказчик. Народная система, через которую можно реально идти к своей квартире по другой логике.
              </p>
            </div>
            <div>
              <p className="kicker mb-4">Разделы</p>
              <div className="flex flex-col gap-3">
                {nav.map(n => (
                  <button key={n.id} onClick={() => scroll(n.id)} className="text-left text-sm text-haze/70 hover:text-neon transition-colors">
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="kicker mb-4">Контакты</p>
              <div className="flex flex-col gap-3 text-sm text-haze/70">
                <span>hello@cryptometers.ru</span>
                <span>Москва</span>
                <span>Telegram-канал</span>
              </div>
            </div>
          </div>

          <div className="divider-neon mb-6" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-haze/40 text-xs mono-tech">
              © 2026 КриптоМетры. All rights reserved.
              {' · '}
              <Link to="/admin" className="hover:text-neon transition-colors">Админ</Link>
            </p>
            <p className="text-haze/40 text-xs mono-tech">Система в стадии тестирования. Не является публичной офертой.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full glass rim rim-hover rounded-2xl px-6 md:px-8 py-6 flex items-center justify-between gap-6 text-left transition-all"
      >
        <div className="flex items-center gap-5">
          <span className="mono-tech text-[11px] text-haze/45 tracking-[0.25em]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="font-semibold text-base md:text-lg text-ink">{q}</span>
        </div>
        <div className={`w-10 h-10 rounded-full bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/30 flex items-center justify-center shrink-0 transition-transform duration-500 ${open ? 'rotate-180 bg-[hsl(var(--neon))]/20' : ''}`}>
          <Icon name="ChevronDown" size={16} className="text-neon" />
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: open ? 320 : 0, opacity: open ? 1 : 0 }}
      >
        <p className="px-6 md:px-8 py-5 text-haze/75 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}