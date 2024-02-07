import { Request, Response } from "express";
import { LoginUserCase } from "../../application/LoginUserCase";

export class LoginUserController {
    constructor(readonly loginUserCase: LoginUserCase) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        try {
            let token = await this.loginUserCase.execute(data.email, data.password);
            res.status(200).json(token);
        } catch (error) {
            res.status(204).send({
                status: "error",
                data: "Ha ocurrido un error durante su petición.",
                msg: error,
            });
        }
    }
}