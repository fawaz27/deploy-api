"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class IsNotAdmin extends HttpException_1.HttpException {
    constructor(id) {
        super(403, `User with id ${id} is not Admin`);
    }
}
exports.default = IsNotAdmin;
