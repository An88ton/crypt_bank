import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardRepository } from './repositories/card.repository';
import { PaymentRepository } from './repositories/payment.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CardRepository, PaymentRepository])
  ],
  providers: [OperationsService],
  controllers: [OperationsController]
})
export class OperationsModule {}
