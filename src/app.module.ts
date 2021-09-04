import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { config } from './config';
import { DatabaseConfig } from './databse.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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

    TransactionsModule,

    AuthModule,

    UsersModule,
  ],
})
export class AppModule {}