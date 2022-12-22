"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class ClassWithThatIDNotExistsInEstablishmentException extends HttpException_1.HttpException {
    constructor(id, ets) {
        super(404, `Class with id ${id} not exists in establishment ${ets}`);
    }
}
exports.default = ClassWithThatIDNotExistsInEstablishmentException;
