import { Request, Response } from "express";
import { SingUpUserCase } from "../../Application/UseCase/SingUpUserCase";
import { EncryptService } from "../../Domain/Services/EncriptServices";
import { EmailService } from "../../Domain/Services/EmailServices";

export class SingUpUserController {

    constructor(readonly singUpUserCase: SingUpUserCase, readonly emailService: EmailService, readonly encryptionService: EncryptService) {
    }

    async execute(req: Request, res: Response) {
        const data = req.body;
        data.password = await this.encryptionService.execute(data.password);
        try {
            const user = await this.singUpUserCase.execute({
                name: data.name,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                password: data.password
            });
            if (user) {
                const verificationUrl = `http://${process.env.HOST_SERVER}:${process.env.PORT_SERVER}/users/activate/${user.uuid}`;
                await this.emailService.sendEmail(user.credentials.getEmail(), "VERITY", `por favor verifiquse aqui: ${verificationUrl}`);
                res.status(200).send({
                    status: "success",
                    data: {
                        id: user.uuid,
                        username: user.contact.getName(),
                        email: user.credentials.getEmail(),
                        uuid: user.uuid,
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