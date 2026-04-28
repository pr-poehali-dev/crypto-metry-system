CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  page VARCHAR(64) NOT NULL,
  section VARCHAR(64) NOT NULL,
  key VARCHAR(128) NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  type VARCHAR(16) NOT NULL DEFAULT 'text',
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(page, section, key)
);

CREATE INDEX IF NOT EXISTS idx_site_content_page_section ON site_content(page, section);

CREATE TABLE IF NOT EXISTS admin_emails (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  added_at TIMESTAMP NOT NULL DEFAULT NOW()
);
