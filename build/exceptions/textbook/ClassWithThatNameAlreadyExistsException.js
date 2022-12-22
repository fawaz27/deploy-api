"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class ClassWithThatNameHaveAlreadyTextbookException extends HttpException_1.HttpException {
    constructor(name, year) {
        super(400, `The class ${name} of the academic year ${year} already has a textbook`);
    }
}
exports.default = ClassWithThatNameHaveAlreadyTextbookException;
