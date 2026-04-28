import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useContentCtx } from '@/content/ContentContext';
import ContentEditor from '@/content/ContentEditor';

const LOGO = 'https://cdn.poehali.dev/projects/b7c1e63c-11b6-4625-a266-770a5b28551a/bucket/e42b3898-d2ef-44ff-b94f-465207ab3b2c.png';

const Admin = () => {
  const { toast } = useToast();
  const { isAdmin, loginAdmin } = useContentCtx();
  const [pwd, setPwd] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwd) return;
    setBusy(true);
    const r = await loginAdmin(pwd);
    setBusy(false);
    if (r.ok) {
      setPwd('');
      toast({ title: 'Добро пожаловать в админку' });
    } else {
      toast({ title: r.error || 'Неверный пароль', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-ink">
      <header className="fixed top-0 inset-x-0 z-40 glass-strong border-b border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={LOGO} alt="КриптоМетры" className="h-10 w-10 rounded-md" />
            <div className="leading-none">
              <div className="font-bold tracking-tight">КриптоМетры</div>
              <div className="text-[10px] tracking-[0.2em] text-haze/70 mt-1">АДМИНКА КОНТЕНТА</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/cabinet" className="text-sm text-haze/80 hover:text-ink transition-colors px-4 py-2 hidden md:block">
              Личный кабинет
            </Link>
            <Link to="/">
              <Button variant="ghost" className="h-11 px-5 rounded-md text-[12px] border border-white/10 hover:bg-white/5">
                ← На главную
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative pt-32 pb-24 px-6 lg:px-10 max-w-[1300px] mx-auto">
        {!isAdmin ? (
          <div className="min-h-[480px] flex items-center justify-center">
            <form
              onSubmit={submit}
              className="w-full max-w-md glass rim rounded-3xl p-8 md:p-10 border border-[hsl(var(--neon))]/30"
              style={{ boxShadow: '0 0 80px hsla(164,95%,62%,0.12)' }}
            >
              <div className="flex items-center gap-2 text-xs tracking-[0.22em] text-neon uppercase mb-3">
                <Icon name="Lock" size={12} />
                Вход в админку
              </div>
              <h1 className="display text-3xl md:text-4xl leading-tight mb-3">
                Только <span className="display-italic text-neon">пароль.</span>
              </h1>
              <p className="text-haze/70 mb-8 text-sm leading-relaxed">
                Логин не нужен — только секретный пароль владельца проекта.
                Внутри ты сможешь править все тексты главной и страницы майнинга.
              </p>

              <label className="block mb-4">
                <span className="text-[11px] tracking-[0.16em] text-haze/60 uppercase mb-1.5 block">Пароль</span>
                <input
                  type="password"
                  required
                  autoFocus
                  value={pwd}
                  onChange={e => setPwd(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-ink placeholder-haze/40 focus:border-[hsl(var(--neon))]/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon))]/20 transition"
                />
              </label>

              <Button type="submit" disabled={busy || !pwd} className="btn-neon w-full h-14 rounded-md text-[12px]">
                {busy ? 'Проверяю…' : 'Войти'}
                {!busy && <Icon name="ArrowRight" size={16} className="ml-2" />}
              </Button>

              <div className="mt-6 text-center text-xs text-haze/60">
                Забыл пароль? Установи новый в настройках проекта (секрет ADMIN_PASSWORD).
              </div>
            </form>
          </div>
        ) : (
          <ContentEditor />
        )}
      </main>

      <footer className="relative px-6 lg:px-10 py-10 bg-[#060606] border-t border-white/5">
        <div className="max-w-[1500px] mx-auto flex flex-wrap items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO} alt="КриптоМетры" className="h-9 w-9 rounded-md" />
            <span className="font-bold">КриптоМетры</span>
          </Link>
          <div className="text-xs text-haze/50 tracking-wider">© КриптоМетр · Народная платформа жилья</div>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
