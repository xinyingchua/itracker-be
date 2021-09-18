
import { Product } from "./products/entities/product.entity"
import { Transaction } from "./transactions/entities/transaction.entity"
import { User } from "./users/entities/user.entity"

export const config = () => ({
    database: {
        type: 'mysql',
        host: 'localhost',
        port: process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
        entities: [Transaction, User, Product],
        synchronize: true,
    }
})