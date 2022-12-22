"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getYears = {
    "tags": ["Year"],
    "summary": "Get all years academic",
    "parameters": [],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "type": "array",
                "items": {
                    "$ref": "#/definitions/Year_Academic"
                }
            }
        }
    }
};
exports.default = getYears;
