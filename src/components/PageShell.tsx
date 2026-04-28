import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DEFAULT_LOGO = 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/bucket/e42b3898-d2ef-44ff-b94f-465207ab3b2c.png';

const NEON = 'hsl(168 100% 50%)';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell = ({ children }: PageShellProps) => (
  <div className="min-h-screen bg-[#0c0c0c] text-white overflow-x-hidden">
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.07] bg-[#0c0c0c]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-md bg-[hsl(168_100%_50%/0.15)] blur-md group-hover:bg-[hsl(168_100%_50%/0.3)] transition-all" />
            <img src={DEFAULT_LOGO} alt="КриптоМетры" className="relative h-8 w-8 rounded-md object-contain" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm text-white">
              Крипто<span style={{ color: NEON }}>Метры</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-white/30">Народная платформа жилья</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/system" className="text-[11px] uppercase tracking-widest text-white/40 hover:text-white px-3 py-1.5 rounded transition-colors">
            Система
          </Link>
          <Link to="/cabinet" className="text-[11px] uppercase tracking-widest text-white/40 hover:text-white px-3 py-1.5 rounded transition-colors">
            Кабинет
          </Link>
        </nav>
        <Button size="sm" asChild className="h-8 px-4 text-xs font-semibold" style={{ background: NEON, color: '#000' }}>
          <Link to="/mining-kvartiry">Получить КМ</Link>
        </Button>
      </div>
    </header>
    <main>{children}</main>
    <footer className="border-t border-white/[0.07] py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-white/25">
        <span>© 2026 КриптоМетры · АО КСИ</span>
        <div className="flex gap-4">
          <Link to="/system" className="hover:text-white/50 transition-colors">Система</Link>
          <Link to="/legal" className="hover:text-white/50 transition-colors">Правовая модель</Link>
          <Link to="/admin" className="hover:text-white/50 transition-colors">Админ</Link>
        </div>
      </div>
    </footer>
  </div>
);

interface HeroProps {
  chip?: string;
  title1: string;
  title2?: string;
  subtitle?: string;
  bgImage?: string;
  children?: React.ReactNode;
}

export const PageHero = ({ chip, title1, title2, subtitle, bgImage, children }: HeroProps) => (
  <section className="relative pt-16 min-h-[60vh] flex items-end">
    {bgImage ? (
      <div className="absolute inset-0">
        <img src={bgImage} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/70 to-transparent" />
      </div>
    ) : (
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(168_100%_50%/0.04)] via-transparent to-transparent" />
    )}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(168_100%_50%/0.06),transparent_60%)]" />
    <div className="relative max-w-6xl mx-auto px-6 pb-16 pt-12 w-full">
      {chip && (
        <div className="inline-flex items-center gap-2 border border-[hsl(168_100%_50%/0.25)] text-[hsl(168_100%_50%)] text-[11px] uppercase tracking-widest px-3 py-1 rounded-full mb-6">
          {chip}
        </div>
      )}
      <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-5">
        {title1}
        {title2 && (
          <><br /><span style={{ color: 'hsl(168 100% 50%)' }}>{title2}</span></>
        )}
      </h1>
      {subtitle && (
        <p className="text-white/55 text-lg md:text-xl max-w-2xl leading-relaxed">{subtitle}</p>
      )}
      {children}
    </div>
  </section>
);

interface SectionProps {
  kicker?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export const PageSection = ({ kicker, title, children, className = '', id }: SectionProps) => (
  <section id={id} className={`max-w-6xl mx-auto px-6 py-14 ${className}`}>
    {(kicker || title) && (
      <div className="mb-8">
        {kicker && (
          <div className="text-[11px] uppercase tracking-[0.25em] text-[hsl(168_100%_50%/0.7)] mb-2">{kicker}</div>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">{title}</h2>
        )}
      </div>
    )}
    {children}
  </section>
);

export const Divider = () => (
  <div className="max-w-6xl mx-auto px-6">
    <div className="border-t border-white/[0.07]" />
  </div>
);
