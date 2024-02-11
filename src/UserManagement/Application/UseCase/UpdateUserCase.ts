import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Port/UserInterface";
import { Validator } from "../../Domain/Validations/Validator";

export class UpdateUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string, user: User): Promise<User | null> {
        let userValidated = new Validator<User>(user);

        await userValidated.invalidIfHasErrors();

        return this.userInterface.update(uuid, user);
    }
}