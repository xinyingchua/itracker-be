import { Transaction } from "src/transactions/entities/transaction.entity";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Product {

    @PrimaryGeneratedColumn() // auto incremental int
    id: number;

    @Column()
    desc: string

    @Column()
    franchise: string

    @Column()
    target: number

    
    @Column()
    price: number

    @ManyToMany(type => Transaction, transactions => transactions.user, {onUpdate: 'CASCADE', eager: true})
    transactions: Transaction[]

}