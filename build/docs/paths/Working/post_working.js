"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postWorking = {
    "tags": ["Workings"],
    "summary": "Create a new Working",
    "parameters": [
        {
            "name": "Working",
            "in": "body",
            "description": "Working that we want to create",
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
exports.default = postWorking;
