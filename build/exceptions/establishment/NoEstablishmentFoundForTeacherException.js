"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoEstablishmentFoundForTeacherException extends HttpException_1.HttpException {
    constructor(id_teacher) {
        super(404, `No Establishment found for teacher with id ${id_teacher}`);
    }
}
exports.default = NoEstablishmentFoundForTeacherException;
