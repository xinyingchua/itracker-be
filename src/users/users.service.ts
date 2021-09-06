import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor (@InjectRepository(User) private userRepositiory: Repository<User>,
  ) {
  }
  async registerNewUser(userRegister: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = userRegister.email;
    user.firstName = userRegister.firstName;
    user.lastName = userRegister.lastName;
    user.password = userRegister. password
    return await user.save()
  }

  
  async findOne(condition: any): Promise <User | undefined> {
    return await this.userRepositiory.findOne(condition)
  }

  findAll() {
    return this.userRepositiory.find()
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepositiory.findOne(id)
    user.firstName = updateUserDto.firstName,
    user.lastName = updateUserDto.lastName,
    user.contact = updateUserDto.contact,
    user.image = updateUserDto.image

    return this.userRepositiory.save(user)
  }

  // async remove(id: number) {
  //   const user = await this.userRepositiory.findOne(id)
  //   return this.userRepositiory.remove(user)
  // }
}
