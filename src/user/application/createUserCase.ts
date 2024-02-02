import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class CreateUserCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(user:User): Promise<User | null> {
        await user.validate();
        return await this.userRepository.save(user);
    }
}