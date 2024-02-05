import * as sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

import * as fs from 'fs';

let db: Database;
 
async function connectToSQLite() {
    try {
        db = await open({
            filename: './src/database/sqlite/example.db',
            driver: sqlite3.Database,
        });

        console.log('Conexión a SQLite establecida');
        return db;
    } catch (error) {
        console.error('Error al conectar a SQLite:', error);
        throw error;
    }
}

async function runMigrationScript(filename: string) {
    try {
        const content = fs.readFileSync(filename, 'utf8');
        const queries = content.split(';').filter((query) => query.trim() !== '');

        for (const querydata of queries) {
            db.run(querydata, []);
        }

        console.log(`Script de migración '${filename}' ejecutado correctamente`);
    } catch (error) {
        console.error(`Error al ejecutar el script de migración '${filename}': ${error}`);
    }
}
connectToSQLite();

runMigrationScript('./src/user/infraestructure/migrations/sqlite_migrations/user_up.sql');

export { db };
