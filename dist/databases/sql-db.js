"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlQuery = exports.sqlConnect = exports.AppDataSource = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const Travel_1 = require("../models/Travel");
const User_1 = require("../models/User");
const Train_1 = require("../models/Train");
const Booking_1 = require("../models/Booking");
dotenv_1.default.config();
const SQL_HOST = process.env.SQL_HOST;
const SQL_USER = process.env.SQL_USER;
const SQL_PASSWORD = process.env.SQL_PASSWORD;
const SQL_DATABASE = process.env.SQL_DATABASE;
const config = {
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE,
};
exports.AppDataSource = new typeorm_1.DataSource({
    host: SQL_HOST,
    username: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE,
    type: "mysql",
    port: 3306,
    synchronize: true,
    logging: false,
    entities: [Train_1.Train, Travel_1.Travel, User_1.User, Booking_1.Booking],
    migrations: [],
    subscribers: [],
});
const sqlConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(config);
    return connection;
});
exports.sqlConnect = sqlConnect;
const sqlQuery = (sqlQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, exports.sqlConnect)();
    const [results] = yield connection.execute(sqlQuery);
    return results;
});
exports.sqlQuery = sqlQuery;
//# sourceMappingURL=sql-db.js.map