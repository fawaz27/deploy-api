"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const putSessionByTeacher = {
    "tags": ["Teachers"],
    "summary": "Update Session with give ID by teacher connected",
    "parameters": [
        {
            "name": "SessionYear",
            "in": "body",
            "description": "Session with new values of properties",
            "schema": {
                "$ref": "#/definitions/CreateSessionYearDto"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "$ref": "#/definitions/Session"
            }
        }
    }
};
exports.default = putSessionByTeacher;
