import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn() // auto incremental int
    id: number;

    @Column()
    desc: string

    @Column()
    qty: number

    @Column()
    price: number

    @ManyToOne(() => User, user => user.transactions, {onDelete: 'NO ACTION'})
    @JoinColumn({ name: 'userId' })
    user: User

    @Column()
    userId: number

    
}
