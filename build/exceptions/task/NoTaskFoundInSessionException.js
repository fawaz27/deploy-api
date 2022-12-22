"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoTaskFoundInSessionException extends HttpException_1.HttpException {
    constructor(session) {
        super(404, `No tasks found in session with id ${session}`);
    }
}
exports.default = NoTaskFoundInSessionException;
