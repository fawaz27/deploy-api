"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class YearIsStringException extends HttpException_1.HttpException {
    constructor() {
        super(400, `yearAcademic is required in query and must be a string`);
    }
}
exports.default = YearIsStringException;
