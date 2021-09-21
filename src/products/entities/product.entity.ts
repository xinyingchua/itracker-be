import { Transaction } from "src/transactions/entities/transaction.entity";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Product {

    @PrimaryGeneratedColumn() // auto incremental int
    id: number;

    @Column()
    desc: string

    @Column()
    axis: string

    @Column()
    target: number

    
    @Column()
    price: number

    @Column()
    image: string

    // @ManyToMany(type => Transaction, transactions => transactions.user, {onUpdate: 'CASCADE', eager: true})
    // transactions: Transaction[]

}