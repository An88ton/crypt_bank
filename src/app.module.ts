import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmCongif } from './config/typeOrm.config';
import { OperationsModule } from './operations/operations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmCongif),
    AuthModule, 
    OperationsModule],
  providers: [AppService],
})
export class AppModule {}
