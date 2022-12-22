"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const establishment_controller_1 = require("../../controllers/establishment.controller");
describe('The EsablishmentController', () => {
    let app;
    let establishmentController;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        establishmentController = new establishment_controller_1.EstablishmentController();
        app = new app_1.default([establishmentController]);
    }));
    describe('GET /establishments. Get all establishments', () => {
    });
    describe('POST /establishments. Create a new establishment', () => {
    });
    describe('GET /establishments/:id. Get establishment by ID', () => {
    });
    describe('PUT /establishments/:id. Update establishment by ID', () => {
    });
    describe('DELETE /establishments/:id. Delete establishment by ID', () => {
    });
});
