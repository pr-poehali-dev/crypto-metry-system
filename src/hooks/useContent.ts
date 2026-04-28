import { useEffect, useState, useCallback } from 'react';
import func2url from '../../backend/func2url.json';

const CONTENT_URL = (func2url as Record<string, string>)['content'];

export type ContentItem = {
  page: string;
  section: string;
  key: string;
  value: string;
  type: string;
  sort_order: number;
};

type ContentMap = Record<string, string>;

type Listener = (m: ContentMap) => void;

let cache: ContentMap = {};
let loaded = false;
let loading: Promise<void> | null = null;
const listeners = new Set<Listener>();

const keyOf = (page: string, section: string, key: string) => `${page}::${section}::${key}`;

function broadcast() {
  listeners.forEach(l => l(cache));
}

export async function fetchContent(force = false): Promise<ContentMap> {
  if (loaded && !force) return cache;
  if (loading) {
    await loading;
    return cache;
  }
  loading = (async () => {
    try {
      const r = await fetch(CONTENT_URL);
      const j = await r.json();
      const next: ContentMap = {};
      (j.items as ContentItem[] || []).forEach(it => {
        next[keyOf(it.page, it.section, it.key)] = it.value;
      });
      cache = next;
      loaded = true;
      broadcast();
    } catch (e) {
      loaded = true;
    } finally {
      loading = null;
    }
  })();
  await loading;
  return cache;
}

export function useContent(page: string) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const l: Listener = () => setTick(t => t + 1);
    listeners.add(l);
    fetchContent();
    return () => {
      listeners.delete(l);
    };
  }, []);

  const t = useCallback(
    (section: string, key: string, fallback: string) => {
      const v = cache[keyOf(page, section, key)];
      return v !== undefined && v !== '' ? v : fallback;
    },
    [page]
  );

  return { t };
}

export async function fetchAllContent(): Promise<ContentItem[]> {
  const r = await fetch(CONTENT_URL);
  const j = await r.json();
  return (j.items as ContentItem[]) || [];
}

export async function saveContent(email: string, updates: Partial<ContentItem>[]): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await fetch(CONTENT_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-User-Email': email },
      body: JSON.stringify({ updates }),
    });
    const j = await r.json();
    if (!r.ok) return { ok: false, error: j.error || 'Ошибка сохранения' };
    await fetchContent(true);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: 'Сеть' };
  }
}

export async function uploadImage(email: string, file: File): Promise<{ ok: boolean; url?: string; error?: string }> {
  try {
    const b64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const comma = result.indexOf(',');
        resolve(comma >= 0 ? result.slice(comma + 1) : result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const r = await fetch(CONTENT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-User-Email': email },
      body: JSON.stringify({ file_base64: b64, filename: file.name, content_type: file.type || 'image/png' }),
    });
    const j = await r.json();
    if (!r.ok) return { ok: false, error: j.error || 'Ошибка загрузки' };
    return { ok: true, url: j.url };
  } catch (e) {
    return { ok: false, error: 'Сеть' };
  }
}

export default useContent;
