import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class ActivateUserCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(uuid:string): Promise<void> {
        await this.userRepository.activate(uuid);
    }
}