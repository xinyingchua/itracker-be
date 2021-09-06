import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    title: string

    
}
