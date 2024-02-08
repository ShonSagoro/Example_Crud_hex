import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import { AuthService } from "../../domain/services/AuthServices";

export class LogoutUserController {
    constructor(readonly authService: AuthService ) { }

    async execute(req: Request, res: Response) {
        const headers = req.headers as IncomingHttpHeaders;
        const authHeader = headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: 'Token not provided' });
        }
        const token = authHeader.split(' ')[1];
        console.log(token); 
        try {
            this.authService.addToBlacklist(token);
            res.status(200).send({
                status: "success",
                data: "Te has deslogueado, vuelve pronto.",
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}