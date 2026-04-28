import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const DEFAULT_LOGO = 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/bucket/e42b3898-d2ef-44ff-b94f-465207ab3b2c.png';

const SECTIONS = [
  {
    group: 'О проекте',
    items: [
      { label: 'Что такое КриптоМетры', slug: '/about', desc: 'Суть системы и её философия', icon: 'Layers' },
      { label: 'Кооперативная модель', slug: '/cooperative', desc: 'Почему кооператив, а не девелопер', icon: 'Users' },
      { label: 'Правовая модель', slug: '/legal', desc: 'Юридическая структура и права участников', icon: 'Scale' },
      { label: 'Дорожная карта', slug: '/roadmap', desc: 'Этапы развития проекта', icon: 'Map' },
      { label: 'FAQ', slug: '/faq', desc: 'Ответы на частые вопросы', icon: 'CircleHelp' },
    ],
  },
  {
    group: 'Управляющая система',
    items: [
      { label: 'АО КСИ', slug: '/ao-ksi', desc: 'Управляющая компания проекта', icon: 'Building2' },
      { label: 'ИИ АО КСИ', slug: '/ai-ksi', desc: 'Искусственный интеллект в контуре управления', icon: 'Bot' },
      { label: 'Как работает запрос к ИИ', slug: '/how-ai', desc: 'Схема взаимодействия участника с ИИ', icon: 'Workflow' },
      { label: 'LSS — Служба земельного поиска', slug: '/lss', desc: 'Поиск и оценка земельных участков', icon: 'Search' },
    ],
  },
  {
    group: 'Экономика и токены',
    items: [
      { label: 'Фонд КриптоМетров', slug: '/fond', desc: 'Накопление и распределение КМ', icon: 'Wallet' },
      { label: 'Реестр КриптоМетров', slug: '/registry-km', desc: 'Публичный реестр выпущенных КМ', icon: 'Database' },
      { label: 'Реестр опыта', slug: '/registry-exp', desc: 'Профессиональный опыт участников', icon: 'Star' },
      { label: 'КриптоЭфир', slug: '/cryptoair', desc: 'Цифровой актив внутри экосистемы', icon: 'Zap' },
      { label: 'Калькулятор КМ', slug: '/calculator', desc: 'Рассчитай сколько КМ тебе нужно', icon: 'Calculator' },
    ],
  },
  {
    group: 'Участникам и партнёрам',
    items: [
      { label: 'Для участников', slug: '/for-members', desc: 'Права, обязанности, бонусы', icon: 'UserCheck' },
      { label: 'Для рекламодателей', slug: '/for-advertisers', desc: 'Форматы и партнёрства', icon: 'Megaphone' },
      { label: 'Медиаплатформа', slug: '/media', desc: 'Контент, обучение, сообщество', icon: 'Tv' },
    ],
  },
];

const SystemHub = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={DEFAULT_LOGO} alt="КриптоМетры" className="h-8 w-8 rounded-md object-cover" />
            <span className="font-bold text-sm tracking-wide text-white">КриптоМетры</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded transition-colors">
              Главная
            </Link>
            <Link to="/cabinet" className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded transition-colors">
              Кабинет
            </Link>
          </nav>
          <Button size="sm" asChild className="bg-[hsl(168_100%_50%)] text-black hover:bg-[hsl(168_100%_45%)] text-xs h-8">
            <Link to="/mining-kvartiry">Получить КМ</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-16 max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 border border-[hsl(168_100%_50%/0.3)] text-[hsl(168_100%_50%)] text-xs px-3 py-1 rounded-full mb-6">
          КриптоМетры · Архитектура системы
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Система<br />
          <span className="text-[hsl(168_100%_50%)]">изнутри.</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
          Все разделы, которые объясняют как устроены КриптоМетры — от юридической модели до работы ИИ.
        </p>
      </section>

      {/* CTA-баннеры */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Вступить', desc: 'Получить первые КМ', icon: 'UserPlus', href: '/mining-kvartiry', accent: true },
            { label: 'Рассчитать КМ', desc: 'Калькулятор', icon: 'Calculator', href: '/calculator', accent: false },
            { label: 'Задать вопрос ИИ', desc: 'Как это работает', icon: 'Bot', href: '/how-ai', accent: false },
            { label: 'Передать объект', desc: 'LSS — земельный поиск', icon: 'Map', href: '/lss', accent: false },
          ].map(btn => (
            <Link
              key={btn.href}
              to={btn.href}
              className="flex items-center gap-3 rounded-xl border p-4 transition-all hover:scale-[1.01]"
              style={{
                borderColor: btn.accent ? 'hsl(168 100% 50% / 0.4)' : 'rgba(255,255,255,0.07)',
                background:  btn.accent ? 'hsl(168 100% 50% / 0.08)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: btn.accent ? 'hsl(168 100% 50% / 0.15)' : 'rgba(255,255,255,0.05)' }}>
                <Icon name={btn.icon as 'Bot'} size={16} style={{ color: btn.accent ? 'hsl(168 100% 50%)' : 'rgba(255,255,255,0.4)' }} />
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: btn.accent ? 'hsl(168 100% 50%)' : 'rgba(255,255,255,0.85)' }}>{btn.label}</div>
                <div className="text-xs text-white/30">{btn.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-6xl mx-auto px-6 pb-24 space-y-14">
        {SECTIONS.map(group => (
          <div key={group.group}>
            <h2 className="text-xs uppercase tracking-widest text-white/30 mb-5 border-b border-white/8 pb-3">
              {group.group}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.items.map(item => (
                <Link
                  key={item.slug}
                  to={item.slug}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-white/8 hover:border-[hsl(168_100%_50%/0.3)] hover:bg-white/3 transition-all"
                >
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[hsl(168_100%_50%/0.1)] transition-colors">
                    <Icon name={item.icon as 'Layers'} size={16} className="text-white/40 group-hover:text-[hsl(168_100%_50%)] transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-white/90 group-hover:text-white transition-colors leading-snug mb-1">
                      {item.label}
                    </div>
                    <div className="text-xs text-white/40 leading-snug">{item.desc}</div>
                  </div>
                  <Icon name="ArrowRight" size={14} className="ml-auto mt-1 text-white/20 group-hover:text-white/50 shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="border-t border-white/8 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Готов войти в систему?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-[hsl(168_100%_50%)] text-black hover:bg-[hsl(168_100%_45%)] font-semibold">
              <Link to="/mining-kvartiry">Получить КМ</Link>
            </Button>
            <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/5">
              <Link to="/calculator">Рассчитать КМ</Link>
            </Button>
            <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/5">
              <Link to="/faq">FAQ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-white/30">
          <span>© 2026 КриптоМетры</span>
          <Link to="/admin" className="hover:text-white/50 transition-colors">Админ</Link>
        </div>
      </footer>
    </div>
  );
};

export default SystemHub;