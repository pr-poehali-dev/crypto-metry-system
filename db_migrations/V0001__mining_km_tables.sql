CREATE TABLE IF NOT EXISTS t_p82937916_crypto_metry_system.participants (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(50),
    km_balance NUMERIC(10, 2) NOT NULL DEFAULT 0,
    level VARCHAR(50) NOT NULL DEFAULT 'start',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p82937916_crypto_metry_system.apartment_surveys (
    id SERIAL PRIMARY KEY,
    participant_id INTEGER REFERENCES t_p82937916_crypto_metry_system.participants(id),
    email VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(50),
    city VARCHAR(255),
    district VARCHAR(255),
    housing_format VARCHAR(100),
    budget VARCHAR(100),
    timeline VARCHAR(100),
    life_scenario TEXT,
    priorities TEXT,
    notes TEXT,
    source VARCHAR(100) DEFAULT 'mining-kvartiry',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p82937916_crypto_metry_system.km_transactions (
    id SERIAL PRIMARY KEY,
    participant_id INTEGER NOT NULL REFERENCES t_p82937916_crypto_metry_system.participants(id),
    amount NUMERIC(10, 2) NOT NULL,
    reason VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_surveys_email ON t_p82937916_crypto_metry_system.apartment_surveys(email);
CREATE INDEX IF NOT EXISTS idx_surveys_participant ON t_p82937916_crypto_metry_system.apartment_surveys(participant_id);
CREATE INDEX IF NOT EXISTS idx_txn_participant ON t_p82937916_crypto_metry_system.km_transactions(participant_id);