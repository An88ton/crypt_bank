import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Card } from "src/operations/entities/card.entity";

@Entity()
@Unique(['numberOfPhone'])
export class User extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    password: string;

    @Column()
    numberOfPhone: string;

    @Column()
    salt: string;

    @OneToMany(type => Card, cards => cards.user, {eager: true})
    cards: Card[];

    async validatePassword(password: string): Promise<boolean> {
        console.log('validate password');
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }


}