import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email:string, password: string): Promise <any> {
        // const user = await this.usersService.findOne(email);

        // if(user && user.password === password) {
        //     const {password, email, ...rest} = user
        //     return rest;
        // }
        // return null

        const user = await this.usersService.findOne({email});
        if(!user) {
          throw new BadRequestException('Invalid credentials')
        }
        if(!await bcrypt.compare(password, user.password)) {
          throw new BadRequestException('Invalid credentials')
        }
    }






}
