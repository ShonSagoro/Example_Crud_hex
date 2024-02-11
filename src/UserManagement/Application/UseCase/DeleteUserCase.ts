import { UserInterface} from "../../Domain/Port/UserInterface";

export class DeleteUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid: string): Promise<void> {
        await this.userInterface.delete(uuid);
    }
}