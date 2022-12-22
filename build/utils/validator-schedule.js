"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsSchedule = void 0;
const class_validator_1 = require("class-validator");
const schedule_entity_1 = require("../models/schedule.entity");
function IsSchedule(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isWorking',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return value instanceof schedule_entity_1.Schedule;
                },
            },
        });
    };
}
exports.IsSchedule = IsSchedule;
