import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn() // auto incremental int
    id: number;

    @Column()
    title: string


}
