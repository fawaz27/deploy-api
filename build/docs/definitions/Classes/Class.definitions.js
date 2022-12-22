"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classdefinitions = {
    "required": ["id", "name"],
    "properties": {
        "id": {
            "type": "integer",
            "uniqueItems": true
        },
        "name": {
            "type": "string"
        }
    }
};
exports.default = classdefinitions;
