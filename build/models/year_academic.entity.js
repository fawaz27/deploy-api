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
exports.Year_Academic = void 0;
const typeorm_1 = require("typeorm");
const establishment_entity_1 = require("./establishment.entity");
const textbook_entity_1 = require("./textbook.entity");
const schedule_entity_1 = require("./schedule.entity");
let Year_Academic = class Year_Academic {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Year_Academic.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Year_Academic.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => textbook_entity_1.Textbook, (textbook) => textbook.year_academic),
    __metadata("design:type", Array)
], Year_Academic.prototype, "textbooks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => schedule_entity_1.Schedule, (schedule) => schedule.year),
    __metadata("design:type", Array)
], Year_Academic.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => establishment_entity_1.Establishment, (ets) => ets.year),
    __metadata("design:type", Array)
], Year_Academic.prototype, "etablishments", void 0);
Year_Academic = __decorate([
    (0, typeorm_1.Entity)()
], Year_Academic);
exports.Year_Academic = Year_Academic;
