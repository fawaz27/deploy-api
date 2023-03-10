"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const putTask = {
    "tags": ["Tasks"],
    "summary": "Update Task with give ID",
    "parameters": [
        {
            "name": "Task",
            "in": "body",
            "description": "Task with new values of properties",
            "schema": {
                "$ref": "#/definitions/CreateTaskDto"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "$ref": "#/definitions/Task"
            }
        }
    }
};
exports.default = putTask;
