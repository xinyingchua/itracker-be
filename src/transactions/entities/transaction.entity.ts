import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn() // auto incremental int
    id: number;

    @Column()
    title: string

    @ManyToOne(() => User, user => user.transactions, {onDelete: 'NO ACTION'})
    // @JoinColumn({ })
    user: User
}
