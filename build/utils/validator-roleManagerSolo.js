"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleManagerSolo = void 0;
const class_validator_1 = require("class-validator");
let RoleManagerSolo = class RoleManagerSolo {
    validate(text, args) {
        return ["director", "censor"].includes(text); // for async validations you must return a Promise<boolean> here
    }
    defaultMessage(args) {
        // here you can provide default error message if validation failed
        return 'Text ($value) is either director or censor!';
    }
};
RoleManagerSolo = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'roleManagerValidator', async: false })
], RoleManagerSolo);
exports.RoleManagerSolo = RoleManagerSolo;
