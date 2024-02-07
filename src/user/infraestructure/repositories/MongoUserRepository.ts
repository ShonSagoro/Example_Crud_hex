import { collection } from "../../../database/mongodb";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * MongoDBUserRepository is an implementation of the UserRepository interface that uses MongoDB as the data source.
 */
export class MongoDBUserRepository implements UserRepository {
    async activate(uuid: string): Promise<void> {
        try {
            await collection.updateOne({ uuid }, { $set: { status: "activate" } });
        } catch (error) {
            throw new Error('Error activating user');
        }
    }

    async login(email: string, password: string): Promise<User | null> {
        try {
            const result = await collection.findOne({ email });
            
            if (result) {
                const isMatch = bcrypt.compareSync(password, result.password);
                
                if (isMatch) {
                    const token = jwt.sign({ id: result.id }, "your-secret-key"); // Replace "your-secret-key" with your actual secret key
                    return new User(result.id, result.username, result.email, token, result.status);
                }
            }
            
            return null;
        } catch (error) {
            return null;
        }
    }
    async nextId(): Promise<number> {
        const lastDocument = await collection.findOne({}, { sort: { id: -1 } });
        return lastDocument ? lastDocument.id + 1 : 1;
    }

    async findByUsername(username: string): Promise<User | null> {
        try {
            const result = await collection.findOne({ username });
            return result ? new User(result.id, result.username, result.email, "-", result.status) : null;
        } catch (error) {
            return null;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const result = await collection.findOne({ email });
            return result ? new User(result.id, result.username, result.email, "-", result.status) : null;
        } catch (error) {
            return null;
        }
    }

    async findById(id: number): Promise<User | null> {
        try {
            const result = await collection.findOne({ id });
            return result ? new User(result.id, result.username, result.email, "-", result.status) : null;
        } catch (error) {
            return null;
        }
    }

    async save(user: User): Promise<User | null> {
        try {
            let id = await this.nextId();
            user.id = id;
            await collection.insertOne(user);
            return user;
        } catch (error) {
            return null;
        }
    }

    async delete(id: number): Promise<void> {
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
            console.log(result);
            return result.map(user => new User(user.id, user.uuid, user.username, user.email, user.status));
        } catch (error) {
            return null;
        }
    }
}