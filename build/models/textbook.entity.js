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
exports.Textbook = void 0;
const typeorm_1 = require("typeorm");
const class_entity_1 = require("./class.entity");
const session_entity_1 = require("./session.entity");
const year_academic_entity_1 = require("./year_academic.entity");
let Textbook = class Textbook {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Textbook.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Textbook.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => class_entity_1.Class, (classe) => classe.textbooks, { onDelete: 'CASCADE' }),
    __metadata("design:type", class_entity_1.Class)
], Textbook.prototype, "classe", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_entity_1.Session, (session) => session.textbook),
    __metadata("design:type", Array)
], Textbook.prototype, "sessions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => year_academic_entity_1.Year_Academic, (year) => year.textbooks, { onDelete: 'CASCADE' }),
    __metadata("design:type", year_academic_entity_1.Year_Academic)
], Textbook.prototype, "year_academic", void 0);
Textbook = __decorate([
    (0, typeorm_1.Entity)()
], Textbook);
exports.Textbook = Textbook;
