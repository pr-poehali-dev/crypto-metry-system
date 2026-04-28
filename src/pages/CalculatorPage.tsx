import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const fmt = (n: number) =>
  n >= 1000000 ? `${(n / 1000000).toFixed(2)} млн ₽`
  : n >= 1000 ? `${(n / 1000).toFixed(0)} тыс. ₽`
  : `${n.toFixed(0)} ₽`;

const fmtKm = (n: number) =>
  n % 1 === 0 ? `${n} КМ` : `${n.toFixed(2)} КМ`;

type ActionKey =
  | 'register' | 'anketa' | 'ai' | 'repost'
  | 'invite' | 'object' | 'buyer' | 'advertiser';

const ACTION_LABELS: Record<ActionKey, string> = {
  register:   'Регистрация',
  anketa:     'Анкета квартиры',
  ai:         'Запрос к ИИ',
  repost:     'Репост',
  invite:     'Приглашение участника',
  object:     'Передача объекта',
  buyer:      'Привлечение покупателя',
  advertiser: 'Привлечение рекламодателя',
};

const ACTION_ICONS: Record<ActionKey, string> = {
  register:   'UserPlus',
  anketa:     'FileText',
  ai:         'Bot',
  repost:     'Share2',
  invite:     'Users',
  object:     'Building2',
  buyer:      'ShoppingBag',
  advertiser: 'Megaphone',
};

