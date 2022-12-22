"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class EstablishmentWithThatIDNotExistsForYearException extends HttpException_1.HttpException {
    constructor(id, year) {
        super(404, `Establishment with id ${id} not exists for year academic ${year}`);
    }
}
exports.default = EstablishmentWithThatIDNotExistsForYearException;
