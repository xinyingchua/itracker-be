import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

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

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAr: Date;


    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(password || this.password, salt)
    }
}
