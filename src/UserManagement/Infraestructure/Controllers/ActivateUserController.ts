import { Request, Response } from "express";
import { ActivateUserCase } from "../../Application/UseCase/ActivateUserCase";

export class ActivateUserController {
  constructor(readonly activateUserCase: ActivateUserCase) {}

  async execute(req: Request, res: Response) {
    const { uuid } = req.params;
    try {
      const result = await this.activateUserCase.execute(uuid);
      res.status(200).send({
        status: "success",
        data: "User successfully ACTIVATED",
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