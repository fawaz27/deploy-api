"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subjectdefinitions = {
    "required": ["id", "name"],
    "properties": {
        "id": {
            "type": "integer",
            "uniqueItems": true
        },
        "name": {
            "type": "string"
        },
        "classe": {
            "$ref": "#/definitions/Class"
        },
        "teacher": {
            "$ref": "#/definitions/Teacher"
        }
    }
};
exports.default = subjectdefinitions;
