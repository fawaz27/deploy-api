"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoTeacherFoundException extends HttpException_1.HttpException {
    constructor() {
        super(404, `No Teachers exist`);
    }
}
exports.default = NoTeacherFoundException;
