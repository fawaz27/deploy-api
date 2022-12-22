"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postSubject = {
    "tags": ["Subjects"],
    "summary": "Create a new Subject",
    "parameters": [
        {
            "name": "subject",
            "in": "body",
            "description": "Subject that we want to create",
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
exports.default = postSubject;
