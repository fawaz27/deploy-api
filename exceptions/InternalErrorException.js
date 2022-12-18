"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class InternalErrorException extends HttpException_1.HttpException {
    constructor() {
        super(500, 'Internal Server Error');
    }
}
exports.default = InternalErrorException;
