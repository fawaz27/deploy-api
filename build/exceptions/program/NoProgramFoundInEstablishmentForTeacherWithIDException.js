"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoProgramFoundInEstablishmentForTeacherWithIDException extends HttpException_1.HttpException {
    constructor(id_ets, id_teacher) {
        super(404, `No Program exists in Establishment with id ${id_ets} for the teacher with id ${id_teacher}`);
    }
}
exports.default = NoProgramFoundInEstablishmentForTeacherWithIDException;
