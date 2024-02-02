import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/userRepository";

export class CreateUserUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(username: string,email:string,password:string,status:string): Promise<void> {
        const user = new User(null,username,email,password,status);
        await user.validate();
        await this.userRepository.save(user);
    }
}