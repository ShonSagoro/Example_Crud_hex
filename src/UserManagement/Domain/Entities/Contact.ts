export class Contact {
    private name: string;
    private lastname: string;
    private phoneNumber: string;

    constructor(name: string, lastname: string, phoneNumber: string) {
        this.name = name;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
    }

    getName(): string {
        return this.name;
    }

    getLastname(): string {
        return this.lastname;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }
}
