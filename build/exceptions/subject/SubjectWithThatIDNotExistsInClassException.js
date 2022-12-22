"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class SubjectWithThatIDNotExistsInClassException extends HttpException_1.HttpException {
    constructor(id, classe) {
        super(404, `Subject with id ${id} not exists in class ${classe} or there is no subject with id ${id}`);
    }
}
exports.default = SubjectWithThatIDNotExistsInClassException;
