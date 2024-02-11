import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Port/UserInterface";
import { EncryptService } from "../../Domain/Services/EncriptServices";
import { TokenServices } from "../../Domain/Services/TokenServices";

export class SingInUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(email:string, password: string, encryptionService: EncryptService, tokenServices: TokenServices): Promise<User | null> {
        return await this.userInterface.sing_in(email, password, encryptionService, tokenServices);
    }
} 