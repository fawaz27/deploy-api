"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postTextbook = {
    "tags": ["Textbooks"],
    "summary": "Create a new textbook",
    "parameters": [
        {
            "name": "textbook",
            "in": "body",
            "description": "Textbook that we want to create",
            "schema": {
                "$ref": "#/definitions/CreateTextbookDto"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "$ref": "#/definitions/Textbook"
            }
        }
    }
};
exports.default = postTextbook;
