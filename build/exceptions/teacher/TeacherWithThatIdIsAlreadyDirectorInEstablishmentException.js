"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TeacherWithThatIdIsAlreadyDirectorInEstablishmentException extends HttpException_1.HttpException {
    constructor(id_teacher, id_ets) {
        super(400, `Teacher with id ${id_teacher} is already director in Establishment with id ${id_ets}`);
    }
}
exports.default = TeacherWithThatIdIsAlreadyDirectorInEstablishmentException;
