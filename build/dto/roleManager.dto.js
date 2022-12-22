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
const validator_roleManager_1 = require("../utils/validator-roleManager");
class DeleteRoleManagerDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(validator_roleManager_1.RoleManager, { message: 'please roleManager is either director or censor' }),
    __metadata("design:type", String)
], DeleteRoleManagerDto.prototype, "roleManager", void 0);
exports.default = DeleteRoleManagerDto;
