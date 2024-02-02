import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class DeleteUserCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(id: String): Promise<void> {
        await this.userRepository.delete(id);
    }
}