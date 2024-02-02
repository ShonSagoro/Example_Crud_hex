import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class DeleteUserCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}