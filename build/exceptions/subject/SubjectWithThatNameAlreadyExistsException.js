"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class SubjectWithThatNameAlreadyExistsException extends HttpException_1.HttpException {
    constructor(name, classname) {
        super(400, `Subject with name ${name} in class ${classname} already exists`);
    }
}
exports.default = SubjectWithThatNameAlreadyExistsException;
