import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/useReveal';
import { useToast } from '@/hooks/use-toast';
import func2url from '../../backend/func2url.json';

const SURVEY_URL = (func2url as Record<string, string>)['apartment-survey'];

type SurveyForm = {
  name: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  housing_format: string;
  budget: string;
  timeline: string;
  life_scenario: string;
  priorities: string;
};

type SurveyResponse = {
  ok: boolean;
  km_awarded: number;
  km_balance: number;
  level: string;
  is_new: boolean;
  breakdown: Array<{ reason: string; amount: number; label: string }>;
};

const LOGO = 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/bucket/e42b3898-d2ef-44ff-b94f-465207ab3b2c.png';
const HERO = 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/d4c1c38f-bf46-4eb1-a5a1-9e0187887e75.jpg';
const BG2 = 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/f1e60bd7-338c-4fc2-92c1-22c9c49a1025.jpg';

const Section: React.FC<React.PropsWithChildren<{ id?: string; className?: string }>> = ({ id, className = '', children }) => (
  <section id={id} className={`relative py-28 px-6 lg:px-10 overflow-hidden ${className}`}>
    {children}
  </section>
);

const EMPTY_FORM: SurveyForm = {
  name: '', email: '', phone: '',
  city: '', district: '', housing_format: '', budget: '', timeline: '',
  life_scenario: '', priorities: '',
};

