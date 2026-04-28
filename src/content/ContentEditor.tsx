import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { CONTENT_SCHEMA, ContentField } from './schema';
import { useContentCtx } from './ContentContext';

type DraftMap = Record<string, string>;

const k = (page: string, section: string, key: string) => `${page}.${section}.${key}`;

const ContentEditor = () => {
  const { toast } = useToast();
  const { url, map, reload, adminPassword, logoutAdmin } = useContentCtx();

  const [draft, setDraft] = useState<DraftMap>({});
  const [openPage, setOpenPage] = useState<string>(CONTENT_SCHEMA[0]?.id || '');
  const [openSection, setOpenSection] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const next: DraftMap = {};
    for (const page of CONTENT_SCHEMA) {
      for (const section of page.sections) {
        for (const field of section.fields) {
          const key = k(page.id, section.id, field.key);
          next[key] = map[key] ?? field.fallback;
        }
      }
    }
    setDraft(next);
  }, [map]);

  const dirtyKeys = useMemo(() => {
    const list: { page: string; section: string; field: ContentField; value: string }[] = [];
    for (const page of CONTENT_SCHEMA) {
      for (const section of page.sections) {
        for (const field of section.fields) {
          const key = k(page.id, section.id, field.key);
          const stored = map[key] ?? field.fallback;
          const current = draft[key] ?? '';
          if (current !== stored) {
            list.push({ page: page.id, section: section.id, field, value: current });
          }
        }
      }
    }
    return list;
  }, [draft, map]);

  const save = async () => {
    if (dirtyKeys.length === 0) {
      toast({ title: 'Нечего сохранять' });
      return;
    }
    setSaving(true);
    try {
      const updates = dirtyKeys.map(({ page, section, field, value }) => ({
        page,
        section,
        key: field.key,
        value,
        type: field.type === 'image' ? 'image' : (field.multiline ? 'textarea' : 'text'),
        sort_order: 0,
      }));
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': adminPassword },
        body: JSON.stringify({ updates }),
      });
      const json = await res.json();
      if (res.status === 401) {
        toast({ title: 'Сессия истекла', description: 'Войди заново как админ', variant: 'destructive' });
        logoutAdmin();
        return;
      }
      if (!res.ok || !json.ok) {
        toast({ title: 'Ошибка сохранения', description: json.error || '', variant: 'destructive' });
        return;
      }
      toast({ title: `Сохранено (${updates.length})` });
      await reload();
    } catch {
      toast({ title: 'Ошибка сети', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const reset = (page: string, section: string, field: ContentField) => {
    setDraft(d => ({ ...d, [k(page, section, field.key)]: field.fallback }));
  };

  const [uploadingKey, setUploadingKey] = useState<string>('');

  const uploadImage = async (page: string, section: string, field: ContentField, file: File) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast({ title: 'Файл слишком большой', description: 'Максимум 8 МБ', variant: 'destructive' });
      return;
    }
    const key = k(page, section, field.key);
    setUploadingKey(key);
    try {
      const b64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const idx = result.indexOf(',');
          resolve(idx >= 0 ? result.slice(idx + 1) : result);
        };
        reader.onerror = () => reject(new Error('read fail'));
        reader.readAsDataURL(file);
      });
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': adminPassword },
        body: JSON.stringify({
          file_base64: b64,
          filename: file.name,
          content_type: file.type || 'image/png',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 401) {
        toast({ title: 'Сессия истекла', description: 'Войди заново как админ', variant: 'destructive' });
        logoutAdmin();
        return;
      }
      if (!res.ok || !json?.url) {
        toast({ title: 'Не удалось загрузить', description: json?.error || '', variant: 'destructive' });
        return;
      }
      setDraft(d => ({ ...d, [key]: json.url }));
      toast({ title: 'Картинка загружена · нажми «Сохранить»' });
    } catch {
      toast({ title: 'Ошибка загрузки', variant: 'destructive' });
    } finally {
      setUploadingKey('');
    }
  };

  return (
    <section className="glass rim rounded-3xl p-6 lg:p-8 border border-white/10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="text-xs tracking-[0.22em] text-neon uppercase mb-2">Админка</div>
          <h2 className="display text-2xl md:text-3xl">Редактор контента сайта</h2>
          <p className="text-haze/70 text-sm mt-1">Меняй тексты и картинки по секциям. Стили и логика страниц не ломаются.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-haze/60">
            {dirtyKeys.length > 0 ? `Изменений: ${dirtyKeys.length}` : 'Нет изменений'}
          </span>
          <Button onClick={save} disabled={saving || dirtyKeys.length === 0} className="btn-neon h-11 rounded-md text-[12px] px-5">
            {saving ? 'Сохраняю…' : 'Сохранить'}
            {!saving && <Icon name="Save" size={14} className="ml-2" />}
          </Button>
          <Button onClick={logoutAdmin} variant="ghost" className="h-11 rounded-md text-[12px] px-4 border border-white/10 hover:bg-white/5">
            <Icon name="LogOut" size={14} className="mr-2" />
            Выйти
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {CONTENT_SCHEMA.map(page => (
          <button
            key={page.id}
            onClick={() => { setOpenPage(page.id); setOpenSection(''); }}
            className={`px-4 py-2 rounded-md text-[12px] tracking-[0.16em] uppercase border transition ${
              openPage === page.id
                ? 'bg-[hsl(var(--neon))]/15 border-[hsl(var(--neon))]/40 text-ink'
                : 'bg-white/[0.03] border-white/10 text-haze/70 hover:text-ink'
            }`}
          >
            {page.title}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {CONTENT_SCHEMA.filter(p => p.id === openPage).flatMap(page =>
          page.sections.map(section => {
            const isOpen = openSection === section.id;
            return (
              <div key={section.id} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenSection(isOpen ? '' : section.id)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.03] transition"
                >
                  <div className="flex items-center gap-3">
                    <Icon name={isOpen ? 'ChevronDown' : 'ChevronRight'} size={16} className="text-haze/60" />
                    <span className="font-medium text-ink">{section.title}</span>
                    <span className="text-xs text-haze/50">{section.fields.length} полей</span>
                  </div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-haze/40">{page.id} · {section.id}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 space-y-4">
                    {section.fields.map(field => {
                      const key = k(page.id, section.id, field.key);
                      const value = draft[key] ?? '';
                      const stored = map[key] ?? field.fallback;
                      const dirty = value !== stored;
                      return (
                        <div key={field.key}>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[11px] tracking-[0.16em] text-haze/70 uppercase">
                              {field.label}
                              {dirty && <span className="ml-2 text-neon">●</span>}
                            </label>
                            <button
                              onClick={() => reset(page.id, section.id, field)}
                              className="text-[10px] tracking-wider text-haze/50 hover:text-ink transition uppercase"
                              title="Сбросить к исходному тексту"
                            >
                              Сброс
                            </button>
                          </div>
                          {field.type === 'image' ? (
                            <div className="flex flex-wrap items-start gap-4">
                              <div className="w-32 h-24 rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0a] shrink-0">
                                {value ? (
                                  <img src={value} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-haze/40 text-xs">
                                    Нет фото
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-[220px] space-y-2">
                                <label className="block">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={e => {
                                      const f = e.target.files?.[0];
                                      if (f) uploadImage(page.id, section.id, field, f);
                                      e.target.value = '';
                                    }}
                                  />
                                  <span className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-[12px] tracking-[0.16em] uppercase border transition cursor-pointer ${
                                    uploadingKey === key
                                      ? 'bg-white/[0.05] border-white/10 text-haze/60'
                                      : 'bg-[hsl(var(--neon))]/10 border-[hsl(var(--neon))]/40 text-ink hover:bg-[hsl(var(--neon))]/20'
                                  }`}>
                                    <Icon name={uploadingKey === key ? 'Loader2' : 'Upload'} size={12} className={`mr-2 ${uploadingKey === key ? 'animate-spin' : ''}`} />
                                    {uploadingKey === key ? 'Загружаю…' : 'Загрузить картинку'}
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  value={value}
                                  onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))}
                                  placeholder="или вставь URL"
                                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-haze/80 placeholder-haze/40 focus:border-[hsl(var(--neon))]/50 focus:outline-none text-xs font-mono"
                                />
                              </div>
                            </div>
                          ) : field.multiline ? (
                            <textarea
                              value={value}
                              onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))}
                              rows={3}
                              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-ink placeholder-haze/40 focus:border-[hsl(var(--neon))]/50 focus:outline-none text-sm leading-relaxed resize-y"
                            />
                          ) : (
                            <input
                              type="text"
                              value={value}
                              onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))}
                              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-ink placeholder-haze/40 focus:border-[hsl(var(--neon))]/50 focus:outline-none text-sm"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }),
        )}
      </div>
    </section>
  );
};

export default ContentEditor;