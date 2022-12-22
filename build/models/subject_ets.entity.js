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
exports.Subject_Ets = void 0;
const typeorm_1 = require("typeorm");
const establishment_entity_1 = require("./establishment.entity");
const subject_entity_1 = require("./subject.entity");
let Subject_Ets = class Subject_Ets {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Subject_Ets.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subject_Ets.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => establishment_entity_1.Establishment, (ets) => ets.subject_ets, { onDelete: 'CASCADE' }),
    __metadata("design:type", establishment_entity_1.Establishment)
], Subject_Ets.prototype, "etablishment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subject_entity_1.Subject, (subject) => subject.subject_ets),
    __metadata("design:type", Array)
], Subject_Ets.prototype, "subjects", void 0);
Subject_Ets = __decorate([
    (0, typeorm_1.Entity)()
], Subject_Ets);
exports.Subject_Ets = Subject_Ets;
