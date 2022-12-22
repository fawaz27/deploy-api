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
exports.Teacher_Ets = void 0;
const typeorm_1 = require("typeorm");
const establishment_entity_1 = require("./establishment.entity");
const teacher_entity_1 = require("./teacher.entity");
let Teacher_Ets = class Teacher_Ets {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Teacher_Ets.prototype, "teacherId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Teacher_Ets.prototype, "establishmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teacher_entity_1.Teacher, (teacher) => teacher.teacher_ets, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "teacherId" }),
    __metadata("design:type", teacher_entity_1.Teacher)
], Teacher_Ets.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => establishment_entity_1.Establishment, (establishmentId) => establishmentId.teacher_ets, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "establishmentId" }),
    __metadata("design:type", establishment_entity_1.Establishment)
], Teacher_Ets.prototype, "establishment", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Teacher_Ets.prototype, "role", void 0);
Teacher_Ets = __decorate([
    (0, typeorm_1.Entity)()
], Teacher_Ets);
exports.Teacher_Ets = Teacher_Ets;
