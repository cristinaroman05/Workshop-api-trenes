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
exports.renfeSeed = void 0;
const User_1 = require("../models/User");
const Train_1 = require("../models/Train");
const Travel_1 = require("../models/Travel");
const Booking_1 = require("../models/Booking");
const sql_db_1 = require("../databases/sql-db");
const renfeSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Conectamos a la BBDD
    const dataSource = yield sql_db_1.AppDataSource.initialize();
    console.log(`Conectados a ${(_a = dataSource === null || dataSource === void 0 ? void 0 : dataSource.options) === null || _a === void 0 ? void 0 : _a.database}`);
    // Borramos los datos
    yield sql_db_1.AppDataSource.manager.delete(Booking_1.Booking, {});
    yield sql_db_1.AppDataSource.manager.delete(Travel_1.Travel, {});
    yield sql_db_1.AppDataSource.manager.delete(User_1.User, {});
    yield sql_db_1.AppDataSource.manager.delete(Train_1.Train, {});
    console.log("Eliminados los datos existentes");
    // Crea usuarios de ejemplo
    const user1 = new User_1.User();
    user1.firstName = "John";
    user1.lastName = "Doe";
    user1.password = "password1";
    user1.email = "john@example.com";
    user1.dni = "123456789";
    user1.nacionality = "US";
    user1.birth_date = "1990-01-01";
    user1.treatment = User_1.treatmentEnum.SR;
    const user2 = new User_1.User();
    user2.firstName = "Jane";
    user2.lastName = "Smith";
    user2.password = "password2";
    user2.email = "jane@example.com";
    user2.dni = "987654321";
    user2.nacionality = "UK";
    user2.birth_date = "1995-02-15";
    user2.treatment = User_1.treatmentEnum.SRA;
    const userEntity1 = sql_db_1.AppDataSource.manager.create(User_1.User, user1);
    const userEntity2 = sql_db_1.AppDataSource.manager.create(User_1.User, user2);
    const userSaved1 = yield sql_db_1.AppDataSource.manager.save(userEntity1);
    const userSaved2 = yield sql_db_1.AppDataSource.manager.save(userEntity2);
    console.log("Creados users");
    // Crea trenes de ejemplo
    const train1 = new Train_1.Train();
    train1.licencePlate = "ABC123";
    train1.capacity = 100;
    train1.type = Train_1.Type.AVE;
    train1.section = Train_1.Section.NORMAL;
    const train2 = new Train_1.Train();
    train2.licencePlate = "DEF456";
    train2.capacity = 200;
    train2.type = Train_1.Type.AVLO;
    train2.section = Train_1.Section.VIP;
    const trainEntity1 = sql_db_1.AppDataSource.manager.create(Train_1.Train, train1);
    const trainEntity2 = sql_db_1.AppDataSource.manager.create(Train_1.Train, train2);
    const trainSaved1 = yield sql_db_1.AppDataSource.manager.save(trainEntity1);
    const trainSaved2 = yield sql_db_1.AppDataSource.manager.save(trainEntity2);
    console.log("Creados trenes");
    // Crea viajes de ejemplo
    const travel1 = new Travel_1.Travel();
    travel1.price = 50;
    travel1.origin = "Madrid";
    travel1.destination = "Barcelona";
    travel1.departure = new Date("2023-06-05T10:00:00Z");
    travel1.arrive = new Date("2023-06-05T14:00:00Z");
    travel1.train = trainSaved1;
    travel1.bookings = [];
    const travel2 = new Travel_1.Travel();
    travel2.price = 80;
    travel2.origin = "Barcelona";
    travel2.destination = "Sevilla";
    travel2.departure = new Date("2023-06-07T09:00:00Z");
    travel2.arrive = new Date("2023-06-07T16:00:00Z");
    travel2.train = trainSaved2;
    travel2.bookings = [];
    // Creamos entidad travel
    const travelEntity1 = sql_db_1.AppDataSource.manager.create(Travel_1.Travel, travel1);
    const travelEntity2 = sql_db_1.AppDataSource.manager.create(Travel_1.Travel, travel2);
    // Guardamos el travel en base de datos
    const travel1Saved = yield sql_db_1.AppDataSource.manager.save(travelEntity1);
    const travel2Saved = yield sql_db_1.AppDataSource.manager.save(travelEntity2);
    console.log("Creados travels");
    // Crea reservas de ejemplo
    const booking1 = new Booking_1.Booking();
    booking1.paid = true;
    booking1.user = userSaved1;
    booking1.travel = travel1Saved;
    const booking2 = new Booking_1.Booking();
    booking2.paid = false;
    booking2.user = userSaved2;
    booking2.travel = travel2Saved;
    // Creamos entidad course
    const bookingEntity = sql_db_1.AppDataSource.manager.create(Booking_1.Booking, [
        booking1,
        booking2,
    ]);
    // Guardamos el booking en base de datos
    yield sql_db_1.AppDataSource.manager.save(bookingEntity);
    console.log("Creados bookings");
    yield sql_db_1.AppDataSource.destroy(); // Cierra la BBDD
});
exports.renfeSeed = renfeSeed;
void (0, exports.renfeSeed)();
//# sourceMappingURL=renfe.seed.js.map