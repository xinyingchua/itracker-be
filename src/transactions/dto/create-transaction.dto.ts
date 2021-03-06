import { IsEmail, IsInt, IsNotEmpty, IsNumber, Matches, Min } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    desc: string
    
    @IsInt()
    @Min(1)
    qty: number

    @IsInt()
    @Min(1)
    price: number

    userId?: number // can be undefined/ optional
    
}
