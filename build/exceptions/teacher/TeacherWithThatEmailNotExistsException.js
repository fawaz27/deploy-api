"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TeacherWithThatEmailNotExistsException extends HttpException_1.HttpException {
    constructor(email) {
        super(404, `Teacher with email ${email} not exists`);
    }
}
exports.default = TeacherWithThatEmailNotExistsException;
