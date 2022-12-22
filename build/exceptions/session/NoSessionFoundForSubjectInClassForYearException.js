"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoSessionFoundForSubjectInClassForYearException extends HttpException_1.HttpException {
    constructor(subject, classe, year) {
        super(404, `No session found for the subject ${subject} in the class ${classe} for year ${year}`);
    }
}
exports.default = NoSessionFoundForSubjectInClassForYearException;
