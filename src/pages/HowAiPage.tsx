import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const STEP_ICONS = [
  'MessageSquare',
  'ScanLine',
  'Zap',
  'User',
  'Layers',
  'CheckCircle',
  'SendHorizonal',
  'FileText',
  'Coins',
] as const;

type StepIconName = typeof STEP_ICONS[number];

const HowAiPage = () => {
  const hero   = useContentSection('how-ai', 'hero');
  const steps  = useContentSection('how-ai', 'steps');
  const result = useContentSection('how-ai', 'result');
  const cta    = useContentSection('how-ai', 'cta');

  const stepList = Array.from({ length: 9 }, (_, i) => ({
    label: steps(`step_${i + 1}`, ''),
    desc:  steps(`step_${i + 1}_desc`, ''),
    icon:  STEP_ICONS[i] as StepIconName,
    isHighlight: i === 7 || i === 8,
  })).filter(s => s.label);

  const simpleSteps = stepList.slice(0, 7);
  const finalSteps  = stepList.slice(7);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'ИИ АО КСИ · Схема работы')}
        title1={hero('title_1', 'Путь запроса')}
        title2={hero('title_2', 'к результату.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/ai-ksi')}>{hero('cta_primary', 'Про ИИ АО КСИ')}</Link>
          </Button>
          {hero('cta_secondary', '') && (
            <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
              <Link to="/registry-exp">{hero('cta_secondary', 'Реестр опыта')}</Link>
            </Button>
          )}
        </div>
      </PageHero>

      <Divider />

      {/* Шаги */}
      <PageSection
        kicker={steps('kicker', 'Маршрут запроса · 9 шагов')}
        title={steps('title', 'Каждый запрос проходит свой путь.')}
      >
        {/* Основные шаги 1–7 */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/[0.07] hidden md:block" />
          <div className="space-y-3">
            {simpleSteps.map((step, i) => (
              <div key={i} className="relative flex gap-5 items-start">
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-black z-10 border"
                  style={{
                    background: '#0c0c0c',
                    borderColor: i === 2 || i === 3 ? 'hsl(168 100% 50% / 0.4)' : 'rgba(255,255,255,0.1)',
                    color: i === 2 || i === 3 ? NEON : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {i + 1}
                </div>
                <div
                  className="flex-1 rounded-xl border p-4 transition-colors"
                  style={{
                    borderColor: i === 2 || i === 3 ? 'hsl(168 100% 50% / 0.2)' : 'rgba(255,255,255,0.07)',
                    background: i === 2 || i === 3 ? 'hsl(168 100% 50% / 0.03)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <Icon name={step.icon} size={15} style={{ color: i === 2 || i === 3 ? NEON : 'rgba(255,255,255,0.4)' }} />
                    <span className="font-semibold text-sm text-white/90">{step.label}</span>
                    {i === 2 && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ml-auto" style={{ background: 'hsl(168 100% 50% / 0.12)', color: NEON }}>
                        Автоматически
                      </span>
                    )}
                    {i === 3 && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ml-auto border" style={{ borderColor: 'hsl(168 100% 50% / 0.3)', color: NEON }}>
                        Человек
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/40 leading-relaxed pl-6">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Развилка GPT / Оператор */}
        <div className="my-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <div className="text-[11px] uppercase tracking-widest mb-4 text-white/30">Развилка по сложности</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2" style={{ borderColor: 'hsl(168 100% 50% / 0.2)', background: 'hsl(168 100% 50% / 0.03)' }}>
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={15} style={{ color: NEON }} />
                <span className="font-semibold text-sm text-white/90">Простой → GPT</span>
              </div>
              <div className="text-xs text-white/40">Типовые задачи обрабатываются облачной моделью автоматически</div>
            </div>
            <div className="rounded-xl border border-white/[0.1] bg-white/[0.02] p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="User" size={15} className="text-white/50" />
                <span className="font-semibold text-sm text-white/90">Сложный → Оператор</span>
              </div>
              <div className="text-xs text-white/40">Нестандартные задачи передаются оператору АО КСИ для верификации</div>
            </div>
          </div>
        </div>

        {/* Финальные шаги 8–9 */}
        {finalSteps.length > 0 && (
          <div className="space-y-3">
            {finalSteps.map((step, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border"
                  style={{ background: 'hsl(168 100% 50% / 0.15)', borderColor: 'hsl(168 100% 50% / 0.5)', color: NEON }}
                >
                  {i + 8}
                </div>
                <div className="flex-1 rounded-xl border p-4" style={{ borderColor: 'hsl(168 100% 50% / 0.25)', background: 'hsl(168 100% 50% / 0.04)' }}>
                  <div className="flex items-center gap-3 mb-1">
                    <Icon name={step.icon} size={15} style={{ color: NEON }} />
                    <span className="font-semibold text-sm" style={{ color: NEON }}>{step.label}</span>
                  </div>
                  <div className="text-xs text-white/40 leading-relaxed pl-6">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageSection>

      <Divider />

      {/* Что остаётся */}
      <PageSection
        kicker={result('kicker', 'Итог')}
        title={result('title', 'Запрос не исчезает.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{result('text', '')}</p>
          <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: 'hsl(168 100% 50% / 0.2)', background: 'hsl(168 100% 50% / 0.03)' }}>
            <div className="text-[11px] uppercase tracking-widest" style={{ color: NEON }}>Что создаёт запрос</div>
            {[
              'Единица опыта в реестре',
              'Пополнение базы знаний',
              'Улучшение следующих ответов',
              'Основание для КМ',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <Icon name="CheckCircle" size={14} style={{ color: NEON }} />
                <span className="text-sm text-white/70">{item}</span>
              </div>
            ))}
            <div className="pt-2">
              <Link to="/registry-exp" className="text-xs underline underline-offset-4 transition-colors hover:text-white" style={{ color: 'hsl(168 100% 50% / 0.7)' }}>
                Подробнее о реестре опыта →
              </Link>
            </div>
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Хочешь отправить свой первый запрос?')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/mining-kvartiry')}>{cta('cta_primary', 'Получить КМ')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/registry-exp')}>{cta('cta_secondary', 'Реестр опыта')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default HowAiPage;
