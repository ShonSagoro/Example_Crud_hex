import { Request, Response } from "express";
import { ListUsersCase } from "../../Application/UseCase/ListUsersCase";

export class ListUsersController {
    constructor(readonly listUsersCase: ListUsersCase) { }

    async execute(req: Request, res: Response) {
        try {
            let users = await this.listUsersCase.execute();
            res.status(200).json(users);
        } catch (error) {
            res.status(204).send({
                status: "error",
                data: "Ha ocurrido un error durante su petición.",
                msg: error,
            });
        }
    }
}