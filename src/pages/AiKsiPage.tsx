import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const AiKsiPage = () => {
  const hero   = useContentSection('ai-ksi', 'hero');
  const what   = useContentSection('ai-ksi', 'what');
  const models = useContentSection('ai-ksi', 'models');
  const knowl  = useContentSection('ai-ksi', 'knowledge');
  const ops    = useContentSection('ai-ksi', 'operators');
  const cta    = useContentSection('ai-ksi', 'cta');

  const infraCards = [
    { title: models('card_1_title', 'GPT и LLM'),        text: models('card_1_text', ''), icon: 'Cloud' as const,   future: false },
    { title: models('card_2_title', 'Операторы КСИ'),    text: models('card_2_text', ''), icon: 'Users' as const,   future: false },
    { title: models('card_3_title', 'База знаний'),      text: models('card_3_text', ''), icon: 'Database' as const, future: false },
    { title: models('card_4_title', 'Локальные модели'), text: models('card_4_text', ''), icon: 'Server' as const,  future: true },
  ];

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'АО КСИ · Интеллектуальный контур')}
        title1={hero('title_1', 'ИИ')}
        title2={hero('title_2', 'АО КСИ')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/how-ai')}>{hero('cta_primary', 'Как работает запрос')}</Link>
          </Button>
          {hero('cta_secondary', '') && (
            <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
              <Link to="/ao-ksi">{hero('cta_secondary', 'Про АО КСИ')}</Link>
            </Button>
          )}
        </div>
      </PageHero>

      <Divider />

      {/* Что такое */}
      <PageSection
        kicker={what('kicker', '01 · Суть')}
        title={what('title', 'Не чат-бот. Контур.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{what('text', '')}</p>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-4">
            {[
              { icon: 'Cpu' as const,       label: 'Классификация задач',     desc: 'Определяет тип и сложность запроса' },
              { icon: 'GitBranch' as const, label: 'Маршрутизация',           desc: 'GPT или оператор — в зависимости от задачи' },
              { icon: 'BookOpen' as const,  label: 'Накопление опыта',        desc: 'Каждый запрос пополняет базу знаний' },
              { icon: 'UserCheck' as const, label: 'Взаимодействие с людьми', desc: 'Операторы верифицируют сложные результаты' },
            ].map(item => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center" style={{ background: 'hsl(168 100% 50% / 0.1)' }}>
                  <Icon name={item.icon} size={16} style={{ color: NEON }} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white/90">{item.label}</div>
                  <div className="text-xs text-white/40 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Модели */}
      <PageSection
        kicker={models('kicker', '02 · Инфраструктура')}
        title={models('title', 'Облако сегодня. Свои серверы — завтра.')}
      >
        <p className="text-white/55 text-lg leading-relaxed max-w-3xl mb-10">{models('text', '')}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infraCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border p-5 space-y-3 transition-all hover:border-[hsl(168_100%_50%/0.3)]"
              style={{
                borderColor: card.future ? 'hsl(168 100% 50% / 0.2)' : 'rgba(255,255,255,0.07)',
                background: card.future ? 'hsl(168 100% 50% / 0.03)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'hsl(168 100% 50% / 0.08)' }}>
                <Icon name={card.icon} size={18} style={{ color: card.future ? NEON : 'rgba(255,255,255,0.5)' }} />
              </div>
              <div>
                <div className="font-semibold text-sm text-white/90 mb-1">{card.title}</div>
                <div className="text-xs text-white/40 leading-relaxed">{card.text}</div>
              </div>
              {card.future && (
                <div className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full inline-block" style={{ background: 'hsl(168 100% 50% / 0.12)', color: NEON }}>
                  Перспектива
                </div>
              )}
            </div>
          ))}
        </div>
      </PageSection>

      <Divider />

      {/* База знаний */}
      <PageSection
        kicker={knowl('kicker', '03 · База знаний')}
        title={knowl('title', 'Каждый запрос — вклад в систему.')}
      >
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            <p className="text-white/55 text-lg leading-relaxed">{knowl('text', '')}</p>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="text-[11px] uppercase tracking-widest mb-4" style={{ color: NEON }}>Что накапливается</div>
            {['Сценарии обработки запросов', 'Теги и категории', 'Результаты и оценки качества', 'Основания для начисления КМ', 'Профили участников'].map(item => (
              <div key={item} className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: NEON }} />
                <span className="text-sm text-white/60">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <Divider />

      {/* Операторы */}
      <PageSection
        kicker={ops('kicker', '04 · Люди в контуре')}
        title={ops('title', 'ИИ работает не один.')}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-white/55 text-lg leading-relaxed">{ops('text', '')}</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'ИИ',      desc: 'Скорость и объём',        icon: 'Bot' as const },
              { label: 'Оператор', desc: 'Точность и ответственность', icon: 'User' as const },
            ].map(item => (
              <div key={item.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center" style={{ background: 'hsl(168 100% 50% / 0.08)' }}>
                  <Icon name={item.icon} size={22} style={{ color: NEON }} />
                </div>
                <div className="font-bold text-white">{item.label}</div>
                <div className="text-xs text-white/40">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Хочешь отправить запрос к ИИ?')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/how-ai')}>{cta('cta_primary', 'Как это работает')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/ao-ksi')}>{cta('cta_secondary', 'О компании АО КСИ')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default AiKsiPage;
