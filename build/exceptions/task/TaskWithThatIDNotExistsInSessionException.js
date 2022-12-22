"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class TaskWithThatIDNotExistsInSessionException extends HttpException_1.HttpException {
    constructor(id, session) {
        super(404, `Task with id ${id} not exists in session with id ${session} or there is no task with id ${id} `);
    }
}
exports.default = TaskWithThatIDNotExistsInSessionException;
