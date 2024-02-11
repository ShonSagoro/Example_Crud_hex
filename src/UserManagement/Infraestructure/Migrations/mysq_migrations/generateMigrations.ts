import * as fs from 'fs';

const tableName = 'users';
const modelName='user';

const upScript = `
CREATE TABLE IF NOT EXISTS ${tableName} (
    uuid VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    number_phone VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    verified_at VARCHAR(255) NOT NULL,
    token VARCHAR(255)
);
`;

const downScript = `
DROP TABLE IF EXISTS ${tableName};
`;

fs.writeFileSync(`./src/UserManagement/Infraestructure/Migrations/mysq_migrations/${modelName}_up.sql`, upScript);
fs.writeFileSync(`./src/UserManagement/Infraestructure/Migrations/mysq_migrations/${modelName}_down.sql`, downScript);
console.log(`Migrations generated for table ${tableName}`);
