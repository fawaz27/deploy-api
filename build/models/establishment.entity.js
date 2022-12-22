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
exports.Establishment = void 0;
const typeorm_1 = require("typeorm");
const class_entity_1 = require("./class.entity");
const subject_ets_entity_1 = require("./subject_ets.entity");
const teacher_ets_entity_1 = require("./teacher_ets.entity");
const year_academic_entity_1 = require("./year_academic.entity");
let Establishment = class Establishment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Establishment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Establishment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => class_entity_1.Class, (classe) => classe.etablishment),
    __metadata("design:type", Array)
], Establishment.prototype, "classes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subject_ets_entity_1.Subject_Ets, (subject_ets) => subject_ets.etablishment),
    __metadata("design:type", Array)
], Establishment.prototype, "subject_ets", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => year_academic_entity_1.Year_Academic, (year) => year.etablishments, { onDelete: 'CASCADE' }),
    __metadata("design:type", year_academic_entity_1.Year_Academic)
], Establishment.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => teacher_ets_entity_1.Teacher_Ets, (teacher_ets) => teacher_ets.establishment),
    __metadata("design:type", Array)
], Establishment.prototype, "teacher_ets", void 0);
Establishment = __decorate([
    (0, typeorm_1.Entity)()
], Establishment);
exports.Establishment = Establishment;
