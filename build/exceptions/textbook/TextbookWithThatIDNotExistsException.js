"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TextbookWithThatIDNotExistsException extends HttpException_1.HttpException {
    constructor(id) {
        super(404, `Textbook with id ${id} not exists`);
    }
}
exports.default = TextbookWithThatIDNotExistsException;
