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
exports.bookingRouter = void 0;
const express_1 = require("express");
// Typeorm
const Booking_1 = require("../models/Booking");
const sql_db_1 = require("../databases/sql-db");
const bookingRepository = sql_db_1.AppDataSource.getRepository(Booking_1.Booking);
// Router
exports.bookingRouter = (0, express_1.Router)();
// CRUD: Read
exports.bookingRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookingRepository.find({ relations: ["user", "travel"] });
        if (!bookings) {
            res.status(404).json({ error: "There are no bookings yet in the database." });
        }
        res.json(bookings);
    }
    catch (error) {
        next(error);
    }
}));
// CRUD: Read with ID
exports.bookingRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Recoge los parametros
        const idParam = parseInt(req.params.id);
        // Busca por ID
        const booking = yield bookingRepository.findOne({
            where: {
                id: idParam,
            },
            relations: ["user", "travel"],
        });
        if (!booking) {
            res.status(404).json({ error: "Booking not found" });
        }
        res.json(booking);
    }
    catch (error) {
        next(error);
    }
}));
// CRUD: Create
exports.bookingRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Creacion de objecto
        const newBooking = new Booking_1.Booking();
        // Asignacion de valores
        Object.assign(newBooking, req.body);
        // Insercion del booking
        const bookingSaved = yield bookingRepository.save(newBooking);
        res.status(201).json(bookingSaved);
    }
    catch (error) {
        next(error);
    }
}));
// CRUD: Delete with ID
exports.bookingRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Recoge los parametros
        const idParam = parseInt(req.params.id);
        // Busca la reserva por ID
        const bookingToDelete = yield bookingRepository.findOne({
            where: {
                id: idParam,
            },
            relations: ["user", "travel"],
        });
        if (!bookingToDelete) {
            res.status(404).json({ error: "Booking  not found" });
        }
        yield bookingRepository.remove(bookingToDelete);
        res.json(bookingToDelete);
    }
    catch (error) {
        next(error);
    }
}));
// CRUD: Update/Put
exports.bookingRouter.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParam = parseInt(req.params.id);
        // Busca la reserva por ID
        const bookingToUpdate = yield bookingRepository.findOneBy({
            id: idParam,
        });
        if (!bookingToUpdate) {
            res.status(404).json({ error: "Booking not found" });
        }
        else {
            // Asignacion de valores
            Object.assign(bookingToUpdate, {
                paid: req.body.paid,
                user: req.body.user,
                travel: req.body.travel,
            });
            const updatedBooking = yield bookingRepository.save(bookingToUpdate);
            res.status(201).json(updatedBooking);
        }
    }
    catch (error) {
        next(error);
    }
}));
//# sourceMappingURL=booking.routes.js.map