"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TeacherWithThatEmailAlreadyExistsException extends HttpException_1.HttpException {
    constructor(email) {
        super(400, `Teacher with email ${email} already exists`);
    }
}
exports.default = TeacherWithThatEmailAlreadyExistsException;
