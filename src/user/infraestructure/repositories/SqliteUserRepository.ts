import sqlite3 from 'sqlite3';
import { User } from "../../domain/entities/User";
import{ db } from '../../../database/sqlitedb';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { v4 as uuidv4 } from 'uuid';

export class SqliteUserRepository implements UserRepository {
    logout(id: number): Promise<void> {
        console.log("ya no estas logeao");
        return Promise.resolve();
    }
    async login(email: string, password: string): Promise<User | null> {
        console.log("llegue");
        const sql = `SELECT * FROM users WHERE email = ?`;
        const params: any[] = [email];
        try{
            console.log("llegue");
            const result: any = await db.all(sql, params);
            console.log(result);
            if(result.length > 0){
                const user = new User(result[0].id, result[0].username, result[0].email, result[0].password, result[0].status);
                return user;
            }
            return null;
        }catch(error){
            return null;
        }

    }

    async activate(uuid: string): Promise<void> {
        const sql = `SELECT * FROM users WHERE uuid = ?`;
        const params: any[] = [uuid];
        try {
            const result: any = await db.all(sql, params);
            if (result.length > 0) {
                const sql = `UPDATE users SET status = 'active' WHERE uuid = ?`;
                const params: any[] = [uuid];
                await db.run(sql, params);
            }
        } catch (error) {
          
        }

    }
    async findByUsername(username: string): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE username = ?`;
        const params: any[] = [username];
        try {
            const result: any = await db.all(sql, params);
            return new User(result[0].id, result[0].username, result[0].email, "-", result[0].status);
        } catch (error) {
            return null;
        }
    }
    async findByEmail(email: string): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE email = ?`;
        const params: any[] = [email];
        try {
            const result: any = await db.all(sql, params);
            return new User(result[0].id, result[0].username, result[0].email, "-", result[0].status);
        } catch (error) {
            return null;
        }
    }
    async findById(id: number): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE id = ?`;
        const params: any[] = [id];
        try {
            const result: any = await db.all(sql, params);
            console.log(result);
            return new User(result[0].id, result[0].username, result[0].email, "-", result[0].status);
        } catch (error) {
            return null;
        }
    }
    async save(user: User): Promise<User | null> {
        const existingUser = await this.findByEmail(user.email);
        console.log("YA LLEGUE")
        if (existingUser) {
            console.log("Me gui")
            throw new Error("The user exists with the same email.");
        }

        const newUuid = uuidv4();

        let sql = `INSERT INTO users (uuid, username, email, password, status) VALUES (?,?,?,?,?)`;
        let params = [newUuid, user.username, user.email, user.password, user.status];

        try {
            const result: any = await db.run(sql, params);
            console.log(result);
            return new User(result.lastID, user.username, user.email, "-", user.status);
        } catch (error) {
            console.log("MORI");
            return null;
        }
    }
    async delete(id: number): Promise<void> {
        let sql = `DELETE FROM users WHERE id = ?`;
        let params = [id];
        try {
            await db.run(sql, params);
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }
    async update(user: User): Promise<User | null> {
        let sql = `UPDATE users SET username = ?, email = ?, password = ?, status = ? WHERE id = ?`;
        let params = [user.username, user.email, user.password, user.status, user.id];
        try {
            await db.run(sql, params);
            return user;
        } catch (error) {
            return null;
        }   
    }
    async list(): Promise<User[] | null> {
        let sql = `SELECT * FROM users`;
        try {
            const result: any = await db.all(sql, []);
            return result.map((user: any) => new User(user.id, user.username, user.email, "-", user.status));
        } catch (error) {
            return null;
        }
    }
}
