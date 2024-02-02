import { query } from "../../../database/mysql";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class MysqlUserRepository implements UserRepository {
    async findByUsername(username: string): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE username = ?`;
        const params: any[] = [username];
        try {
            const [result]: any = await query(sql, params);
            return new User(result[0].id, result[0].username, result[0].email, "-", result[0].status);
        } catch (error) {
            return null;
        }
    }
    async findByEmail(email: string): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE email = ?`;
        const params: any[] = [email];
        try {
            const [result]: any = await query(sql, params);
            return new User(result[0].id, result[0].username, result[0].email, "-", result[0].status);
        } catch (error) {
            return null;
        }
    }
    async findById(id: number): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE id = ?`;
        const params: any[] = [id];
        try {
            const [result]: any = await query(sql, params);
            return new User(result[0].id, result[0].username, result[0].email, "-", result[0].status);
        } catch (error) {
            return null;
        }
    }
    async save(user: User): Promise<User | null> {
        const existingUser = await this.findByEmail(user.email);
        if (existingUser) {
            throw new Error("The user exists with the same email.");
        }
    
        let sql = `INSERT INTO users (username, email, password, status) VALUES (?,?,?,?)`;
        let params = [user.username, user.email, user.password, user.status];
        
        try {
            const [result]: any = await query(sql, params);
            return new User(result.insertId, user.username, user.email, "-", user.status);
        } catch (error) {
            return null;
        }
    }
    async delete(id: number): Promise<void> {
        let sql = `DELETE FROM users WHERE id = ?`;
        let params = [id];
        try {
            await query(sql, params);
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }
    async update(user: User): Promise<User | null> {
        let sql = `UPDATE users SET username = ?, email = ?, password = ?, status = ? WHERE id = ?`;
        let params = [user.username, user.email, user.password, user.status, user.id];
        try {
            await query(sql, params);
            return user;
        } catch (error) {
            return null;
        }   
    }
    async list(): Promise<User[] | null> {
        let sql = `SELECT * FROM users`;
        try {
            const [result]: any = await query(sql, []);
            return result.map((user: any) => new User(user.id, user.username, user.email, "-", user.status));
        } catch (error) {
            return null;
        }
    }
} 