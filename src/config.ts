
import { Transaction } from "./transactions/entities/transaction.entity"

export const config = () => ({
    database: {
        type: 'mysql',
        host: 'localhost',
        port: process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
        entities: [Transaction],
        synchronize: true,
    }
})