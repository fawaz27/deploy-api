"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoTeacherFoundInEstablishmentException extends HttpException_1.HttpException {
    constructor(id) {
        super(404, `No Teachers exist in establishment with id ${id}`);
    }
}
exports.default = NoTeacherFoundInEstablishmentException;
