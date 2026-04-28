import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';

const DEFAULT_LOGO = 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/bucket/e42b3898-d2ef-44ff-b94f-465207ab3b2c.png';

interface InfoPageProps {
  pageId: string;
}

const InfoPage = ({ pageId }: InfoPageProps) => {
  const navigate = useNavigate();
  const meta   = useContentSection(pageId, 'meta');
  const hero   = useContentSection(pageId, 'hero');
  const blocks = useContentSection(pageId, 'blocks');
  const cta    = useContentSection(pageId, 'cta');

  const published = meta('published', 'draft');
  const title1    = hero('title_1', '');
  const title2    = hero('title_2', '');
  const chip      = hero('chip', 'КриптоМетры');
  const subtitle  = hero('subtitle', '');
  const ctaPrimary    = hero('cta_primary', '');
  const ctaPrimaryUrl = hero('cta_primary_url', '/system');
  const ctaSecondary  = hero('cta_secondary', '');
  const bgImage       = hero('bg_image', '');

  const b1t = blocks('block_1_title', '');
  const b1x = blocks('block_1_text', '');
  const b2t = blocks('block_2_title', '');
  const b2x = blocks('block_2_text', '');
  const b3t = blocks('block_3_title', '');
  const b3x = blocks('block_3_text', '');

  const ctaTitle  = cta('title', '');
  const ctaBtn1   = cta('cta_primary', 'Получить КМ');
  const ctaBtn1Url= cta('cta_primary_url', '/mining-kvartiry');
  const ctaBtn2   = cta('cta_secondary', 'На главную');
  const ctaBtn2Url= cta('cta_secondary_url', '/');

  const seoTitle = meta('seo_title', title1 + ' — КриптоМетры');
  const seoDesc  = meta('seo_desc', subtitle);

  if (published === 'draft') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-center space-y-3">
          <div className="text-5xl opacity-20">🚧</div>
          <h1 className="text-2xl font-bold text-white/60">Страница в разработке</h1>
          <p className="text-white/40 max-w-sm">Этот раздел скоро появится. Следите за обновлениями.</p>
        </div>
        <Button variant="outline" className="border-white/20 text-white/60" onClick={() => navigate('/system')}>
          <Icon name="ArrowLeft" size={16} className="mr-2" /> К системе
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* SEO meta */}
      {typeof document !== 'undefined' && (() => { document.title = seoTitle; return null; })()}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={DEFAULT_LOGO} alt="КриптоМетры" className="h-8 w-8 rounded-md object-cover" />
            <span className="font-bold text-sm tracking-wide text-white">КриптоМетры</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/system" className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded transition-colors">
              Система
            </Link>
            <Link to="/cabinet" className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded transition-colors">
              Кабинет
            </Link>
          </nav>
          <Button size="sm" asChild className="bg-[hsl(168_100%_50%)] text-black hover:bg-[hsl(168_100%_45%)] text-xs h-8">
            <Link to="/mining-kvartiry">Получить КМ</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 min-h-[55vh] flex items-end">
        {bgImage && (
          <div className="absolute inset-0">
            <img src={bgImage} alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          </div>
        )}
        {!bgImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(168_100%_50%/0.05)] to-transparent" />
        )}
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          {chip && (
            <div className="inline-flex items-center gap-2 border border-[hsl(168_100%_50%/0.3)] text-[hsl(168_100%_50%)] text-xs px-3 py-1 rounded-full mb-6">
              {chip}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            {title1}
            {title2 && <><br /><span className="text-[hsl(168_100%_50%)]">{title2}</span></>}
          </h1>
          {subtitle && (
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-8">{subtitle}</p>
          )}
          <div className="flex flex-wrap gap-3">
            {ctaPrimary && (
              <Button asChild className="bg-[hsl(168_100%_50%)] text-black hover:bg-[hsl(168_100%_45%)] font-semibold">
                <Link to={ctaPrimaryUrl}>{ctaPrimary}</Link>
              </Button>
            )}
            {ctaSecondary && (
              <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/5">
                <Link to="/">{ctaSecondary}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Text blocks */}
      {(b1t || b1x || b2t || b2x || b3t || b3x) && (
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
          {(b1t || b1x) && (
            <div className="space-y-3">
              {b1t && <h2 className="text-xl font-bold text-white">{b1t}</h2>}
              {b1x && <p className="text-white/60 leading-relaxed text-sm">{b1x}</p>}
            </div>
          )}
          {(b2t || b2x) && (
            <div className="space-y-3">
              {b2t && <h2 className="text-xl font-bold text-white">{b2t}</h2>}
              {b2x && <p className="text-white/60 leading-relaxed text-sm">{b2x}</p>}
            </div>
          )}
          {(b3t || b3x) && (
            <div className="space-y-3">
              {b3t && <h2 className="text-xl font-bold text-white">{b3t}</h2>}
              {b3x && <p className="text-white/60 leading-relaxed text-sm">{b3x}</p>}
            </div>
          )}
        </section>
      )}

      {/* CTA */}
      {ctaTitle && (
        <section className="border-t border-white/8 py-16">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">{ctaTitle}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {ctaBtn1 && (
                <Button asChild className="bg-[hsl(168_100%_50%)] text-black hover:bg-[hsl(168_100%_45%)] font-semibold">
                  <Link to={ctaBtn1Url}>{ctaBtn1}</Link>
                </Button>
              )}
              {ctaBtn2 && (
                <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/5">
                  <Link to={ctaBtn2Url}>{ctaBtn2}</Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/8 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-white/30">
          <span>© 2026 КриптоМетры</span>
          <Link to="/admin" className="hover:text-white/50 transition-colors">Админ</Link>
        </div>
      </footer>
    </div>
  );
};

export default InfoPage;
