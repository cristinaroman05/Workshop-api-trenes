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
exports.travelRouter = void 0;
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const sql_db_1 = require("../databases/sql-db");
const Travel_1 = require("../models/Travel");
const Booking_1 = require("../models/Booking");
const Train_1 = require("../models/Train");
const travelRepository = sql_db_1.AppDataSource.getRepository(Travel_1.Travel);
const bookingRepository = sql_db_1.AppDataSource.getRepository(Booking_1.Booking);
const trainRepository = sql_db_1.AppDataSource.getRepository(Train_1.Train);
const travelRouter = (0, express_1.Router)();
exports.travelRouter = travelRouter;
travelRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const travels = yield travelRepository.find({ relations: ["bookings", "train"] });
        res.json({ data: travels });
    }
    catch (error) {
        next(error);
    }
}));
travelRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idReceivedInParams = parseInt(req.params.id);
        const travel = yield travelRepository.findOne({
            where: {
                id: idReceivedInParams,
            },
            relations: ["bookings", "train"],
        });
        if (!travel) {
            res.status(404).json({ error: "Travel not found" });
        }
        else {
            res.json(travel);
        }
    }
    catch (error) {
        next(error);
    }
}));
travelRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTravel = new Travel_1.Travel();
        const trainId = req.body.trainId;
        const bookingIds = req.body.bookingIds;
        const train = yield trainRepository.findOne({
            where: {
                id: trainId,
            },
        });
        if (!train) {
            res.status(404).json({ error: "Train not found" });
            return;
        }
        const bookings = yield bookingRepository.find({ where: { id: (0, typeorm_1.In)(bookingIds) } });
        if (bookingIds.length !== bookings.length) {
            res.status(404).json({ error: "One or more bookings not found" });
            return;
        }
        Object.assign(newTravel, req.body);
        newTravel.train = train;
        newTravel.bookings = bookings;
        const travelSaved = yield travelRepository.save(newTravel);
        res.status(201).json(travelSaved);
    }
    catch (error) {
        next(error);
    }
}));
travelRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idReceivedInParams = parseInt(req.params.id);
        const travelToRemove = yield travelRepository.findOne({
            where: {
                id: idReceivedInParams,
            },
        });
        if (!travelToRemove) {
            res.status(404).json({ error: "Travel not found" });
            return;
        }
        yield travelRepository.remove(travelToRemove);
        res.json(travelToRemove);
    }
    catch (error) {
        next(error);
    }
}));
travelRouter.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idReceivedInParams = parseInt(req.params.id);
        const travelToUpdate = yield travelRepository.findOne({
            where: {
                id: idReceivedInParams,
            },
        });
        if (!travelToUpdate) {
            res.status(404).json({ error: "Travel not found" });
            return;
        }
        const trainId = req.body.trainId;
        const bookingIds = req.body.bookingIds;
        const train = yield trainRepository.findOne({
            where: {
                id: trainId,
            },
        });
        if (!train) {
            res.status(404).json({ error: "Train not found" });
            return;
        }
        const bookings = yield bookingRepository.find({ where: { id: (0, typeorm_1.In)(bookingIds) } });
        if (bookingIds.length !== bookings.length) {
            res.status(404).json({ error: "One or more bookings not found" });
            return;
        }
        Object.assign(travelToUpdate, req.body);
        travelToUpdate.train = train;
        travelToUpdate.bookings = bookings;
        const travelSaved = yield travelRepository.save(travelToUpdate);
        res.status(201).json(travelSaved);
    }
    catch (error) {
        next(error);
    }
}));
//# sourceMappingURL=travel.routes.js.map