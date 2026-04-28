import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const CooperativePage = () => {
  const hero   = useContentSection('cooperative', 'hero');
  const what   = useContentSection('cooperative', 'what');
  const roles  = useContentSection('cooperative', 'roles');
  const future = useContentSection('cooperative', 'future');
  const cta    = useContentSection('cooperative', 'cta');

  const notList = Array.from({ length: 4 }, (_, i) =>
    what(`not_${i + 1}`, '')
  ).filter(Boolean);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Правовая форма')}
        title1={hero('title_1', 'Кооперативная')}
        title2={hero('title_2', 'модель.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/legal')}>{hero('cta_primary', 'Правовая модель')}</Link>
          </Button>
          <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
            <Link to="/ao-ksi">{hero('cta_secondary', 'АО КСИ')}</Link>
          </Button>
        </div>
      </PageHero>

      <Divider />

      {/* Что такое кооператив */}
      <PageSection
        kicker={what('kicker', '01 · Определение')}
        title={what('title', 'Объединение. Не продажа.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{what('text', '')}</p>
          <div className="space-y-3">
            <div className="rounded-2xl border p-6" style={{ borderColor: 'rgba(255,200,50,0.2)', background: 'rgba(255,200,50,0.03)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="AlertTriangle" size={15} style={{ color: 'rgba(255,200,50,0.7)' }} />
                <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,200,50,0.5)' }}>Участие — не означает</span>
              </div>
              <div className="space-y-2.5">
                {notList.map(point => (
                  <div key={point} className="flex items-center gap-3">
                    <Icon name="X" size={13} className="shrink-0" style={{ color: 'rgba(255,100,100,0.6)' }} />
                    <span className="text-sm text-white/55">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border p-6" style={{ borderColor: 'hsl(168 100% 50% / 0.2)', background: 'hsl(168 100% 50% / 0.03)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="CheckCircle" size={15} style={{ color: NEON }} />
                <span className="text-xs uppercase tracking-widest" style={{ color: 'hsl(168 100% 50% / 0.6)' }}>Участие — это</span>
              </div>
              <div className="space-y-2.5">
                {[
                  'Добровольное объединение с общей целью',
                  'Коллективное участие в развитии системы',
                  'Накопление КМ как единицы вклада',
                ].map(point => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: NEON }} />
                    <span className="text-sm text-white/60">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Роли */}
      <PageSection
        kicker={roles('kicker', '02 · Кооператив и КСИ')}
        title={roles('title', 'Разные роли. Единая система.')}
      >
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{roles('text', '')}</p>
          <div className="space-y-4">
            {[
              { icon: 'Users' as const,    label: 'Кооператив', desc: 'Объединение участников, их права и коллективные решения. Люди — в центре.', active: false },
              { icon: 'Building2' as const, label: 'АО КСИ',   desc: 'Технологический и операционный партнёр. Создаёт и обслуживает инфраструктуру.', active: true },
            ].map(item => (
              <div
                key={item.label}
                className="rounded-2xl border p-5 flex gap-4 items-start"
                style={{
                  borderColor: item.active ? 'hsl(168 100% 50% / 0.3)' : 'rgba(255,255,255,0.1)',
                  background:  item.active ? 'hsl(168 100% 50% / 0.04)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'hsl(168 100% 50% / 0.1)' }}>
                  <Icon name={item.icon} size={20} style={{ color: NEON }} />
                </div>
                <div>
                  <div className="font-bold text-white mb-1">{item.label}</div>
                  <div className="text-sm text-white/45 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
            <Link to="/ao-ksi" className="block text-xs underline underline-offset-4 pl-1" style={{ color: 'hsl(168 100% 50% / 0.5)' }}>
              Подробнее об АО КСИ →
            </Link>
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Целевые программы */}
      <PageSection
        kicker={future('kicker', '03 · Перспектива')}
        title={future('title', 'В будущем — целевые программы.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{future('text', '')}</p>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-4">
            <div className="text-[11px] uppercase tracking-widest text-white/30">Логика этапов</div>
            {[
              { step: '1', label: 'Система участия', desc: 'Накопление КМ, реестры, ИИ', done: true },
              { step: '2', label: 'Кооперативная структура', desc: 'Юридическое оформление', done: false },
              { step: '3', label: 'Целевые программы', desc: 'Конкретные проекты с недвижимостью', done: false },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 border"
                  style={{
                    background: item.done ? 'hsl(168 100% 50% / 0.15)' : '#0c0c0c',
                    borderColor: item.done ? 'hsl(168 100% 50% / 0.5)' : 'rgba(255,255,255,0.1)',
                    color: item.done ? NEON : 'rgba(255,255,255,0.3)',
                  }}
                >{item.step}</div>
                <div>
                  <div className="text-sm font-semibold text-white/80">{item.label}</div>
                  <div className="text-xs text-white/35">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Стань частью кооператива.')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/mining-kvartiry')}>{cta('cta_primary', 'Получить КМ')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/legal')}>{cta('cta_secondary', 'Правовая модель')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default CooperativePage;
