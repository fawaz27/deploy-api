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
const class_validator_1 = require("class-validator");
class CreateSessionYearDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: ' please the date is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionYearDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: ' please the start time is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    __metadata("design:type", String)
], CreateSessionYearDto.prototype, "start_time", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: ' please the end   time is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    __metadata("design:type", String)
], CreateSessionYearDto.prototype, "end_time", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: ' please the title is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionYearDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionYearDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionYearDto.prototype, "annex_document", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionYearDto.prototype, "point_of_presence", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: ' please the summary_course is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionYearDto.prototype, "summary_course", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: ' please yearAcademic is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionYearDto.prototype, "yearAcademic", void 0);
exports.default = CreateSessionYearDto;
