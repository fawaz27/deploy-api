"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class FormatDateException extends HttpException_1.HttpException {
    constructor() {
        super(400, `Date follows mm/dd/yy or yy-mm-dd  format . For example 03/22/2021 , 2021-03-22."`);
    }
}
exports.default = FormatDateException;
