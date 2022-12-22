"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleManager = void 0;
const class_validator_1 = require("class-validator");
let RoleManager = class RoleManager {
    validate(text, args) {
        return ["censor"].includes(text); // for async validations you must return a Promise<boolean> here
    }
    defaultMessage(args) {
        // here you can provide default error message if validation failed
        return 'Text ($value) is censor!';
    }
};
RoleManager = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'roleManagerValidator', async: false })
], RoleManager);
exports.RoleManager = RoleManager;
