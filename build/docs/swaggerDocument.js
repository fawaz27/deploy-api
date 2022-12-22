"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const info_1 = __importDefault(require("./config/info"));
const definitions_1 = __importDefault(require("./definitions/definitions"));
const paths_1 = __importDefault(require("./paths/paths"));
const tags_1 = __importDefault(require("./tags/tags"));
const swaggerDocument = {
    "swagger": "2.0",
    "info": info_1.default,
    "host": "localhost:3000",
    "basePath": "/",
    "tags": tags_1.default,
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "paths": paths_1.default,
    "definitions": definitions_1.default
};
exports.default = swaggerDocument;
