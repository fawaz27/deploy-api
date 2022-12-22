"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class YearWithThatNameNotExistsException extends HttpException_1.HttpException {
    constructor(name) {
        super(404, `Year with name ${name} not exists`);
    }
}
exports.default = YearWithThatNameNotExistsException;
