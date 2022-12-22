"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class NoTexbookFoundForClassForYearException extends HttpException_1.HttpException {
    constructor(classe, year) {
        super(404, ` Textbook with class ${classe} and year ${year} not exists`);
    }
}
exports.default = NoTexbookFoundForClassForYearException;
