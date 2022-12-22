"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class ScheduleAlreadyExistsException extends HttpException_1.HttpException {
    constructor(classname, year) {
        super(400, `Schedule for class  ${classname} already exists in yearAcademic  ${year} `);
    }
}
exports.default = ScheduleAlreadyExistsException;
