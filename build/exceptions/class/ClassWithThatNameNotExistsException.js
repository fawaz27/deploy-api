"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class ClassWithThatNameNotExistsException extends HttpException_1.HttpException {
    constructor(name) {
        super(404, `Class with name ${name} not exists`);
    }
}
exports.default = ClassWithThatNameNotExistsException;
