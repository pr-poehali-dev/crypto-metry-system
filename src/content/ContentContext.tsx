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
};

const Ctx = createContext<ContentCtx>({
  url: CONTENT_URL,
  map: {},
  loaded: false,
  reload: async () => {},
});

const buildKey = (p: string, s: string, k: string) => `${p}.${s}.${k}`;

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<ContentMap>({});
  const [loaded, setLoaded] = useState(false);

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
  }, []);

  const value = useMemo<ContentCtx>(
    () => ({ url: CONTENT_URL, map, loaded, reload: load }),
    [map, loaded],
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