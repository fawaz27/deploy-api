"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class IsNotAdminAndManager extends HttpException_1.HttpException {
    constructor(id, id_ets) {
        super(403, `User with id ${id} is not admin or manager of etablishment with id ${id_ets}`);
    }
}
exports.default = IsNotAdminAndManager;
