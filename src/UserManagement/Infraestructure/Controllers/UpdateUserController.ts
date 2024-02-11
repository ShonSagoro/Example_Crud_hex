import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../Application/UseCase/UpdateUserCase";
import { User } from "../../Domain/Entities/User";
import { Credentials } from "../../Domain/Entities/Credentials";
import { Contact } from "../../Domain/Entities/Contact";
import { Status } from "../../Domain/Entities/Status";
import { EncryptService } from "../../Domain/Services/EncriptServices";

export class UpdateUserController {
    constructor(readonly updateUserCase: UpdateUserUseCase, readonly encryptionService: EncryptService) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        data.password = await this.encryptionService.execute(data.password);
        const { uuid } = req.params;
        let contact = new Contact(data.name, data.lastName, data.phoneNumber)
        let credentials= new Credentials(data.email, data.password)
        let status = new Status("", new Date())
        let userData = new User(status, contact, credentials);
        try {
            const user = await this.updateUserCase.execute(
                uuid, userData
            );

            if (user) {
                res.status(200).send({
                    status: "success",
                    data: {
                        id: user.uuid,
                        username: user.contact.getName(),
                        email: user.credentials.getEmail(),
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