import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwtStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'alba',
      signOptions: {
        expiresIn: 3600
      },
    })
  ],
  controllers: [AuthController],
  providers:
   [
     AuthService, 
     JwtStrategy
   ],
  exports: 
  [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
