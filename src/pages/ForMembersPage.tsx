import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContentSection } from '@/content/ContentContext';
import { PageShell, PageHero, PageSection, Divider } from '@/components/PageShell';

const NEON = 'hsl(168 100% 50%)';

const ROLE_ICONS = ['Home', 'Key', 'Briefcase', 'Building2', 'Map', 'Megaphone', 'GraduationCap', 'Eye'] as const;

const ForMembersPage = () => {
  const hero  = useContentSection('for-members', 'hero');
  const roles = useContentSection('for-members', 'roles');
  const cta   = useContentSection('for-members', 'cta');

  const roleList = Array.from({ length: 8 }, (_, i) => ({
    title: roles(`role_${i + 1}_title`, ''),
    desc:  roles(`role_${i + 1}_desc`, ''),
    icon:  ROLE_ICONS[i],
  })).filter(r => r.title);

  return (
    <PageShell>
      <PageHero
        chip={hero('chip', 'КриптоМетры · Участие')}
        title1={hero('title_1', 'Майни тем,')}
        title2={hero('title_2', 'что у тебя есть.')}
        subtitle={hero('subtitle', '')}
        bgImage={hero('bg_image', '')}
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild className="h-11 px-6 font-semibold text-sm" style={{ background: NEON, color: '#000' }}>
            <Link to={hero('cta_primary_url', '/mining-kvartiry')}>{hero('cta_primary', 'Получить КМ')}</Link>
          </Button>
          <Button variant="outline" asChild className="h-11 px-6 border-white/15 text-white/70 hover:bg-white/5 text-sm">
            <Link to="/calculator">{hero('cta_secondary', 'Калькулятор КМ')}</Link>
          </Button>
        </div>
      </PageHero>

      <Divider />

      {/* Роли */}
      <PageSection
        kicker={roles('kicker', '01 · Кто ты в системе')}
        title={roles('title', 'Каждая роль — свой вклад.')}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roleList.map((role, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-[hsl(168_100%_50%/0.3)] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[hsl(168_100%_50%/0.12)] transition-colors" style={{ background: 'hsl(168 100% 50% / 0.07)' }}>
                <Icon name={role.icon} size={18} style={{ color: NEON }} />
              </div>
              <div className="font-bold text-white/90 mb-2">{role.title}</div>
              <div className="text-xs text-white/40 leading-relaxed">{role.desc}</div>
            </div>
          ))}
        </div>

        {/* CTA-блок «Рассчитать» */}
        <div className="mt-8 rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between" style={{ borderColor: 'hsl(168 100% 50% / 0.2)', background: 'hsl(168 100% 50% / 0.03)' }}>
          <div>
            <div className="font-bold text-white mb-1">Не знаешь, сколько КМ получишь?</div>
            <div className="text-sm text-white/40">Калькулятор покажет точную сумму по каждому действию</div>
          </div>
          <Button asChild className="shrink-0 h-10 px-5 font-semibold" style={{ background: NEON, color: '#000' }}>
            <Link to="/calculator">Рассчитать КМ →</Link>
          </Button>
        </div>
      </PageSection>

      <Divider />

      {/* Как начать */}
      <PageSection kicker="02 · Как начать" title="Три шага к первым КМ.">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Зарегистрируйся', desc: 'Войди через личный кабинет — получи первые КМ за регистрацию', icon: 'UserPlus' as const, link: '/cabinet', cta: 'Войти' },
            { step: '2', title: 'Заполни анкету', desc: 'Расскажи о квартире, которую хочешь — получи КМ за вклад данных', icon: 'FileText' as const, link: '/mining-kvartiry', cta: 'Заполнить' },
            { step: '3', title: 'Задай вопрос ИИ', desc: 'Отправь запрос к ИИ АО КСИ — каждый верифицированный запрос даёт КМ', icon: 'Bot' as const, link: '/how-ai', cta: 'Как это работает' },
          ].map(item => (
            <div key={item.step} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border" style={{ background: 'hsl(168 100% 50% / 0.1)', borderColor: 'hsl(168 100% 50% / 0.3)', color: NEON }}>
                  {item.step}
                </div>
                <Icon name={item.icon} size={16} style={{ color: NEON }} />
              </div>
              <div>
                <div className="font-semibold text-white/90 mb-1">{item.title}</div>
                <div className="text-xs text-white/40 leading-relaxed">{item.desc}</div>
              </div>
              <Link to={item.link} className="text-xs font-medium underline underline-offset-4" style={{ color: 'hsl(168 100% 50% / 0.7)' }}>
                {item.cta} →
              </Link>
            </div>
          ))}
        </div>
      </PageSection>

      {/* CTA */}
      <section className="border-t border-white/[0.07] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">{cta('title', 'Начни майнить прямо сейчас.')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="h-11 px-7 font-semibold" style={{ background: NEON, color: '#000' }}>
              <Link to={cta('cta_primary_url', '/mining-kvartiry')}>{cta('cta_primary', 'Получить КМ')}</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 px-7 border-white/15 text-white/70 hover:bg-white/5">
              <Link to={cta('cta_secondary_url', '/about')}>{cta('cta_secondary', 'Что такое КМ')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default ForMembersPage;
