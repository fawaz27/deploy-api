"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class YearWithThatIDNotExistsException extends HttpException_1.HttpException {
    constructor(id) {
        super(404, `Year with id ${id} not exists`);
    }
}
exports.default = YearWithThatIDNotExistsException;
