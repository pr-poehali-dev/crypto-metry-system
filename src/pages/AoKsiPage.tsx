import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const FN_ICONS = ['Bot', 'Tv', 'Workflow', 'Handshake', 'Settings', 'Scale'] as const;

const AoKsiPage = () => {
  const hero  = useContentSection('ao-ksi', 'hero');
  const miss  = useContentSection('ao-ksi', 'mission');
  const fns   = useContentSection('ao-ksi', 'functions');
  const coop  = useContentSection('ao-ksi', 'cooperative');
  const cta   = useContentSection('ao-ksi', 'cta');

  const functions = Array.from({ length: 6 }, (_, i) => ({
    title: fns(`fn_${i + 1}_title`, ''),
    text:  fns(`fn_${i + 1}_text`, ''),
    icon:  FN_ICONS[i],
  }));

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'Управляющая компания · КриптоМетры')}
        title1={hero('title_1', 'АО')}
        title2={hero('title_2', 'КриптоСтройИнвест')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/ai-ksi')}>{hero('cta_primary', 'ИИ АО КСИ')}</Link>
          </Button>
          {hero('cta_secondary', '') && (
            <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
              <Link to="/legal">{hero('cta_secondary', 'Правовая модель')}</Link>
            </Button>
          )}
        </div>
      </PageHero>

      <Divider />

      {/* Миссия */}
      <PageSection
        kicker={miss('kicker', '01 · Миссия')}
        title={miss('title', 'Центр ответственности системы.')}
      >
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <p className="text-white/55 text-lg leading-relaxed">{miss('text', '')}</p>
          </div>
          <div className="rounded-2xl border p-5 space-y-1" style={{ borderColor: 'hsl(168 100% 50% / 0.2)', background: 'hsl(168 100% 50% / 0.03)' }}>
            <div className="text-[11px] uppercase tracking-widest mb-3" style={{ color: NEON }}>Полное название</div>
            <div className="font-black text-lg text-white leading-snug">Акционерное общество<br />«КриптоСтройИнвест»</div>
            <div className="text-xs text-white/40 pt-2">АО КСИ</div>
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Функции */}
      <PageSection
        kicker={fns('kicker', '02 · Что делает АО КСИ')}
        title={fns('title', 'Создаёт. Обслуживает. Развивает.')}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {functions.map((fn, i) => fn.title && (
            <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-[hsl(168_100%_50%/0.2)] transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsl(168 100% 50% / 0.08)' }}>
                <Icon name={fn.icon} size={18} style={{ color: NEON }} />
              </div>
              <div className="font-semibold text-white/90 mb-2">{fn.title}</div>
              <div className="text-sm text-white/45 leading-relaxed">{fn.text}</div>
            </div>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* КСИ и кооператив */}
      <PageSection
        kicker={coop('kicker', '03 · Разделение ролей')}
        title={coop('title', 'Кооператив объединяет. КСИ обеспечивает.')}
      >
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{coop('text', '')}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'hsl(168 100% 50% / 0.08)' }}>
                <Icon name="Users" size={20} style={{ color: NEON }} />
              </div>
              <div className="font-bold text-white">Кооператив</div>
              <div className="text-xs text-white/40 leading-relaxed">Участники, их права и коллективные решения</div>
            </div>
            <div className="rounded-2xl border p-5 space-y-3" style={{ borderColor: 'hsl(168 100% 50% / 0.2)', background: 'hsl(168 100% 50% / 0.03)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'hsl(168 100% 50% / 0.12)' }}>
                <Icon name="Building2" size={20} style={{ color: NEON }} />
              </div>
              <div className="font-bold text-white">АО КСИ</div>
              <div className="text-xs text-white/40 leading-relaxed">Технологический и операционный партнёр</div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Хочешь стать частью системы?')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/mining-kvartiry')}>{cta('cta_primary', 'Получить КМ')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/ai-ksi')}>{cta('cta_secondary', 'ИИ АО КСИ')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default AoKsiPage;
