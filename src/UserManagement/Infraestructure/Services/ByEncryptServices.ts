import bcrypt from 'bcrypt';
import { EncryptService } from '../../Domain/Services/EncriptServices';

export class ByEncryptServices implements EncryptService {
    constructor() { }

    async execute(data: any): Promise<any> {
        const saltRounds = 10; // You can adjust this value
        return await bcrypt.hash(data, saltRounds);
    }

    async compare(data: any, hash: any): Promise<boolean> {
        return await bcrypt.compare(data, hash);
    }
}