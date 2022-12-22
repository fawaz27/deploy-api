"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TextbookWithThatIDNotExistsInClassException extends HttpException_1.HttpException {
    constructor(id, classe) {
        super(404, `Textbook with id ${id} not exists in classe ${classe} or  there is no textbook with id ${id}`);
    }
}
exports.default = TextbookWithThatIDNotExistsInClassException;
