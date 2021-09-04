import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {

  async registerNewUser(userRegister: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = userRegister.email;
    user.firstName = userRegister.firstName;
    user.lastName = userRegister.lastName;
    user.password = userRegister. password
    return await user.save()
  }

  findAll() {
    return `This action returns all users`;
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
