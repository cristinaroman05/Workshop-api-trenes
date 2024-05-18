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
const sql_db_1 = require("../src/databases/sql-db");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const train_routes_1 = require("../src/routes/train.routes");
const booking_routes_1 = require("../src/routes/booking.routes");
const user_routes_1 = __importDefault(require("../src/routes/user.routes"));
const travel_routes_1 = require("../src/routes/travel.routes");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Conexión a la BBDD
    const dataSource = yield sql_db_1.AppDataSource.initialize();
    const sqlDatabase = yield (0, sql_db_1.sqlConnect)();
    // Configuración del server
    const PORT = 3000;
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
    }));
    // Rutas
    const router = express_1.default.Router();
    router.get("/", (req, res) => {
        var _a;
        res.send(`
        <h3>Esta es la RAIZ de nuestra API.</h3>
        <p>Estamos usando la BBDD TypeORM ${dataSource.options.database} del host ${(_a = sqlDatabase === null || sqlDatabase === void 0 ? void 0 : sqlDatabase.config) === null || _a === void 0 ? void 0 : _a.host}</p>
      `);
    });
    router.get("*", (req, res) => {
        res
            .status(404)
            .send("Lo sentimos :( No hemos encontrado la página solicitada.");
    });
    app.use("/train", train_routes_1.trainRouter);
    app.use("/booking", booking_routes_1.bookingRouter);
    app.use("/user", user_routes_1.default);
    app.use("/travel", travel_routes_1.travelRouter);
    app.use("/", router);
    app.listen(PORT, () => {
        console.log(`Server levantado en el puerto ${PORT}`);
    });
});
void main();
//# sourceMappingURL=index.js.map