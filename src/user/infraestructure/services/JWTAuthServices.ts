
import jwt from 'jsonwebtoken';
import { AuthService } from '../../domain/services/AuthServices';
import dotenv from 'dotenv';

dotenv.config();

export class JWTAuthService implements AuthService {
  private readonly secretKey: string;

  constructor() {
    this.secretKey = process.env.JWT_SECRET || '';
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
