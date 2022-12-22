"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class AdminWithThatEmailNotExistsException extends HttpException_1.HttpException {
    constructor(email) {
        super(404, `Admin with email ${email} not exists`);
    }
}
exports.default = AdminWithThatEmailNotExistsException;
