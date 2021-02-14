import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { OperationsService } from './operations.service';
import { Currencies } from './currencies.enum';
import { Card } from './entities/card.entity';
import { PayDto } from './dto/pay.dto';
import { Payment } from './entities/payment.entity';

@Controller('operations')
@UseGuards(AuthGuard())
export class OperationsController {

    constructor(
        private operationsService: OperationsService
    ){}

    @Get()
    getAllCards(@GetUser() user: User) {
         return this.operationsService.getAllCards(user);
    }

   @Post('/createCard')
   createCard(@GetUser() user: User, @Body() currency: Currencies): Promise<Card> {
        return this.operationsService.createCard(user, currency);
   }

   @Patch('/pay')
   pay(@GetUser() user: User, @Body() payDto: PayDto): Promise<Payment>{
        return this.operationsService.pay(user, payDto);
   }

   @Patch('/topup/:cardId')
   topUp(@GetUser() user: User, @Param('cardId') cardId: number, @Body('amount') amount: number): Promise<number>{
        return this.operationsService.topUpCard(user, cardId, amount);
   }

   @Delete('/:id')
   deleteCard(@GetUser() user: User, @Param('id') id: number) {
        this.operationsService.deleteCard(user, id);
   }


}
