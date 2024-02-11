import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Port/UserInterface";

export class GetByUserCase {
    constructor(readonly userInteface: UserInterface) {}

    async executeByEmail(email: string): Promise<User | null> {
        return this.userInteface.findByEmail(email);
    }

    async executeByUUID(uuid:string): Promise<User | null> {
        return this.userInteface.findByUUID(uuid);
    }
}