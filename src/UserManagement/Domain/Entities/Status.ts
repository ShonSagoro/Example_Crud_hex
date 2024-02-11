export class Status {
    private verifiedAt: Date;
    private token: string;

    constructor(token: string,verifiedAt: Date) {
        this.verifiedAt = verifiedAt;
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }

    getVerifiedAt(): Date {
        return this.verifiedAt;
    }

    setVerifiedAt(verifiedAt: Date): void {
        this.verifiedAt = verifiedAt;
    }

    setToken(token: string): void { 
        this.token = token;
    }
}
