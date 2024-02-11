import { validate } from "class-validator";
import { ValidatableEntity } from "./ValidatableEntity";


export class Validator<T extends ValidatableEntity> {
    constructor(private entity: T) {}

    async invalidIfHasErrors(): Promise<void> {
        const errors = await validate(this.entity);
        if (errors.length > 0) {
            throw new Error('Validation failed!');
        }
    }
}