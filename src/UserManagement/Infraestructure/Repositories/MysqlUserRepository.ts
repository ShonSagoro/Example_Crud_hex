import { query } from "../../../Database/mysql";
import { Contact } from "../../Domain/Entities/Contact";
import { Credentials } from "../../Domain/Entities/Credentials";
import { Status } from "../../Domain/Entities/Status";
import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Port/UserInterface";
import { EncryptService } from "../../Domain/Services/EncriptServices";
import { TokenServices } from "../../Domain/Services/TokenServices";

export class MysqlUserRepository implements UserInterface {

    async findByEmail(email: string): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE email = ?`;
        const params: any[] = [email];
        try {
            const [result]: any = await query(sql, params);
            let status = new Status("", result[0].verified_at);
            let contact = new Contact(result[0].name, result[0].lastname, result[0].number_phone);
            let credentials = new Credentials(result[0].email, result[0].password);
            let user = new User(status, contact, credentials);
            user.uuid = result[0].uuid;
            console.log(user);
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async findByUUID(uuid: string): Promise<User | null> {
        const sql = `SELECT * FROM users WHERE uuid = ?`;
        const params: any[] = [uuid];
        try {
            const [result]: any = await query(sql, params);
            console.log(result);
            let status = new Status("", result[0].verified_at);
            let contact = new Contact(result[0].name, result[0].lastname, result[0].number_phone);
            let credentials = new Credentials(result[0].email, result[0].password);
            let user = new User(status, contact, credentials);
            user.uuid = result[0].uuid;
            console.log(user);
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async delete(uuid: string): Promise<void> {
        let sql = `DELETE FROM users WHERE uuid = ?`;
        let params = [uuid];
        try {
            await query(sql, params);
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }

    async update(uuid: string, user: User): Promise<User | null> {
        let sql = `UPDATE users SET name = ?, lastname = ?, number_phone = ?, email = ?, password = ? WHERE uuid = ?`;
        try {
            user.uuid = uuid;
            const params: any[] = [user.contact.getName(), user.contact.getLastname(), user.contact.getPhoneNumber(), user.credentials.getEmail(), user.credentials.getPassword(), uuid];
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
            return result.map((user: { uuid:any, verified_at: any; name: any; lastname: any; number_phone: any; email: any; password: any; }) => {
                const { verified_at, name, lastname, number_phone, email, password } = user;
            
                const status = new Status("",new Date(verified_at));
                const contact = new Contact(name, lastname, number_phone);
                const credentials = new Credentials(email, "");
                const usernew= new User(status, contact, credentials);
                usernew.uuid = user.uuid;
                return usernew;
            });
            
        } catch (error) {
            return null;
        }
    }
    async updateUserVerifiedAt(uuid: string): Promise<void> {
        const sql = `UPDATE users SET verified_at = ? WHERE uuid = ?`;
        const params: any[] = [new Date(), uuid];
        try {
            await query(sql, params);
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
            await query(sql, params);
            return user;   
        } catch (error) {
            return null;
        }
    }
    async sing_in(email: string, password: string, encryptionService: EncryptService, tokenServices: TokenServices): Promise<User | null> {
        let sql = `SELECT * FROM users WHERE email = ?`;
        try {
            const [result]: any = await query(sql, [email]);
            if (result.length > 0) {
                let status = new Status(result[0].token, result[0].verified_at);
                let contact = new Contact(result[0].name, result[0].lastname, result[0].number_phone);
                let credentials = new Credentials(result[0].email, result[0].password);
                const user = new User(status, contact, credentials);
                user.uuid = result[0].uuid;
                if (await encryptionService.compare(password, user.credentials.getPassword())) {
                    user.status.setToken(await tokenServices.generateToken());
                    let updateSql = `UPDATE users SET token = ? WHERE uuid = ?`;
                    await query(updateSql, [user.status.getToken(), user.uuid]);
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
        console.log("DESLOGEAO in MYSQL")
        let sql = `SELECT * FROM users WHERE uuid = ?`;
        try {
            const [result]: any = await query(sql, [uuid]);
            if (result.length > 0) {
                let updateSql = `UPDATE users SET token = '' WHERE uuid = ?`;
                await query(updateSql, [uuid]);
            }
        } catch (error) {
            console.error(error);
        }
        return Promise.resolve();
    }
} 