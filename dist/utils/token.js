"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
//  Importamos jwt
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (id, email) => {
    // Comprueba si han mandado userId o userEmail
    if (!id || !email) {
        throw new Error("Email or userId missing"); // Fuerza un nuevo error y salta al catch
    }
    const payload = {
        id,
        email,
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    if (!token) {
        throw new Error("Token is missing");
    }
    const result = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return result;
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.js.map