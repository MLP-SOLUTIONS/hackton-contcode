import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Storage } from "./entity/Storage"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Storage],
    migrations: [],
    subscribers: [],
})
