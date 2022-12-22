"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postTask = {
    "tags": ["Tasks"],
    "summary": "Create a new Task",
    "parameters": [
        {
            "name": "Task",
            "in": "body",
            "description": "Task that we want to create",
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
exports.default = postTask;
