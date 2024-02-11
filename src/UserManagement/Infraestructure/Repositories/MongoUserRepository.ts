import { connect } from "../../../Database/mongodb";
import { Collection } from "mongodb";
import { Contact } from "../../Domain/Entities/Contact";
import { Credentials } from "../../Domain/Entities/Credentials";
import { Status } from "../../Domain/Entities/Status";
import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Port/UserInterface";
import { EncryptService } from "../../Domain/Services/EncriptServices";
import { TokenServices } from "../../Domain/Services/TokenServices";

export class MongoDBUserRepository implements UserInterface {
    private collection!: Collection|any;
    constructor() {
        this.initializeCollection();
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("user");
    }

    async findByUUID(uuid: string): Promise<User | null> {
        try {
            const result = await this.collection.findOne({ uuid });
            if (result) {
                let status = new Status(result.token, result.verifiedAt);
                let contact = new Contact(result.contact.name, result.contact.lastName, result.contact.phoneNumber);
                let credentials = new Credentials(result.credentials.email, result.credentials.password);
              
                let user = new User(status, contact, credentials);
                user.uuid = result.uuid;
                return user;
            }       
            return null;
        } catch (error) {
            return null;
        }
    }

    async sing_out(uuid: string): Promise<void> {
        console.log("DESLOGEAO")
        try{
            const result = await this.collection.findOne({ uuid });
            if (result) {
                await this.collection.updateOne({ uuid }, { $set: { token: "" } });
            }else{

            }
        }catch(error){
            console.error(error)
        }   
        return Promise.resolve();
    }

    async sing_in(email: string, password: string, encryptionService: EncryptService, tokenServices: TokenServices): Promise<User | null> {
        try {
            const result = await this.collection.findOne({ 'credentials.email': email });
            if (result) {
                let status = new Status(result.token, result.verifiedAt);
                let contact = new Contact(result.contact.name, result.contact.lastName, result.contact.phoneNumber);
                let credentials = new Credentials(result.credentials.email, result.credentials.password);
                const user = new User(status, contact, credentials);
                user.uuid=result.uuid;
                if (await encryptionService.compare(password, user.credentials.getPassword())) {
                    user.status.setToken(await tokenServices.generateToken()); 
                    user.status.setVerifiedAt(new Date());
                    await this.collection.updateOne({ uuid: user.uuid }, { $set: user });
                    return user;
                }else{
                    return null;
                }
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateUserVerifiedAt(uuid: string): Promise<void> {
        try {
            const result = await this.collection.findOne({ uuid });
            if (result) {
                await this.collection.updateOne({ uuid }, { $set: { 'status.verifiedAt': new Date() } });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const result = await this.collection.findOne({ 'credentials.email': email });
            if (result) {
                let status = new Status(result.token, result.verifiedAt);
                let contact = new Contact(result.contact.name, result.contact.lastName, result.contact.phoneNumber);
                let credentials = new Credentials(result.credentials.email, result.credentials.password);
              
                let user = new User(status, contact, credentials);
                user.uuid = result.uuid;
                return user;
            }       
            return null;
        } catch (error) {
            return null;
        }
    }

    async sing_up(user: User): Promise<User | null> {
        try {
            await this.collection.insertOne(user);
            return user;
        } catch (error) {
            return null;
        }
    }

    async delete(uuid:string): Promise<void> {
        try {
            await this.collection.deleteOne({ uuid });
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }

    async update(uuid:string, user: User): Promise<User | null> {
        try {
            user.uuid = uuid;
            const updatedUser = {
                'contact.name': user.contact.getName(),
                'contact.lastname': user.contact.getLastname(),
                'contact.number_phone': user.contact.getPhoneNumber(),
                'credentials.email': user.credentials.getEmail(),
                'credentials.password': user.credentials.getPassword(),
            };
            await this.collection.updateOne({ uuid: uuid }, { $set: updatedUser });
            await this.collection.updateOne({ uuid: uuid }, { $set: user });
            return user;
        } catch (error) {
            return null;
        }
    }

    async list(): Promise<User[] | null> {
        try {
            const result = await this.collection.find().toArray();
            console.log(result);

            return result.map((user: { token: string; verifiedAt: Date; contact: { name: string; lastName: string; phoneNumber: string; }; credentials: { email: string; password: string; }; uuid: string; }) => {
                let status = new Status(user.token, user.verifiedAt);
                let contact = new Contact(user.contact.name, user.contact.lastName, user.contact.phoneNumber);
                let credentials = new Credentials(user.credentials.email, user.credentials.password);
                
                let newUser = new User(status, contact, credentials);
                newUser.uuid = user.uuid;
                
                return newUser;
            });
        } catch (error) {
            return null;
        }
    }
}