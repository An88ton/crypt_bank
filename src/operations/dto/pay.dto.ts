import { IsNotEmpty } from "class-validator";

export class PayDto {

    @IsNotEmpty()
    amount: number;
    @IsNotEmpty()
    numberCardOfReciever: string;
    @IsNotEmpty()
    numberCardOfPayer: string;

}