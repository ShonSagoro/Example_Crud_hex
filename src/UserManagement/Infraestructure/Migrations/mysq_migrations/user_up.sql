
CREATE TABLE IF NOT EXISTS users (
    uuid VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    number_phone VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    verified_at VARCHAR(255) NOT NULL,
    token VARCHAR(255)
);
