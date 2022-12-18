"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class ForbiddenException extends HttpException_1.HttpException {
    constructor(message) {
        super(403, message);
    }
}
exports.default = ForbiddenException;
