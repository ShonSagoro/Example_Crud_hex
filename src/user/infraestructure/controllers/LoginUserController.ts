import { Request, Response } from "express";
import { LoginUserCase } from "../../application/LoginUserCase";
import { EncryptService } from "../../domain/services/EncriptServices";
import { AuthService } from "../../domain/services/AuthServices";

export class LoginUserController {
    constructor(readonly loginUserCase: LoginUserCase,readonly encryptionService: EncryptService, readonly authService: AuthService ) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        console.log("logeandome");
        try {
            console.log("logeandome3");
            let user = await this.loginUserCase.execute(data.email, data.password);
            console.log("logeandome2");
            if (user === null) {
                res.status(401).send({
                    status: "error",
                    data: "El usuario no existe o la contraseña es incorrecta.",
                });
                return;
            } else if (await this.encryptionService.compare(data.password, user.password)) {
                const id = user.id;
                const token = this.authService.generateToken(id?.toString() || "");
                res.json({ token });
                res.status(200).json({
                    "status": "success",
                    "data": {
                        "token": token
                    }
                });
            }else{
                res.status(401).send({
                    status: "error",
                    data: "El usuario no existe o la contraseña es incorrecta.",
                });
            
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
        console.log("no");
    }
}