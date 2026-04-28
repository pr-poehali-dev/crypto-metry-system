import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import func2url from '../../backend/func2url.json';
import ContentEditor from '@/content/ContentEditor';
import { useContentCtx } from '@/content/ContentContext';

const CABINET_URL = (func2url as Record<string, string>)['cabinet'];
const LOGO = 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/bucket/e42b3898-d2ef-44ff-b94f-465207ab3b2c.png';
const BG = 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/files/d4c1c38f-bf46-4eb1-a5a1-9e0187887e75.jpg';

const LS_KEY = 'km_cabinet_email';

type Tx = { amount: number; reason: string; description: string; created_at: string | null };
type LevelDef = { code: string; name: string; max: number | null };
type CabinetData = {
  ok: true;
  participant: {
    id: number;
    email: string;
    name: string;
    phone: string;
    km_balance: number;
    level: string;
    created_at: string | null;
  };
  next_target: number | null;
  goal_km: number;
  goal_progress_pct: number;
  surveys_count: number;
  is_admin?: boolean;
  transactions: Tx[];
  levels: LevelDef[];
};

const REASON_LABELS: Record<string, string> = {
  registration: 'Регистрация',
  survey: 'Подробная анкета',
  dialog: 'Диалог с системой',
  subscription: 'Подписка на канал',
  developer_test: 'Тест от застройщика',
  feedback: 'Фидбек',
  custdev: 'Кастдев',
  hard_task: 'Сложное задание',
  valuable: 'Особо ценный вклад',
};

const LEVEL_LABEL: Record<string, string> = {
  start: 'Старт',
  profile: 'Профиль спроса',
  confirmed: 'Подтверждённый участник',
  core: 'Ядро спроса',
  next_contour: 'Следующий контур',
};

