"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoClassFoundInEstablishmentException extends HttpException_1.HttpException {
    constructor(ets) {
        super(404, `No class exist in establishment ${ets}`);
    }
}
exports.default = NoClassFoundInEstablishmentException;
