import { Contact } from "../../Domain/Entities/Contact";
import { Credentials } from "../../Domain/Entities/Credentials";
import { Status } from "../../Domain/Entities/Status";
import { User } from "../../Domain/Entities/User";
import{ db } from '../../../Database/sqlitedb';
import { UserInterface } from '../../Domain/Port/UserInterface';
import { EncryptService } from "../../Domain/Services/EncriptServices";
import { TokenServices } from "../../Domain/Services/TokenServices";

export class SqliteUserRepository implements UserInterface {
    async findByEmail(email: string): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE email = ?`;
        const params: any[] = [email];
        try {
            const [result]: any = await db.all(sql, params);
            let status = new Status(result[0].token, result[0].verifiedAt);
            let contact = new Contact(result[0].contact.name, result[0].contact.lastName, result[0].contact.phoneNumber);
            let credentials = new Credentials(result[0].credentials.email, result[0].credentials.password);
            let user = new User(status, contact, credentials);
            user.uuid = result[0].uuid;
            return user;
        } catch (error) {
            return null;
        }
    }
    async findByUUID(uuid: string): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE email = ?`;
        const params: any[] = [uuid];
        try {
            const [result]: any = await db.all(sql, params);
            let status = new Status(result[0].token, result[0].verifiedAt);
            let contact = new Contact(result[0].contact.name, result[0].contact.lastName, result[0].contact.phoneNumber);
            let credentials = new Credentials(result[0].credentials.email, result[0].credentials.password);
            let user = new User(status, contact, credentials);
            user.uuid = result[0].uuid;
            return user;
        } catch (error) {
            return null;
        }
    }
    async delete(uuid: string): Promise<void> {
        let sql = `DELETE FROM users WHERE uuid = ?`;
        let params = [uuid];
        try {
            await db.run(sql, params);
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }
    async update(uuid: string, user: User): Promise<User | null> {
        const sql = `UPDATE users SET name = ?, lastname = ?, number_phone = ?, email = ?, password = ? WHERE uuid = ?`;
        const params: any[] = [user.contact.getName(), user.contact.getLastname(), user.contact.getPhoneNumber(), user.credentials.getEmail(), user.credentials.getPassword(), uuid];
        try {
            await db.run(sql, params);
            user.uuid = uuid;
            return user;
        } catch (error) {
            return null;
        }
    }
    async list(): Promise<User[] | null> {
        let sql = `SELECT * FROM users`;
        try {
            const result: any = await db.all(sql, []);
            return result.map((user: { token: string; verifiedAt: Date; name: string; lastName: string; phoneNumber: string; email: string; password: string; uuid: string; }) => {
                let status = new Status(user.token, user.verifiedAt);
                let contact = new Contact(user.name, user.lastName, user.phoneNumber);
                let credentials = new Credentials(user.email, user.password);
                
                let newUser = new User(status, contact, credentials);
                newUser.uuid = user.uuid;
                
                return newUser;
            });
        } catch (error) {
            return null;
        }
    }
    async updateUserVerifiedAt(uuid: string): Promise<void> {
        const sql = `UPDATE users SET verified_at = ? WHERE uuid = ?`;
        const params: any[] = [new Date(), uuid];
        try {
            await db.run(sql, params);
        } catch (error) {
            console.error(error);
        }
    }
    
    async sing_up(user: User): Promise<User | null> {
        const existingUser = await this.findByEmail(user.credentials.getEmail());
        if (existingUser) {
            throw new Error("The user exists with the same email.");
        }
        let sql = `INSERT INTO users (uuid, name, lastname, number_phone, email, password, verified_at, token) VALUES (?, ?, ?, ?, ?, ?, '', '')`;
        const params: any[] = [user.uuid, user.contact.getName(), user.contact.getLastname(), user.contact.getPhoneNumber(), user.credentials.getEmail(), user.credentials.getPassword()];
        try {
            await db.run(sql, params);
            return user;   
        } catch (error) {
            return null;
        }
    }
    
    async sing_in(email: string, password: string, encryptionService: EncryptService, tokenServices: TokenServices): Promise<User | null> {
        let sql = `SELECT * FROM users WHERE email = ?`;
        try {
            const result: any = await db.all(sql, [email]);
            if (result.length > 0) {
                let status = new Status(result[0].token, result[0].verified_at);
                let contact = new Contact(result[0].name, result[0].lastname, result[0].number_phone);
                let credentials = new Credentials(result[0].email, result[0].password);
                const user = new User(status, contact, credentials);
                user.uuid = result[0].uuid;
                if (await encryptionService.compare(password, user.credentials.getPassword())) {
                    user.status.setToken(await tokenServices.generateToken());
                    let updateSql = `UPDATE users SET token = ? WHERE uuid = ?`;
                    await db.run(updateSql, [user.status.getToken(), user.uuid]);
                    return user;
                } else {
                    return null;
                }
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    async sing_out(uuid: string): Promise<void> {
        console.log("DESLOGEAO in SQLITE")
        let sql = `SELECT * FROM users WHERE uuid = ?`;
        try {
            const result: any = await db.all(sql, [uuid]);
            if (result.length > 0) {
                let updateSql = `UPDATE users SET token = '' WHERE uuid = ?`;
                await db.run(updateSql, [uuid]);
            }
        } catch (error) {
            console.error(error);
        }
        return Promise.resolve();
    }
}

/**
 * 
 * 
 *     logout(token:string): Promise<void> {
        console.log("DESLOGEAO")
        return Promise.resolve();
    }
    async login(email: string, password: string): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE email = ?`;
        const params: any[] = [email];
        console.log(email);
        console.log(password);
        try{
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
        const sql = `SELECT * FROM users WHERE    = ?`;
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
 */