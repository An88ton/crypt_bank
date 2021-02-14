import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardRepository } from './repositories/card.repository';
import { PaymentRepository } from './repositories/payment.repository';
import { User } from '../auth/user.entity';
import { Currencies } from './currencies.enum';
import { Card } from './entities/card.entity';
import { PayDto } from './dto/pay.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class OperationsService {

    constructor(
        @InjectRepository(CardRepository)
        private cardRepository: CardRepository,
        @InjectRepository(PaymentRepository)
        private paymentRepository: PaymentRepository
    ){}

    async getAllCards(user: User): Promise<Card[]> {
        return await this.cardRepository.find({where: {userId: user.id}});
    }

    async createCard(user: User, currency: Currencies): Promise<Card> {
        const card = new Card();
        card.numberOfCard = '0'; //КОСТЫЛЬ, поскольку мне необходимо это поле уникальным, я решил использовать id в методе generateCardNumber, но id появляется только после сохранения
        card.securityCode = this.generateSecurityCode();
        card.currency = currency;
        card.balance = 0;
        card.user = user;
        await card.save();
        card.numberOfCard = this.generateCardNumber(card.id);
        await card.save(); // вторая часть костыля
        delete card.user;
        return card;
    }

    async deleteCard( user: User ,id: number) {
        const found = await this.cardRepository.delete({id: id, userId: user.id});

        if( found.affected === 0)
            throw new NotFoundException('card not found');
    }

    async pay(user: User, payDto: PayDto): Promise<Payment> {

        const payment = new Payment();
        let card: Card = await this.cardRepository.findOne({where: {numberOfCard: payDto.numberCardOfPayer,
                                                                   userId: user.id }});
        if(!card){
            throw new NotFoundException('Card does not exists');
        }

        payment.amount = payDto.amount;
        payment.numberOfReciever = payDto.numberCardOfReciever;
        payment.isSuccess = this.makePayment(card, payDto.amount);
        payment.dateOfPayment = new Date();
        payment.balance = card.balance;
        payment.card = card;
        await card.save();
        await payment.save();
        delete payment.card;
        return payment;
    }

    async topUpCard(user: User, id: number, amount: number) {
        const card: Card = await this.cardRepository.findOne({where: {id, userId: user.id}});

        if(!card){
            throw new NotFoundException('Card does not exists');
        }
        card.balance = +card.balance + +amount;

        card.save();

        return card.balance;        
    }





    private generateSecurityCode(){
        return Math.trunc(Math.random() * (999-100) + 100);
    }

    private generateCardNumber(id: number){
        let result: string = '5605';
        let amountZerosToAdd: number = 14 - String(id).length;
        for(let i = 0; i < amountZerosToAdd; i++){
            result += '0';
        }
        return (result + id);
    }

    private makePayment(card: Card, amount: number): boolean {
        if(card.balance >= amount){
            card.balance -= amount;
            return true;
        }
        return false;
    }
}
