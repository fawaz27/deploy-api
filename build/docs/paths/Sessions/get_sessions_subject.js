"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSessionsSubject = {
    "tags": ["Sessions"],
    "summary": "Get all  subject sessions",
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
exports.default = getSessionsSubject;
