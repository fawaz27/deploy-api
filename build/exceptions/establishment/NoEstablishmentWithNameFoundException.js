"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoEstablishmentWithNameFoundException extends HttpException_1.HttpException {
    constructor(name) {
        super(404, `No Establishment with name ${name} found`);
    }
}
exports.default = NoEstablishmentWithNameFoundException;
