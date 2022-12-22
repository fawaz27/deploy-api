"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class SubjectWithThatIDInClassForEstablishmentNotExistsException extends HttpException_1.HttpException {
    constructor(id, id_class) {
        super(404, `Subject with id ${id} not exists in Establishment for class with id ${id_class}`);
    }
}
exports.default = SubjectWithThatIDInClassForEstablishmentNotExistsException;
