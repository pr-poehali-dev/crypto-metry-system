import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const IMGS = {
  hero:         'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/841a898e-bf89-4aa5-b069-25c9e0233c37.jpg',
  complex:      'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/8256c94c-8ef3-4db7-8d5f-195bc03671ef.jpg',
  construction: 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/65fd4b2c-c552-449f-8152-13624dee3b44.jpg',
  couple:       'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/daa465db-44b8-401e-b607-3c0266d01b09.jpg',
};

const navItems = [
  { id: 'idea',     label: 'Идея' },
  { id: 'how',      label: 'Как работает' },
  { id: 'benefits', label: 'Участнику' },
  { id: 'money',    label: 'Финансы' },
  { id: 'steps',    label: 'Шаги' },
  { id: 'cta',      label: 'Войти в систему' },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scroll = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scroll('hero')} className="flex items-center gap-2">
            <span className="serif text-xl font-black tracking-tight">КриптоМетры</span>
            <span className="hidden sm:inline text-xs text-muted-foreground border border-border px-2 py-0.5 rounded-sm sans">
              бета
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {navItems.map(n => (
              <button
                key={n.id}
                onClick={() => scroll(n.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors sans"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <Button
            size="sm"
            className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-white sans font-semibold"
            onClick={() => scroll('cta')}
          >
            Получить КМ
          </Button>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(v => !v)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white px-6 py-4 flex flex-col gap-4">
            {navItems.map(n => (
              <button key={n.id} onClick={() => scroll(n.id)} className="text-left text-sm font-medium sans">
                {n.label}
              </button>
            ))}
            <Button className="bg-accent text-white w-full sans" onClick={() => scroll('cta')}>
              Получить КМ
            </Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative h-screen min-h-[640px] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 img-overlay">
          <img src={IMGS.hero} alt="Жилой квартал" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-white/60 text-sm sans font-medium tracking-widest uppercase mb-4">
              Когда девелопмент становится системой
            </p>
            <h1 className="text-white text-5xl sm:text-7xl lg:text-8xl font-black leading-none mb-6">
              Майним<br />
              <span className="text-accent">недвижимость</span>
            </h1>
            <p className="text-white/80 text-lg sm:text-xl max-w-xl leading-relaxed mb-10 sans">
              Устал переплачивать? Зайди в систему раньше рынка. Объединись с другими.
              Получи жильё как будущий заказчик — не как запоздавший покупатель.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white sans font-semibold text-base px-8"
                onClick={() => scroll('cta')}
              >
                Получить КМ
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 sans font-semibold text-base px-8"
                onClick={() => scroll('how')}
              >
                Как это работает
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 z-10 bg-black/50 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 divide-x divide-white/20">
            {[
              { val: 'до 30%', label: 'ниже рынка' },
              { val: '24/7',   label: 'деньги на ладони' },
              { val: '0%',     label: 'рассрочка до 20 лет' },
            ].map(s => (
              <div key={s.val} className="text-center px-4">
                <p className="text-white text-2xl font-black serif">{s.val}</p>
                <p className="text-white/55 text-xs sans">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОЛЬ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent sans font-semibold text-sm uppercase tracking-widest mb-4">Проблема</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Почему обычная квартира такая дорогая?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Потому что ты платишь не только за бетон и стены.
            </p>
            <div className="space-y-3 mb-10">
              {[
                { icon: 'MapPin',      text: 'Дорогой вход в землю' },
                { icon: 'Percent',     text: 'Банковские проценты застройщика' },
                { icon: 'Megaphone',   text: 'Расходы на рекламу и продажи' },
                { icon: 'AlertCircle', text: 'Чужие ошибки и риски' },
                { icon: 'TrendingUp',  text: 'Чужая прибыль' },
                { icon: 'Home',        text: '…и только потом — сама квартира' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={15} className="text-accent" />
                  </div>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="accent-bar">
              <p className="text-base font-semibold sans leading-relaxed">
                КриптоМетры — попытка развернуть логику. Не покупать в конце по полной цене. А входить раньше.
              </p>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden h-[480px] shadow-2xl">
            <img src={IMGS.complex} alt="Жилой комплекс" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-2xl font-black serif">Другая логика.</p>
              <p className="text-sm text-white/70 mt-1 sans">Вход раньше рынка — разница на выходе</p>
            </div>
          </div>
        </div>
      </section>

      {/* ИДЕЯ */}
      <section id="idea" className="section-cream py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-accent sans font-semibold text-sm uppercase tracking-widest mb-4">Ключевая идея</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Вы не дольщик.<br />Вы — заказчик
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Дольщику продают то, что уже решили построить без него. Пайщик входит раньше
              и участвует в системе как человек, под которого создаётся проект.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: 'UserX', title: 'Дольщик',
                accent: 'bg-red-50 text-red-500',
                dot: 'bg-red-300',
                items: ['Приходит последним', 'Платит полную цену', 'Молчит и подписывает', 'Ждёт, что будет'],
              },
              {
                icon: 'ArrowRight', title: 'Разница',
                accent: 'bg-accent/10 text-accent',
                dot: 'bg-accent',
                items: ['Момент входа', 'Уровень цены', 'Право голоса', 'Прозрачность'],
                highlight: true,
              },
              {
                icon: 'UserCheck', title: 'Заказчик-пайщик',
                accent: 'bg-green-50 text-green-600',
                dot: 'bg-green-400',
                items: ['Входит раньше рынка', 'Идёт к цене без наценки', 'Влияет и контролирует', 'Видит каждый рубль'],
              },
            ].map(col => (
              <div
                key={col.title}
                className={`bg-white rounded-xl p-7 shadow-sm card-lift ${col.highlight ? 'border-2 border-accent' : ''}`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-5 ${col.accent}`}>
                  <Icon name={col.icon} size={20} />
                </div>
                <h3 className="sans font-bold text-lg mb-4">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map(item => (
                    <li key={item} className="text-sm flex items-center gap-2 text-muted-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${col.dot}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-base mt-12 max-w-xl mx-auto sans">
            Мы возвращаем человеку роль заказчика — не молчаливого покупателя, а участника, который идёт к жилью по другой логике.
          </p>
        </div>
      </section>

      {/* КАК УСТРОЕНА СИСТЕМА */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="text-accent sans font-semibold text-sm uppercase tracking-widest mb-4">Архитектура</p>
              <h2 className="text-4xl sm:text-5xl font-black mb-6">Как устроена система</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Как по-старинке. Только с технологиями. Земля, профессиональный девелопер, прозрачные финансы
                и люди, которые заказывают — а не покупают.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden h-72 shadow-xl">
              <img src={IMGS.construction} alt="Стройка" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="font-black serif text-xl">Реальная стройка.</p>
                <p className="text-white/65 text-sm sans">Не рендер. Не обещание.</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: 'MapPin',    label: 'Земля',       sub: 'Основа проекта',               text: 'Входит в систему как базовый актив. Не повод для перепродажи и спекуляции.',                  col: '#f97316' },
              { icon: 'HardHat',  label: 'Девелопер',   sub: 'Профессионал, не носитель риска', text: 'Строит — не тонет в кредитах. Работает по fee-модели без лишней финансовой нагрузки.',     col: '#3b82f6' },
              { icon: 'Eye',      label: 'Финансы',     sub: 'Кристально публично',           text: 'Все движения денег, этапы, документы и события видны участникам системы.',                   col: '#10b981' },
              { icon: 'Users',    label: 'Участники',   sub: 'Будущие заказчики',             text: 'Не дольщики. Не пассивные покупатели. Люди, под которых создаётся проект.',                 col: '#8b5cf6' },
            ].map(card => (
              <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-border card-lift">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ background: card.col + '1a' }}>
                  <Icon name={card.icon} size={22} style={{ color: card.col }} />
                </div>
                <h3 className="sans font-bold text-base mb-1">{card.label}</h3>
                <p className="text-xs font-semibold sans mb-3" style={{ color: card.col }}>{card.sub}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-foreground text-background rounded-xl px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Icon name="Lightbulb" size={28} className="text-accent shrink-0" />
            <p className="sans text-sm leading-relaxed">
              Если девелопмент можно собрать как систему — рынок меняется.{' '}
              <span className="text-white/50">Если нет — мы публично покажем, где и почему он ломается.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ЧТО ПОЛУЧАЕТ УЧАСТНИК */}
      <section id="benefits" className="section-cream py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-14">
            <p className="text-accent sans font-semibold text-sm uppercase tracking-widest mb-4">Участнику</p>
            <h2 className="text-4xl sm:text-5xl font-black">Что получает участник системы</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: 'BadgePercent', title: 'Не переплачивает',       desc: 'Не кормит банковский процент, лишние прокладки и чужую наценку.' },
              { icon: 'Vote',         title: 'Имеет право влиять',     desc: 'Не сидит молча, пока всё решили без него.' },
              { icon: 'HardHat',      title: 'Может прийти на стройку', desc: 'Приедь на объект и своими глазами увидь, как идут работы.' },
              { icon: 'Smartphone',   title: 'Все деньги на ладони',   desc: 'Каждый рубль системы виден в смартфоне 24 часа в сутки.' },
              { icon: 'CheckCircle',  title: 'Платит за работу',       desc: 'Не за обещания. За реальный, измеримый результат.' },
              { icon: 'Unlock',       title: 'Без ипотечной кабалы',   desc: 'Беспроцентная рассрочка до 20 лет. Накопительная система. Криптотека.' },
            ].map(b => (
              <div key={b.title} className="bg-white rounded-xl p-6 shadow-sm card-lift">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={b.icon} size={20} className="text-accent" />
                </div>
                <h3 className="sans font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОЗРАЧНОСТЬ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-xl overflow-hidden h-[500px] shadow-2xl">
            <img src={IMGS.couple} alt="Пара у новостройки" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-accent sans font-semibold text-sm uppercase tracking-widest mb-4">Прозрачность</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Все деньги<br />на ладони</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Кристально публично. Все деньги системы — у тебя в смартфоне 24/7.
            </p>
            <div className="space-y-4 mb-10">
              {[
                { icon: 'DollarSign', text: 'Сколько собрано и сколько на счёте' },
                { icon: 'ArrowRight', text: 'Куда ушёл каждый платёж' },
                { icon: 'Building2',  text: 'Что строится и что в резерве' },
                { icon: 'Lock',       text: 'Шифрование и цифровой журнал действий' },
                { icon: 'Link',       text: 'Блокчейн-фиксация ключевых событий' },
                { icon: 'Bot',        text: 'ИИ-контроль движения средств' },
              ].map(row => (
                <div key={row.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <Icon name={row.icon} size={15} className="text-foreground" />
                  </div>
                  <span className="text-sm">{row.text}</span>
                </div>
              ))}
            </div>
            <div className="accent-bar">
              <p className="text-xl font-black serif">Не «доверяйте нам». Смотрите сами.</p>
            </div>
          </div>
        </div>
      </section>

      {/* БЕЗ ИПОТЕКИ + ЦИФРЫ */}
      <section id="money" className="section-cream py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-14">
            <p className="text-accent sans font-semibold text-sm uppercase tracking-widest mb-4">Финансы</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Без ипотечной кабалы</h2>
            <p className="text-muted-foreground text-lg">Вместо банковской удавки — своя логика.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { icon: 'Calendar',  label: 'Рассрочка',    sub: 'Беспроцентная до 20 лет' },
              { icon: 'PiggyBank', label: 'Накопительная', sub: 'Программа без переплат' },
              { icon: 'Handshake', label: 'Субсидии',      sub: 'Коммерческие от партнёров' },
              { icon: 'Layers',    label: 'Криптотека',    sub: 'Новый инструмент входа' },
            ].map(c => (
              <div key={c.label} className="bg-white rounded-xl p-6 text-center shadow-sm card-lift">
                <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={c.icon} size={22} className="text-background" />
                </div>
                <p className="sans font-bold mb-1">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-foreground text-background rounded-2xl overflow-hidden">
            <div className="px-8 py-8 border-b border-white/10">
              <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2 sans">Пример на цифрах</p>
              <h3 className="text-2xl font-black serif">Как рынок съедает деньги</h3>
              <p className="text-white/50 text-sm mt-2 sans">Квартира за 10 млн на рынке. Из чего состоит цена:</p>
            </div>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="px-8 py-8">
                <p className="text-white/40 text-xs uppercase tracking-widest sans mb-5">По классике</p>
                <ul className="space-y-3">
                  {['Дорогая земля', 'Банковские проценты застройщика', 'Реклама и продажи', 'Девелоперская прибыль', 'Ипотека сверху — годы обязательств'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/65">
                      <span className="text-red-400 font-bold">+</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 py-8">
                <p className="text-accent text-xs uppercase tracking-widest sans mb-5 font-semibold">Через КриптоМетры</p>
                <p className="text-5xl font-black serif text-accent mb-3">−30%</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  Цель системы — дать участнику путь к жилью до 30% ниже рынка за счёт другой модели входа, накопления, контроля и организации.
                </p>
                <p className="text-xs text-white/30 mt-4 sans">
                  Модельный пример, не обещание фиксированной цены. Условия зависят от проекта и программы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* КАЧЕСТВО */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-accent sans font-semibold text-sm uppercase tracking-widest mb-4">Отбор</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Строят только те,<br />кто прошёл отбор
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              В систему допускаются только аккредитованные девелоперы и подрядчики.
            </p>
            <div className="space-y-0">
              {[
                'Опыт и сданные объекты',
                'Репутация',
                'Прозрачные сметы',
                'Готовность работать в открытом контуре',
                'Цифровой контроль',
                'Ответственность перед людьми',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                  <Icon name="Check" size={16} className="text-green-500 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-secondary rounded-2xl p-8">
              <Icon name="Shield" size={32} className="text-accent mb-6" />
              <h3 className="sans text-xl font-black mb-3">Не каждый застройщик нам подходит</h3>
              <p className="text-muted-foreground leading-relaxed">
                Народный дом будут строить только те, кто готов строить честно.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="sans font-bold text-base mb-2">Два пути одного КриптоМетра</h3>
              <div className="space-y-4 mt-4">
                <div className="border-l-2 border-accent pl-4">
                  <p className="sans font-semibold text-sm">Народный путь</p>
                  <p className="text-xs text-muted-foreground mt-1">К своей квартире через кооперативную логику. Входишь раньше. Платишь меньше. Контролируешь сам.</p>
                </div>
                <div className="border-l-2 border-border pl-4">
                  <p className="sans font-semibold text-sm">Классический путь</p>
                  <p className="text-xs text-muted-foreground mt-1">Хочешь купить сейчас? Получи специальные условия у партнёров. КМ всё равно работает в плюс.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ШАГИ */}
      <section id="steps" className="section-cream py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl mb-14">
            <p className="text-accent sans font-semibold text-sm uppercase tracking-widest mb-4">Как это работает</p>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Шесть шагов<br />к своему жилью</h2>
            <p className="text-muted-foreground leading-relaxed">
              Скидываемся. Покупаем землю. Нанимаем девелопера. Контролируем стройку. Принимаем результат. Живём.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { n: '01', title: 'Покупаешь КМ',           desc: 'И входишь в систему как будущий участник.' },
              { n: '02', title: 'Получаешь доступ',       desc: 'К закрытому контуру, карте проектов и личному кабинету.' },
              { n: '03', title: 'Следишь за площадками',  desc: 'Выбираешь, куда тебе реально интересно зайти.' },
              { n: '04', title: 'Открывается программа',  desc: 'По проекту — получаешь доступ по правилам системы.' },
              { n: '05', title: 'Движешься к жилью',      desc: 'Как будущий пайщик, а не запоздавший покупатель.' },
              { n: '06', title: 'Если планы изменились',  desc: 'КМ всё равно даёт выгоду у партнёров при покупке обычной квартиры.' },
            ].map(s => (
              <div key={s.n} className="bg-white rounded-xl px-7 py-5 shadow-sm flex items-center gap-6 card-lift">
                <span className="text-4xl font-black text-border/60 serif leading-none shrink-0 w-14 text-center">{s.n}</span>
                <div className="flex-1">
                  <p className="sans font-bold mb-0.5">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
                <Icon name="ChevronRight" size={18} className="text-border shrink-0 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 img-overlay">
          <img src={IMGS.hero} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <p className="text-white/55 sans font-medium text-sm uppercase tracking-widest mb-5">
            Система в стадии тестирования • Не является офертой
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6">
            Войди в систему<br />раньше рынка
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed mb-10 sans">
            КМ — цифровой ключ системы. Вход в контур будущего пайщика. Место в очереди, которая движется по другой логике.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white sans font-bold text-base px-10 h-14">
              Получить КМ
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 sans font-semibold text-base px-10 h-14">
              Написать нам
            </Button>
          </div>
          <p className="text-white/35 text-sm mt-8 sans">
            Открытие первых программ участия — Май 2026
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="serif text-xl font-black">КриптоМетры</p>
            <p className="text-white/35 text-xs sans mt-1">Народная система жилья нового типа</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {navItems.map(n => (
              <button
                key={n.id}
                onClick={() => scroll(n.id)}
                className="text-xs text-white/45 hover:text-white transition-colors sans"
              >
                {n.label}
              </button>
            ))}
          </div>
          <p className="text-white/25 text-xs sans">© 2026 КриптоМетры</p>
        </div>
      </footer>

    </div>
  );
}
