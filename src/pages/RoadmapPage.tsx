import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

type StageStatus = 'done' | 'active' | 'planned';

const STATUS_CONFIG: Record<StageStatus, { label: string; color: string; borderColor: string; bg: string; dotColor: string }> = {
  done:    { label: 'Работает',      color: NEON,                      borderColor: 'hsl(168 100% 50% / 0.4)', bg: 'hsl(168 100% 50% / 0.06)', dotColor: NEON },
  active:  { label: 'В разработке',  color: 'rgba(255,200,50,0.9)',     borderColor: 'rgba(255,200,50,0.3)',     bg: 'rgba(255,200,50,0.04)',     dotColor: 'rgba(255,200,50,0.9)' },
  planned: { label: 'Планируется',   color: 'rgba(255,255,255,0.25)',   borderColor: 'rgba(255,255,255,0.07)',   bg: 'rgba(255,255,255,0.015)',   dotColor: 'rgba(255,255,255,0.2)' },
};

const STAGE_ICONS = [
  'Globe', 'Layers', 'UserPlus', 'LayoutDashboard',
  'Database', 'Calculator', 'Bot', 'Tv',
  'Wallet', 'Users', 'Link', 'Home',
] as const;

const RoadmapPage = () => {
  const hero   = useContentSection('roadmap', 'hero');
  const stages = useContentSection('roadmap', 'stages');
  const cta    = useContentSection('roadmap', 'cta');

  const stageList = Array.from({ length: 12 }, (_, i) => ({
    num:    i + 1,
    title:  stages(`stage_${i + 1}_title`, ''),
    desc:   stages(`stage_${i + 1}_desc`, ''),
    status: (stages(`stage_${i + 1}_status`, 'planned') as StageStatus),
    icon:   STAGE_ICONS[i],
  })).filter(s => s.title);

  const done    = stageList.filter(s => s.status === 'done').length;
  const active  = stageList.filter(s => s.status === 'active').length;
  const planned = stageList.filter(s => s.status === 'planned').length;

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Этапы развития')}
        title1={hero('title_1', 'Дорожная')}
        title2={hero('title_2', 'карта.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        {/* Счётчики статусов */}
        <div className="flex flex-wrap gap-4 mt-8">
          {[
            { label: 'Работает',     count: done,    color: NEON },
            { label: 'В разработке', count: active,  color: 'rgba(255,200,50,0.9)' },
            { label: 'Планируется',  count: planned, color: 'rgba(255,255,255,0.3)' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 bg-white/[0.03]">
              <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
              <span className="text-sm" style={{ color: item.color }}>{item.count}</span>
              <span className="text-sm text-white/35">{item.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Этапы */}
      <PageSection
        kicker={stages('kicker', '12 этапов · От запуска до первых программ')}
        title={stages('title', 'Строим последовательно.')}
      >
        <div className="relative">
          {/* Вертикальная линия */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px hidden md:block" style={{ background: 'rgba(255,255,255,0.06)' }} />

          <div className="space-y-3">
            {stageList.map((stage, i) => {
              const cfg = STATUS_CONFIG[stage.status];
              return (
                <div key={i} className="relative flex gap-5 items-start group">
                  {/* Номер-кружок */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 border transition-all"
                    style={{
                      background:  stage.status === 'done' ? 'hsl(168 100% 50% / 0.15)' : '#0c0c0c',
                      borderColor: cfg.borderColor,
                    }}
                  >
                    <Icon name={stage.icon} size={15} style={{ color: cfg.dotColor }} />
                  </div>

                  {/* Карточка */}
                  <div
                    className="flex-1 rounded-xl border p-4 transition-all"
                    style={{ borderColor: cfg.borderColor, background: cfg.bg }}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-semibold text-sm text-white/85">{stage.num}. {stage.title}</span>
                      <span
                        className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ml-auto"
                        style={{
                          background: stage.status === 'done' ? 'hsl(168 100% 50% / 0.12)' : stage.status === 'active' ? 'rgba(255,200,50,0.1)' : 'rgba(255,255,255,0.05)',
                          color: cfg.color,
                          border: `1px solid ${cfg.borderColor}`,
                        }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    {stage.desc && (
                      <div className="text-xs text-white/35 mt-1 leading-relaxed">{stage.desc}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Прогресс-бар */}
        <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-3 text-sm">
            <span className="text-white/40">Прогресс запуска</span>
            <span className="font-semibold" style={{ color: NEON }}>{Math.round((done / stageList.length) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.07] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(done / stageList.length) * 100}%`,
                background: `linear-gradient(90deg, ${NEON}, hsl(168 100% 65%))`,
              }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-white/25 mt-2">
            <span>{done} из {stageList.length} этапов запущено</span>
            <span>{active} в работе · {planned} впереди</span>
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Войди в систему на раннем этапе.')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/mining-kvartiry')}>{cta('cta_primary', 'Получить КМ')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/cooperative')}>{cta('cta_secondary', 'Кооперативная модель')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default RoadmapPage;
