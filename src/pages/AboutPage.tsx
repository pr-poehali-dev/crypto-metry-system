import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const WAY_ICONS = ['Banknote', 'UserPlus', 'Bot', 'Users', 'Share2'] as const;

const AboutPage = () => {
  const hero       = useContentSection('about', 'hero');
  const what       = useContentSection('about', 'what');
  const howget     = useContentSection('about', 'howget');
  const disclaimer = useContentSection('about', 'disclaimer');
  const cta        = useContentSection('about', 'cta');

  const ways = Array.from({ length: 5 }, (_, i) => ({
    title: howget(`way_${i + 1}_title`, ''),
    text:  howget(`way_${i + 1}_text`, ''),
    icon:  WAY_ICONS[i],
  })).filter(w => w.title);

  const notList = Array.from({ length: 4 }, (_, i) =>
    disclaimer(`point_${i + 1}`, '')
  ).filter(Boolean);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Единица участия')}
        title1={hero('title_1', 'КриптоМетр —')}
        title2={hero('title_2', 'это вклад, не токен.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/mining-kvartiry')}>{hero('cta_primary', 'Получить КМ')}</Link>
          </Button>
          <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
            <Link to="/calculator">{hero('cta_secondary', 'Калькулятор КМ')}</Link>
          </Button>
        </div>
      </PageHero>

      <Divider />

      {/* Что такое КМ */}
      <PageSection
        kicker={what('kicker', '01 · Определение')}
        title={what('title', 'Единица учёта вклада.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{what('text', '')}</p>
          <div className="space-y-3">
            {[
              { icon: 'TrendingUp' as const, label: 'Фиксирует вклад', desc: 'Денежный или трудовой — каждый вклад получает своё отражение в КМ' },
              { icon: 'Shield' as const,    label: 'Прозрачная история', desc: 'Все операции хранятся в Реестре КМ с основаниями' },
              { icon: 'Link' as const,      label: 'Связан с опытом', desc: 'Каждое начисление привязано к единице опыта в системе' },
            ].map(item => (
              <div key={item.label} className="flex gap-4 items-start rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center" style={{ background: 'hsl(168 100% 50% / 0.1)' }}>
                  <Icon name={item.icon} size={16} style={{ color: NEON }} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white/90">{item.label}</div>
                  <div className="text-xs text-white/40 mt-0.5 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Как получить */}
      <PageSection
        kicker={howget('kicker', '02 · Способы получения')}
        title={howget('title', 'Деньгами или делом.')}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ways.map((way, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-[hsl(168_100%_50%/0.25)] transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsl(168 100% 50% / 0.08)' }}>
                <Icon name={way.icon} size={18} style={{ color: NEON }} />
              </div>
              <div className="font-semibold text-white/90 mb-2">{way.title}</div>
              <div className="text-sm text-white/40 leading-relaxed">{way.text}</div>
            </div>
          ))}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 flex flex-col justify-between">
            <div className="text-sm text-white/40 leading-relaxed mb-4">Хочешь узнать, сколько КМ получишь?</div>
            <Button asChild size="sm" className="w-fit" style={{ background: NEON, color: '#000' }}>
              <Link to="/calculator">Калькулятор →</Link>
            </Button>
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Дисклеймер */}
      <PageSection
        kicker="03 · Важно"
        title={disclaimer('title', 'Что КМ — не является.')}
      >
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{disclaimer('text', '')}</p>
          <div className="rounded-2xl border p-6 space-y-3" style={{ borderColor: 'rgba(255,200,50,0.2)', background: 'rgba(255,200,50,0.03)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="AlertTriangle" size={16} style={{ color: 'rgba(255,200,50,0.8)' }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,200,50,0.6)' }}>Дисклеймер</span>
            </div>
            {notList.map(point => (
              <div key={point} className="flex items-center gap-3">
                <Icon name="X" size={14} style={{ color: 'rgba(255,100,100,0.7)' }} className="shrink-0" />
                <span className="text-sm text-white/60">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Готов войти в систему?')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/mining-kvartiry')}>{cta('cta_primary', 'Получить КМ')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/fond')}>{cta('cta_secondary', 'Фонд КриптоМетров')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default AboutPage;
