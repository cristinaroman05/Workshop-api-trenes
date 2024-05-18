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
exports.trainRouter = void 0;
const express_1 = __importDefault(require("express"));
const sql_db_1 = require("../databases/sql-db");
const Train_1 = require("../models/Train");
const Travel_1 = require("../models/Travel");
const trainRepository = sql_db_1.AppDataSource.getRepository(Train_1.Train);
const travelRepository = sql_db_1.AppDataSource.getRepository(Travel_1.Travel);
exports.trainRouter = express_1.default.Router();
// CRUD: READ
exports.trainRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trains = yield trainRepository.find({ relations: ["travels"] });
        res.json(trains);
    }
    catch (error) {
        next(error);
    }
}));
exports.trainRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idReceivedInParams = parseInt(req.params.id);
        const train = yield trainRepository.findOne({
            where: {
                id: idReceivedInParams,
            },
            relations: ["travels"],
        });
        if (!train) {
            res.status(404).json({ error: "Train not found" });
        }
        res.json(train);
    }
    catch (error) {
        next(error);
    }
}));
// CRUD: CREATE
exports.trainRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Construimos train
        const newTrain = new Train_1.Train();
        let travelOfTrain;
        if (req.body.travelId) {
            travelOfTrain = yield travelRepository.findOne({
                where: {
                    id: req.body.travelId,
                },
            });
            if (!travelOfTrain) {
                res.status(404).json({ error: "Travel not found" });
                return;
            }
        }
        // Asignamos valores
        Object.assign(newTrain, Object.assign(Object.assign({}, req.body), { travel: travelOfTrain }));
        const trainSaved = yield trainRepository.save(newTrain);
        res.status(201).json(trainSaved);
    }
    catch (error) {
        next(error);
    }
}));
// CRUD: DELETE
exports.trainRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idReceivedInParams = parseInt(req.params.id);
        const trainToRemove = yield trainRepository.findOneBy({
            id: idReceivedInParams,
        });
        if (!trainToRemove) {
            res.status(404).json({ error: "Train not found" });
        }
        else {
            yield trainRepository.remove(trainToRemove);
            res.json(trainToRemove);
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.trainRouter.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idReceivedInParams = parseInt(req.params.id);
        const trainToUpdate = yield trainRepository.findOneBy({
            id: idReceivedInParams,
        });
        if (!trainToUpdate) {
            res.status(404).json({ error: "Train not found" });
        }
        else {
            let travelOfTrain;
            if (req.body.travelId) {
                travelOfTrain = yield travelRepository.findOne({
                    where: {
                        id: req.body.travelId,
                    },
                });
                if (!travelOfTrain) {
                    res.status(404).json({ error: "Travel not found" });
                    return;
                }
            }
            // Asignamos valores
            Object.assign(trainToUpdate, Object.assign(Object.assign({}, req.body), { travel: travelOfTrain }));
            const updatedTrain = yield trainRepository.save(trainToUpdate);
            res.json(updatedTrain);
        }
    }
    catch (error) {
        next(error);
    }
}));
//# sourceMappingURL=train.routes.js.map