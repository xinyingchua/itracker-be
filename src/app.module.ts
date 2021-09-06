import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { config } from './config';
import { DatabaseConfig } from './databse.config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Transaction } from './transactions/entities/transaction.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig
      }),

    TypeOrmModule.forFeature([User, Transaction]),

    TransactionsModule,

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}