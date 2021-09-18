import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    desc: string
    
    qty: number

    userId: number
    
}
