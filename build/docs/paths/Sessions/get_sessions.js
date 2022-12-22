"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSessions = {
    "tags": ["Sessions"],
    "summary": "Get all sessions",
    "parameters": [],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "type": "array",
                "items": {
                    "$ref": "#/definitions/Session"
                }
            }
        }
    }
};
exports.default = getSessions;
