"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class UnauthorizedException extends HttpException_1.HttpException {
    constructor(message) {
        super(401, message);
    }
}
exports.default = UnauthorizedException;
