import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/userRepository";

export class DeleteUserUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(user: User): Promise<void> {
        await this.userRepository.delete(user);
    }
}