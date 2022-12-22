"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoEstablishmentFoundException extends HttpException_1.HttpException {
    constructor() {
        super(404, `No Establishment found`);
    }
}
exports.default = NoEstablishmentFoundException;
