"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteTask = {
    "tags": ["Tasks"],
    "summary": "Delete task with given ID ",
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "type": "string",
            }
        }
    }
};
exports.default = deleteTask;
