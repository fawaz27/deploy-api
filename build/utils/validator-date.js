"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate_date(value) {
    return isDate(value);
}
exports.default = validate_date;
function isDate(value) {
    let isValidDate = Date.parse(value);
    if (isNaN(isValidDate))
        return false;
    else
        return true;
}
