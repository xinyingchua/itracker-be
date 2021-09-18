import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transactions/entities/transaction.entity';
import { User } from './users/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository <User>,
    @InjectRepository(Transaction) private transactionRepository: Repository <Transaction>
  ) {}

  async seed() { // TRIAL PURPOSE
    // created employee 1 
    const employee = this.userRepository.create({
      email: 'janedoe+2@email.com',
      firstName:'Jane',
      lastName: 'Low',
      password: 'Password@123',
    });
    await this.userRepository.save(employee);
    // create transactions for employee

    const task1 = this.transactionRepository.create({desc: 'oil'});
    await this.transactionRepository.save(task1)
    const task2 = this.transactionRepository.create({desc: 'lipstick'});
    await this.transactionRepository.save(task2)
    employee.transactions = [task1, task2]
    await this.userRepository.save(employee)
    console.log('done')

  }

  getHello(): string {
    return 'Hello World!';
  }
}
