"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login = {
    "tags": ["Authentification"],
    "summary": "Login ",
    "parameters": [
        {
            "name": "login",
            "in": "body",
            "description": "parameters of login",
            "schema": {
                "$ref": "#/definitions/LoginDto"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "OK",
            "schema": {
                "$ref": "#/definitions/Teacher"
            }
        }
    }
};
exports.default = login;
