"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTeacherDtodefinitions = {
    "required": ["email", "hashPassword", "role"],
    "properties": {
        "lastName": {
            "type": "string"
        },
        "firstName": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "hashPassword": {
            "type": "string"
        },
        "phone": {
            "type": "string"
        },
        "role": {
            "type": "string"
        }
    }
};
exports.default = createTeacherDtodefinitions;
