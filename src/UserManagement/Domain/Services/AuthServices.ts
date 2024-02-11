export interface AuthService {
    generateToken(userId: string): string;
    verifyToken(token: string): boolean;
    addToBlacklist(token: string): Promise<void>;
    isTokenRevoked(token: string): Promise<boolean>;
  }