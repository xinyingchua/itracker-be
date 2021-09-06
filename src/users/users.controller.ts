import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpStatus, BadRequestException, Res, Req, UnauthorizedException, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SETTINGS } from 'src/app.utils';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import {Response, Request} from 'express'

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService
    ) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async registerNewUser(
    @Body(SETTINGS.VALIDATION_PIPE) userRegister: CreateUserDto): Promise<User> {
    console.log(userRegister)
    return await this.userService.registerNewUser(userRegister)

  }
  
  @Post('/login')
  async userLogin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
    ) {
      const user = await this.userService.findOne({email});
      if(!user) {
        throw new BadRequestException('Invalid credentials')
      }
      if(!await bcrypt.compare(password, user.password)) {
        throw new BadRequestException('Invalid credentials')
      }
      const jwt = await this.jwtService.signAsync({id: user.id})
      response.cookie('jwt', jwt, {httpOnly: true})
      return {
        message: 'sucess'
      }
      
    }


  @Get('/login')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt']
      const data = await this.jwtService.verifyAsync(cookie)
      if(!data) {
        throw new UnauthorizedException()
      }

      const user = await this.userService.findOne(data['id'])
      return user;

    } catch(err) {
      throw new UnauthorizedException()
    }
  }

  @Post('/logout')
  async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Logged out sucessfully'
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
  
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
