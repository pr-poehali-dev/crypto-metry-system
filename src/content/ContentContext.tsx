import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import func2url from '../../backend/func2url.json';

const CONTENT_URL =
  (func2url as Record<string, string>)['content'] ||
  'https://functions.poehali.dev/f05e08f9-bc95-4cc2-8742-f3a6955acb59';

type ContentItem = {
  page: string;
  section: string;
  key: string;
  value: string;
};

type ContentMap = Record<string, string>;

type ContentCtx = {
  url: string;
  map: ContentMap;
  loaded: boolean;
  reload: () => Promise<void>;
  adminPassword: string;
  isAdmin: boolean;
  loginAdmin: (pwd: string) => Promise<{ ok: boolean; error?: string }>;
  logoutAdmin: () => void;
};

const Ctx = createContext<ContentCtx>({
  url: CONTENT_URL,
  map: {},
  loaded: false,
  reload: async () => {},
  adminPassword: '',
  isAdmin: false,
  loginAdmin: async () => ({ ok: false }),
  logoutAdmin: () => {},
});

const buildKey = (p: string, s: string, k: string) => `${p}.${s}.${k}`;
const ADMIN_LS_KEY = 'km_admin_password';

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<ContentMap>({});
  const [loaded, setLoaded] = useState(false);
  const [adminPassword, setAdminPassword] = useState<string>('');

  const load = async () => {
    try {
      const r = await fetch(CONTENT_URL, { method: 'GET' });
      const data = await r.json();
      const next: ContentMap = {};
      for (const item of (data?.items ?? []) as ContentItem[]) {
        next[buildKey(item.page, item.section, item.key)] = item.value ?? '';
      }
      setMap(next);
    } catch {
      /* фолбэк — пустая карта, страницы рендерятся со своими дефолтами */
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
    const saved = localStorage.getItem(ADMIN_LS_KEY) || '';
    if (saved) setAdminPassword(saved);
  }, []);

  const loginAdmin = async (pwd: string) => {
    try {
      const r = await fetch(`${CONTENT_URL}?action=login`, {
        method: 'POST',
        headers: { 'X-Admin-Password': pwd },
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data?.ok) {
        setAdminPassword(pwd);
        localStorage.setItem(ADMIN_LS_KEY, pwd);
        return { ok: true };
      }
      return { ok: false, error: data?.error || 'Неверный пароль' };
    } catch {
      return { ok: false, error: 'Ошибка сети' };
    }
  };

  const logoutAdmin = () => {
    setAdminPassword('');
    localStorage.removeItem(ADMIN_LS_KEY);
  };

  const value = useMemo<ContentCtx>(
    () => ({
      url: CONTENT_URL,
      map,
      loaded,
      reload: load,
      adminPassword,
      isAdmin: !!adminPassword,
      loginAdmin,
      logoutAdmin,
    }),
    [map, loaded, adminPassword],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useContent = (page: string, section: string, key: string, fallback: string): string => {
  const { map } = useContext(Ctx);
  const v = map[buildKey(page, section, key)];
  return v && v.length > 0 ? v : fallback;
};

export const useContentSection = (page: string, section: string) => {
  const { map } = useContext(Ctx);
  return (key: string, fallback: string): string => {
    const v = map[buildKey(page, section, key)];
    return v && v.length > 0 ? v : fallback;
  };
};

export const useContentCtx = () => useContext(Ctx);

export default ContentProvider;