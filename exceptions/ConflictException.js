"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class ConflictException extends HttpException_1.HttpException {
    constructor(message) {
        super(409, message);
    }
}
exports.default = ConflictException;
