import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
        return this.authService.createUser(createUserDto);
    }

    @Post('/signin')
    signIn(@Body() loginUserDto: LoginUserDto): Promise<SignInDto>{
        return this.authService.loginUser(loginUserDto);
    }
}
