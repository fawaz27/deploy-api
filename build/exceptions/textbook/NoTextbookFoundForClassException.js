"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoTextbookFoundForClassException extends HttpException_1.HttpException {
    constructor(classe) {
        super(404, `No Textbook found for the class ${classe}`);
    }
}
exports.default = NoTextbookFoundForClassException;
