import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const FIELD_ICONS = [
  'MessageSquare',
  'FileText',
  'User',
  'UserCheck',
  'Bot',
  'Clock',
  'Tag',
  'Star',
  'Coins',
] as const;

type FieldIconName = typeof FIELD_ICONS[number];

const RegistryExpPage = () => {
  const hero   = useContentSection('registry-exp', 'hero');
  const unit   = useContentSection('registry-exp', 'unit');
  const future = useContentSection('registry-exp', 'future');
  const cta    = useContentSection('registry-exp', 'cta');

  const fields = Array.from({ length: 9 }, (_, i) => ({
    label: unit(`field_${i + 1}`, ''),
    desc:  unit(`field_${i + 1}_desc`, ''),
    icon:  FIELD_ICONS[i] as FieldIconName,
    isKm:  i === 8,
  })).filter(f => f.label);

  const stages = Array.from({ length: 3 }, (_, i) => ({
    title: future(`stage_${i + 1}_title`, ''),
    text:  future(`stage_${i + 1}_text`, ''),
    done:  i === 0,
    active: i === 1,
  })).filter(s => s.title);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Реестр опыта')}
        title1={hero('title_1', 'Реестр')}
        title2={hero('title_2', 'опыта.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/how-ai')}>{hero('cta_primary', 'Как работает ИИ')}</Link>
          </Button>
          {hero('cta_secondary', '') && (
            <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
              <Link to="/registry-km">{hero('cta_secondary', 'Реестр КМ')}</Link>
            </Button>
          )}
        </div>
      </PageHero>

      <Divider />

      {/* Что такое единица опыта */}
      <PageSection
        kicker={unit('kicker', '01 · Единица опыта')}
        title={unit('title', 'Результат, который остаётся.')}
      >
        <p className="text-white/55 text-lg leading-relaxed max-w-3xl mb-10">{unit('text', '')}</p>

        {/* Визуализация структуры единицы опыта */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.07] flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ background: NEON }} />
            <span className="text-[11px] uppercase tracking-widest text-white/40">Структура единицы опыта</span>
            <span className="ml-auto text-[10px] text-white/20">exp_unit_001</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
            {fields.map((field, i) => (
              <div
                key={i}
                className="p-5 space-y-2 transition-colors hover:bg-white/[0.02]"
                style={{
                  background: field.isKm ? 'hsl(168 100% 50% / 0.04)' : '#0c0c0c',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: field.isKm ? 'hsl(168 100% 50% / 0.15)' : 'rgba(255,255,255,0.05)' }}
                  >
                    <Icon name={field.icon} size={13} style={{ color: field.isKm ? NEON : 'rgba(255,255,255,0.4)' }} />
                  </div>
                  <span className="font-semibold text-sm" style={{ color: field.isKm ? NEON : 'rgba(255,255,255,0.85)' }}>
                    {field.label}
                  </span>
                </div>
                <div className="text-xs text-white/35 leading-relaxed pl-[37px]">{field.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Пример-карточка */}
        <div className="mt-6 rounded-2xl border p-6" style={{ borderColor: 'hsl(168 100% 50% / 0.15)', background: 'hsl(168 100% 50% / 0.02)' }}>
          <div className="text-[11px] uppercase tracking-widest mb-4 text-white/30">Пример единицы опыта</div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-white/30 text-xs mb-1">Запрос</div>
              <div className="text-white/70">«Сравнить два жилых квартала по инфраструктуре»</div>
            </div>
            <div>
              <div className="text-white/30 text-xs mb-1">Теги</div>
              <div className="flex flex-wrap gap-1.5">
                {['Сравнение', 'Инфраструктура', 'Анализ'].map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50">{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white/30 text-xs mb-1">Результат</div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={14} style={{ color: NEON }} />
                <span className="text-white/70">Верифицировано · +0.5 КМ</span>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Будущее реестра */}
      <PageSection
        kicker={future('kicker', '02 · Перспектива')}
        title={future('title', 'Сейчас внутри. Потом — в цепи.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{future('text', '')}</p>
          <div className="space-y-3">
            {stages.map((stage, i) => (
              <div
                key={i}
                className="rounded-xl border p-5 flex gap-4 items-start transition-colors"
                style={{
                  borderColor: stage.active ? 'hsl(168 100% 50% / 0.3)' : stage.done ? 'hsl(168 100% 50% / 0.15)' : 'rgba(255,255,255,0.07)',
                  background: stage.active ? 'hsl(168 100% 50% / 0.04)' : stage.done ? 'hsl(168 100% 50% / 0.02)' : 'rgba(255,255,255,0.015)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black border"
                  style={{
                    background: stage.done ? 'hsl(168 100% 50% / 0.15)' : '#0c0c0c',
                    borderColor: stage.done || stage.active ? 'hsl(168 100% 50% / 0.4)' : 'rgba(255,255,255,0.1)',
                    color: stage.done || stage.active ? NEON : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-white/90">{stage.title}</span>
                    {stage.done && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: 'hsl(168 100% 50% / 0.12)', color: NEON }}>
                        Сейчас
                      </span>
                    )}
                    {stage.active && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border" style={{ borderColor: 'hsl(168 100% 50% / 0.3)', color: 'hsl(168 100% 50% / 0.7)' }}>
                        Следующий
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/40 leading-relaxed">{stage.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Начни создавать свои единицы опыта.')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/mining-kvartiry')}>{cta('cta_primary', 'Получить КМ')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/how-ai')}>{cta('cta_secondary', 'Как работает ИИ')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default RegistryExpPage;
