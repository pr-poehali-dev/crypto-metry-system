import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const LegalPage = () => {
  const hero     = useContentSection('legal', 'hero');
  const kmStatus = useContentSection('legal', 'km_status');
  const rules    = useContentSection('legal', 'rules');
  const stage    = useContentSection('legal', 'stage');
  const cta      = useContentSection('legal', 'cta');

  const points = Array.from({ length: 5 }, (_, i) =>
    kmStatus(`pt_${i + 1}`, '')
  ).filter(Boolean);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Правовая основа')}
        title1={hero('title_1', 'Правовая')}
        title2={hero('title_2', 'модель.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/cooperative')}>{hero('cta_primary', 'Кооперативная модель')}</Link>
          </Button>
          <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
            <Link to="/faq">{hero('cta_secondary', 'FAQ')}</Link>
          </Button>
        </div>
      </PageHero>

      <Divider />

      {/* Статус КМ */}
      <PageSection
        kicker={kmStatus('kicker', '01 · Что такое КМ с правовой точки зрения')}
        title={kmStatus('title', 'Единица учёта. Не финансовый инструмент.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{kmStatus('text', '')}</p>
          <div className="rounded-2xl border p-6 space-y-3" style={{ borderColor: 'rgba(255,200,50,0.2)', background: 'rgba(255,200,50,0.03)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Scale" size={15} style={{ color: 'rgba(255,200,50,0.7)' }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,200,50,0.5)' }}>КМ не является</span>
            </div>
            {points.map(pt => (
              <div key={pt} className="flex items-center gap-3">
                <Icon name="X" size={13} className="shrink-0" style={{ color: 'rgba(255,100,100,0.6)' }} />
                <span className="text-sm text-white/60">{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Правила */}
      <PageSection
        kicker={rules('kicker', '02 · Правила')}
        title={rules('title', 'Внутренние документы системы.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{rules('text', '')}</p>
          <div className="space-y-3">
            {[
              { icon: 'FileText' as const, label: 'Правила начисления КМ',     desc: 'Определяются внутренними документами АО КСИ' },
              { icon: 'Users' as const,    label: 'Устав кооператива',          desc: 'Формируется по мере регистрации кооператива' },
              { icon: 'Shield' as const,   label: 'Политика конфиденциальности', desc: 'Данные участников защищены и не передаются третьим лицам' },
            ].map(item => (
              <div key={item.label} className="flex gap-4 items-start rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(168 100% 50% / 0.08)' }}>
                  <Icon name={item.icon} size={14} style={{ color: NEON }} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white/80">{item.label}</div>
                  <div className="text-xs text-white/35 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Текущий этап */}
      <PageSection
        kicker={stage('kicker', '03 · Текущий статус')}
        title={stage('title', 'Проект в стадии создания.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{stage('text', '')}</p>
          <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: 'hsl(168 100% 50% / 0.2)', background: 'hsl(168 100% 50% / 0.03)' }}>
            <div className="text-[11px] uppercase tracking-widest" style={{ color: NEON }}>Статус запуска</div>
            {[
              { label: 'Сайт и медиа-разделы', done: true },
              { label: 'Личный кабинет и регистрация', done: true },
              { label: 'Реестры и калькулятор', done: false },
              { label: 'ИИ-контур', done: false },
              { label: 'Кооперативная структура', done: false },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <Icon name={item.done ? 'CheckCircle' : 'Clock'} size={14} style={{ color: item.done ? NEON : 'rgba(255,255,255,0.2)' }} className="shrink-0" />
                <span className="text-sm" style={{ color: item.done ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)' }}>{item.label}</span>
              </div>
            ))}
            <div className="pt-2">
              <Link to="/roadmap" className="text-xs underline underline-offset-4" style={{ color: 'hsl(168 100% 50% / 0.6)' }}>
                Полная дорожная карта →
              </Link>
            </div>
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Есть вопросы по правовой части?')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/faq')}>{cta('cta_primary', 'Частые вопросы (FAQ)')}</Link>
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

export default LegalPage;
