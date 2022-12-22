"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../HttpException");
class ScheduleWithThatIDNotExistsInClassForYearException extends HttpException_1.HttpException {
    constructor(id, classname, yearAcademic) {
        super(404, `There is no Schedule with id ${id}  in class ${classname} for yearAcademic ${yearAcademic} `);
    }
}
exports.default = ScheduleWithThatIDNotExistsInClassForYearException;
