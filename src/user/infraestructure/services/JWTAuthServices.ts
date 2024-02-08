
import jwt from 'jsonwebtoken';
import { AuthService } from '../../domain/services/AuthServices';
import dotenv from 'dotenv';

dotenv.config();

export class JWTAuthService implements AuthService {
  private blacklist: string[] = [];
  private readonly secretKey: string;

  constructor() {
    this.secretKey = process.env.JWT_SECRET || '';
  }

  async addToBlacklist(token: string): Promise<void> {
    this.blacklist.push(token);
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    return this.blacklist.includes(token);
  }

  generateToken(userId: string): string {
    return jwt.sign({ userId }, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, this.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}
