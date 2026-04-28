import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const MediaPage = () => {
  const hero = useContentSection('media', 'hero');
  const flow = useContentSection('media', 'flow');
  const fund = useContentSection('media', 'fund');
  const cta  = useContentSection('media', 'cta');

  const inputs  = Array.from({ length: 4 }, (_, i) => flow(`in_${i + 1}`, '')).filter(Boolean);
  const outputs = Array.from({ length: 4 }, (_, i) => flow(`out_${i + 1}`, '')).filter(Boolean);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Медиа')}
        title1={hero('title_1', 'Медиа')}
        title2={hero('title_2', 'платформа.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/cryptoair')}>{hero('cta_primary', 'КриптоЭфир')}</Link>
          </Button>
          <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
            <Link to="/for-advertisers">{hero('cta_secondary', 'Для рекламодателей')}</Link>
          </Button>
        </div>
      </PageHero>

      <Divider />

      {/* Схема работы */}
      <PageSection
        kicker={flow('kicker', '01 · Как работает медиаплатформа')}
        title={flow('title', 'Вход — данные. Выход — контент.')}
      >
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Вход */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-widest text-white/30 mb-4">На входе</div>
            {inputs.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'rgba(255,255,255,0.3)' }} />
                <span className="text-sm text-white/60">{item}</span>
              </div>
            ))}
          </div>

          {/* Центр — ИИ */}
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="text-[11px] uppercase tracking-widest text-white/30 mb-2">В центре</div>
            <div className="w-20 h-20 rounded-2xl border flex items-center justify-center" style={{ borderColor: 'hsl(168 100% 50% / 0.4)', background: 'hsl(168 100% 50% / 0.08)' }}>
              <Icon name="Bot" size={36} style={{ color: NEON }} />
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-sm">ИИ АО КСИ</div>
              <div className="text-xs text-white/35 mt-0.5">Анализирует и структурирует</div>
            </div>
            <div className="flex gap-2 text-white/20">
              <Icon name="ArrowLeft" size={14} />
              <Icon name="ArrowRight" size={14} />
            </div>
          </div>

          {/* Выход */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-widest mb-4" style={{ color: 'hsl(168 100% 50% / 0.7)' }}>На выходе</div>
            {outputs.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border px-4 py-3" style={{ borderColor: 'hsl(168 100% 50% / 0.2)', background: 'hsl(168 100% 50% / 0.03)' }}>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: NEON }} />
                <span className="text-sm text-white/70">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 flex items-start gap-4">
          <Icon name="Lightbulb" size={18} style={{ color: NEON }} className="shrink-0 mt-0.5" />
          <p className="text-sm text-white/50 leading-relaxed">
            Каждый выпуск помогает формировать базу знаний ИИ АО КСИ и привлекать аудиторию. Чем больше выпусков — тем умнее система.
          </p>
        </div>
      </PageSection>

      <Divider />

      {/* Связь с фондом */}
      <PageSection
        kicker={fund('kicker', '02 · Медиа и фонд')}
        title={fund('title', 'Реклама питает фонд.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{fund('text', '')}</p>
          <div className="space-y-4">
            <div className="rounded-2xl border p-6 text-center" style={{ borderColor: 'hsl(168 100% 50% / 0.3)', background: 'hsl(168 100% 50% / 0.04)' }}>
              <div className="text-5xl font-black mb-2" style={{ color: NEON }}>50%</div>
              <div className="text-sm text-white/50">рекламных доходов<br />→ в Фонд КриптоМетров</div>
            </div>
            <Link to="/fond" className="block text-xs text-center underline underline-offset-4" style={{ color: 'hsl(168 100% 50% / 0.5)' }}>
              Подробнее о фонде →
            </Link>
          </div>
        </div>
      </PageSection>

      {/* Форматы — ссылка на КриптоЭфир */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest mb-1" style={{ color: NEON }}>ИИ-радио</div>
            <div className="font-bold text-white">КриптоЭфир</div>
            <div className="text-sm text-white/40 mt-0.5">Ежедневные обзоры, дайджесты, подкасты и аудиоразборы</div>
          </div>
          <Button asChild className="shrink-0 h-10 px-5 font-semibold" style={{ background: NEON, color: '#000' }}>
            <Link to="/cryptoair">Открыть КриптоЭфир →</Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Хочешь участвовать в медиа?')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/cryptoair')}>{cta('cta_primary', 'КриптоЭфир')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/for-advertisers')}>{cta('cta_secondary', 'Стать рекламодателем')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default MediaPage;
