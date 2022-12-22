"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteSession = {
    "tags": ["Sessions"],
    "summary": "Delete session with given ID ",
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "type": "string",
            }
        }
    }
};
exports.default = deleteSession;
