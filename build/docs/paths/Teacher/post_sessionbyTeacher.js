"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postSessionByTeacher = {
    "tags": ["Teachers"],
    "summary": "Create a new Session by teacher connected",
    "parameters": [
        {
            "name": "SessionYear",
            "in": "body",
            "description": "Session that we want to create ",
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
exports.default = postSessionByTeacher;
