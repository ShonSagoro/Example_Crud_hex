
CREATE TABLE IF NOT EXISTS users (
    uuid TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    lastname TEXT,
    number_phone TEXT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    verified_at TEXT NOT NULL,
    token TEXT
);
