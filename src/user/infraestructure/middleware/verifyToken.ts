import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers as IncomingHttpHeaders;
    const authHeader = headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from Bearer

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret not configured' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}