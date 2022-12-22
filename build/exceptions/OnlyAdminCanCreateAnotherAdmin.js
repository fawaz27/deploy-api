"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class OnlyAdminCanCreateAnotherAdminException extends HttpException_1.HttpException {
    constructor() {
        super(403, `Only admin can create another admin`);
    }
}
exports.default = OnlyAdminCanCreateAnotherAdminException;
