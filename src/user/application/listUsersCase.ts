import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class ListUsersCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(): Promise<User[]| null> {
        return this.userRepository.list();
    }
}