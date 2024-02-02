import { collection } from "../../../database/mongodb";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class MongoDBUserRepository implements UserRepository {
    async findByUsername(username: string): Promise<User | null> {
        try {
            const result = await collection.findOne({ username });
            return result ? new User(result.id, result.username, result.email, result.password, result.status) : null;
        } catch (error) {
            return null;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const result = await collection.findOne({ email });
            return result ? new User(result.id, result.username, result.email, result.password, result.status) : null;
        } catch (error) {
            return null;
        }
    }

    async findById(id: string): Promise<User | null> {
        try {
            const result = await collection.findOne({ id });
            return result ? new User(result.id, result.username, result.email, result.password, result.status) : null;
        } catch (error) {
            return null;
        }
    }

    async save(user: User): Promise<User | null> {
        try {
            await collection.insertOne(user);
            return user;
        } catch (error) {
            return null;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await collection.deleteOne({ id });
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }

    async update(user: User): Promise<User | null> {
        try {
            await collection.updateOne({ id: user.id }, { $set: user });
            return user;
        } catch (error) {
            return null;
        }
    }

    async list(): Promise<User[] | null> {
        try {
            const result = await collection.find().toArray();
            return result.map(user => new User(user.id, user.username, user.email, user.password, user.status));
        } catch (error) {
            return null;
        }
    }
}