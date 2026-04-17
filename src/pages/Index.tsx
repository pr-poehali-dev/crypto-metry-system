import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [blockHeight, setBlockHeight] = useState(1847234);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight(prev => prev + 1);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'how', label: 'Как работает' },
    { id: 'system', label: 'Система' },
    { id: 'transparency', label: 'Прозрачность' },
    { id: 'mortgage', label: 'Без ипотеки' },
    { id: 'contacts', label: 'Контакты' },
  ];

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const systemNodes = [
    {
      id: 'land',
      label: 'Земля',
      sub: 'Основа проекта',
      color: '#10b981',
      icon: 'MapPin',
      desc: 'Земля входит в систему как базовый актив, а не как повод для перепродажи и спекуляции.',
    },
    {
      id: 'developer',
      label: 'Девелопер',
      sub: 'Профессионал, а не носитель риска',
      color: '#a855f7',
      icon: 'Building2',
      desc: 'Девелопер должен строить, а не тонуть в кредитах, продажах и чужой финансовой нагрузке.',
    },
    {
      id: 'finance',
      label: 'Финансы',
      sub: 'Кристально публично',
      color: '#eab308',
      icon: 'Wallet',
      desc: 'Все ключевые движения денег, этапы, документы и события видны участникам системы.',
    },
    {
      id: 'participants',
      label: 'Участники',
      sub: 'Будущие заказчики результата',
      color: '#10b981',
      icon: 'Users',
      desc: 'Не дольщики, не пассивные покупатели, а люди, под которых создаётся проект.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[128px]" />
      </div>

      <div className="fixed top-0 right-0 w-1/3 h-1/2 opacity-10 pointer-events-none">
        <img
          src="https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/9167b33d-7e3d-4a6a-bb00-2f40d7705bb1.jpg"
          alt=""
          className="w-full h-full object-cover mix-blend-lighten"
        />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold tracking-tighter gradient-text">КРИПТОМЕТРЫ</div>
              <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground border-l border-border pl-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="font-mono">Блок #{blockHeight}</span>
              </div>
            </div>
            <div className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xs font-medium hover:text-primary transition-colors ${
                    currentSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 1. HERO */}
      <section id="home" className="pt-32 pb-24 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in relative z-10">
              <div className="inline-block px-4 py-2 border border-primary/30 text-xs font-mono text-primary">
                Система в стадии тестирования • Не является офертой
              </div>

              <div className="space-y-2">
                <p className="text-sm font-mono text-muted-foreground tracking-widest uppercase">Когда девелопмент становится системой</p>
                <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
                  КРИПТО<span className="gradient-text">МЕТРЫ</span>
                </h1>
                <p className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground/80 pt-2">
                  Майним недвижимость
                </p>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                Когда устал переплачивать — и решил строить по уму.<br /><br />
                Не брать у рынка готовую квартиру по цене, в которую уже зашиты чужие кредиты,
                реклама, риски и жирная наценка. А зайти раньше, объединиться с другими и прийти
                к своему жилью как будущий заказчик — а не запоздавший покупатель.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  'Вы не дольщик. Вы — заказчик',
                  'До 30% ниже рынка — цель системы',
                  'Все деньги системы — в смартфоне 24/7',
                  'Приедь на стройку. Сам. Лично.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">→</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="font-mono text-sm tracking-wider bg-primary hover:bg-primary/80 text-black font-bold">
                  Получить КМ
                </Button>
                <Button size="lg" variant="outline" className="font-mono text-sm tracking-wider" onClick={() => scrollToSection('how')}>
                  Как это работает
                </Button>
              </div>
            </div>

            {/* SVG схема */}
            <div className="relative h-[580px] animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <svg className="w-full h-full relative z-10" viewBox="0 0 600 600">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {[
                  { x1: 150, y1: 150, x2: 450, y2: 150, color: '#10b981' },
                  { x1: 450, y1: 150, x2: 450, y2: 450, color: '#a855f7' },
                  { x1: 450, y1: 450, x2: 150, y2: 450, color: '#eab308' },
                  { x1: 150, y1: 450, x2: 150, y2: 150, color: '#10b981' },
                ].map((line, i) => (
                  <line
                    key={i}
                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke={line.color} strokeWidth="1" opacity="0.35" strokeDasharray="6,4"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.2s" repeatCount="indefinite" />
                  </line>
                ))}
                <line x1="150" y1="150" x2="450" y2="450" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4,6" />
                <line x1="450" y1="150" x2="150" y2="450" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4,6" />

                <circle cx="300" cy="300" r="30" fill="rgba(10,10,10,0.95)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <text x="300" y="296" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="IBM Plex Mono">СИСТЕМА</text>
                <text x="300" y="308" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="IBM Plex Mono">КМ</text>

                {systemNodes.map((node, index) => {
                  const positions = [
                    { x: 150, y: 150 },
                    { x: 450, y: 150 },
                    { x: 450, y: 450 },
                    { x: 150, y: 450 },
                  ];
                  const pos = positions[index];
                  const isActive = activeNode === node.id;

                  return (
                    <g
                      key={node.id}
                      onMouseEnter={() => setActiveNode(node.id)}
                      onMouseLeave={() => setActiveNode(null)}
                      className="cursor-pointer"
                    >
                      <circle cx={pos.x} cy={pos.y} r={isActive ? 58 : 52} fill={node.color} opacity="0.15" filter="url(#glow)" />
                      <circle
                        cx={pos.x} cy={pos.y} r="46"
                        fill="rgba(10,10,10,0.95)"
                        stroke={node.color}
                        strokeWidth={isActive ? 2 : 1}
                      />
                      <text x={pos.x} y={pos.y - 8} textAnchor="middle" fill={node.color} fontSize="11" fontWeight="700" fontFamily="Space Grotesk">
                        {node.label.toUpperCase()}
                      </text>
                      <text x={pos.x} y={pos.y + 8} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="IBM Plex Mono">
                        {node.sub.split(',')[0].substring(0, 14)}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {activeNode && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/95 border border-primary/30 p-4 font-mono animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-xs text-primary font-bold">{systemNodes.find(n => n.id === activeNode)?.label.toUpperCase()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {systemNodes.find(n => n.id === activeNode)?.desc}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. БОЛЬ */}
      <section className="py-20 px-6 border-t border-border relative">
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-5 pointer-events-none">
          <img
            src="https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/a55f0b31-3b14-4e9a-97bc-2104bef12857.jpg"
            alt=""
            className="w-full h-full object-cover mix-blend-lighten"
          />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">
            Почему обычная квартира<br /><span className="gradient-text">такая дорогая</span>
          </h2>
          <p className="text-base text-muted-foreground mb-10 max-w-xl">
            Потому что ты платишь не только за бетон и стены.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {[
              { label: 'Дорогой вход в землю', icon: 'MapPin' },
              { label: 'Банковские проценты', icon: 'Percent' },
              { label: 'Продажи и реклама', icon: 'Megaphone' },
              { label: 'Чужие ошибки', icon: 'AlertTriangle' },
              { label: 'Чужая прибыль', icon: 'TrendingUp' },
              { label: '…и только потом — квартира', icon: 'Home' },
            ].map((item) => (
              <div key={item.label} className="tech-border p-4 bg-card/40 backdrop-blur-sm flex items-start gap-3">
                <Icon name={item.icon} size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="tech-border p-6 bg-background/70">
            <p className="text-base font-bold">
              КриптоМетры — это попытка развернуть эту логику.{' '}
              <span className="text-primary">Не покупать в самом конце по полной цене. А входить раньше.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. ГЛАВНАЯ ИДЕЯ */}
      <section className="py-20 px-6 border-t border-border bg-card/10">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6">
            Вы не дольщик.<br /><span className="gradient-text">Вы — заказчик</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="tech-border p-6 bg-card/50 space-y-3">
              <div className="text-xs font-mono text-muted-foreground mb-2">СТАРАЯ МОДЕЛЬ</div>
              <h3 className="font-bold text-lg">Дольщик</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ему продают то, что уже решили построить без него. Он приходит последним. Молчит. Подписывает то, что принесли.
              </p>
            </div>
            <div className="tech-border p-6 bg-card/50 space-y-3 border-primary/40">
              <div className="text-xs font-mono text-primary mb-2">НОВАЯ МОДЕЛЬ</div>
              <h3 className="font-bold text-lg">Пайщик-заказчик</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Входит раньше. Участвует в системе. Дом создаётся под него, а не продаётся ему.
              </p>
            </div>
          </div>
          <div className="mt-8 p-6 border-l-2 border-primary bg-background/50">
            <p className="text-base leading-relaxed">
              Мы возвращаем человеку роль заказчика. Не молчаливого покупателя, который подписывает то, что ему принесли,
              а участника, который заходит в систему раньше рынка и идёт к своему жилью по другой логике.
            </p>
          </div>
        </div>
      </section>

      {/* 4. АРХИТЕКТУРА СИСТЕМЫ */}
      <section id="system" className="py-20 px-6 border-t border-border relative">
        <div className="absolute bottom-0 right-0 w-2/5 h-3/4 opacity-5 pointer-events-none">
          <img
            src="https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/621654ca-16af-469e-a494-60288e6e3ed0.jpg"
            alt=""
            className="w-full h-full object-cover mix-blend-lighten"
          />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-2">
              Как устроена <span className="gradient-text">система</span>
            </h2>
            <p className="text-muted-foreground text-sm font-mono">Как по старинке. Только с технологиями.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemNodes.map((node) => (
              <div key={node.id} className="tech-border p-6 bg-card/40 backdrop-blur-sm group hover:bg-card/70 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 border" style={{ borderColor: node.color + '60' }}>
                    <Icon name={node.icon} size={20} style={{ color: node.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{node.label}</h3>
                    <p className="text-xs font-mono" style={{ color: node.color }}>{node.sub}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{node.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 border border-border bg-card/30 font-mono text-sm">
            <Icon name="Terminal" size={16} className="text-accent inline mr-2" />
            Если девелопмент можно собрать как систему — рынок меняется.{' '}
            <span className="text-muted-foreground">Если нет — мы публично покажем, где и почему он ломается.</span>
          </div>
        </div>
      </section>

      {/* 5. ЧТО ПОЛУЧАЕТ УЧАСТНИК */}
      <section className="py-20 px-6 border-t border-border bg-card/10">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-12">
            Что получает <span className="gradient-text">участник</span> системы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: 'BadgePercent',
                title: 'Не переплачивает',
                desc: 'Не кормит банковский процент, лишние прокладки и чужую наценку.',
                color: '#10b981',
              },
              {
                icon: 'Vote',
                title: 'Имеет право влиять',
                desc: 'Не сидит молча, пока всё решили без него.',
                color: '#a855f7',
              },
              {
                icon: 'HardHat',
                title: 'Может прийти на стройку',
                desc: 'Приехать на объект и своими глазами увидеть, как реально идут работы.',
                color: '#eab308',
              },
              {
                icon: 'Smartphone',
                title: 'Все деньги на ладони',
                desc: 'Каждый рубль системы виден в смартфоне 24 часа в сутки.',
                color: '#10b981',
              },
              {
                icon: 'Wrench',
                title: 'Платит за работу',
                desc: 'Не за красивые обещания, а за реальный результат.',
                color: '#a855f7',
              },
              {
                icon: 'Unlock',
                title: 'Без ипотечной кабалы',
                desc: 'Внутренняя беспроцентная рассрочка до 20 лет. Накопительная система. Криптотека.',
                color: '#eab308',
              },
            ].map((item) => (
              <div key={item.title} className="tech-border p-5 bg-card/40 hover:bg-card/70 transition-all duration-300">
                <div className="mb-3">
                  <Icon name={item.icon} size={24} style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ПРОЗРАЧНОСТЬ */}
      <section id="transparency" className="py-20 px-6 border-t border-border relative">
        <div className="absolute top-0 left-0 w-1/3 h-full opacity-5 pointer-events-none">
          <img
            src="https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/9167b33d-7e3d-4a6a-bb00-2f40d7705bb1.jpg"
            alt=""
            className="w-full h-full object-cover mix-blend-lighten"
          />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">
            Все деньги <span className="gradient-text">на ладони</span>
          </h2>
          <p className="text-xl font-bold mb-2">Кристально публично.</p>
          <p className="text-muted-foreground text-sm mb-10">Все деньги системы — у тебя в смартфоне 24/7.</p>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-3">
              <p className="text-xs font-mono text-primary mb-4">// ТЫ ВИДИШЬ:</p>
              {[
                'Сколько собрано',
                'Сколько лежит на счёте',
                'Куда ушёл каждый платёж',
                'Что оплачено',
                'Что строится',
                'Что осталось в резерве',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="tech-border p-6 bg-card/40 space-y-4">
              <p className="text-xs font-mono text-secondary mb-4">// БЕЗОПАСНОСТЬ КОНТУРА:</p>
              {[
                { icon: 'Lock', label: 'Шифрование' },
                { icon: 'FileText', label: 'Цифровой журнал действий' },
                { icon: 'Database', label: 'Прозрачный реестр событий' },
                { icon: 'Link', label: 'Блокчейн-фиксация важных данных' },
                { icon: 'Bot', label: 'ИИ-контроль движения средств' },
                { icon: 'Archive', label: 'Архив документов в одном месте' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                  <Icon name={item.icon} size={16} className="text-muted-foreground shrink-0" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 border-l-2 border-primary text-xl font-black tracking-tight">
            Не «доверяйте нам». <span className="gradient-text">Смотрите сами.</span>
          </div>
        </div>
      </section>

      {/* 7. КАЧЕСТВО */}
      <section className="py-20 px-6 border-t border-border bg-card/10">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">
            Строят только те,<br />кто <span className="gradient-text">прошёл отбор</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-xl">
            В систему допускаются только аккредитованные девелоперы и подрядчики.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {[
              { label: 'Опыт и сданные объекты', icon: 'Award' },
              { label: 'Репутация', icon: 'Star' },
              { label: 'Прозрачные сметы', icon: 'ClipboardList' },
              { label: 'Открытый контур', icon: 'Eye' },
              { label: 'Цифровой контроль', icon: 'Monitor' },
              { label: 'Ответственность перед людьми', icon: 'Users' },
            ].map((item) => (
              <div key={item.label} className="tech-border p-4 bg-card/40 flex items-start gap-3">
                <Icon name={item.icon} size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="p-6 border-l-2 border-accent text-sm font-bold">
            Не каждый застройщик нам подходит.{' '}
            <span className="text-muted-foreground font-normal">
              Народный дом будут строить только те, кто готов строить честно.
            </span>
          </div>
        </div>
      </section>

      {/* 8. БЕЗ ИПОТЕКИ */}
      <section id="mortgage" className="py-20 px-6 border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">
            Без ипотечной <span className="gradient-text">кабалы</span>
          </h2>
          <p className="text-base text-muted-foreground mb-10">Вместо банковской удавки — своя логика.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Беспроцентная рассрочка', sub: 'до 20 лет', icon: 'Calendar' },
              { label: 'Накопительная программа', sub: 'без переплат', icon: 'PiggyBank' },
              { label: 'Коммерческие субсидии', sub: 'от партнёров', icon: 'Handshake' },
              { label: 'Криптотека', sub: 'новый инструмент', icon: 'Layers' },
            ].map((item) => (
              <div key={item.label} className="tech-border p-5 bg-card/40 text-center space-y-2">
                <Icon name={item.icon} size={24} className="text-primary mx-auto" />
                <p className="text-sm font-bold">{item.label}</p>
                <p className="text-xs text-muted-foreground font-mono">{item.sub}</p>
              </div>
            ))}
          </div>
          <div className="p-6 border-l-2 border-primary text-base font-bold">
            Не платить банку полжизни.{' '}
            <span className="text-muted-foreground font-normal">А собирать своё жильё внутри системы.</span>
          </div>
        </div>
      </section>

      {/* 9. МАЙНИМ ЧЕРЕЗ УЧАСТИЕ */}
      <section className="py-20 px-6 border-t border-border bg-card/10">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">
            Майним недвижимость <span className="gradient-text">через участие</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-xl">
            Система растёт не только на деньгах. Она растёт на людях, охвате, рекомендациях и общей силе сообщества.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              'Участвуешь в системе',
              'Приводишь людей',
              'Усиливаешь охват',
              'Партнёры дают комиссии и субсидии',
              'Часть ценности возвращается в систему',
              'Работает на твой цифровой баланс',
            ].map((item, i) => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <span className="text-xs font-mono text-muted-foreground w-6">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-primary">→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="p-6 border-l-2 border-secondary text-base font-bold">
            Не просто смотришь.{' '}
            <span className="gradient-text">Участвуешь — и растишь свой путь к квартире.</span>
          </div>
        </div>
      </section>

      {/* 10. КАК ЭТО РАБОТАЕТ */}
      <section id="how" className="py-20 px-6 border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">
            Как это <span className="gradient-text">работает</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-12 max-w-2xl">
            Скидываемся. Покупаем землю. Нанимаем девелопера. Контролируем стройку. Принимаем результат. Живём в доме, который создавался под нас.
          </p>
          <div className="space-y-4">
            {[
              { step: '01', title: 'Покупаешь КМ', desc: 'И входишь в систему как будущий участник.' },
              { step: '02', title: 'Получаешь доступ', desc: 'К закрытому контуру, карте проектов и личному кабинету.' },
              { step: '03', title: 'Следишь за площадками', desc: 'Выбираешь, куда тебе реально интересно зайти.' },
              { step: '04', title: 'Открывается программа', desc: 'По проекту — получаешь доступ по правилам системы.' },
              { step: '05', title: 'Движешься к жилью', desc: 'Как будущий пайщик, а не как запоздавший покупатель.' },
              { step: '06', title: 'Если планы изменились', desc: 'КМ всё равно даёт выгоду у партнёров при покупке обычной квартиры.' },
            ].map((item) => (
              <div key={item.step} className="tech-border p-5 bg-card/30 hover:bg-card/60 transition-all duration-300 flex items-start gap-6">
                <span className="text-3xl font-black text-primary/30 font-mono leading-none shrink-0">{item.step}</span>
                <div>
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. ДВА ПУТИ */}
      <section className="py-20 px-6 border-t border-border bg-card/10">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-12">
            Два пути одного <span className="gradient-text">КриптоМетра</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="tech-border p-8 bg-card/40 space-y-4 border-primary/40">
              <div className="text-xs font-mono text-primary">ПУТЬ ПЕРВЫЙ</div>
              <h3 className="text-2xl font-black tracking-tight">Народный путь</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Идёшь к своей квартире через кооперативную логику и контур будущего пайщика. Входишь раньше рынка. Платишь меньше. Контролируешь сам.
              </p>
            </div>
            <div className="tech-border p-8 bg-card/40 space-y-4">
              <div className="text-xs font-mono text-muted-foreground">ПУТЬ ВТОРОЙ</div>
              <h3 className="text-2xl font-black tracking-tight">Классический путь</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Если хочешь купить квартиру уже сейчас по обычной модели — получаешь специальные условия у партнёров системы.
              </p>
            </div>
          </div>
          <div className="p-5 border border-border bg-background/50 text-sm text-center text-muted-foreground">
            Даже если передумал строить через кооператив —{' '}
            <span className="text-foreground font-bold">КМ всё равно работает в плюс.</span>
          </div>
        </div>
      </section>

      {/* 12. ПРИМЕР НА ЦИФРАХ */}
      <section className="py-20 px-6 border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">
            Как рынок <span className="gradient-text">съедает деньги</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-xl">
            Допустим, обычная квартира на рынке стоит 10 млн рублей. В этой цене уже могут сидеть:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {[
              'Дорогая земля',
              'Проценты по кредитам',
              'Реклама и продажи',
              'Девелоперская прибыль',
              'Запас на риски',
              'Накладные расходы',
            ].map((item) => (
              <div key={item} className="tech-border p-4 bg-card/30 text-sm text-center">
                <span className="text-primary font-bold">+</span> {item}
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="tech-border p-6 bg-card/40 space-y-3">
              <div className="text-xs font-mono text-muted-foreground">ПО КЛАССИКЕ</div>
              <h3 className="font-bold">Купил по рынку</h3>
              <p className="text-sm text-muted-foreground">
                Сверху — ипотечный процент. Снизу — годы обязательств перед банком.
              </p>
            </div>
            <div className="tech-border p-6 bg-card/40 space-y-3 border-primary/40">
              <div className="text-xs font-mono text-primary">ЧЕРЕЗ КРИПТОМЕТРЫ</div>
              <h3 className="font-bold">Цель системы</h3>
              <p className="text-sm text-muted-foreground">
                Дать участнику путь к жилью{' '}
                <span className="text-foreground font-bold">до 30% ниже рынка</span>{' '}
                за счёт другой модели входа, накопления, контроля и организации проекта.
              </p>
            </div>
          </div>
          <div className="p-4 border border-border/50 bg-card/20 text-xs text-muted-foreground font-mono">
            <Icon name="Info" size={12} className="inline mr-2" />
            Это модельный пример, а не обещание фиксированной цены. Конкретные условия зависят от проекта, документов, сметы и правил программы.
          </div>
        </div>
      </section>

      {/* CONTACTS / CTA */}
      <section id="contacts" className="py-24 px-6 border-t border-border bg-card/20 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <img
            src="https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/621654ca-16af-469e-a494-60288e6e3ed0.jpg"
            alt=""
            className="w-full h-full object-cover mix-blend-lighten"
          />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-8">
          <div className="inline-block px-4 py-2 border border-primary/30 text-xs font-mono text-primary">
            Система в стадии тестирования • Экспериментальная фаза
          </div>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">
            Войди в систему<br /><span className="gradient-text">раньше рынка</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            КМ — цифровой ключ системы. Вход в контур будущего пайщика. Не акция, не валюта, не обещание конкретной квартиры — а место в очереди, которая движется по другой логике.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="font-mono text-sm tracking-wider bg-primary hover:bg-primary/80 text-black font-bold px-8">
              Получить КМ
            </Button>
            <Button size="lg" variant="outline" className="font-mono text-sm tracking-wider px-8">
              Написать нам
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground font-mono">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span>Открытие первых программ участия — Май 2026</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="gradient-text font-bold text-base">КРИПТОМЕТРЫ</div>
            <div className="text-muted-foreground text-center">
              © 2026 • Народная система жилья нового типа.<br className="md:hidden" />
              {' '}Экспериментальная стадия.
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-muted-foreground">Блок #{blockHeight}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
