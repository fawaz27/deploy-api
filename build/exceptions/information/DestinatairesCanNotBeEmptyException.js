"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class DestinatairesCanNotBeEmptyException extends HttpException_1.HttpException {
    constructor() {
        super(404, `Destinataires can not be empty when access is 'GROUP-TEACHERS' `);
    }
}
exports.default = DestinatairesCanNotBeEmptyException;
