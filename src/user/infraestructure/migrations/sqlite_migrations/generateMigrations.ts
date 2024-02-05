import * as fs from 'fs';

const tableName = 'users';
const modelName='user';

const upScript = `
CREATE TABLE IF NOT EXISTS ${tableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    status TEXT NOT NULL
);
`;

const downScript = `
DROP TABLE IF EXISTS ${tableName};
`;

fs.writeFileSync(`./src/user/infraestructure/migrations/sqlite_migrations/${modelName}_up.sql`, upScript);
fs.writeFileSync(`./src/user/infraestructure/migrations/sqlite_migrations/${modelName}_down.sql`, downScript);
console.log(`Migrations generated for table ${tableName}`);
