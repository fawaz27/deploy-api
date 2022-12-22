"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class ClassWithIDHaveNotScheduleForYearException extends HttpException_1.HttpException {
    constructor(id, year) {
        super(404, `Class with id ${id} have not  Schedule for year ${year}`);
    }
}
exports.default = ClassWithIDHaveNotScheduleForYearException;
