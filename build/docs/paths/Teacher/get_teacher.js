"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTeacher = {
    "tags": ["Teachers"],
    "summary": "Get Teacher with give ID",
    "parameters": [],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "$ref": "#/definitions/Teacher"
            }
        }
    }
};
exports.default = getTeacher;
