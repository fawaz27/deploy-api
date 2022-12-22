"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSubject = {
    "tags": ["Subjects"],
    "summary": "Get subject with give ID",
    "parameters": [],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "$ref": "#/definitions/Subject"
            }
        }
    }
};
exports.default = getSubject;
