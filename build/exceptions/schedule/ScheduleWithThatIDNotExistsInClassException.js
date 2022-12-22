"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class ScheduleWithThatIDNotExistsInClassException extends HttpException_1.HttpException {
    constructor(id, classe) {
        super(404, `Schedule with id ${id} not exists in class ${classe} or there is no Schedule with id ${id}`);
    }
}
exports.default = ScheduleWithThatIDNotExistsInClassException;