const MiningKvartiry = () => {
  useReveal();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState<SurveyForm>(EMPTY_FORM);
  const [result, setResult] = useState<SurveyResponse | null>(null);

  const update = (k: keyof SurveyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const openForm = () => {
    setResult(null);
    setOpen(true);
  };

  const closeForm = () => {
    setOpen(false);
    if (result) setForm(EMPTY_FORM);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.includes('@')) {
      toast({ title: 'Неверный email', description: 'Проверь адрес почты.', variant: 'destructive' });
      return;
    }
    setSending(true);
    try {
      const res = await fetch(SURVEY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data: SurveyResponse & { error?: string } = await res.json();
      if (!res.ok || !data.ok) {
        toast({ title: 'Не получилось отправить', description: data.error || 'Попробуй ещё раз.', variant: 'destructive' });
        return;
      }
      setResult(data);
      toast({
        title: data.km_awarded > 0 ? `+${data.km_awarded} КМ начислено` : 'Анкета сохранена',
        description: `Баланс: ${data.km_balance} КМ`,
      });
    } catch {
      toast({ title: 'Ошибка сети', description: 'Проверь соединение и попробуй снова.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const tasks = [
    { label: 'Регистрация',                  val: 'до 0,10 КМ', icon: 'UserPlus' },
    { label: 'Подробная анкета',             val: 'до 0,25 КМ', icon: 'ClipboardList' },
    { label: 'Полный диалог с системой',     val: 'до 0,25 КМ', icon: 'MessagesSquare' },
    { label: 'Подписка на канал',            val: '0,01 КМ',    icon: 'Send' },
    { label: 'Тест от застройщика',          val: '0,10–0,30 КМ', icon: 'Building2' },
    { label: 'Фидбек',                       val: '0,10–0,20 КМ', icon: 'MessageCircle' },
    { label: 'Кастдев',                      val: '0,50–1,00 КМ', icon: 'Headphones' },
    { label: 'Сложные задания',              val: '1–5 КМ',     icon: 'Target' },
    { label: 'Особо ценный вклад',           val: 'до 10 КМ',   icon: 'Crown' },
  ];

  const levels = [
    { r: '0–1 КМ',     name: 'Старт',                  desc: 'Первые шаги в системе',           pct: 5 },
    { r: '1–10 КМ',    name: 'Профиль спроса',         desc: 'Система узнаёт тебя',             pct: 20 },
    { r: '10–25 КМ',   name: 'Подтверждённый участник', desc: 'Твой вклад виден',               pct: 40 },
    { r: '25–100 КМ',  name: 'Ядро спроса',            desc: 'Формируешь будущие проекты',      pct: 70 },
    { r: '100+ КМ',    name: 'Следующий контур',       desc: 'Право перейти дальше',            pct: 100 },
  ];

  const howSteps = [
    { t: 'Формируете спрос', d: 'Рассказываете системе, какое жильё вам нужно — город, формат, бюджет, сроки.', icon: 'Radar' },
    { t: 'Участвуете в развитии', d: 'Проходите задания, тесты, кастдевы — помогаете строить модель нового девелопмента.', icon: 'Cog' },
    { t: 'Получаете КМ', d: 'За каждое действие — начисление КМ на внутренний баланс. Виден путь к цели.', icon: 'Coins' },
  ];

  const nominals = [
    { sum: '1 млн ₽',   km: '100 КМ' },
    { sum: '5 млн ₽',   km: '500 КМ' },
    { sum: '10 млн ₽',  km: '1 000 КМ' },
  ];

  const anketaItems = ['Город', 'Район', 'Формат жилья', 'Бюджет', 'Сроки', 'Сценарий жизни', 'Приоритеты'];

  const contourPerks = [
    { icon: 'FileCheck2',   t: 'Подать заявку на кооперативный контур' },
    { icon: 'Sparkle',      t: 'Приоритетное рассмотрение' },
    { icon: 'Vote',         t: 'Участвовать в выборе будущих проектов' },
    { icon: 'KeyRound',     t: 'Открыть право на целевые взносы' },
  ];

  const cabinetItems = [
    { t: 'Баланс КМ',           icon: 'Wallet' },
    { t: 'Прогресс к цели',     icon: 'Gauge' },
    { t: 'Задания',             icon: 'ListTodo' },
    { t: 'Уровень',             icon: 'Trophy' },
    { t: 'История начислений',  icon: 'History' },
  ];

  const faq = [
    {
      q: 'КМ — это криптовалюта или деньги?',
      a: 'Нет. КМ — внутренняя единица учёта участия в системе КриптоМетр. Это не цифровая валюта, не акция, не доля и не денежное обязательство.',
    },
    {
      q: 'Получу ли я квартиру, если намайню 500 КМ?',
      a: 'Накопление КМ не означает автоматического возникновения права на жильё. КМ фиксируют вашу активность и открывают доступ к следующим контурам системы по отдельным правилам.',
    },
    {
      q: 'Можно ли купить КМ?',
      a: 'Страница посвящена именно майнингу — начислению КМ за участие. Правила и условия других форм получения КМ определяются отдельно.',
    },
    {
      q: 'Что открывается после 100 КМ?',
      a: 'Право подать заявку на кооперативный контур, приоритетное рассмотрение и возможность участвовать в выборе будущих проектов — по правилам проекта.',
    },
    {
      q: 'Сколько времени занимает майнинг?',
      a: 'Темп зависит от вас — от регулярности участия, выполнения заданий и фидбеков. Система подстраивается под активность.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-ink">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 glass-strong border-b border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={LOGO} alt="КриптоМетры" className="h-10 w-10 rounded-md" />
            <div className="leading-none">
              <div className="font-bold tracking-tight">КриптоМетры</div>
              <div className="text-[10px] tracking-[0.2em] text-haze/70 mt-1">МАЙНИНГ КВАРТИРЫ</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/" className="text-sm text-haze/80 hover:text-ink transition-colors px-4 py-2">
              ← На главную
            </Link>
            <Link to="/cabinet" className="text-sm text-haze/80 hover:text-ink transition-colors px-4 py-2 flex items-center gap-2">
              <Icon name="User" size={14} />
              Кабинет
            </Link>
            <Button onClick={openForm} className="btn-neon h-11 px-6 rounded-md text-[12px]">
              Начать майнить
              <Icon name="ArrowUpRight" size={14} className="ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <Section className="pt-36 pb-24 min-h-[720px] flex items-center">
        <div className="absolute inset-0">
          <img src={HERO} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
        </div>
        <div className="orb w-[600px] h-[600px] top-10 -left-40 animate-glow" />
        <div className="orb w-[500px] h-[500px] bottom-0 right-0 animate-glow" style={{ animationDelay: '2.5s' }} />

        <div className="relative z-10 max-w-[1500px] w-full mx-auto">
          <span className="chip mb-8 animate-fade-up">
            <span className="chip-dot" />
            Экосистема КриптоМетр · Программа участия
          </span>

          <h1 className="display text-[12vw] sm:text-[9vw] lg:text-[8rem] xl:text-[9.5rem] leading-[0.88] max-w-[1200px] animate-fade-up-1">
            <span className="neon-grad">Майнинг</span>
            <span className="block display-italic text-neon" style={{ textShadow: '0 0 60px hsla(164,95%,62%,0.35)' }}>
              квартиры
            </span>
          </h1>

          <div className="mt-10 max-w-2xl animate-fade-up-2">
            <div className="bar-neon mb-6" />
            <p className="text-ink/90 text-lg lg:text-xl leading-relaxed font-light">
              Майни свой путь к будущему жилью уже сегодня. Участие, задания, фидбек —
              всё это конвертируется в КМ и двигает тебя к цели.
            </p>
          </div>

          {/* target card */}
          <div className="mt-10 inline-flex flex-wrap items-center gap-6 glass rim rounded-2xl px-8 py-6 animate-fade-up-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/40 flex items-center justify-center">
                <Icon name="Target" size={18} className="text-neon" />
              </div>
              <div>
                <div className="text-[11px] tracking-[0.18em] text-haze/70 uppercase">Ориентир цели</div>
                <div className="text-xl font-bold">Квартира 5 000 000 ₽ = <span className="text-neon">500 КМ</span></div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up-3">
            <Button onClick={openForm} size="lg" className="btn-neon text-[13px] h-16 px-10 rounded-md">
              Начать майнить
              <Icon name="ArrowUpRight" size={18} className="ml-2" />
            </Button>
            <Button onClick={openForm} size="lg" className="btn-ghost text-[13px] h-16 px-10 rounded-md">
              <Icon name="ClipboardList" size={16} className="mr-2" />
              Заполнить анкету квартиры
            </Button>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section className="panel-tonal">
        <div className="orb w-[500px] h-[500px] top-0 right-0 opacity-60" />
        <div className="relative max-w-[1300px] mx-auto">
          <div className="mb-16 max-w-3xl reveal">
            <p className="kicker mb-5">Как это работает · 01</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-[6rem] leading-[0.92]">
              Три шага —<br />
              <span className="display-italic text-neon">одна система.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {howSteps.map((s, i) => (
              <div key={s.t} className="glass rim rim-hover rounded-3xl p-8 reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/40 flex items-center justify-center">
                    <Icon name={s.icon} size={22} className="text-neon" />
                  </div>
                  <span className="serif text-5xl font-bold text-[hsl(var(--neon))]/40">0{i + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{s.t}</h3>
                <p className="text-haze/75 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* NOMINAL & GOAL */}
      <Section>
        <div className="orb w-[600px] h-[600px] bottom-0 left-[-10%] opacity-60" />
        <div className="relative max-w-[1300px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7 reveal">
              <p className="kicker mb-5">Номинал · 02</p>
              <h2 className="display text-5xl sm:text-6xl lg:text-[6rem] leading-[0.92]">
                Сколько КМ —<br />
                <span className="display-italic text-neon">столько метров.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 reveal">
              <div className="bar-neon mb-5" />
              <p className="text-haze/80 text-lg leading-relaxed">
                КМ — внутренняя единица учёта. Расчётный номинал зафиксирован и позволяет
                видеть цель в понятных цифрах.
              </p>
            </div>
          </div>

          <div className="glass rim rounded-3xl p-10 lg:p-14 mb-6 reveal">
            <div className="flex flex-wrap items-baseline gap-6">
              <span className="display text-7xl lg:text-[9rem] neon-grad leading-none">1 КМ</span>
              <span className="text-3xl lg:text-5xl text-haze/50">=</span>
              <span className="display text-5xl lg:text-7xl text-ink leading-none">10 000 ₽</span>
              <span className="text-haze/60 text-sm tracking-widest uppercase ml-2">внутренний расчётный номинал</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {nominals.map((n, i) => (
              <div key={n.sum} className="glass rim rounded-2xl p-8 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-haze/60 text-xs tracking-[0.2em] uppercase">Цель</span>
                  <Icon name="Home" size={18} className="text-neon" />
                </div>
                <div className="text-4xl font-bold mb-2">{n.sum}</div>
                <div className="flex items-center gap-2 text-haze/70">
                  <Icon name="ArrowRight" size={14} />
                  <span className="text-neon font-bold text-xl">{n.km}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EARN TABLE */}
      <Section className="panel-tonal">
        <div className="orb w-[500px] h-[500px] top-20 right-[-10%] opacity-50" />
        <div className="relative max-w-[1300px] mx-auto">
          <div className="mb-14 max-w-3xl reveal">
            <p className="kicker mb-5">Начисления · 03</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-[6rem] leading-[0.92]">
              За что начисляются<br />
              <span className="display-italic text-neon">КМ.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((t, i) => (
              <div key={t.label} className="glass rim rim-hover rounded-2xl p-6 flex items-center gap-5 reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/30 flex items-center justify-center shrink-0">
                  <Icon name={t.icon} size={18} className="text-neon" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-ink font-semibold truncate">{t.label}</div>
                  <div className="text-neon text-sm font-bold tracking-wide">{t.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ANKETA */}
      <Section>
        <div className="orb w-[600px] h-[600px] bottom-0 right-[-10%]" />
        <div className="relative max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <p className="kicker mb-5">Анкета квартиры · 04</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.92] mb-6">
              Система<br />
              <span className="display-italic text-neon">уточнит главное.</span>
            </h2>
            <p className="text-haze/80 text-lg leading-relaxed mb-8">
              Мы аккуратно спросим о том, что важно для твоего жилья. Ответы — основа твоего
              профиля спроса и будущего подбора проектов.
            </p>
            <Button onClick={openForm} size="lg" className="btn-neon text-[13px] h-16 px-10 rounded-md">
              Заполнить анкету квартиры
              <Icon name="ArrowUpRight" size={18} className="ml-2" />
            </Button>
          </div>

          <div className="glass rim rounded-3xl p-8 reveal">
            <div className="grid grid-cols-2 gap-3">
              {anketaItems.map(a => (
                <div key={a} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-4">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon))]" style={{ boxShadow: '0 0 10px #3dffc4' }} />
                  <span className="text-ink/90 text-sm">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* LEVELS */}
      <Section className="panel-tonal">
        <div className="orb w-[500px] h-[500px] top-10 left-0 opacity-50" />
        <div className="relative max-w-[1200px] mx-auto">
          <div className="mb-14 max-w-3xl reveal">
            <p className="kicker mb-5">Уровни пути · 05</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-[6rem] leading-[0.92]">
              Путь участника —<br />
              <span className="display-italic text-neon">от старта до контура.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {levels.map((l, i) => (
              <div key={l.r} className="glass rim rim-hover rounded-3xl p-6 md:p-7 reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border border-[hsl(var(--neon))]/50 flex items-center justify-center shrink-0">
                    <span className="serif text-lg font-bold text-neon">0{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-baseline gap-4 flex-wrap">
                      <span className="text-2xl font-bold">{l.name}</span>
                      <span className="text-neon font-bold text-sm tracking-wider">{l.r}</span>
                    </div>
                    <div className="text-haze/70 text-sm mt-1">{l.desc}</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[hsl(var(--neon))]/60 to-[hsl(var(--neon))] rounded-full"
                    style={{ width: `${l.pct}%`, boxShadow: '0 0 14px hsla(164,95%,62%,0.5)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* AFTER 100 KM */}
      <Section>
        <div className="absolute inset-0 opacity-20">
          <img src={BG2} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]" />
        </div>
        <div className="orb w-[700px] h-[700px] bottom-0 left-[-10%]" />

        <div className="relative max-w-[1200px] mx-auto">
          <div className="mb-12 max-w-3xl reveal">
            <p className="kicker mb-5">После 100 КМ · 06</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-[6rem] leading-[0.92]">
              Переход<br />
              <span className="display-italic text-neon">на следующий контур.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {contourPerks.map((p, i) => (
              <div key={p.t} className="glass rim rim-hover rounded-2xl p-6 flex items-center gap-5 reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/30 flex items-center justify-center shrink-0">
                  <Icon name={p.icon} size={20} className="text-neon" />
                </div>
                <div className="text-ink font-medium leading-snug">{p.t}</div>
              </div>
            ))}
          </div>

          <div className="glass-strong rim rounded-3xl p-8 lg:p-12 reveal border border-[hsl(var(--neon))]/40" style={{ boxShadow: '0 0 80px hsla(164,95%,62%,0.15)' }}>
            <div className="flex flex-wrap items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--neon))]/15 border border-[hsl(var(--neon))]/50 flex items-center justify-center shrink-0">
                <Icon name="Sparkles" size={22} className="text-neon" />
              </div>
              <div className="flex-1 min-w-[260px]">
                <div className="text-xs tracking-[0.22em] text-neon uppercase mb-3">Важное правило</div>
                <div className="text-2xl lg:text-3xl font-bold leading-snug mb-3">
                  Каждый намайненный КМ открывает право внести до 1 КМ целевого взноса.
                </div>
                <p className="text-haze/70 text-sm leading-relaxed max-w-2xl">
                  Порядок реализации этого права определяется отдельными правилами системы.
                  Накопление КМ не означает автоматического вступления в кооператив.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CABINET */}
      <Section className="panel-tonal">
        <div className="orb w-[500px] h-[500px] top-0 right-0 opacity-50" />
        <div className="relative max-w-[1300px] mx-auto">
          <div className="mb-14 max-w-3xl reveal">
            <p className="kicker mb-5">Личный кабинет · 07</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-[6rem] leading-[0.92]">
              Всё видно —<br />
              <span className="display-italic text-neon">в одном месте.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cabinetItems.map((c, i) => (
              <div key={c.t} className="glass rim rim-hover rounded-2xl p-6 flex flex-col gap-4 reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/30 flex items-center justify-center">
                  <Icon name={c.icon} size={20} className="text-neon" />
                </div>
                <div className="text-ink font-semibold leading-snug">{c.t}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* WHY FOR SYSTEM */}
      <Section>
        <div className="orb w-[600px] h-[600px] bottom-0 right-0 opacity-60" />
        <div className="relative max-w-[1100px] mx-auto text-center">
          <p className="kicker mb-5 justify-center reveal">Зачем это системе · 08</p>
          <h2 className="display text-5xl sm:text-6xl lg:text-[6.5rem] leading-[0.92] mb-8 reveal">
            Новая модель<br />
            <span className="display-italic text-neon">вокруг жителя.</span>
          </h2>
          <p className="text-haze/80 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto reveal">
            КриптоМетр учится на реальном спросе. Каждое ваше действие — сигнал, каждое
            задание — данные для моделей. Мы строим девелопмент, который собирается
            вокруг будущего жителя, а не вокруг гипотез отдела продаж.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="panel-tonal">
        <div className="orb w-[500px] h-[500px] top-0 left-0 opacity-50" />
        <div className="relative max-w-[1000px] mx-auto">
          <div className="mb-12 reveal">
            <p className="kicker mb-5">Вопросы · 09</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-[6rem] leading-[0.92]">
              Коротко<br />
              <span className="display-italic text-neon">по сути.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faq.map((f, i) => (
              <details key={f.q} className="glass rim rounded-2xl p-6 group reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <summary className="cursor-pointer list-none flex items-center justify-between gap-6">
                  <span className="text-lg font-semibold text-ink">{f.q}</span>
                  <span className="w-9 h-9 rounded-full bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/40 flex items-center justify-center shrink-0 group-open:rotate-45 transition-transform">
                    <Icon name="Plus" size={16} className="text-neon" />
                  </span>
                </summary>
                <p className="mt-4 text-haze/80 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <div className="absolute inset-0">
          <img src={HERO} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
        </div>
        <div className="orb w-[700px] h-[700px] top-0 left-0" />
        <div className="orb w-[600px] h-[600px] bottom-0 right-0 animate-glow" />

        <div className="relative max-w-[1200px] mx-auto text-center">
          <h2 className="display text-5xl sm:text-7xl lg:text-[8rem] leading-[0.9] mb-10 reveal">
            Начните майнить<br />
            <span className="display-italic text-neon" style={{ textShadow: '0 0 80px hsla(164,95%,62%,0.4)' }}>свою квартиру</span>
            <span className="block mt-2">уже сегодня.</span>
          </h2>

          <div className="flex flex-wrap gap-4 justify-center reveal">
            <Button onClick={openForm} size="lg" className="btn-neon text-[13px] h-16 px-10 rounded-md">
              Начать майнить
              <Icon name="ArrowUpRight" size={18} className="ml-2" />
            </Button>
            <Button onClick={openForm} size="lg" className="btn-ghost text-[13px] h-16 px-10 rounded-md">
              <Icon name="ClipboardList" size={16} className="mr-2" />
              Заполнить анкету квартиры
            </Button>
          </div>
        </div>
      </Section>

      {/* DISCLAIMER */}
      <section className="relative px-6 lg:px-10 py-16 border-t border-white/5 bg-[#080808]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <Icon name="Info" size={18} className="text-haze/60 mt-1 shrink-0" />
            <div className="text-xs tracking-[0.22em] text-haze/60 uppercase">Юридический дисклеймер</div>
          </div>
          <div className="text-sm text-haze/70 leading-relaxed space-y-4">
            <p>
              КМ являются внутренней единицей учёта участия в системе и не являются денежным
              обязательством, акцией, цифровой валютой, долей в капитале или правом требования
              на недвижимость.
            </p>
            <p>
              Участие в программе и накопление КМ не означают автоматического вступления в
              кооператив, автоматического принятия целевых взносов или автоматического
              возникновения права на жилое помещение.
            </p>
            <p>
              Порядок участия в последующих контурах системы определяется отдельными
              правилами и документами проекта.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-6 lg:px-10 py-10 bg-[#060606] border-t border-white/5">
        <div className="max-w-[1500px] mx-auto flex flex-wrap items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO} alt="КриптоМетры" className="h-9 w-9 rounded-md" />
            <span className="font-bold">КриптоМетры</span>
          </Link>
          <div className="text-xs text-haze/50 tracking-wider">© КриптоМетр · Народная платформа жилья</div>
        </div>
      </footer>

      {/* SURVEY MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={closeForm}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[hsl(var(--neon))]/30 rounded-3xl shadow-2xl my-auto"
            style={{ boxShadow: '0 0 80px hsla(164,95%,62%,0.15)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeForm}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-haze hover:text-ink transition"
              aria-label="Закрыть"
            >
              <Icon name="X" size={18} />
            </button>

            {result ? (
              <div className="p-8 md:p-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[hsl(var(--neon))]/15 border border-[hsl(var(--neon))]/50 flex items-center justify-center mb-6">
                  <Icon name="CheckCircle2" size={28} className="text-neon" />
                </div>
                <div className="text-xs tracking-[0.22em] text-neon uppercase mb-3">Анкета принята</div>
                <h3 className="display text-4xl md:text-5xl mb-6 leading-tight">
                  <span className="display-italic text-neon">+{result.km_awarded} КМ</span> начислено
                </h3>
                <div className="glass rim rounded-2xl p-6 mb-6 inline-block min-w-[260px]">
                  <div className="text-xs tracking-[0.18em] text-haze/60 uppercase mb-2">Твой баланс</div>
                  <div className="display text-5xl text-ink mb-2">{result.km_balance} КМ</div>
                  <div className="text-haze/70 text-sm">Уровень: <span className="text-neon font-semibold">{
                    result.level === 'start' ? 'Старт' :
                    result.level === 'profile' ? 'Профиль спроса' :
                    result.level === 'confirmed' ? 'Подтверждённый участник' :
                    result.level === 'core' ? 'Ядро спроса' : 'Следующий контур'
                  }</span></div>
                </div>
                {result.breakdown.length > 0 && (
                  <div className="space-y-2 mb-6 text-left max-w-sm mx-auto">
                    {result.breakdown.map(b => (
                      <div key={b.reason} className="flex items-center justify-between text-sm bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3">
                        <span className="text-haze/80">{b.label}</span>
                        <span className="text-neon font-semibold">+{b.amount} КМ</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/cabinet">
                    <Button className="btn-neon h-12 px-7 rounded-md text-[12px]">
                      <Icon name="User" size={14} className="mr-2" />
                      Перейти в кабинет
                    </Button>
                  </Link>
                  <Button onClick={closeForm} className="btn-ghost h-12 px-7 rounded-md text-[12px]">
                    Закрыть
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="p-8 md:p-10">
                <div className="mb-6">
                  <div className="text-xs tracking-[0.22em] text-neon uppercase mb-3">Анкета квартиры</div>
                  <h3 className="display text-3xl md:text-4xl leading-tight">
                    Расскажи,<br />
                    <span className="display-italic text-neon">что тебе нужно.</span>
                  </h3>
                  <p className="text-haze/70 text-sm mt-3">
                    За регистрацию +0,10 КМ, за подробную анкету ещё +0,25 КМ.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <Field label="Имя" value={form.name} onChange={update('name')} placeholder="Как к тебе обращаться" />
                  <Field label="Email *" value={form.email} onChange={update('email')} type="email" placeholder="you@mail.ru" required />
                </div>
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <Field label="Телефон" value={form.phone} onChange={update('phone')} placeholder="+7 ..." />
                  <Field label="Город" value={form.city} onChange={update('city')} placeholder="Москва" />
                </div>
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <Field label="Район" value={form.district} onChange={update('district')} placeholder="Центр" />
                  <SelectField label="Формат жилья" value={form.housing_format} onChange={update('housing_format')} options={['Студия', '1-комнатная', '2-комнатная', '3-комнатная', '4+ комнат', 'Дом']} />
                </div>
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <SelectField label="Бюджет" value={form.budget} onChange={update('budget')} options={['до 3 млн', '3–5 млн', '5–7 млн', '7–10 млн', '10–15 млн', '15+ млн']} />
                  <SelectField label="Сроки" value={form.timeline} onChange={update('timeline')} options={['до 1 года', '1–2 года', '2–3 года', '3–5 лет', 'без спешки']} />
                </div>
                <TextareaField label="Сценарий жизни" value={form.life_scenario} onChange={update('life_scenario')} placeholder="Семья с детьми / пара / один / удалёнка..." />
                <TextareaField label="Приоритеты" value={form.priorities} onChange={update('priorities')} placeholder="Двор, школа, транспорт, тишина, вид..." />

                <Button type="submit" disabled={sending} className="btn-neon w-full h-14 rounded-md text-[12px] mt-2">
                  {sending ? 'Отправляю...' : 'Отправить анкету и получить КМ'}
                  {!sending && <Icon name="ArrowUpRight" size={16} className="ml-2" />}
                </Button>
                <p className="text-[11px] text-haze/50 mt-4 text-center leading-relaxed">
                  Отправляя форму, ты соглашаешься с правилами программы. КМ — внутренняя единица учёта участия, не является денежным обязательством.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value, onChange, type = 'text', placeholder, required }: {
  label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; placeholder?: string; required?: boolean;
}) => (
  <label className="block">
    <span className="text-[11px] tracking-[0.16em] text-haze/60 uppercase mb-1.5 block">{label}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-ink placeholder-haze/40 focus:border-[hsl(var(--neon))]/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon))]/20 transition"
    />
  </label>
);

const SelectField = ({ label, value, onChange, options }: {
  label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[];
}) => (
  <label className="block">
    <span className="text-[11px] tracking-[0.16em] text-haze/60 uppercase mb-1.5 block">{label}</span>
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-ink focus:border-[hsl(var(--neon))]/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon))]/20 transition"
    >
      <option value="" className="bg-[#0d0d0d]">— выбери —</option>
      {options.map(o => <option key={o} value={o} className="bg-[#0d0d0d]">{o}</option>)}
    </select>
  </label>
);

const TextareaField = ({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string;
}) => (
  <label className="block mb-3">
    <span className="text-[11px] tracking-[0.16em] text-haze/60 uppercase mb-1.5 block">{label}</span>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={2}
      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-ink placeholder-haze/40 focus:border-[hsl(var(--neon))]/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon))]/20 transition resize-none"
    />
  </label>
);

export default MiningKvartiry;