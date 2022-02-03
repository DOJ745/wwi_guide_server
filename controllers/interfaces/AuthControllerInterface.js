class AuthControllerInterface {
    constructor() {
        if (!this.reg) {
            throw new Error("Auth Controller must register new user!");
        }

        if(!this.login) {
            throw new Error("Auth Controller must check existing users!");
        }
    }
}