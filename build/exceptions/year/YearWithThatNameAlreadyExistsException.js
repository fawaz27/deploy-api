"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class YearWithThatNameAlreadyExistsException extends HttpException_1.HttpException {
    constructor(name) {
        super(400, `year with name ${name}  already exists`);
    }
}
exports.default = YearWithThatNameAlreadyExistsException;
