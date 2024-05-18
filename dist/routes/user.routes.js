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
exports.userRouter = void 0;
const express_1 = require("express");
//  import bcrypt from "bcrypt";
const User_1 = require("../models/User");
const Booking_1 = require("../models/Booking");
const sql_db_1 = require("../databases/sql-db");
const typeorm_1 = require("typeorm");
const token_1 = require("../utils/token");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userRepository = sql_db_1.AppDataSource.getRepository(User_1.User);
const bookingRepository = sql_db_1.AppDataSource.getRepository(Booking_1.Booking);
exports.userRouter = (0, express_1.Router)();
// CRUD: READ
exports.userRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository.find({
            relations: ["bookings"],
        });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
}));
exports.userRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idReceivedInParams = parseInt(req.params.id);
        const user = yield userRepository.findOne({
            where: {
                id: idReceivedInParams,
            },
            relations: ["bookings"],
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}));
// LOGIN DE USUARIOS
exports.userRouter.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Se deben especificar los campos email y password" });
        }
        const user = yield userRepository.findOne({
            where: {
                email,
            },
            select: ["email", "id", "firstName", "password"],
        });
        if (!user) {
            return res.status(401).json({ error: "Email y/o contraseña incorrectos" });
        }
        // const match = await bcrypt.compare(password, user.password);
        const match = password === user.password;
        if (match) {
            const userWithoutPass = user;
            delete userWithoutPass.password;
            console.log(JSON.stringify(user));
            const jwtToken = (0, token_1.generateToken)(user.id.toString(), user.email);
            return res.status(200).json({ token: jwtToken });
        }
        else {
            return res.status(401).json({ error: "Email y/o contraseña incorrectos" });
        }
    }
    catch (error) {
        next(error);
    }
}));
// CRUD: CREATE
exports.userRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new User_1.User();
        const bookingIds = req.body.bookings;
        if (!bookingIds || !Array.isArray(bookingIds)) {
            res.status(400).json({ error: "Invalid bookingIds" });
            return;
        }
        const bookings = yield bookingRepository.findBy({ id: (0, typeorm_1.In)(bookingIds) });
        if (bookingIds.length !== bookings.length) {
            res.status(404).json({ error: "One or more bookings not found" });
            return;
        }
        Object.assign(newUser, Object.assign(Object.assign({}, req.body), { bookings }));
        const userSaved = yield userRepository.save(newUser);
        res.status(201).json(userSaved);
    }
    catch (error) {
        next(error);
    }
}));
// CRUD: DELETE
exports.userRouter.delete("/:id", auth_middleware_1.isAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idReceivedInParams = parseInt(req.params.id);
        if (req.user.id !== idReceivedInParams && req.user.email !== "admin@gmail.com") {
            return res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
        }
        const userToRemove = yield userRepository.findOne({
            where: {
                id: idReceivedInParams,
            },
            relations: ["bookings"],
        });
        if (!userToRemove) {
            res.status(404).json({ error: "user not found" });
        }
        else {
            yield userRepository.remove(userToRemove);
            res.json(userToRemove);
        }
    }
    catch (error) {
        next(error);
    }
}));
// CRUD: UPDATE
exports.userRouter.put("/:id", auth_middleware_1.isAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idReceivedInParams = parseInt(req.params.id);
        if (req.user.id !== idReceivedInParams && req.user.email !== "admin@gmail.com") {
            return res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
        }
        const userToUpdate = yield userRepository.findOne({
            where: {
                id: idReceivedInParams,
            },
            relations: ["bookings"],
        });
        if (!userToUpdate) {
            return res.status(404).json({ error: "User not found" });
        }
        const bookingIds = req.body.bookingIds || [];
        const bookings = yield bookingRepository.findBy({ id: (0, typeorm_1.In)(bookingIds) });
        if (bookingIds.length !== bookings.length) {
            return res.status(404).json({ error: "One or more bookings not found" });
        }
        Object.assign(userToUpdate, req.body);
        userToUpdate.bookings = bookings;
        const updatedUser = yield userRepository.save(userToUpdate);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = exports.userRouter;
//# sourceMappingURL=user.routes.js.map