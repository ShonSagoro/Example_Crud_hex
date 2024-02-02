import { User } from "../entities/User";

export interface UserRepository {
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    save(user: User): Promise<User | null>;
    delete(id: number): Promise<void>;
    update(user: User): Promise<User | null>;
    list(): Promise<User[]|null>;

}
