"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const putTextbook = {
    "tags": ["Textbooks"],
    "summary": "Update textbook with give ID",
    "parameters": [
        {
            "name": "class",
            "in": "body",
            "description": "Textbook with new values of properties",
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
exports.default = putTextbook;
