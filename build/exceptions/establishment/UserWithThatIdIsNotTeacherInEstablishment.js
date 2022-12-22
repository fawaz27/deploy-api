"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class UserWithThatIdIsNotTeacherInEstablishmentException extends HttpException_1.HttpException {
    constructor(id_teacher, id_ets) {
        super(404, ` User with that id ${id_teacher} is not teacher in establishment with id ${id_ets}`);
    }
}
exports.default = UserWithThatIdIsNotTeacherInEstablishmentException;
