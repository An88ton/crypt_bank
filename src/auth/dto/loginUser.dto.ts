import { IsNotEmpty } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    numberOfPhone: string;

    @IsNotEmpty()
    password: string;
}