"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class SubjectWithThatNameInEstblishmentAlreadyExistsException extends HttpException_1.HttpException {
    constructor(name, etsName) {
        super(400, `Subject with name ${name} in establishment ${etsName} already exists`);
    }
}
exports.default = SubjectWithThatNameInEstblishmentAlreadyExistsException;
