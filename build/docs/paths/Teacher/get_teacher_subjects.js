"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTeacherSubjects = {
    "tags": ["Teachers"],
    "summary": "Get all subjects for teacher connected",
    "parameters": [],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "type": "array",
                "items": {
                    "$ref": "#/definitions/Subject"
                }
            }
        }
    }
};
exports.default = getTeacherSubjects;
