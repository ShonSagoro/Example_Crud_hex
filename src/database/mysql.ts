import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { Signale } from 'signale';
import * as fs from 'fs';

dotenv.config();

const signale = new Signale();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
};

const pool = mysql.createPool(config);

export async function query(sql: string, params: any[]) {
    try {
        const conn = await pool.getConnection();
        signale.success('Conexion a la base de datos exitosa');
        const result = await conn.execute(sql, params);
        conn.release();
        return result;
    } catch (error) {
        signale.error(error);
        return null;
    }
}


async function runMigrationScript(filename: string) {
    try {
        const content = fs.readFileSync(filename, 'utf8');
        const queries = content.split(';').filter((query) => query.trim() !== '');

        for (const querydata of queries) {
            await query(querydata, []);
        }

        signale.success(`Migration script '${filename}' executed successfully`);
    } catch (error) {
        signale.error(`Error executing migration script '${filename}': ${error}`);
    }
}

// Ejecutar la migración 'up'
runMigrationScript('./src/UserManagement/Infraestructure/Migrations/mysq_migrations/user_up.sql');

