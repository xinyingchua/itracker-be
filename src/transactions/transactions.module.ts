import {Module} from '@nestjs/common'
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
dotenv.config()


@Module({
  imports: [TypeOrmModule.forFeature([Transaction]),
  JwtModule.register({
    secret: process.env.JWT_TOKEN_SECRET,
    signOptions: {expiresIn: '1d'}
  })],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
