import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class CreateUserCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(username: string,email:string,password:string,status:string): Promise<User | null> {
        const user = new User(null,username,email,password,status);
        await user.validate();
        return await this.userRepository.save(user);
    }
}