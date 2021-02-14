import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from './user.repository';

import { Strategy, ExtractJwt} from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'alba'
        });
    }

    async validate(payload: JwtPayload): Promise<User>{
        console.log('validate Strategy');
        const { numberOfPhone } = payload;
        const user = await this.userRepository.findOne({where: {numberOfPhone}});

        if(!user){
            throw new UnauthorizedException('You are not authorized');
        }
        return user;
    }
}