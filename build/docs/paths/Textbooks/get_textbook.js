"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTextbook = {
    "tags": ["Textbooks"],
    "summary": "Get textbbok with give ID",
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "$ref": "#/definitions/Textbook"
            }
        }
    }
};
exports.default = getTextbook;
