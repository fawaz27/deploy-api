"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TeacherWithIdAlreadyExistInClassException extends HttpException_1.HttpException {
    constructor(id, classname) {
        super(400, `Teacher with id ${id} in class ${classname} already exists`);
    }
}
exports.default = TeacherWithIdAlreadyExistInClassException;
