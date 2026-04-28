import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const FAQ_LINKS: Record<number, string> = {
  1: '/about',
  2: '/about',
  3: '/mining-kvartiry',
  4: '/calculator',
  5: '/ai-ksi',
  6: '/ao-ksi',
  7: '/cooperative',
  8: '/fond',
  9: '/calculator',
  10: '/cooperative',
  11: '/legal',
  12: '/roadmap',
  13: '/mining-kvartiry',
};

const FaqPage = () => {
  const hero      = useContentSection('faq', 'hero');
  const questions = useContentSection('faq', 'questions');
  const cta       = useContentSection('faq', 'cta');

  const [open, setOpen] = useState<number | null>(null);

  const qList = Array.from({ length: 13 }, (_, i) => ({
    q:    questions(`q${i + 1}`, ''),
    a:    questions(`a${i + 1}`, ''),
    link: FAQ_LINKS[i + 1],
  })).filter(item => item.q);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Вопросы и ответы')}
        title1={hero('title_1', 'Частые')}
        title2={hero('title_2', 'вопросы.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      />

      <PageSection>
        <div className="max-w-3xl mx-auto space-y-3">
          {qList.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-2xl border transition-all overflow-hidden"
                style={{
                  borderColor: isOpen ? 'hsl(168 100% 50% / 0.3)' : 'rgba(255,255,255,0.07)',
                  background: isOpen ? 'hsl(168 100% 50% / 0.03)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                >
                  <span className="font-semibold text-sm text-white/85 leading-snug">{item.q}</span>
                  <Icon
                    name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                    size={16}
                    className="shrink-0 transition-transform"
                    style={{ color: isOpen ? NEON : 'rgba(255,255,255,0.3)' }}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-white/55 leading-relaxed mb-3">{item.a}</p>
                    <Link
                      to={item.link}
                      className="text-xs font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
                      style={{ color: 'hsl(168 100% 50% / 0.7)' }}
                    >
                      Подробнее →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Быстрые ссылки */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-widest text-white/25 mb-4">Полезные разделы</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'Что такое КМ', href: '/about', icon: 'Layers' as const },
              { label: 'Калькулятор КМ', href: '/calculator', icon: 'Calculator' as const },
              { label: 'ИИ АО КСИ', href: '/ai-ksi', icon: 'Bot' as const },
              { label: 'Кооперативная модель', href: '/cooperative', icon: 'Users' as const },
              { label: 'Правовая модель', href: '/legal', icon: 'Scale' as const },
              { label: 'Дорожная карта', href: '/roadmap', icon: 'Map' as const },
            ].map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 hover:border-[hsl(168_100%_50%/0.2)] transition-colors group"
              >
                <Icon name={link.icon} size={15} style={{ color: NEON }} className="shrink-0" />
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{link.label}</span>
                <Icon name="ArrowRight" size={13} className="ml-auto text-white/20 group-hover:text-white/40 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Не нашёл ответ на свой вопрос?')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/how-ai')}>{cta('cta_primary', 'Задать вопрос ИИ')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/mining-kvartiry')}>{cta('cta_secondary', 'Получить КМ')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default FaqPage;
