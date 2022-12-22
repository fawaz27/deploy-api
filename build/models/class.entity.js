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
exports.Class = void 0;
const typeorm_1 = require("typeorm");
const textbook_entity_1 = require("./textbook.entity");
const subject_entity_1 = require("./subject.entity");
const schedule_entity_1 = require("./schedule.entity");
const establishment_entity_1 = require("./establishment.entity");
let Class = class Class {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Class.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Class.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => textbook_entity_1.Textbook, (textbook) => textbook.classe),
    __metadata("design:type", Array)
], Class.prototype, "textbooks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subject_entity_1.Subject, (subject) => subject.classe),
    __metadata("design:type", Array)
], Class.prototype, "subjects", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => establishment_entity_1.Establishment, (ets) => ets.classes, { onDelete: 'CASCADE' }),
    __metadata("design:type", establishment_entity_1.Establishment)
], Class.prototype, "etablishment", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => schedule_entity_1.Schedule, (schedule) => schedule.classe),
    __metadata("design:type", schedule_entity_1.Schedule)
], Class.prototype, "schedule", void 0);
Class = __decorate([
    (0, typeorm_1.Entity)()
], Class);
exports.Class = Class;
