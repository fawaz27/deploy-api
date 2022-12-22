"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const putSession = {
    "tags": ["Sessions"],
    "summary": "Update Session with give ID",
    "parameters": [
        {
            "name": "session",
            "in": "body",
            "description": "Session with new values of properties",
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
exports.default = putSession;
