import { Contact } from "../../Domain/Entities/Contact";
import { Status } from "../../Domain/Entities/Status";
import { User } from "../../Domain/Entities/User";
import { Credentials } from "../../Domain/Entities/Credentials";
import { UserInterface } from "../../Domain/Port/UserInterface";

export class SingUpUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute({name, lastName, phoneNumber, email, password}: {name: string, lastName: string, phoneNumber: string, email: string, password: string}): Promise<User | null> {
       
        let contact = new Contact(name, lastName, phoneNumber)
        let credentials= new Credentials(email, password)
        let status = new Status("", new Date())

        let user = new User(
            status,
            contact,
            credentials
        )
        await user.validate();
        return await this.userInterface.sing_up(user);
    }
}