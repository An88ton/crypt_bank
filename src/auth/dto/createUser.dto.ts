import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    name: string;

    
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    surname: string;

    @MinLength(4)
    @MaxLength(20)
    password: string

    @MaxLength(15)
    @MinLength(8)
    numberOfPhone: string;
}