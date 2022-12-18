"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class WrongCredentialsException extends HttpException_1.HttpException {
    constructor() {
        super(401, 'Wrong credentials provided');
    }
}
exports.default = WrongCredentialsException;
