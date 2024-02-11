import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Port/UserInterface";

export class ListUsersCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(): Promise<User[]| null> {
        return this.userInterface.list();
    }
}