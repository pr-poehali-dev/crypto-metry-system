ALTER TABLE site_content ADD COLUMN IF NOT EXISTS label VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE site_content ADD COLUMN IF NOT EXISTS multiline BOOLEAN NOT NULL DEFAULT FALSE;
CREATE UNIQUE INDEX IF NOT EXISTS uq_site_content_path ON site_content(page, section, key);
CREATE INDEX IF NOT EXISTS idx_site_content_page_order ON site_content(page, sort_order);