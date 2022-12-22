"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTeachers = {
    "tags": ["Teachers"],
    "summary": "Get all Teachers",
    "parameters": [],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "type": "array",
                "items": {
                    "$ref": "#/definitions/Teacher"
                }
            }
        }
    }
};
exports.default = getTeachers;
