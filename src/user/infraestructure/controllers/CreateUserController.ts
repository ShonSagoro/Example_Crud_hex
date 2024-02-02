import { Request, Response } from "express";
import { CreateUserCase } from "../../application/CreateUserCase";

export class CreateUserController {
    constructor(readonly CreateUserCase: CreateUserCase) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        try {
            const user = await this.CreateUserCase.execute(
                data.username,
                data.password,
                data.email,
                data.status
            );

            if (user) {
                res.status(200).send({
                    status: "success",
                    data: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    },
                });
            } else {
                res.status(500).send({
                    status: "internal server error",
                    data: "Ha ocurrido un error con tu peticion, inténtelo más tarde.",
                });
            }
        } catch (error) {
            res.status(204).send({
                status: "error",
                data: "Ha ocurrido un error durante su petición.",
                msg: error,
            });
        }
    }
}