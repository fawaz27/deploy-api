"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const putSubjects = {
    "tags": ["Subjects"],
    "summary": "Update Subject with give ID",
    "parameters": [
        {
            "name": "subject",
            "in": "body",
            "description": "Subject with new values of properties",
            "schema": {
                "$ref": "#/definitions/CreateSubjectDto"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "$ref": "#/definitions/Subject"
            }
        }
    }
};
exports.default = putSubjects;
