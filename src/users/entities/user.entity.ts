import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Transaction } from "src/transactions/entities/transaction.entity";

@Entity({name: 'users'})
export class User extends BaseEntity{
    @PrimaryGeneratedColumn() // auto incremental int
    id: number;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column({nullable: true})
    image: string;

    @Column({nullable: true})
    contact: number;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAr: Date;

    @OneToMany(type => Transaction, transactions => transactions.user, {onUpdate: 'CASCADE', eager: true})
    transactions: Transaction[]

    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(password || this.password, salt)
    }
}
