"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TeacherWithThatIDNotExistsInEstablishmentException extends HttpException_1.HttpException {
    constructor(id, id_ets) {
        super(404, `Teacher with id ${id} not exists in etablishment with ${id_ets} or not exists `);
    }
}
exports.default = TeacherWithThatIDNotExistsInEstablishmentException;
