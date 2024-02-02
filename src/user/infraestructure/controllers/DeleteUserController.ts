import { Request, Response } from "express";
import { DeleteUserCase } from "../../application/DeleteUserCase";

export class DeleteUserController {
  constructor(readonly deleteUserCase: DeleteUserCase) {}

  async execute(req: Request, res: Response) {
    const data = req.body;
    try {
      const result = await this.deleteUserCase.execute(data.id);
      res.status(200).send({
        status: "success",
        data: "User successfully deleted",
      });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ha ocurrido un error durante su petición.",
        msg: error,
      });
    }
  }
}