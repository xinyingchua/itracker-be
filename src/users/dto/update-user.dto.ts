import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    image: string;

    contact: number;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;




}
