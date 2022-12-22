"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class EstablishmentWithThatIDHaveNotManager extends HttpException_1.HttpException {
    constructor(id, manager) {
        super(404, `Establishment with id ${id} have not manager ${manager}`);
    }
}
exports.default = EstablishmentWithThatIDHaveNotManager;
