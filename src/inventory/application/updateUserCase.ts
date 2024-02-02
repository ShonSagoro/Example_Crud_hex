import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/userRepository";
import { Validator } from "../domain/validations/Validator";

export class UpdateUserUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(user: User): Promise<void> {
        let userValidated = new Validator<User>(user);

        await userValidated.invalidIfHasErrors();

        return this.userRepository.update(user);
    }
}