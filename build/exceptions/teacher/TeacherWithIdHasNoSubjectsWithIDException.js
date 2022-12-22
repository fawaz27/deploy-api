"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TeacherWithIdHasNoSubjectsWithIDException extends HttpException_1.HttpException {
    constructor(id, id_subject) {
        super(404, `Teacher with id ${id} has no subjects with id ${id_subject} `);
    }
}
exports.default = TeacherWithIdHasNoSubjectsWithIDException;
