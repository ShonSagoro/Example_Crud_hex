import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class GetByUserCase {
    constructor(readonly userRepository: UserRepository) {}

    async executeByUsername(username: string): Promise<User | null> {
        return this.userRepository.findByUsername(username);
    }

    async executeByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async executeById(id: number): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}