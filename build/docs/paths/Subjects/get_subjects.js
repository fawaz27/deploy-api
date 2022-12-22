"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSubjects = {
    "tags": ["Subjects"],
    "summary": "Get all subjects",
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
exports.default = getSubjects;
