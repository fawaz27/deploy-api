"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TeacherWithThatIDNotExistsException extends HttpException_1.HttpException {
    constructor(id) {
        super(404, `Teacher with id ${id} not exists`);
    }
}
exports.default = TeacherWithThatIDNotExistsException;