const CalculatorPage = () => {
  const hero  = useContentSection('calculator', 'hero');
  const rates = useContentSection('calculator', 'rates');
  const cta   = useContentSection('calculator', 'cta');

  const moneyRate  = parseFloat(rates('money_rate', '1')) || 1;
  const actionRates: Record<ActionKey, number> = {
    register:   parseFloat(rates('action_register',   '0.5'))  || 0.5,
    anketa:     parseFloat(rates('action_anketa',     '1'))    || 1,
    ai:         parseFloat(rates('action_ai',         '0.2'))  || 0.2,
    repost:     parseFloat(rates('action_repost',     '0.1'))  || 0.1,
    invite:     parseFloat(rates('action_invite',     '2'))    || 2,
    object:     parseFloat(rates('action_object',     '5'))    || 5,
    buyer:      parseFloat(rates('action_buyer',      '10'))   || 10,
    advertiser: parseFloat(rates('action_advertiser', '15'))   || 15,
  };
  const scenarios = [
    { label: 'Консервативный', fund: parseFloat(rates('fund_scenario_1', '1000000')) || 1000000 },
    { label: 'Базовый',        fund: parseFloat(rates('fund_scenario_2', '10000000')) || 10000000 },
    { label: 'Оптимистичный',  fund: parseFloat(rates('fund_scenario_3', '100000000')) || 100000000 },
  ];
  const disclaimer = rates('disclaimer', 'Расчёт ориентировочный. Не является гарантией доходности.');

  const [money, setMoney] = useState('');
  const [actions, setActions] = useState<Partial<Record<ActionKey, number>>>({});

  const moneyKm = useMemo(() => {
    const m = parseFloat(money) || 0;
    return (m / 1000) * moneyRate;
  }, [money, moneyRate]);

  const actionsKm = useMemo(() =>
    (Object.keys(actions) as ActionKey[]).reduce(
      (sum, k) => sum + (actions[k] || 0) * actionRates[k], 0
    ), [actions, actionRates]);

  const totalKm = moneyKm + actionsKm;

  const setAction = (key: ActionKey, val: string) => {
    const n = parseInt(val) || 0;
    setActions(prev => ({ ...prev, [key]: n }));
  };

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Калькулятор')}
        title1={hero('title_1', 'Калькулятор')}
        title2={hero('title_2', 'КМ.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      />

      <Divider />

      {/* Калькулятор */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Левая колонка — ввод */}
          <div className="space-y-6">
            {/* Денежный вклад */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <div className="text-[11px] uppercase tracking-widest mb-4" style={{ color: NEON }}>Денежный вклад</div>
              <label className="block text-sm text-white/50 mb-2">Сумма вклада, ₽</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={money}
                  onChange={e => setMoney(e.target.value)}
                  placeholder="100 000"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-lg font-semibold placeholder:text-white/20 focus:outline-none focus:border-[hsl(168_100%_50%/0.5)] transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/30">₽</span>
              </div>
              {moneyKm > 0 && (
                <div className="mt-3 text-sm" style={{ color: NEON }}>
                  = {fmtKm(moneyKm)} ({moneyRate} КМ за 1 000 ₽)
                </div>
              )}
            </div>

            {/* Действия */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <div className="text-[11px] uppercase tracking-widest mb-4" style={{ color: NEON }}>Действия в системе</div>
              <div className="space-y-3">
                {(Object.keys(ACTION_LABELS) as ActionKey[]).map(key => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(168 100% 50% / 0.08)' }}>
                      <Icon name={ACTION_ICONS[key] as 'Bot'} size={14} style={{ color: NEON }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white/70 truncate">{ACTION_LABELS[key]}</div>
                      <div className="text-[11px] text-white/30">+{actionRates[key]} КМ</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setAction(key, String(Math.max(0, (actions[key] || 0) - 1)))}
                        className="w-7 h-7 rounded-lg border border-white/[0.1] flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors"
                      >−</button>
                      <span className="w-8 text-center text-sm font-semibold text-white">{actions[key] || 0}</span>
                      <button
                        onClick={() => setAction(key, String((actions[key] || 0) + 1))}
                        className="w-7 h-7 rounded-lg border border-white/[0.1] flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors"
                      >+</button>
                    </div>
                    {(actions[key] || 0) > 0 && (
                      <div className="text-sm font-semibold w-16 text-right shrink-0" style={{ color: NEON }}>
                        +{fmtKm((actions[key] || 0) * actionRates[key])}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка — результат */}
          <div className="space-y-5 lg:sticky lg:top-24">

            {/* Итого КМ */}
            <div className="rounded-2xl border p-7 text-center" style={{ borderColor: 'hsl(168 100% 50% / 0.3)', background: 'hsl(168 100% 50% / 0.04)' }}>
              <div className="text-[11px] uppercase tracking-widest text-white/30 mb-3">Итого КМ</div>
              <div className="text-6xl font-black mb-1" style={{ color: NEON }}>
                {totalKm > 0 ? fmtKm(totalKm) : '—'}
              </div>
              {totalKm > 0 && (
                <div className="text-sm text-white/40 mt-3 space-y-1">
                  {moneyKm > 0 && <div>За деньги: {fmtKm(moneyKm)}</div>}
                  {actionsKm > 0 && <div>За действия: {fmtKm(actionsKm)}</div>}
                </div>
              )}
            </div>

            {/* Сценарная обеспеченность */}
            {totalKm > 0 && (
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.07]">
                  <div className="text-[11px] uppercase tracking-widest text-white/30">Сценарная обеспеченность</div>
                  <div className="text-xs text-white/20 mt-0.5">при разных размерах фонда и 10 000 КМ в системе</div>
                </div>
                <div className="divide-y divide-white/[0.05]">
                  {scenarios.map((sc, i) => {
                    const totalSupply = 10000;
                    const perKm = sc.fund / totalSupply;
                    const myValue = perKm * totalKm;
                    return (
                      <div key={i} className="px-5 py-4 flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white/60">{sc.label}</div>
                          <div className="text-xs text-white/30">Фонд {fmt(sc.fund)}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-sm" style={{ color: i === 2 ? NEON : 'rgba(255,255,255,0.7)' }}>
                            {fmt(myValue)}
                          </div>
                          <div className="text-[11px] text-white/25">{fmt(perKm)} / КМ</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Дисклеймер */}
            <div className="rounded-xl border p-4 flex gap-3 items-start" style={{ borderColor: 'rgba(255,200,50,0.15)', background: 'rgba(255,200,50,0.02)' }}>
              <Icon name="AlertTriangle" size={14} className="shrink-0 mt-0.5" style={{ color: 'rgba(255,200,50,0.5)' }} />
              <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,200,50,0.45)' }}>{disclaimer}</p>
            </div>

            {totalKm > 0 && (
              <Button asChild className="w-full h-11 font-semibold" style={{ background: NEON, color: '#000' }}>
                <Link to="/mining-kvartiry">Начать получать КМ →</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Начни накапливать КМ прямо сейчас.')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/mining-kvartiry')}>{cta('cta_primary', 'Получить КМ')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/fond')}>{cta('cta_secondary', 'Про фонд')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default CalculatorPage;
