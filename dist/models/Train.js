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
exports.Train = exports.Section = exports.Type = void 0;
const typeorm_1 = require("typeorm");
const Travel_1 = require("./Travel");
var Type;
(function (Type) {
    Type["AVE"] = "AVE";
    Type["AVLO"] = "AVLO";
    Type["AVANT"] = "AVANT";
    Type["RENFE"] = "RENFE";
})(Type || (exports.Type = Type = {}));
var Section;
(function (Section) {
    Section["NORMAL"] = "NORMAL";
    Section["BUSINESS"] = "BUSINESS";
    Section["VIP"] = "VIP";
})(Section || (exports.Section = Section = {}));
let Train = class Train {
    checkCapacity() {
        if (this.capacity > 350) {
            throw new Error("Train is at full capacity.");
        }
    }
    validateLicencePlate() {
        const licencePlateRegex = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{6}$/;
        if (!licencePlateRegex.test(this.licencePlate)) {
            throw new Error("Licence plate must have three uppercase letters and three numbers in any order.");
        }
    }
};
exports.Train = Train;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Train.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Train.prototype, "licencePlate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Train.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Train.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Train.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Travel_1.Travel, travel => travel.train, { cascade: true }),
    __metadata("design:type", Array)
], Train.prototype, "travels", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Train.prototype, "checkCapacity", null);
exports.Train = Train = __decorate([
    (0, typeorm_1.Entity)()
], Train);
//# sourceMappingURL=Train.js.map