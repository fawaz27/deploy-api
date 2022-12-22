"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TeacherWithIdHasNoSubjectsException extends HttpException_1.HttpException {
    constructor(id) {
        super(404, `Teacher with id ${id} has no subjects`);
    }
}
exports.default = TeacherWithIdHasNoSubjectsException;
