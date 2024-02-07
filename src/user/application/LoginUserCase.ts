import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class LoginUserCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(email:string, password: string): Promise<User | null> {
        return await this.userRepository.login(email, password);
    }
}