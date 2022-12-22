"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoSessionFoundForSubjectException extends HttpException_1.HttpException {
    constructor(subject, classe) {
        super(404, `No session found for the subject ${subject} in the class ${classe}`);
    }
}
exports.default = NoSessionFoundForSubjectException;
