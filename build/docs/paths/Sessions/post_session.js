"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postSession = {
    "tags": ["Sessions"],
    "summary": "Create a new Session",
    "parameters": [
        {
            "name": "Session",
            "in": "body",
            "description": "Session that we want to create",
            "schema": {
                "$ref": "#/definitions/CreateSessionDto"
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
exports.default = postSession;
