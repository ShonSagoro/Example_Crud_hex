import { Request, Response } from "express";
import { UpdateUserCase } from "../../application/UpdateUserCase";
import { User } from "../../domain/entities/User";

export class UpdateUserController {
    constructor(readonly updateUserCase: UpdateUserCase) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        const { id } = req.params;
        let userData = new User(parseInt(id), data.username, data.email, data.password, data.status);
        try {
            const user = await this.updateUserCase.execute(
                userData
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