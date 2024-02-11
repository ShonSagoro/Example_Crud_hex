import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Port/UserInterface";

export class ActivateUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string): Promise<void> {
        await this.userInterface.updateUserVerifiedAt(uuid);
    }
}