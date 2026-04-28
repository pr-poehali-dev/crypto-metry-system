import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const SRC_ICONS = ['Tv', 'Users', 'Handshake'] as const;

const FondPage = () => {
  const hero     = useContentSection('fond', 'hero');
  const structure = useContentSection('fond', 'structure');
  const coverage  = useContentSection('fond', 'coverage');
  const cta       = useContentSection('fond', 'cta');

  const sources = Array.from({ length: 3 }, (_, i) => ({
    title: structure(`src_${i + 1}_title`, ''),
    text:  structure(`src_${i + 1}_text`, ''),
    icon:  SRC_ICONS[i],
  })).filter(s => s.title);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Финансовая основа')}
        title1={hero('title_1', 'Фонд')}
        title2={hero('title_2', 'КриптоМетров.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/calculator')}>{hero('cta_primary', 'Калькулятор КМ')}</Link>
          </Button>
          <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
            <Link to="/about">{hero('cta_secondary', 'Что такое КМ')}</Link>
          </Button>
        </div>
      </PageHero>

      <Divider />

      {/* Источники фонда */}
      <PageSection
        kicker={structure('kicker', '01 · Источники')}
        title={structure('title', 'Деньги системы — деньги участников.')}
      >
        <p className="text-white/55 text-lg leading-relaxed max-w-3xl mb-10">{structure('text', '')}</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {sources.map((src, i) => (
            <div
              key={i}
              className="rounded-2xl border p-6 space-y-4 hover:border-[hsl(168_100%_50%/0.3)] transition-colors"
              style={{
                borderColor: i === 0 ? 'hsl(168 100% 50% / 0.25)' : 'rgba(255,255,255,0.07)',
                background:  i === 0 ? 'hsl(168 100% 50% / 0.03)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'hsl(168 100% 50% / 0.1)' }}>
                <Icon name={src.icon} size={20} style={{ color: NEON }} />
              </div>
              <div>
                <div className="font-semibold text-white/90 mb-2">{src.title}</div>
                <div className="text-sm text-white/45 leading-relaxed">{src.text}</div>
              </div>
              {i === 0 && (
                <div className="text-2xl font-black" style={{ color: NEON }}>50%</div>
              )}
            </div>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* Расчётная обеспеченность */}
      <PageSection
        kicker={coverage('kicker', '02 · Формула')}
        title={coverage('title', 'Фонд ÷ КМ в обращении.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-white/55 text-lg leading-relaxed">{coverage('text', '')}</p>
            <div className="rounded-2xl border p-5" style={{ borderColor: 'rgba(255,200,50,0.2)', background: 'rgba(255,200,50,0.03)' }}>
              <div className="flex items-start gap-3">
                <Icon name="AlertTriangle" size={16} className="shrink-0 mt-0.5" style={{ color: 'rgba(255,200,50,0.7)' }} />
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,200,50,0.6)' }}>
                  {coverage('disclaimer', 'Расчётная обеспеченность — ориентировочный показатель. Не является гарантией доходности.')}
                </p>
              </div>
            </div>
          </div>

          {/* Визуализация формулы */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.07]">
              <div className="text-[11px] uppercase tracking-widest text-white/30">Расчётная обеспеченность 1 КМ</div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className="text-xs text-white/30 mb-1">Размер фонда</div>
                  <div className="text-2xl font-black" style={{ color: NEON }}>₽</div>
                </div>
                <div className="text-2xl text-white/20 font-light px-4">÷</div>
                <div className="text-center flex-1">
                  <div className="text-xs text-white/30 mb-1">КМ в обращении</div>
                  <div className="text-2xl font-black text-white/60">КМ</div>
                </div>
                <div className="text-2xl text-white/20 font-light px-4">=</div>
                <div className="text-center flex-1">
                  <div className="text-xs text-white/30 mb-1">На 1 КМ</div>
                  <div className="text-2xl font-black text-white/60">₽/КМ</div>
                </div>
              </div>
              <div className="border-t border-white/[0.07] pt-4 space-y-2">
                {[
                  { fund: '1 млн',   km: '10 000', result: '100 ₽' },
                  { fund: '10 млн',  km: '10 000', result: '1 000 ₽' },
                  { fund: '100 млн', km: '10 000', result: '10 000 ₽' },
                ].map(row => (
                  <div key={row.fund} className="flex items-center justify-between text-sm">
                    <span className="text-white/30">{row.fund} ₽</span>
                    <span className="text-white/20 text-xs">÷ {row.km} КМ</span>
                    <span className="font-semibold" style={{ color: 'hsl(168 100% 50% / 0.8)' }}>{row.result}</span>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-white/20 italic">* ориентировочные сценарии</div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Рассчитай свою позицию.')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/calculator')}>{cta('cta_primary', 'Калькулятор КМ')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/mining-kvartiry')}>{cta('cta_secondary', 'Получить КМ')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default FondPage;
