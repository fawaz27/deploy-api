"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoInformationFoundException extends HttpException_1.HttpException {
    constructor(id_ets) {
        super(404, `No Information exists in Establishment with id ${id_ets}`);
    }
}
exports.default = NoInformationFoundException;
