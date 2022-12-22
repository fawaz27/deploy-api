"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteSessionByTeacher = {
    "tags": ["Teachers"],
    "summary": "Delete session with given ID by teacher connected",
    "parameters": [
        {
            "name": "yearAcademic",
            "in": "query",
            "required": true,
            "description": "The academic year for which you want delete session",
            "schema": {
                "type": "string"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "type": "string",
            }
        }
    }
};
exports.default = deleteSessionByTeacher;
