"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const putclass = {
    "tags": ["Classes"],
    "summary": "Update class with give ID",
    "parameters": [
        {
            "name": "class",
            "in": "body",
            "description": "Class with new values of properties",
            "schema": {
                "$ref": "#/definitions/CreateClassDto"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "$ref": "#/definitions/Class"
            }
        }
    }
};
exports.default = putclass;
