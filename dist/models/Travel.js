"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Travel = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
const Train_1 = require("./Train");
let Travel = class Travel {
};
exports.Travel = Travel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Travel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Travel.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Travel.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Travel.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime"),
    __metadata("design:type", Date)
], Travel.prototype, "departure", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime"),
    __metadata("design:type", Date)
], Travel.prototype, "arrive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => Train_1.Train, (train) => train.travels),
    __metadata("design:type", Train_1.Train)
], Travel.prototype, "train", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Booking_1.Booking, booking => booking.travel, { cascade: true }),
    __metadata("design:type", Array)
], Travel.prototype, "bookings", void 0);
exports.Travel = Travel = __decorate([
    (0, typeorm_1.Entity)()
], Travel);
//# sourceMappingURL=Travel.js.map