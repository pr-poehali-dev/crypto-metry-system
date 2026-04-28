import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const OP_ICONS = ['Plus', 'Minus', 'Lock', 'FileText'] as const;
const OP_COLORS = [
  'hsl(168 100% 50%)',
  'rgba(255,100,100,0.8)',
  'rgba(255,200,50,0.8)',
  'rgba(255,255,255,0.4)',
] as const;

const DEMO_ROWS = [
  { type: 'plus',  amount: '+2.0 КМ', basis: 'Анкета квартиры',       exp: 'exp_0041', date: '29.04.2026', participant: 'usr_***81' },
  { type: 'plus',  amount: '+0.5 КМ', basis: 'Регистрация',           exp: 'exp_0038', date: '28.04.2026', participant: 'usr_***81' },
  { type: 'plus',  amount: '+0.2 КМ', basis: 'Запрос к ИИ',           exp: 'exp_0031', date: '27.04.2026', participant: 'usr_***14' },
  { type: 'lock',  amount: '−5.0 КМ', basis: 'Блокировка (программа)', exp: '—',        date: '26.04.2026', participant: 'usr_***55' },
  { type: 'plus',  amount: '+15 КМ',  basis: 'Привлечение рекламодателя', exp: 'exp_0028', date: '25.04.2026', participant: 'usr_***22' },
];

const RegistryKmPage = () => {
  const hero      = useContentSection('registry-km', 'hero');
  const ops       = useContentSection('registry-km', 'operations');
  const linkExp   = useContentSection('registry-km', 'link_exp');
  const future    = useContentSection('registry-km', 'future');
  const cta       = useContentSection('registry-km', 'cta');

  const opList = Array.from({ length: 4 }, (_, i) => ({
    title: ops(`op_${i + 1}`, ''),
    desc:  ops(`op_${i + 1}_desc`, ''),
    icon:  OP_ICONS[i],
    color: OP_COLORS[i],
  })).filter(o => o.title);

  const stages = Array.from({ length: 3 }, (_, i) => ({
    title: future(`stage_${i + 1}_title`, ''),
    text:  future(`stage_${i + 1}_text`, ''),
    done:  i === 0,
    next:  i === 1,
  })).filter(s => s.title);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Реестр')}
        title1={hero('title_1', 'Реестр')}
        title2={hero('title_2', 'КриптоМетров.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/registry-exp')}>{hero('cta_primary', 'Реестр опыта')}</Link>
          </Button>
          <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
            <Link to="/about">{hero('cta_secondary', 'Что такое КМ')}</Link>
          </Button>
        </div>
      </PageHero>

      <Divider />

      {/* Типы операций */}
      <PageSection
        kicker={ops('kicker', '01 · Типы записей')}
        title={ops('title', 'Каждое движение фиксируется.')}
      >
        <p className="text-white/55 text-lg leading-relaxed max-w-3xl mb-10">{ops('text', '')}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {opList.map((op, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <Icon name={op.icon} size={18} style={{ color: op.color }} />
              </div>
              <div className="font-semibold text-white/90">{op.title}</div>
              <div className="text-xs text-white/40 leading-relaxed">{op.desc}</div>
            </div>
          ))}
        </div>

        {/* Демо-таблица */}
        <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.07] flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ background: NEON }} />
            <span className="text-[11px] uppercase tracking-widest text-white/30">Последние операции · демо</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {['Операция', 'Участник', 'Основание', 'Единица опыта', 'Дата'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] uppercase tracking-wider text-white/25 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_ROWS.map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <span className="font-semibold" style={{ color: row.type === 'plus' ? NEON : row.type === 'lock' ? 'rgba(255,200,50,0.8)' : 'rgba(255,100,100,0.8)' }}>
                        {row.amount}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-white/40 font-mono text-xs">{row.participant}</td>
                    <td className="px-5 py-3 text-white/60">{row.basis}</td>
                    <td className="px-5 py-3">
                      {row.exp !== '—' ? (
                        <Link to="/registry-exp" className="font-mono text-xs underline underline-offset-2" style={{ color: 'hsl(168 100% 50% / 0.6)' }}>
                          {row.exp}
                        </Link>
                      ) : (
                        <span className="text-white/20">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-white/30 text-xs">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Связь с реестром опыта */}
      <PageSection
        kicker={linkExp('kicker', '02 · Связь с опытом')}
        title={linkExp('title', 'КМ — следствие опыта.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{linkExp('text', '')}</p>
          <div className="rounded-2xl border p-6 space-y-5" style={{ borderColor: 'hsl(168 100% 50% / 0.2)', background: 'hsl(168 100% 50% / 0.03)' }}>
            <div className="text-[11px] uppercase tracking-widest" style={{ color: NEON }}>Цепочка</div>
            {[
              { icon: 'MessageSquare' as const, label: 'Запрос участника', line: true },
              { icon: 'CheckCircle'   as const, label: 'Верификация оператором', line: true },
              { icon: 'FileText'      as const, label: 'Единица опыта в реестре', line: true },
              { icon: 'Coins'         as const, label: 'Начисление КМ в реестр', line: false },
            ].map((step, i) => (
              <div key={i} className="relative flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'hsl(168 100% 50% / 0.12)', border: '1px solid hsl(168 100% 50% / 0.3)' }}>
                    <Icon name={step.icon} size={14} style={{ color: NEON }} />
                  </div>
                  {step.line && <div className="w-px h-4 mt-1" style={{ background: 'hsl(168 100% 50% / 0.2)' }} />}
                </div>
                <div className="pt-1 text-sm text-white/60">{step.label}</div>
              </div>
            ))}
            <div className="pt-2">
              <Link to="/registry-exp" className="text-xs underline underline-offset-4" style={{ color: 'hsl(168 100% 50% / 0.6)' }}>
                Подробнее о реестре опыта →
              </Link>
            </div>
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Будущее */}
      <PageSection
        kicker={future('kicker', '03 · Перспектива')}
        title={future('title', 'Сейчас централизованно. Потом — в цепи.')}
      >
        <div className="grid sm:grid-cols-3 gap-4">
          {stages.map((stage, i) => (
            <div
              key={i}
              className="rounded-2xl border p-5 space-y-3"
              style={{
                borderColor: stage.done ? 'hsl(168 100% 50% / 0.3)' : stage.next ? 'hsl(168 100% 50% / 0.15)' : 'rgba(255,255,255,0.07)',
                background:  stage.done ? 'hsl(168 100% 50% / 0.04)' : 'rgba(255,255,255,0.015)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border" style={{
                  background: stage.done ? 'hsl(168 100% 50% / 0.15)' : '#0c0c0c',
                  borderColor: stage.done ? 'hsl(168 100% 50% / 0.5)' : 'rgba(255,255,255,0.1)',
                  color: stage.done ? NEON : 'rgba(255,255,255,0.3)',
                }}>{i + 1}</div>
                {stage.done && (
                  <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: 'hsl(168 100% 50% / 0.12)', color: NEON }}>Сейчас</span>
                )}
                {stage.next && (
                  <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border" style={{ borderColor: 'hsl(168 100% 50% / 0.3)', color: 'hsl(168 100% 50% / 0.6)' }}>Следующий</span>
                )}
              </div>
              <div className="font-semibold text-white/90">{stage.title}</div>
              <div className="text-xs text-white/40 leading-relaxed">{stage.text}</div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Начни формировать свою историю КМ.')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/mining-kvartiry')}>{cta('cta_primary', 'Получить КМ')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/registry-exp')}>{cta('cta_secondary', 'Реестр опыта')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default RegistryKmPage;
