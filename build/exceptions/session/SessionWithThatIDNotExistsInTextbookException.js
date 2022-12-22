"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class SessionWithThatIDNotExistsInTextbookException extends HttpException_1.HttpException {
    constructor(id, textbook) {
        super(404, `Session with id ${id} not exists in textbook ${textbook} or there is no session with id ${id} `);
    }
}
exports.default = SessionWithThatIDNotExistsInTextbookException;
