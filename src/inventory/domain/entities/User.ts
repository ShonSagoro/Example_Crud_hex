import { v4 as uuidv4 } from 'uuid';
import { ValidatableEntity } from "../validations/validatable";
// import { IsNotEmpty } from "class-validator";

export class User implements ValidatableEntity {

    public id: number | null;

    public uuid: string;

    public username: string;

    public email: string;

    public password: string;

    public status:string;

    constructor(id:number|null,username:string,email:string,password:string,status:string) {
        this.id = id;
        this.uuid = uuidv4();
        this.username = username;
        this.email = email;
        this.password = password;
        this.status = status;
    }

    async validate() {
        return Promise.resolve();
    }
}