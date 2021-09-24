import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, ParseArrayPipe, BadRequestException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Request as ExpressRequest} from 'express'
import { ApplicationCookies } from './transactions.interfaces';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from 'src/users/users.interfaces';
import { IncomingHttpHeaders } from 'http';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private jwtService: JwtService
    ) {}

  @Post()
  @UsePipes(new ParseArrayPipe ({items: CreateTransactionDto}))
  async create(
    @Body() payload: CreateTransactionDto[], 
    @Req () request: ExpressRequest, 
  ) {
    // console.log(request.cookies)
    // extract cookie and convert back to user

    // const cookies: ApplicationCookies = request.cookies; 
    const headers = request.headers as IncomingHttpHeaders & {auth_token ?: string} 
    if(!headers ?.auth_token) {
      throw new BadRequestException(
        "No user auth token found"
      )
    }
    const token = headers.auth_token

    const user = this.jwtService.decode(token) as UserToken 

    // BASIC: from line 29 - 36 -> can put in a function (helper)
    // ADVANCE: create own pipe using decorators

    // const user = this.jwtService.decode(cookies.jwt) as UserToken // decode returns 3 different types // RHS: force into a type TypeCoersion // LHS: that variable is of a type equivalent on the RHS
    console.log(user)
    payload.forEach((dto) => 
      dto.userId = user.id
    )
    // need to verify cookies again to throw error if user do not have cookie
    // check jwt error message --> if not OK to change 
    console.log(1)
    return await this.transactionsService.create(payload);
  }

  @Get()
  async findAll(
    @Req () request: ExpressRequest
  ) {
    const headers = request.headers as IncomingHttpHeaders & {auth_token ?: string} 
    if(!headers ?.auth_token) {
      throw new BadRequestException(
        "No user auth token found"
      )
    }
    const token = headers.auth_token

    const user = this.jwtService.decode(token) as UserToken 
    const userId =  user.id

    return await this.transactionsService.findAll(userId);
  }

  @Get('leaderboard')
  async findLeaderBoard(
    @Req () request: ExpressRequest
  ): Promise<any> {
    const headers = request.headers as IncomingHttpHeaders & {auth_token ?: string} 
    if(!headers ?.auth_token) {
      throw new BadRequestException(
        "No user auth token found"
      )
    }
    const token = headers.auth_token

    return await this.transactionsService.findLeaderBoard();
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
