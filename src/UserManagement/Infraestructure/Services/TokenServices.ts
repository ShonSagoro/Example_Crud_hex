import { randomBytes } from 'crypto';


export class TokenServices implements TokenServices{
    private readonly token_length: number;
    constructor() {
        this.token_length = Number(process.env.TOKEN_LENGTH) || 0;
    }

    async generateToken(): Promise<string> {
        return randomBytes(this.token_length).toString('hex');
    }
}