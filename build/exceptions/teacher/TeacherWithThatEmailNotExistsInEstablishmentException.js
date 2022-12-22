"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TeacherWithThatEmailNotExistsInEstablishmentException extends HttpException_1.HttpException {
    constructor(email, id_ets) {
        super(404, `Teacher with email ${email} not exists in establishment with id ${id_ets}`);
    }
}
exports.default = TeacherWithThatEmailNotExistsInEstablishmentException;
