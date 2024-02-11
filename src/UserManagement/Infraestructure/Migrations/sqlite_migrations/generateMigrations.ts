import * as fs from 'fs';

const tableName = 'users';
const modelName='user';

const upScript = `
CREATE TABLE IF NOT EXISTS ${tableName} (
    uuid TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    lastname TEXT,
    number_phone TEXT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    verified_at TEXT NOT NULL,
    token TEXT
);
`;

const downScript = `
DROP TABLE IF EXISTS ${tableName};
`;

fs.writeFileSync(`./src/UserManagement/Infraestructure/Migrations/sqlite_migrations/${modelName}_up.sql`, upScript);
fs.writeFileSync(`./src/UserManagement/Infraestructure/Migrations/sqlite_migrations/${modelName}_down.sql`, downScript);
console.log(`Migrations generated for table ${tableName}`);
