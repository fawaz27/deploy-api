"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postTeacher = {
    "tags": ["Teachers"],
    "summary": "Create a new Teacher",
    "parameters": [
        {
            "name": "Teacher",
            "in": "body",
            "description": "Teacher that we want to create",
            "schema": {
                "$ref": "#/definitions/CreateTeacherDto"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "$ref": "#/definitions/Teacher"
            }
        }
    }
};
exports.default = postTeacher;
