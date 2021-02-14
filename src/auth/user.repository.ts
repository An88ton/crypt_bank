import { EntityRepository, Repository } from "typeorm";
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    async signUp(createUserDto: CreateUserDto ): Promise<void> {

        const user = new User();

        user.name = createUserDto.name;
        user.surname = createUserDto.surname;
        user.numberOfPhone = createUserDto.numberOfPhone;


        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(createUserDto.password, user.salt);


        try{
            await user.save();
        
        }catch(error) {
            if(error.code === '235050'){
                throw new ConflictException('user already exist');
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    async validatePassword(loginUserDto: LoginUserDto): Promise<User> {
        const {numberOfPhone, password} = loginUserDto;
        const user = await this.findOne({where: {numberOfPhone}});
        console.log('validating password UserRepository');
        if(user && await user.validatePassword(password)){
            return user;
        }else 
            return null;
    }
}