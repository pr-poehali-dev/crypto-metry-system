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

  const participants = [
    { id: 'land', label: 'ЗЕМЛЯ', icon: 'MapPin', color: '#10b981', hash: '0x7f3e...a2c1' },
    { id: 'developer', label: 'ДЕВЕЛОПЕР', icon: 'Building2', color: '#a855f7', hash: '0x9b1c...4f8d' },
    { id: 'participants', label: 'УЧАСТНИКИ', icon: 'Users', color: '#eab308', hash: '0x3a7e...b9f2' },
    { id: 'finance', label: 'ФИНАНСЫ', icon: 'Wallet', color: '#10b981', hash: '0x5d2f...c4a8' },
  ];

  const navItems = [
    { id: 'home', label: 'MAIN' },
    { id: 'developers', label: 'DEVELOPERS' },
    { id: 'landowners', label: 'LANDOWNERS' },
    { id: 'media', label: 'MEDIA' },
    { id: 'members', label: 'MEMBERS' },
    { id: 'contacts', label: 'CONTACT' },
  ];

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[128px]" />
      </div>

      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold tracking-tighter gradient-text">КРИПТОМЕТРЫ</div>
              <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground border-l border-border pl-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>BLOCK #{blockHeight}</span>
              </div>
            </div>
            <div className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xs font-medium hover:text-primary transition-colors tracking-wider ${
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

      <section id="home" className="pt-32 pb-20 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in relative z-10">
              <div className="inline-block px-4 py-2 border border-primary/30 text-xs font-mono text-primary mb-4">
                EXPERIMENTAL SYSTEM v0.1.0
              </div>
              <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
                КОГДА<br />
                <span className="gradient-text">ДЕВЕЛОПМЕНТ</span><br />
                СТАНОВИТСЯ<br />
                СИСТЕМОЙ
              </h1>
              <div className="space-y-4 text-sm leading-relaxed max-w-xl font-mono">
                <p className="text-muted-foreground">
                  КриптоМетры — экспериментальная платформа распределённого девелопмента.
                  Мы строим инфраструктуру для создания жилья без долговой нагрузки,
                  с прозрачными алгоритмами и автоматизированным управлением.
                </p>
                <div className="flex items-center gap-2 text-xs text-accent">
                  <Icon name="AlertCircle" size={16} />
                  <span>Система в стадии тестирования • Не является офертой</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button size="lg" className="font-mono text-xs tracking-wider bg-primary hover:bg-primary/80 text-black">
                  ПОДКЛЮЧИТЬСЯ К СЕТИ
                </Button>
                <Button size="lg" variant="outline" className="font-mono text-xs tracking-wider">
                  ЧИТАТЬ WHITEPAPER
                </Button>
              </div>
            </div>

            <div className="relative h-[600px] animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-3xl" />
              <svg className="w-full h-full relative z-10" viewBox="0 0 600 600">
                <defs>
                  <linearGradient id="nodeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="nodeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                  <linearGradient id="nodeGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#ca8a04" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <line x1="150" y1="150" x2="450" y2="150" stroke="#10b981" strokeWidth="1" opacity="0.3" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                </line>
                <line x1="450" y1="150" x2="450" y2="450" stroke="#a855f7" strokeWidth="1" opacity="0.3" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                </line>
                <line x1="450" y1="450" x2="150" y2="450" stroke="#eab308" strokeWidth="1" opacity="0.3" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                </line>
                <line x1="150" y1="450" x2="150" y2="150" stroke="#10b981" strokeWidth="1" opacity="0.3" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                </line>
                <line x1="150" y1="150" x2="450" y2="450" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="450" y1="150" x2="150" y2="450" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />

                {participants.map((participant, index) => {
                  const positions = [
                    { x: 150, y: 150 },
                    { x: 450, y: 150 },
                    { x: 450, y: 450 },
                    { x: 150, y: 450 },
                  ];
                  const pos = positions[index];
                  const gradients = ['url(#nodeGradient1)', 'url(#nodeGradient2)', 'url(#nodeGradient3)', 'url(#nodeGradient1)'];

                  return (
                    <g
                      key={participant.id}
                      onMouseEnter={() => setActiveNode(participant.id)}
                      onMouseLeave={() => setActiveNode(null)}
                      className="cursor-pointer"
                      style={{ transition: 'all 0.3s' }}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={activeNode === participant.id ? "55" : "50"}
                        fill={participant.color}
                        opacity="0.2"
                        filter="url(#glow)"
                      />
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="45"
                        fill="rgba(10, 10, 10, 0.9)"
                        stroke={participant.color}
                        strokeWidth="2"
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 5}
                        textAnchor="middle"
                        fill={participant.color}
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="Space Grotesk"
                      >
                        {participant.label}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 10}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.4)"
                        fontSize="8"
                        fontFamily="IBM Plex Mono"
                      >
                        {participant.hash}
                      </text>
                    </g>
                  );
                })}
              </svg>
              {activeNode && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/90 border border-primary/30 p-4 font-mono animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-xs text-primary">NODE ACTIVE</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activeNode === 'land' && '> Земля как базовый актив в распределённом реестре'}
                    {activeNode === 'developer' && '> Девелопер как валидатор транзакций строительства'}
                    {activeNode === 'participants' && '> Участники как держатели токенов результата'}
                    {activeNode === 'finance' && '> Финансы как смарт-контракты распределения'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black mb-4 tracking-tighter">
              АРХИТЕКТУРА <span className="gradient-text">СИСТЕМЫ</span>
            </h2>
            <p className="text-sm text-muted-foreground font-mono">Девелопмент как протокол, а не продукт</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { 
                icon: 'MapPin', 
                label: 'ЗЕМЛЯ', 
                desc: 'Вход в систему',
                detail: 'Актив вносится в протокол как базовая ценность',
                color: 'border-primary'
              },
              { 
                icon: 'Building2', 
                label: 'ДЕВЕЛОПЕР', 
                desc: 'Исполнитель протокола',
                detail: 'Работает по модели fee-development без кредитов',
                color: 'border-secondary'
              },
              { 
                icon: 'Wallet', 
                label: 'ФИНАНСЫ', 
                desc: 'Смарт-контракты',
                detail: 'Автоматизированное распределение средств',
                color: 'border-accent'
              },
              { 
                icon: 'Users', 
                label: 'УЧАСТНИКИ', 
                desc: 'Заказчики результата',
                detail: 'Контроль через консенсус, не через дольщиков',
                color: 'border-primary'
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`tech-border p-6 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${item.color} border-2 bg-background/50`}>
                    <Icon name={item.icon} className="text-foreground" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold mb-1 tracking-wider">{item.label}</h3>
                    <p className="text-xs text-primary mb-2 font-mono">{item.desc}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 border border-border bg-card/30 backdrop-blur-sm font-mono text-xs">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Terminal" size={16} className="text-accent" />
              <span className="text-accent">СИСТЕМНЫЙ ВЫВОД:</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Если девелопмент можно собрать как инженерную систему → это меняет рынок.<br />
              Если нет → мы зафиксируем причины отказа в публичном репозитории.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-black mb-12 tracking-tighter">УЧАСТНИКИ <span className="gradient-text">ПРОТОКОЛА</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'ДЕВЕЛОПЕРЫ', icon: 'Building2', section: 'developers' },
              { label: 'ЗЕМЛЕВЛАДЕЛЬЦЫ', icon: 'MapPin', section: 'landowners' },
              { label: 'МЕДИА', icon: 'Megaphone', section: 'media' },
              { label: 'ИНВЕСТОРЫ', icon: 'TrendingUp', section: 'members' },
              { label: 'АРХИТЕКТОРЫ', icon: 'Ruler', section: 'developers' },
              { label: 'AI/IT КОМАНДЫ', icon: 'Code', section: 'contacts' },
              { label: 'ЮРИСТЫ', icon: 'Scale', section: 'contacts' },
              { label: 'АНАЛИТИКИ', icon: 'Search', section: 'contacts' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.section)}
                className="tech-border p-4 bg-card/30 backdrop-blur-sm hover:bg-card transition-all duration-300 text-left group"
              >
                <Icon name={item.icon} className="text-primary mb-2 group-hover:scale-110 transition-transform" size={20} />
                <p className="text-[10px] font-bold tracking-wider">{item.label}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="developers" className="py-20 px-6 border-t border-border bg-card/20">
        <div className="container mx-auto max-w-5xl space-y-8">
          <div className="inline-block px-3 py-1 border border-secondary/30 text-[10px] font-mono text-secondary mb-4">
            MODULE: DEVELOPERS
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
            ДЕВЕЛОПЕР КАК<br />
            <span className="gradient-text">ПРОФЕССИОНАЛ</span><br />
            А НЕ НОСИТЕЛЬ РИСКА
          </h2>
          <div className="space-y-6 text-sm leading-relaxed font-mono">
            <p className="text-muted-foreground">
              Классическая модель девелопмента перегружена рисками, не связанными с фактическим строительством.
            </p>
            <div className="tech-border p-6 bg-background/50 space-y-3">
              <p className="text-xs text-primary">// ИССЛЕДУЕМАЯ МОДЕЛЬ:</p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Девелопер не кредитуется под проект</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Отсутствие маркетинговой и финансовой перегрузки</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">→</span>
                  <span>Фокус на профессиональной функции: проектирование, организация, строительство</span>
                </li>
              </ul>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="tech-border p-5 bg-card/50">
                <h3 className="text-xs font-bold mb-3 text-accent">INPUT_REQUIRED:</h3>
                <ul className="space-y-1 text-[11px]">
                  <li>• Экспертиза</li>
                  <li>• Прозрачность</li>
                  <li>• Готовность к новой архитектуре</li>
                </ul>
              </div>
              <div className="tech-border p-5 bg-card/50">
                <h3 className="text-xs font-bold mb-3 text-primary">OUTPUT_PROVIDED:</h3>
                <ul className="space-y-1 text-[11px]">
                  <li>• Проекты без кредитного давления</li>
                  <li>• Понятная экономика</li>
                  <li>• Профессиональная среда</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="landowners" className="py-20 px-6 border-t border-border">
        <div className="container mx-auto max-w-5xl space-y-8">
          <div className="inline-block px-3 py-1 border border-primary/30 text-[10px] font-mono text-primary mb-4">
            MODULE: LANDOWNERS
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
            ЗЕМЛЯ КАК <span className="gradient-text">ВКЛАД</span><br />
            В СИСТЕМУ
          </h2>
          <div className="space-y-6 text-sm leading-relaxed font-mono">
            <p className="text-muted-foreground">
              Земельный участок рассматривается как базовый актив протокола, а не объект спекуляции.
            </p>
            <div className="tech-border p-6 bg-card/50 space-y-3">
              <p className="text-xs text-primary">// МОДЕЛЬ УЧАСТИЯ ЗЕМЛИ:</p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-accent">→</span>
                  <span>Вносится в проект как вклад</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">→</span>
                  <span>Участвует в создании стоимости</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">→</span>
                  <span>Не замораживается и не продаётся с дисконтом</span>
                </li>
              </ul>
            </div>
            <div className="tech-border p-5 bg-background/50">
              <h3 className="text-xs font-bold mb-3 text-secondary">ТРЕБОВАНИЯ К АКТИВУ:</h3>
              <ul className="space-y-1 text-[11px]">
                <li>→ Под жилую застройку</li>
                <li>→ Понятная градостроительная перспектива</li>
                <li>→ Москва / регионы пилотных запусков</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="media" className="py-20 px-6 border-t border-border bg-card/20">
        <div className="container mx-auto max-w-5xl space-y-8">
          <div className="inline-block px-3 py-1 border border-accent/30 text-[10px] font-mono text-accent mb-4">
            MODULE: MEDIA
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
            ДЕВЕЛОПМЕНТ КАК<br />
            <span className="gradient-text">ПУБЛИЧНЫЙ</span> ПРОЦЕСС
          </h2>
          <div className="space-y-6 text-sm leading-relaxed font-mono">
            <p className="text-muted-foreground">
              Система проектируется в открытом режиме с документированием всех решений и ошибок.
            </p>
            <div className="tech-border p-6 bg-background/50 space-y-3">
              <p className="text-xs text-accent">// ФИКСАЦИЯ ПРОЦЕССА:</p>
              <ul className="space-y-2 text-xs">
                <li>→ Проектирование решений</li>
                <li>→ Выбор архитектуры</li>
                <li>→ Ошибки и корректировки</li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground">
              Нам интересны партнёры для документирования эксперимента, а не рекламной активности.
            </p>
          </div>
        </div>
      </section>

      <section id="members" className="py-20 px-6 border-t border-border">
        <div className="container mx-auto max-w-5xl space-y-8">
          <div className="inline-block px-3 py-1 border border-primary/30 text-[10px] font-mono text-primary mb-4">
            MODULE: MEMBERS
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
            ВЫ НЕ ДОЛЬЩИК.<br />
            ВЫ — <span className="gradient-text">ЗАКАЗЧИК</span>
          </h2>
          <div className="space-y-6 text-sm leading-relaxed font-mono">
            <p className="text-muted-foreground">
              В системе отсутствует покупка квартиры «у застройщика». Есть коллективный заказ на результат.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="tech-border p-5 bg-card/50">
                <h3 className="text-xs font-bold mb-3 text-primary">ЕСТЬ:</h3>
                <ul className="space-y-1 text-[11px]">
                  <li>→ Коллективный заказ</li>
                  <li>→ Участие в формировании</li>
                  <li>→ Контроль исполнения</li>
                </ul>
              </div>
              <div className="tech-border p-5 bg-card/50">
                <h3 className="text-xs font-bold mb-3 text-secondary">НЕТ:</h3>
                <ul className="space-y-1 text-[11px]">
                  <li>→ Инвестиции в компанию</li>
                  <li>→ Кредитование застройщика</li>
                  <li>→ Покупки «воздуха»</li>
                </ul>
              </div>
            </div>
            <div className="tech-border p-4 bg-background/50 text-xs text-accent">
              <Icon name="Info" className="inline mr-2" size={14} />
              Продажи планируются после завершения экспериментальной фазы
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6 border-t border-border bg-card/20">
        <div className="container mx-auto max-w-5xl space-y-8">
          <div className="inline-block px-3 py-1 border border-accent/30 text-[10px] font-mono text-accent mb-4">
            MODULE: STATUS
          </div>
          <h2 className="text-4xl font-black tracking-tighter mb-8">СИСТЕМНЫЙ <span className="gradient-text">СТАТУС</span></h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="tech-border p-6 bg-background/50 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                <h3 className="text-sm font-bold">СТАТУС ПРОЕКТА</h3>
              </div>
              <p className="text-xs text-muted-foreground font-mono">Экспериментальная стадия • Тестирование протокола</p>
            </div>
            <div className="tech-border p-6 bg-background/50 space-y-3">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <h3 className="text-sm font-bold">ЗАПУСК СИСТЕМЫ</h3>
              </div>
              <p className="text-xs text-muted-foreground font-mono">Май 2026 → Открытие первых программ участия</p>
            </div>
          </div>
          <div className="tech-border p-5 bg-background/80 border-accent/50">
            <div className="flex items-start gap-3">
              <Icon name="AlertTriangle" className="text-accent mt-1" size={20} />
              <div className="text-xs font-mono space-y-1">
                <p className="text-accent font-bold">DISCLAIMER:</p>
                <p className="text-muted-foreground">
                  Проект не является публичной офертой. Вся информация носит
                  исследовательский характер и может быть изменена.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="gradient-text font-bold">КРИПТОМЕТРЫ</div>
            <div className="text-muted-foreground">
              © 2026 • Экспериментальная система распределённого девелопмента
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-muted-foreground">NETWORK ACTIVE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
