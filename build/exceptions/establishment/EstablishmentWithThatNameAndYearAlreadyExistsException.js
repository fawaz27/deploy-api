"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class EstablishmentWithThatNameAndYearAlreadyExistsException extends HttpException_1.HttpException {
    constructor(name, year, id_teacher) {
        super(500, `Establishment with name ${name} in year ${year} already exists for teacher with ${id_teacher}`);
    }
}
exports.default = EstablishmentWithThatNameAndYearAlreadyExistsException;
