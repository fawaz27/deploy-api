"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class FormatYearException extends HttpException_1.HttpException {
    constructor() {
        super(400, `Year must be in format [0-*]-[0-*]+1 . For example 2021-2022.`);
    }
}
exports.default = FormatYearException;
