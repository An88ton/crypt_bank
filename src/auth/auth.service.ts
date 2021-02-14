import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService 
    ){}

    createUser(createUserDto: CreateUserDto): Promise<void> {
        return this.userRepository.signUp(createUserDto);
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<SignInDto> {
        const user = await this.userRepository.validatePassword(loginUserDto);
        const numberOfPhone = user.numberOfPhone;
        delete user.password
        delete user.numberOfPhone
        delete user.salt;

        if(!numberOfPhone) {
            throw new UnauthorizedException('Wrong username or password');
        }

        const payload: JwtPayload = {numberOfPhone};

        const accessToken = await this.jwtService.sign(payload);

        const signin = new SignInDto(accessToken, user);

        return signin;
    }
}
