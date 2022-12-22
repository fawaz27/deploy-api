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
exports.Subject = void 0;
const typeorm_1 = require("typeorm");
const teacher_entity_1 = require("./teacher.entity");
const session_entity_1 = require("./session.entity");
const class_entity_1 = require("./class.entity");
const subject_ets_entity_1 = require("./subject_ets.entity");
let Subject = class Subject {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Subject.prototype, "subjectId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Subject.prototype, "classeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subject.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subject.prototype, "quota_hours", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subject.prototype, "hourly_billing", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_entity_1.Session, (session) => session.subject),
    __metadata("design:type", Array)
], Subject.prototype, "sessions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teacher_entity_1.Teacher, (teacher) => teacher.subjects),
    __metadata("design:type", teacher_entity_1.Teacher)
], Subject.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => class_entity_1.Class, (classe) => classe.subjects, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "classeId" }),
    __metadata("design:type", class_entity_1.Class)
], Subject.prototype, "classe", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subject_ets_entity_1.Subject_Ets, (subject_ets) => subject_ets.subjects, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "subjectId" }),
    __metadata("design:type", subject_ets_entity_1.Subject_Ets)
], Subject.prototype, "subject_ets", void 0);
Subject = __decorate([
    (0, typeorm_1.Entity)()
], Subject);
exports.Subject = Subject;
