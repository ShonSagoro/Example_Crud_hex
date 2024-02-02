import { UserRepository } from "../domain/repositories/UserRepository";

export class ListUsersCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(): Promise<void> {
        await this.userRepository.list();
    }
}