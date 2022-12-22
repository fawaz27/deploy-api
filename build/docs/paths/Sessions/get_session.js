"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSession = {
    "tags": ["Sessions"],
    "summary": "Get session with give ID",
    "parameters": [],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "$ref": "#/definitions/Session"
            }
        }
    }
};
exports.default = getSession;
