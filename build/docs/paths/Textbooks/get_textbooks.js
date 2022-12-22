"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTextbooks = {
    "tags": ["Textbooks"],
    "summary": "Get all Textbooks",
    "parameters": [],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "type": "array",
                "items": {
                    "$ref": "#/definitions/Textbook"
                }
            }
        }
    }
};
exports.default = getTextbooks;
