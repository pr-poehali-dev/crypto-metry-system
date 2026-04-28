import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const CAP_ICONS = ['SearchCode', 'MapPin', 'User', 'Bot'] as const;

const LssPage = () => {
  const hero   = useContentSection('lss', 'hero');
  const what   = useContentSection('lss', 'what');
  const submit = useContentSection('lss', 'submit');
  const cta    = useContentSection('lss', 'cta');

  const caps = Array.from({ length: 4 }, (_, i) => ({
    title: what(`cap_${i + 1}`, ''),
    desc:  what(`cap_${i + 1}_desc`, ''),
    icon:  CAP_ICONS[i],
  })).filter(c => c.title);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Land Search Service')}
        title1={hero('title_1', 'Служба')}
        title2={hero('title_2', 'земельного поиска.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/mining-kvartiry')}>{hero('cta_primary', 'Передать участок')}</Link>
          </Button>
          <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
            <Link to="/how-ai">{hero('cta_secondary', 'Задать вопрос ИИ')}</Link>
          </Button>
        </div>
      </PageHero>

      <Divider />

      {/* Возможности */}
      <PageSection
        kicker={what('kicker', '01 · Суть')}
        title={what('title', 'Земля — первый ресурс системы.')}
      >
        <p className="text-white/55 text-lg leading-relaxed max-w-3xl mb-10">{what('text', '')}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {caps.map((cap, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-[hsl(168_100%_50%/0.25)] transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsl(168 100% 50% / 0.08)' }}>
                <Icon name={cap.icon} size={18} style={{ color: NEON }} />
              </div>
              <div className="font-semibold text-white/90 mb-2">{cap.title}</div>
              <div className="text-xs text-white/40 leading-relaxed">{cap.desc}</div>
            </div>
          ))}
        </div>

        {/* Связь с ИИ и медиа */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {[
            { icon: 'Bot' as const, label: 'ИИ АО КСИ', desc: 'Первичный анализ каждого участка через интеллектуальный контур', link: '/ai-ksi' },
            { icon: 'Tv' as const,  label: 'Медиаплатформа', desc: 'Интересные кейсы и объекты попадают в контент медиаплатформы', link: '/media' },
          ].map(item => (
            <Link key={item.label} to={item.link}
              className="flex gap-4 items-start rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 hover:border-[hsl(168_100%_50%/0.2)] transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(168 100% 50% / 0.08)' }}>
                <Icon name={item.icon} size={16} style={{ color: NEON }} />
              </div>
              <div>
                <div className="font-semibold text-sm text-white/80 group-hover:text-white transition-colors">{item.label}</div>
                <div className="text-xs text-white/35 mt-0.5">{item.desc}</div>
              </div>
              <Icon name="ArrowRight" size={14} className="ml-auto mt-1 text-white/20 group-hover:text-white/50 shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* Как передать */}
      <PageSection
        kicker={submit('kicker', '02 · Как участвовать')}
        title={submit('title', 'Передай участок — получи первичный взгляд.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{submit('text', '')}</p>
          <div className="space-y-3">
            {[
              { step: '1', label: 'Опиши участок или запрос', icon: 'FileText' as const },
              { step: '2', label: 'ИИ проводит первичный анализ', icon: 'Bot' as const },
              { step: '3', label: 'Оператор верифицирует результат', icon: 'UserCheck' as const },
              { step: '4', label: 'Единица опыта + КМ при наличии основания', icon: 'Coins' as const },
            ].map((s, i) => (
              <div key={i} className="flex gap-4 items-center rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 border" style={{ background: 'hsl(168 100% 50% / 0.1)', borderColor: 'hsl(168 100% 50% / 0.3)', color: NEON }}>
                  {s.step}
                </div>
                <Icon name={s.icon} size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                <span className="text-sm text-white/65">{s.label}</span>
              </div>
            ))}
            <Button asChild className="w-full mt-2 h-11 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to="/mining-kvartiry">Передать объект →</Link>
            </Button>
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Есть участок или запрос — передай в систему.')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/mining-kvartiry')}>{cta('cta_primary', 'Передать объект')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/ai-ksi')}>{cta('cta_secondary', 'Про ИИ АО КСИ')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default LssPage;
