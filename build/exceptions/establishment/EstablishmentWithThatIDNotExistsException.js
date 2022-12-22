"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class EstablishmentWithThatIDNotExistsException extends HttpException_1.HttpException {
    constructor(id) {
        super(404, `Establishment with id ${id} not exists`);
    }
}
exports.default = EstablishmentWithThatIDNotExistsException;
