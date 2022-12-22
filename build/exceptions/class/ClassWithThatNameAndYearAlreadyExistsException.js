"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class ClassWithThatNameInEstablishmentAlreadyExistsException extends HttpException_1.HttpException {
    constructor(name, ets) {
        super(400, `Class with name ${name}  already exists in establishment ${ets}`);
    }
}
exports.default = ClassWithThatNameInEstablishmentAlreadyExistsException;
