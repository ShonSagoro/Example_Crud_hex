import { User } from "../entities/User";

export interface UserRepository {
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    save(user: User): Promise<void>;
    delete(user: User): Promise<void>;
    update(user: User): Promise<void>;
    list(): Promise<User[]|null>;

}
