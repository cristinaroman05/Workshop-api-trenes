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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const User_1 = require("../models/User");
const token_1 = require("../utils/token");
const sql_db_1 = require("../databases/sql-db");
const userRepository = sql_db_1.AppDataSource.getRepository(User_1.User);
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("No se encontró el token de autorización");
        }
        const decodedInfo = (0, token_1.verifyToken)(token);
        const user = yield userRepository.findOne({
            where: {},
            relations: ["bookings"],
        });
        if (!user) {
            throw new Error("No tienes autorización para realizar esta operación");
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(403).json("No tienes autorización para realizar esta operación");
    }
});
exports.isAuth = isAuth;
//# sourceMappingURL=auth.middleware.js.map