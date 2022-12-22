"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const putWorking = {
    "tags": ["Workings"],
    "summary": "Update Working with give ID",
    "parameters": [
        {
            "name": "Working",
            "in": "body",
            "description": "Working with new values of properties",
            "schema": {}
        }
    ],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {}
        }
    }
};
exports.default = putWorking;
