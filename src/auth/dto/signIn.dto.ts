import { User } from "../user.entity"


export class SignInDto {

    constructor(accessToken, user) {
        this.accessToken = accessToken;
        this.user = user;
    }

    accessToken: string

    user: User;
}