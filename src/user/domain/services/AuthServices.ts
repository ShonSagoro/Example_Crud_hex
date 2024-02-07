export interface AuthService {
    generateToken(userId: string): string;
    verifyToken(token: string): boolean;
  }