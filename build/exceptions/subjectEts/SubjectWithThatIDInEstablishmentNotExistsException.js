"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class SubjectWithThatIDNotExistsInEstablishmentException extends HttpException_1.HttpException {
    constructor(id, id_ets) {
        super(404, `Subject with id ${id} not exists in Establishment with id ${id_ets}`);
    }
}
exports.default = SubjectWithThatIDNotExistsInEstablishmentException;
