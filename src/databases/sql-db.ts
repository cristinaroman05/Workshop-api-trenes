import mysql, { type Connection, type ConnectionOptions } from "mysql2/promise";
import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { Travel } from "../models/Travel";
import { User } from "../models/User";
import { Train } from "../models/Train";
import { Booking } from "../models/Booking";
dotenv.config();

const SQL_HOST = process.env.SQL_HOST as string;
const SQL_USER = process.env.SQL_USER as string;
const SQL_PASSWORD = process.env.SQL_PASSWORD as string;
const SQL_DATABASE = process.env.SQL_DATABASE as string;

const config: ConnectionOptions = {
  host: SQL_HOST,
  user: SQL_USER,
  password: SQL_PASSWORD,
  database: SQL_DATABASE,
};
export const AppDataSource = new DataSource({
    host: SQL_HOST,
    username: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE,
    type: "mysql",
    port: 3306,
    synchronize: true,
    logging: false,
    entities: [Train, Travel, User, Booking],
    migrations: [],
    subscribers: [],
  });
export const sqlConnect = async (): Promise<Connection> => {
    const connection: Connection = await mysql.createConnection(config);
    return connection;
};
export const sqlQuery = async (sqlQuery: string): Promise<any> => {
    const connection = await sqlConnect();
    const [results] = await connection.execute(sqlQuery);
    return results;
  };