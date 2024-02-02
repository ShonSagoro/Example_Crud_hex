import { UserRepository } from "../domain/repositories/userRepository";

export class DeleteUserUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(): Promise<void> {
        await this.userRepository.list();
    }
}