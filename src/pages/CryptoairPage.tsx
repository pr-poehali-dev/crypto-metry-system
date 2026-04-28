import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const FMT_ICONS = ['CalendarDays', 'Send', 'Mic', 'AudioLines', 'Video'] as const;

const CryptoairPage = () => {
  const hero     = useContentSection('cryptoair', 'hero');
  const formats  = useContentSection('cryptoair', 'formats');
  const episodes = useContentSection('cryptoair', 'episodes');
  const cta      = useContentSection('cryptoair', 'cta');

  const fmtList = Array.from({ length: 5 }, (_, i) => ({
    title: formats(`fmt_${i + 1}_title`, ''),
    desc:  formats(`fmt_${i + 1}_desc`, ''),
    icon:  FMT_ICONS[i],
  })).filter(f => f.title);

  const epList = Array.from({ length: 3 }, (_, i) => ({
    title:  episodes(`ep_${i + 1}_title`, ''),
    desc:   episodes(`ep_${i + 1}_desc`, ''),
    url:    episodes(`ep_${i + 1}_url`, ''),
    cover:  episodes(`ep_${i + 1}_cover`, ''),
    date:   episodes(`ep_${i + 1}_date`, ''),
    tags:   episodes(`ep_${i + 1}_tags`, ''),
    status: episodes(`ep_${i + 1}_status`, 'draft'),
  })).filter(ep => ep.title && ep.status === 'published');

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · ИИ-радио')}
        title1={hero('title_1', 'Крипто')}
        title2={hero('title_2', 'Эфир.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/media')}>{hero('cta_primary', 'Медиаплатформа')}</Link>
          </Button>
          <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
            <Link to="/ai-ksi">{hero('cta_secondary', 'Про ИИ АО КСИ')}</Link>
          </Button>
        </div>
      </PageHero>

      <Divider />

      {/* Форматы */}
      <PageSection
        kicker={formats('kicker', '01 · Форматы выпусков')}
        title={formats('title', 'Разные форматы. Один смысл.')}
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

      {/* Выпуски */}
      <PageSection
        kicker={episodes('kicker', '02 · Выпуски')}
        title={episodes('title', 'Последние выпуски.')}
      >
        {epList.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {epList.map((ep, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                {ep.cover ? (
                  <div className="h-40 overflow-hidden">
                    <img src={ep.cover} alt={ep.title} className="w-full h-full object-cover opacity-70" />
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center" style={{ background: 'hsl(168 100% 50% / 0.06)' }}>
                    <Icon name="Radio" size={32} style={{ color: 'hsl(168 100% 50% / 0.4)' }} />
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <div className="font-semibold text-white/90 text-sm leading-snug">{ep.title}</div>
                  {ep.desc && <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{ep.desc}</p>}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-white/25">{ep.date}</span>
                    {ep.tags && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/35">{ep.tags.split(',')[0]?.trim()}</span>
                    )}
                  </div>
                  {ep.url && (
                    <a href={ep.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-medium mt-2 transition-colors hover:opacity-80"
                      style={{ color: NEON }}>
                      <Icon name="Play" size={12} />
                      Слушать
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-12 text-center space-y-3">
            <Icon name="Radio" size={40} className="mx-auto" style={{ color: 'hsl(168 100% 50% / 0.3)' }} />
            <div className="text-white/40 font-semibold">Выпуски скоро появятся</div>
            <div className="text-sm text-white/25">Добавить выпуски можно в админке → КриптоЭфир → Управление выпусками</div>
            <div className="pt-2">
              <Link to="/media" className="text-xs underline underline-offset-4" style={{ color: 'hsl(168 100% 50% / 0.5)' }}>
                О медиаплатформе →
              </Link>
            </div>
          </div>
        )}
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Стань частью медиаэкосистемы.')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/media')}>{cta('cta_primary', 'Медиаплатформа')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/for-advertisers')}>{cta('cta_secondary', 'Для рекламодателей')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default CryptoairPage;
