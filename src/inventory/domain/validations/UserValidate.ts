import { validate } from "class-validator";
import { ValidatableEntity } from "./validatable";

export class Validator<T extends ValidatableEntity> {
    
    public entity:T;
    public listErrors:any[];

    constructor(entity:T){
        this.entity = entity;
        this.listErrors = [];
    }

    public async invalidIfHasErrors() {
        await this.validate();

        if (!this.foundedErrors()){
            return;
        } 

        throw({
            http_status:422,
            validations:this.errors()
        });
    }

    protected async validate() {
        return this.listErrors = await validate(this.entity);
    }

    protected errors():any[] {
        return this.listErrors.map((error) => {
            let property = error.property;
            let errorMessages = Object.values(error.constraints);

            return {
                property,
                errorMessages
            };
        });
    }

    protected foundedErrors():boolean {
        return this.listErrors.length > 0;
    }

}