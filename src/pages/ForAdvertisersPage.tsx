import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const FMT_ICONS = ['Tv', 'Layers', 'FileSearch', 'Star', 'Bot', 'Mic'] as const;

const ForAdvertisersPage = () => {
  const hero    = useContentSection('for-advertisers', 'hero');
  const formats = useContentSection('for-advertisers', 'formats');
  const why     = useContentSection('for-advertisers', 'why');
  const cta     = useContentSection('for-advertisers', 'cta');

  const fmtList = Array.from({ length: 6 }, (_, i) => ({
    title: formats(`fmt_${i + 1}_title`, ''),
    desc:  formats(`fmt_${i + 1}_desc`, ''),
    icon:  FMT_ICONS[i],
  })).filter(f => f.title);

  const points = Array.from({ length: 4 }, (_, i) =>
    why(`point_${i + 1}`, '')
  ).filter(Boolean);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры Медиа · Партнёрства')}
        title1={hero('title_1', 'Для')}
        title2={hero('title_2', 'рекламодателей.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to="/faq">{hero('cta_primary', 'Стать рекламодателем')}</Link>
          </Button>
          <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
            <Link to="/media">{hero('cta_secondary', 'Медиаплатформа')}</Link>
          </Button>
        </div>
      </PageHero>

      <Divider />

      {/* Форматы */}
      <PageSection
        kicker={formats('kicker', '01 · Форматы')}
        title={formats('title', 'Шесть форматов участия.')}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fmtList.map((fmt, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-[hsl(168_100%_50%/0.25)] transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsl(168 100% 50% / 0.08)' }}>
                <Icon name={fmt.icon} size={18} style={{ color: NEON }} />
              </div>
              <div className="font-semibold text-white/90 mb-2">{fmt.title}</div>
              <div className="text-sm text-white/40 leading-relaxed">{fmt.desc}</div>
            </div>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* Зачем это рекламодателю */}
      <PageSection
        kicker={why('kicker', '02 · Ценность')}
        title={why('title', 'Не просто реклама. Инфраструктура.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{why('text', '')}</p>
          <div className="space-y-3">
            {points.map(point => (
              <div key={point} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'hsl(168 100% 50% / 0.12)' }}>
                  <Icon name="Check" size={11} style={{ color: NEON }} />
                </div>
                <span className="text-sm text-white/65 leading-relaxed">{point}</span>
              </div>
            ))}
            {/* Связь с фондом */}
            <div className="rounded-xl border p-4 flex items-center gap-3 mt-2" style={{ borderColor: 'hsl(168 100% 50% / 0.2)', background: 'hsl(168 100% 50% / 0.04)' }}>
              <Icon name="Wallet" size={16} style={{ color: NEON }} className="shrink-0" />
              <span className="text-sm text-white/60">
                <span style={{ color: NEON }}>50%</span> рекламного дохода пополняет{' '}
                <Link to="/fond" className="underline underline-offset-2" style={{ color: 'hsl(168 100% 50% / 0.7)' }}>Фонд КриптоМетров</Link>
              </span>
            </div>
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Стань частью медийной инфраструктуры рынка.')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/faq')}>{cta('cta_primary', 'Написать нам')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/media')}>{cta('cta_secondary', 'Медиаплатформа')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default ForAdvertisersPage;
