import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Request as ExpressRequest} from 'express'
import { ApplicationCookies } from './transactions.interfaces';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from 'src/users/users.interfaces';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private jwtService: JwtService
    ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createTransactionDto: CreateTransactionDto, 
    @Req () request: ExpressRequest, 
  ) {
    console.log(request.cookies)
    // extract cookie and convert back to user
    const cookies: ApplicationCookies = request.cookies; 
    const user = this.jwtService.decode(cookies.jwt) as UserToken // decode returns 3 different types // RHS: force into a type TypeCoersion // LHS: that variable is of a type equivalent on the RHS
    createTransactionDto.userId = user.id
    // need to verify cookies again to throw error if user do not have cookie
    // check jwt error message --> if not OK to change 
    // console.log(user)
    return await this.transactionsService.create(createTransactionDto);
  }

  @Get()
  async findAll() {
    return await this.transactionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return await this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.transactionsService.remove(+id);
  }
}
