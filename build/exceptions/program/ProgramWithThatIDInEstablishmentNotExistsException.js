"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class ProgramWithThatIDNotExistsException extends HttpException_1.HttpException {
    constructor(id, id_ets) {
        super(404, `Program with id ${id} not exists in Establishment with id ${id_ets}`);
    }
}
exports.default = ProgramWithThatIDNotExistsException;
