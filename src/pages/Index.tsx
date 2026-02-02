import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState('home');

  const participants = [
    { id: 'land', label: 'Земля', icon: 'MapPin', color: 'text-secondary' },
    { id: 'developer', label: 'Девелопер', icon: 'Building2', color: 'text-primary' },
    { id: 'participants', label: 'Участники', icon: 'Users', color: 'text-accent' },
    { id: 'finance', label: 'Финансы', icon: 'Wallet', color: 'text-secondary' },
  ];

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'developers', label: 'Девелоперам' },
    { id: 'landowners', label: 'Землевладельцам' },
    { id: 'media', label: 'Рекламодателям и медиа' },
    { id: 'members', label: 'Участникам и пайщикам' },
    { id: 'contacts', label: 'Контакты' },
  ];

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight">КриптоМетры</div>
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm hover:text-primary transition-colors ${
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

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                Когда девелопмент становится системой
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                КриптоМетры — это эксперимент по созданию жилья по-другому.
                Мы исследуем, можно ли строить дома без лишних долгов, без гонки за продажами
                и с понятными правилами для всех участников.
              </p>
              <p className="text-sm text-muted-foreground">
                Проект находится в стадии формирования.<br />
                Мы не продаём квартиры — мы проектируем систему их создания.
              </p>
              <Button size="lg" className="text-lg px-8 py-6">
                Узнать больше
              </Button>
            </div>

            <div className="relative h-[600px] animate-fade-in">
              <svg className="w-full h-full" viewBox="0 0 600 600">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#E5DEFF" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                <line x1="150" y1="150" x2="450" y2="150" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse-slow" />
                <line x1="450" y1="150" x2="450" y2="450" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse-slow" />
                <line x1="450" y1="450" x2="150" y2="450" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse-slow" />
                <line x1="150" y1="450" x2="150" y2="150" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse-slow" />
                <line x1="150" y1="150" x2="450" y2="450" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse-slow" />
                <line x1="450" y1="150" x2="150" y2="450" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse-slow" />

                {participants.map((participant, index) => {
                  const positions = [
                    { x: 150, y: 150 },
                    { x: 450, y: 150 },
                    { x: 450, y: 450 },
                    { x: 150, y: 450 },
                  ];
                  const pos = positions[index];

                  return (
                    <g
                      key={participant.id}
                      onMouseEnter={() => setActiveNode(participant.id)}
                      onMouseLeave={() => setActiveNode(null)}
                      className="cursor-pointer transition-all duration-300"
                      style={{
                        transform: activeNode === participant.id ? 'scale(1.1)' : 'scale(1)',
                        transformOrigin: `${pos.x}px ${pos.y}px`,
                      }}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="50"
                        fill={activeNode === participant.id ? '#0EA5E9' : '#2C3440'}
                        stroke={activeNode === participant.id ? '#E5DEFF' : '#3F4856'}
                        strokeWidth="3"
                        className="transition-all duration-300"
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="600"
                      >
                        {participant.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
              {activeNode && (
                <div className="absolute bottom-0 left-0 right-0 bg-card p-6 rounded-lg border border-border animate-fade-in">
                  <p className="text-sm text-muted-foreground">
                    {activeNode === 'land' && 'Земля — фундамент системы, не объект перепродажи'}
                    {activeNode === 'developer' && 'Девелопер — профессиональный исполнитель без кредитного давления'}
                    {activeNode === 'participants' && 'Участники — заказчики результата, не дольщики'}
                    {activeNode === 'finance' && 'Финансы — инструмент создания, не цель проекта'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl font-black mb-8">Что это вообще такое</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p className="text-2xl text-foreground">
              КриптоМетры — это попытка собрать девелопмент как инженерную систему,
              а не как финансовый продукт.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" className="text-secondary mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-foreground">земля</p>
                    <p className="text-sm">это вход в систему</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Building2" className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-foreground">девелопер</p>
                    <p className="text-sm">не источник риска, а профессиональный исполнитель</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="Wallet" className="text-secondary mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-foreground">деньги</p>
                    <p className="text-sm">инструмент, а не цель</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Users" className="text-accent mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-foreground">участники</p>
                    <p className="text-sm">не дольщики, а заказчики результата</p>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Мы исследуем, можно ли собрать девелопмент иначе.<br />
              Если да — это меняет рынок.<br />
              Если нет — мы честно это зафиксируем.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-black mb-12">Кому это может быть интересно</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Девелоперам', icon: 'Building2', section: 'developers' },
              { label: 'Землевладельцам', icon: 'MapPin', section: 'landowners' },
              { label: 'Рекламодателям и медиа', icon: 'Megaphone', section: 'media' },
              { label: 'Инвесторам ранней стадии', icon: 'TrendingUp', section: 'members' },
              { label: 'Архитекторам', icon: 'Ruler', section: 'developers' },
              { label: 'IT и AI-командам', icon: 'Code', section: 'contacts' },
              { label: 'Юристам', icon: 'Scale', section: 'contacts' },
              { label: 'Исследователям рынка', icon: 'Search', section: 'contacts' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.section)}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-all duration-300 hover:scale-105 text-left group"
              >
                <Icon name={item.icon} className="text-primary mb-3 group-hover:scale-110 transition-transform" size={28} />
                <p className="text-sm font-medium">{item.label}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="developers" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h2 className="text-5xl font-black">Девелопер как профессионал, а не носитель риска</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Классический девелопмент перегружен рисками,
              которые не имеют отношения к строительству.
            </p>
            <div className="bg-background p-8 rounded-lg space-y-4">
              <p className="text-foreground font-semibold">Мы исследуем модель, где:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>девелопер не кредитуется под проект,</li>
                <li>не несёт маркетинговых и финансовых перегрузок,</li>
                <li>не продаёт «воздух»,</li>
                <li>а выполняет профессиональную функцию — проектирование, организация и строительство.</li>
              </ul>
            </div>
            <p>
              В КриптоМетрах девелопер — это исполнитель по модели fee-development,
              выбираемый системой и участниками.
            </p>
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="bg-background p-6 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">Что нам нужно</h3>
                <ul className="space-y-2 text-sm">
                  <li>• экспертиза</li>
                  <li>• прозрачность</li>
                  <li>• готовность работать в новой архитектуре</li>
                </ul>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">Что мы предлагаем</h3>
                <ul className="space-y-2 text-sm">
                  <li>• проекты без кредитного давления</li>
                  <li>• понятную экономику</li>
                  <li>• профессиональную среду без спекулятивного шума</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="landowners" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h2 className="text-5xl font-black">Земля как вклад в систему, а не объект перепродажи</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Мы рассматриваем землю не как товар,
              а как фундамент будущей системы.
            </p>
            <div className="bg-card p-8 rounded-lg space-y-4">
              <p className="text-foreground font-semibold">КриптоМетры исследуют модели, при которых земельный участок:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>может быть внесён в проект как вклад,</li>
                <li>участвует в создании стоимости,</li>
                <li>а не продаётся с дисконтом или замораживается годами.</li>
              </ul>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <h3 className="text-xl font-bold text-foreground mb-3">Нам интересны участки:</h3>
              <ul className="space-y-2 text-sm">
                <li>• под жилую застройку</li>
                <li>• с понятной градостроительной перспективой</li>
                <li>• в Москве и регионах пилотных запусков</li>
              </ul>
            </div>
            <p className="text-xl text-foreground">
              Мы не предлагаем срочную сделку.<br />
              Мы предлагаем участие в эксперименте.
            </p>
          </div>
        </div>
      </section>

      <section id="media" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h2 className="text-5xl font-black">Девелопмент как публичный процесс</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              КриптоМетры — это не только система,
              но и медийный эксперимент.
            </p>
            <div className="bg-background p-8 rounded-lg space-y-4">
              <p className="text-foreground font-semibold">Мы открыто фиксируем процесс:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>проектирования,</li>
                <li>выбора решений,</li>
                <li>ошибок и находок.</li>
              </ul>
            </div>
            <p>
              Нам интересны партнёры,
              которые готовы работать не с рекламой,
              а с документированием реального эксперимента.
            </p>
          </div>
        </div>
      </section>

      <section id="members" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h2 className="text-5xl font-black">Вы не дольщик. Вы — заказчик.</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              В КриптоМетрах нет покупки квартиры «у застройщика».
            </p>
            <div className="bg-card p-8 rounded-lg space-y-4">
              <p className="text-foreground font-semibold">Есть:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>коллективный заказ на создание жилья,</li>
                <li>участие в формировании проекта,</li>
                <li>контроль архитектуры, экономики и исполнения.</li>
              </ul>
            </div>
            <div className="bg-background p-8 rounded-lg space-y-4">
              <p className="text-foreground font-semibold">Участники системы:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>не инвестируют в компанию,</li>
                <li>не кредитуют застройщика,</li>
                <li>а формируют запрос на результат.</li>
              </ul>
            </div>
            <p className="text-sm">
              Продажи для участников планируются после завершения экспериментальной фазы.
            </p>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h2 className="text-5xl font-black">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background p-8 rounded-lg space-y-4">
              <h3 className="text-2xl font-bold">Статус проекта</h3>
              <p className="text-muted-foreground">Экспериментальная стадия</p>
            </div>
            <div className="bg-background p-8 rounded-lg space-y-4">
              <h3 className="text-2xl font-bold">Планируемый запуск</h3>
              <p className="text-muted-foreground">Май 2026 года — открытие первых программ участия</p>
            </div>
          </div>
          <div className="bg-background/50 border border-border p-6 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Важно:</strong> Проект не является публичной офертой.
              Вся информация носит ознакомительный характер.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 КриптоМетры. Экспериментальная система распределённого девелопмента.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
