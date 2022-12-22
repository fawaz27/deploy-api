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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const hourlyInterface_dto_1 = __importDefault(require("./hourlyInterface.dto"));
class ScheduleIntefaceDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => hourlyInterface_dto_1.default),
    __metadata("design:type", Array)
], ScheduleIntefaceDto.prototype, "Monday", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => hourlyInterface_dto_1.default),
    __metadata("design:type", Array)
], ScheduleIntefaceDto.prototype, "Tuesday", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => hourlyInterface_dto_1.default),
    __metadata("design:type", Array)
], ScheduleIntefaceDto.prototype, "Wednesday", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => hourlyInterface_dto_1.default),
    __metadata("design:type", Array)
], ScheduleIntefaceDto.prototype, "Thursday", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => hourlyInterface_dto_1.default),
    __metadata("design:type", Array)
], ScheduleIntefaceDto.prototype, "Friday", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => hourlyInterface_dto_1.default),
    __metadata("design:type", Array)
], ScheduleIntefaceDto.prototype, "Saturday", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Array)
], ScheduleIntefaceDto.prototype, "Sunday", void 0);
exports.default = ScheduleIntefaceDto;
