"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate_year_academic(value) {
    return isYearAcademic(value);
}
exports.default = validate_year_academic;
function isYearAcademic(value) {
    let dates = value.split('-');
    if (dates.length == 2) {
        for (const element of dates)
            if (!Number(element))
                return false;
        if (Number(dates[1]) - Number(dates[0]) != 1)
            return false;
        return true;
    }
    else {
        return false;
    }
}
