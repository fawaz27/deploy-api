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
exports.Teacher = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const subject_entity_1 = require("./subject.entity");
const archive_request_entity_1 = require("./archive_request.entity");
const program_entity_1 = require("./program.entity");
const information_entity_1 = require("./information.entity");
const teacher_ets_entity_1 = require("./teacher_ets.entity");
let Teacher = class Teacher extends user_entity_1.User {
};
__decorate([
    (0, typeorm_1.OneToMany)(() => subject_entity_1.Subject, (subject) => subject.teacher),
    __metadata("design:type", Array)
], Teacher.prototype, "subjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => archive_request_entity_1.Archive_request, (archive) => archive.teacher),
    __metadata("design:type", Array)
], Teacher.prototype, "archive_requests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => program_entity_1.Program, (program) => program.teacher),
    __metadata("design:type", Array)
], Teacher.prototype, "programs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => information_entity_1.Information, (information) => information.teacher),
    __metadata("design:type", Array)
], Teacher.prototype, "informations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => teacher_ets_entity_1.Teacher_Ets, (teacher_ets) => teacher_ets.teacher),
    __metadata("design:type", Array)
], Teacher.prototype, "teacher_ets", void 0);
Teacher = __decorate([
    (0, typeorm_1.Entity)()
], Teacher);
exports.Teacher = Teacher;
