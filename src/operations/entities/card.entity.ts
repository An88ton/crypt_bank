import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from '../../auth/user.entity';
import { Payment } from './payment.entity';
import { Currencies } from '../currencies.enum';


@Entity()
@Unique(['numberOfCard'])
export class Card extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true}) // костыль
    numberOfCard: string;

    @Column()
    securityCode: number;

    @Column()
    balance: number;

    @Column()
    currency: Currencies;

    @OneToMany(type => Payment, payments => payments.card, {cascade: true})
    payments: Payment[];

    @ManyToOne(type => User, user => user.cards)
    user: User;

    @Column()
    userId: number;
}