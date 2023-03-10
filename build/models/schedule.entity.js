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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const typeorm_1 = require("typeorm");
const year_academic_entity_1 = require("./year_academic.entity");
const class_entity_1 = require("./class.entity");
const scheduleInterface_dto_1 = __importDefault(require("../dto/scheduleInterface.dto"));
let Schedule = class Schedule {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Schedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", scheduleInterface_dto_1.default)
], Schedule.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => class_entity_1.Class, (classe) => classe.schedule),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", class_entity_1.Class)
], Schedule.prototype, "classe", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => year_academic_entity_1.Year_Academic, (Year_Academic) => Year_Academic.schedules, { onDelete: 'CASCADE' }),
    __metadata("design:type", year_academic_entity_1.Year_Academic)
], Schedule.prototype, "year", void 0);
Schedule = __decorate([
    (0, typeorm_1.Entity)()
], Schedule);
exports.Schedule = Schedule;
