"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTasks = {
    "tags": ["Tasks"],
    "summary": "Get all tasks",
    "parameters": [],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "type": "array",
                "items": {
                    "$ref": "#/definitions/Task"
                }
            }
        }
    }
};
exports.default = getTasks;
