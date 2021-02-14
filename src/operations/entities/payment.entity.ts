import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../auth/user.entity';
import { Card } from './card.entity';

@Entity()
export class Payment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    numberOfReciever: string;

    @Column()
    balance: number;

    @Column()
    isSuccess: boolean;

    @Column()
    dateOfPayment: Date;

    @ManyToOne(type => Card, card => card.payments)
    card: Card;

    @Column()
    cardId: number;
}