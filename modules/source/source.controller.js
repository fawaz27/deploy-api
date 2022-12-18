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
exports.SourceController = void 0;
const express_1 = __importDefault(require("express"));
const source_dto_1 = __importDefault(require("./source.dto"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validationMiddleware_1 = __importDefault(require("../../middlewares/validationMiddleware"));
const source_service_1 = require("./source.service");
const adminMiddleware_1 = __importDefault(require("../../middlewares/adminMiddleware"));
class SourceController {
    constructor() {
        this.path = '/sources';
        this.router = express_1.default.Router();
        this.addSource = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const sourceData = request.body;
            try {
                const created = yield this.sourceService.addSource(sourceData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllSources = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.sourceService.getAllSources();
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateSource = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const sourceData = request.body;
            try {
                const updated = yield this.sourceService.updateSource(id, sourceData);
                response.status(201).send(updated);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteSource = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            try {
                const deleted = yield this.sourceService.deleteSource(id);
                response.status(201).send(`Source with ${deleted} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.sourceService = new source_service_1.SourceService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(this.path, authMiddleware_1.default)
            .get(this.path, this.getAllSources)
            .post(this.path, adminMiddleware_1.default, (0, validationMiddleware_1.default)(source_dto_1.default), this.addSource);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default, adminMiddleware_1.default)
            .put(`${this.path}/:id`, (0, validationMiddleware_1.default)(source_dto_1.default), this.updateSource)
            .delete(`${this.path}/:id`, this.deleteSource);
    }
}
exports.SourceController = SourceController;
