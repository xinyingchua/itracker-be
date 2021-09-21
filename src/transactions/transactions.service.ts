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
  async create(createTransactionDto: CreateTransactionDto[]) {
    const newTransaction = await this.transactionRepository.create(createTransactionDto);
    console.log(createTransactionDto)
    console.log(newTransaction)
    return this.transactionRepository.save(newTransaction)
  }

  findAll(userId: number) {
    return this.transactionRepository.find({where : {userId: userId}});
  }

  findOne(id: number) {
    return this.transactionRepository.findOne(id)
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne(id)
    transaction.desc = updateTransactionDto.desc

    return this.transactionRepository.save(transaction)
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne(id)

    return this.transactionRepository.remove(transaction) // similar to delete but it will return the item that is deleted
  }
}
