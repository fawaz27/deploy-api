"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class EstablishmentWithThatIDHaveAlreadyCensor extends HttpException_1.HttpException {
    constructor(id) {
        super(500, `Establishment with id ${id} have already a censor.`);
    }
}
exports.default = EstablishmentWithThatIDHaveAlreadyCensor;
