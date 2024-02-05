import * as fs from 'fs';

const tableName = 'users';
const modelName='user';

const upScript = `
CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(36) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL
);
`;

const downScript = `
DROP TABLE IF EXISTS ${tableName};
`;

fs.writeFileSync(`./src/user/infraestructure/migrations/mysq_migrations/${modelName}_up.sql`, upScript);
fs.writeFileSync(`./src/user/infraestructure/migrations/mysq_migrations/${modelName}_down.sql`, downScript);
console.log(`Migrations generated for table ${tableName}`);
