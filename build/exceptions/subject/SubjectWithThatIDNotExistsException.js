"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class SubjectWithThatIDNotExistsException extends HttpException_1.HttpException {
    constructor(id) {
        super(404, `Subject with id ${id} not exists`);
    }
}
exports.default = SubjectWithThatIDNotExistsException;
