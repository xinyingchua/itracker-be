import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';


@Injectable()
export class TransactionsService {
  constructor (@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
  ) {

  }
  create(createTransactionDto: CreateTransactionDto) {
    const newTransaction = this.transactionRepository.create(createTransactionDto);

    return this.transactionRepository.save(newTransaction)
  }

  findAll() {
    return this.transactionRepository.find();
  }

  findOne(id: number) {
    return this.transactionRepository.findOne(id)
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne(id)
    transaction.title = updateTransactionDto.title

    return this.transactionRepository.save(transaction)
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne(id)

    return this.transactionRepository.remove(transaction) // similar to delete but it will return the item that is deleted
  }
}