const fmtDate = (s: string | null) => {
  if (!s) return '';
  try {
    const d = new Date(s);
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch {
    return s;
  }
};

const Cabinet = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CabinetData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const load = async (mail: string) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${CABINET_URL}?email=${encodeURIComponent(mail)}`);
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrorMsg(json.error || 'Не получилось загрузить кабинет.');
        setData(null);
        return;
      }
      setData(json);
      localStorage.setItem(LS_KEY, mail);
    } catch {
      setErrorMsg('Ошибка сети. Попробуй ещё раз.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      setEmail(saved);
      load(saved);
    }
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast({ title: 'Неверный email', variant: 'destructive' });
      return;
    }
    load(email.trim().toLowerCase());
  };

  const logout = () => {
    localStorage.removeItem(LS_KEY);
    setData(null);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-ink">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 glass-strong border-b border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={LOGO} alt="КриптоМетры" className="h-10 w-10 rounded-md" />
            <div className="leading-none">
              <div className="font-bold tracking-tight">КриптоМетры</div>
              <div className="text-[10px] tracking-[0.2em] text-haze/70 mt-1">ЛИЧНЫЙ КАБИНЕТ</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/mining-kvartiry" className="text-sm text-haze/80 hover:text-ink transition-colors px-4 py-2 hidden md:block">
              Майнинг квартиры
            </Link>
            {data ? (
              <Button onClick={logout} variant="ghost" className="h-11 px-5 rounded-md text-[12px] border border-white/10 hover:bg-white/5">
                <Icon name="LogOut" size={14} className="mr-2" />
                Выйти
              </Button>
            ) : (
              <Link to="/">
                <Button variant="ghost" className="h-11 px-5 rounded-md text-[12px] border border-white/10 hover:bg-white/5">
                  ← На главную
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="absolute inset-0 overflow-hidden pointer-events-none h-[700px]">
        <img src={BG} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]" />
      </div>

      <main className="relative pt-32 pb-24 px-6 lg:px-10 max-w-[1300px] mx-auto">
        {!data ? (
          <div className="min-h-[560px] flex items-center justify-center">
            <form onSubmit={login} className="w-full max-w-lg glass rim rounded-3xl p-8 md:p-10 border border-[hsl(var(--neon))]/30"
                  style={{ boxShadow: '0 0 80px hsla(164,95%,62%,0.12)' }}>
              <div className="text-xs tracking-[0.22em] text-neon uppercase mb-3">Вход в кабинет</div>
              <h1 className="display text-4xl md:text-5xl leading-tight mb-4">
                Проверь свои<br />
                <span className="display-italic text-neon">КМ.</span>
              </h1>
              <p className="text-haze/70 mb-8 text-sm leading-relaxed">
                Введи email, который ты указал в анкете квартиры. Мы покажем баланс,
                уровень и историю начислений.
              </p>

              <label className="block mb-4">
                <span className="text-[11px] tracking-[0.16em] text-haze/60 uppercase mb-1.5 block">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@mail.ru"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-ink placeholder-haze/40 focus:border-[hsl(var(--neon))]/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon))]/20 transition"
                />
              </label>

              {errorMsg && (
                <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                  {errorMsg}
                </div>
              )}

              <Button type="submit" disabled={loading} className="btn-neon w-full h-14 rounded-md text-[12px]">
                {loading ? 'Загружаю...' : 'Войти в кабинет'}
                {!loading && <Icon name="ArrowRight" size={16} className="ml-2" />}
              </Button>

              <div className="mt-6 text-center text-xs text-haze/60">
                Ещё нет анкеты? <Link to="/mining-kvartiry" className="text-neon hover:underline">Заполни анкету квартиры</Link>
              </div>
            </form>
          </div>
        ) : (
          <CabinetView data={data} />
        )}
      </main>

      <footer className="relative px-6 lg:px-10 py-10 bg-[#060606] border-t border-white/5">
        <div className="max-w-[1500px] mx-auto flex flex-wrap items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO} alt="КриптоМетры" className="h-9 w-9 rounded-md" />
            <span className="font-bold">КриптоМетры</span>
          </Link>
          <div className="text-xs text-haze/50 tracking-wider">© КриптоМетр · Народная платформа жилья</div>
        </div>
      </footer>
    </div>
  );
};

const CabinetView = ({ data }: { data: CabinetData }) => {
  const { participant, goal_km, goal_progress_pct, next_target, surveys_count, transactions, levels } = data;
  const displayName = participant.name || participant.email.split('@')[0];
  const [tab, setTab] = useState<'cabinet' | 'content' | 'admin-login'>('cabinet');
  const { isAdmin, loginAdmin } = useContentCtx();
  const { toast } = useToast();
  const [adminPwd, setAdminPwd] = useState('');
  const [adminBusy, setAdminBusy] = useState(false);

  const submitAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPwd) return;
    setAdminBusy(true);
    const r = await loginAdmin(adminPwd);
    setAdminBusy(false);
    if (r.ok) {
      setAdminPwd('');
      setTab('content');
      toast({ title: 'Добро пожаловать в админку' });
    } else {
      toast({ title: r.error || 'Неверный пароль', variant: 'destructive' });
    }
  };

  const currentLevelIdx = levels.findIndex(l => l.code === participant.level);

  const nextLevelPct = (() => {
    if (!next_target) return 100;
    const idx = levels.findIndex(l => l.code === participant.level);
    const prevMax = idx > 0 ? (levels[idx - 1].max || 0) : 0;
    const span = next_target - prevMax;
    if (span <= 0) return 100;
    return Math.min(100, Math.max(0, ((participant.km_balance - prevMax) / span) * 100));
  })();

  const tasks = [
    { label: 'Регистрация',               val: 'до 0,10 КМ', icon: 'UserPlus',       done: transactions.some(t => t.reason === 'registration') },
    { label: 'Подробная анкета',          val: 'до 0,25 КМ', icon: 'ClipboardList',  done: transactions.some(t => t.reason === 'survey') },
    { label: 'Полный диалог с системой',  val: 'до 0,25 КМ', icon: 'MessagesSquare', done: false },
    { label: 'Подписка на канал',         val: '0,01 КМ',    icon: 'Send',           done: false },
    { label: 'Тест от застройщика',       val: '0,10–0,30 КМ', icon: 'Building2',    done: false },
    { label: 'Фидбек',                    val: '0,10–0,20 КМ', icon: 'MessageCircle',done: false },
    { label: 'Кастдев',                   val: '0,50–1,00 КМ', icon: 'Headphones',   done: false },
    { label: 'Сложные задания',           val: '1–5 КМ',     icon: 'Target',         done: false },
  ];

  const adminBar = (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => setTab('cabinet')}
        className={`px-4 py-2 rounded-md text-[12px] tracking-[0.16em] uppercase border transition ${
          tab === 'cabinet'
            ? 'bg-[hsl(var(--neon))]/15 border-[hsl(var(--neon))]/40 text-ink'
            : 'bg-white/[0.03] border-white/10 text-haze/70 hover:text-ink'
        }`}
      >
        Кабинет
      </button>
      {isAdmin ? (
        <button
          onClick={() => setTab('content')}
          className={`px-4 py-2 rounded-md text-[12px] tracking-[0.16em] uppercase border transition ${
            tab === 'content'
              ? 'bg-[hsl(var(--neon))]/15 border-[hsl(var(--neon))]/40 text-ink'
              : 'bg-white/[0.03] border-white/10 text-haze/70 hover:text-ink'
          }`}
        >
          Контент сайта
        </button>
      ) : (
        <button
          onClick={() => setTab('admin-login')}
          className={`px-4 py-2 rounded-md text-[12px] tracking-[0.16em] uppercase border transition ${
            tab === 'admin-login'
              ? 'bg-[hsl(var(--neon))]/15 border-[hsl(var(--neon))]/40 text-ink'
              : 'bg-white/[0.03] border-white/10 text-haze/60 hover:text-ink'
          }`}
        >
          <Icon name="Lock" size={12} className="inline mr-2 -mt-0.5" />
          Войти как админ
        </button>
      )}
    </div>
  );

  if (tab === 'content' && isAdmin) {
    return (
      <div className="space-y-6 animate-fade-up">
        {adminBar}
        <ContentEditor />
      </div>
    );
  }

  if (tab === 'admin-login' && !isAdmin) {
    return (
      <div className="space-y-6 animate-fade-up">
        {adminBar}
        <form
          onSubmit={submitAdmin}
          className="max-w-md glass rim rounded-3xl p-6 lg:p-8 border border-white/10"
        >
          <div className="text-xs tracking-[0.22em] text-neon uppercase mb-2">Админка контента</div>
          <h2 className="display text-2xl md:text-3xl mb-3">Введи пароль</h2>
          <p className="text-haze/70 text-sm mb-6">
            Доступ к редактору текстов сайта. Пароль выдаётся владельцу проекта.
          </p>
          <input
            type="password"
            autoFocus
            value={adminPwd}
            onChange={e => setAdminPwd(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-3 text-ink placeholder-haze/40 focus:border-[hsl(var(--neon))]/50 focus:outline-none text-sm mb-4"
          />
          <Button type="submit" disabled={adminBusy || !adminPwd} className="btn-neon h-11 rounded-md text-[12px] px-5 w-full">
            {adminBusy ? 'Проверяю…' : 'Войти'}
            {!adminBusy && <Icon name="ArrowRight" size={14} className="ml-2" />}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {adminBar}
      {/* PROFILE HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="text-xs tracking-[0.22em] text-neon uppercase mb-2">Привет</div>
          <h1 className="display text-4xl md:text-6xl leading-tight">{displayName}</h1>
          <div className="text-haze/60 text-sm mt-2">{participant.email}</div>
        </div>
        <Link to="/mining-kvartiry">
          <Button className="btn-neon h-12 px-7 rounded-md text-[12px]">
            <Icon name="Plus" size={14} className="mr-2" />
            Заполнить ещё анкету
          </Button>
        </Link>
      </div>

      {/* BALANCE + GOAL */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass rim rounded-3xl p-8 lg:p-10 border border-[hsl(var(--neon))]/30" style={{ boxShadow: '0 0 80px hsla(164,95%,62%,0.08)' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs tracking-[0.22em] text-haze/60 uppercase">Баланс КМ</div>
            <div className="w-11 h-11 rounded-full bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/40 flex items-center justify-center">
              <Icon name="Coins" size={18} className="text-neon" />
            </div>
          </div>
          <div className="flex items-baseline gap-4 flex-wrap">
            <span className="display text-7xl lg:text-[7rem] neon-grad leading-none">{participant.km_balance}</span>
            <span className="text-2xl text-haze/60">КМ</span>
          </div>
          <div className="text-haze/60 text-sm mt-3">
            ≈ {(participant.km_balance * 10000).toLocaleString('ru-RU')} ₽ по расчётному номиналу
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-haze/60 tracking-[0.16em] uppercase">Прогресс к цели 500 КМ</span>
              <span className="text-neon font-bold">{goal_progress_pct}%</span>
            </div>
            <div className="h-3 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[hsl(var(--neon))]/60 to-[hsl(var(--neon))] rounded-full transition-all"
                style={{ width: `${goal_progress_pct}%`, boxShadow: '0 0 14px hsla(164,95%,62%,0.5)' }}
              />
            </div>
            <div className="text-xs text-haze/50 mt-2">Цель: квартира 5 000 000 ₽ = {goal_km} КМ</div>
          </div>
        </div>

        <div className="glass rim rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs tracking-[0.22em] text-haze/60 uppercase">Уровень</div>
            <div className="w-11 h-11 rounded-full bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/40 flex items-center justify-center">
              <Icon name="Trophy" size={18} className="text-neon" />
            </div>
          </div>
          <div className="display text-3xl mb-2 leading-tight">
            <span className="display-italic text-neon">{LEVEL_LABEL[participant.level] || participant.level}</span>
          </div>
          <div className="text-haze/60 text-sm mb-6">Шаг {Math.max(1, currentLevelIdx + 1)} из {levels.length}</div>

          {next_target ? (
            <>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-haze/60">До следующего уровня</span>
                <span className="text-neon font-bold">{(next_target - participant.km_balance).toFixed(2)} КМ</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-[hsl(var(--neon))] rounded-full" style={{ width: `${nextLevelPct}%` }} />
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-[hsl(var(--neon))]/40 bg-[hsl(var(--neon))]/5 px-4 py-3 text-sm text-ink">
              Доступ к следующему контуру открыт
            </div>
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { t: 'Анкет заполнено',  v: surveys_count,            icon: 'ClipboardList' },
          { t: 'Начислений',       v: transactions.length,      icon: 'History' },
          { t: 'Всего намайнено',  v: `${participant.km_balance} КМ`, icon: 'TrendingUp' },
          { t: 'До 100 КМ',        v: participant.km_balance >= 100 ? '✓' : `${(100 - participant.km_balance).toFixed(2)} КМ`, icon: 'KeyRound' },
        ].map(s => (
          <div key={s.t} className="glass rim rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] tracking-[0.16em] text-haze/60 uppercase">{s.t}</span>
              <Icon name={s.icon} size={16} className="text-neon" />
            </div>
            <div className="text-2xl font-bold">{s.v}</div>
          </div>
        ))}
      </div>

      {/* TASKS */}
      <div className="glass rim rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="text-xs tracking-[0.22em] text-neon uppercase mb-2">Задания</div>
            <h2 className="display text-3xl md:text-4xl leading-tight">Как намайнить ещё</h2>
          </div>
          <Link to="/mining-kvartiry#tasks" className="text-sm text-haze/80 hover:text-ink transition underline underline-offset-4">
            Все способы →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {tasks.map(t => (
            <div key={t.label} className={`rounded-2xl border ${t.done ? 'border-[hsl(var(--neon))]/40 bg-[hsl(var(--neon))]/5' : 'border-white/10 bg-white/[0.02]'} p-5 flex items-center gap-4 transition`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${t.done ? 'bg-[hsl(var(--neon))]/15 border border-[hsl(var(--neon))]/50' : 'bg-white/5 border border-white/10'}`}>
                <Icon name={t.done ? 'Check' : t.icon} size={18} className={t.done ? 'text-neon' : 'text-haze/80'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-ink font-semibold truncate">{t.label}</div>
                <div className={`text-sm font-bold tracking-wide ${t.done ? 'text-neon' : 'text-haze/60'}`}>
                  {t.done ? 'Выполнено' : t.val}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="glass rim rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="text-xs tracking-[0.22em] text-neon uppercase mb-2">История начислений</div>
            <h2 className="display text-3xl md:text-4xl leading-tight">Все транзакции</h2>
          </div>
          <div className="text-sm text-haze/60">{transactions.length} записей</div>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-16 text-haze/60">
            <Icon name="Inbox" size={36} className="mx-auto mb-4 text-haze/40" />
            Пока нет начислений. Начни с анкеты квартиры.
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[hsl(var(--neon))]/10 border border-[hsl(var(--neon))]/30 flex items-center justify-center shrink-0">
                    <Icon name="Plus" size={14} className="text-neon" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-ink font-medium truncate">{REASON_LABELS[t.reason] || t.description || t.reason}</div>
                    <div className="text-xs text-haze/50">{fmtDate(t.created_at)}</div>
                  </div>
                </div>
                <div className="text-neon font-bold whitespace-nowrap">+{t.amount} КМ</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DISCLAIMER */}
      <div className="text-xs text-haze/50 leading-relaxed rounded-2xl border border-white/5 bg-white/[0.02] p-5">
        КМ — внутренняя единица учёта участия в системе. Не является денежным обязательством, акцией,
        цифровой валютой, долей в капитале или правом требования на недвижимость. Порядок участия
        в последующих контурах системы определяется отдельными правилами проекта.
      </div>
    </div>
  );
};

export default Cabinet;