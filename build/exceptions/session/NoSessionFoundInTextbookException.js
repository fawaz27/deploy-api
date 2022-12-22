"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoSessionFoundInTextbookException extends HttpException_1.HttpException {
    constructor(textbook, classe) {
        super(404, `No session found in the textbook ${textbook} of the class ${classe}`);
    }
}
exports.default = NoSessionFoundInTextbookException;
