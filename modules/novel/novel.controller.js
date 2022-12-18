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
exports.NovelController = void 0;
const express_1 = __importDefault(require("express"));
const adminMiddleware_1 = __importDefault(require("../../middlewares/adminMiddleware"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validationMiddleware_1 = __importDefault(require("../../middlewares/validationMiddleware"));
const novel_dto_1 = __importDefault(require("./novel.dto"));
const novel_service_1 = require("./novel.service");
class NovelController {
    constructor() {
        this.path = '/novels';
        this.router = express_1.default.Router();
        this.addNovelToLibrary = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_library = Number(request.query.id_library);
            const id_source = Number(request.query.id_source);
            const novelData = request.body;
            try {
                const result = yield this.novelService.addNovelToLibrary(id_library, id_source, novelData);
                response.status(201).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.getNovelsOfUser = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = Number(request.query.userId);
            try {
                const result = yield this.novelService.getNovelsOfUser(userId);
                response.status(201).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.getNovelsOfLirbrary = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_library = Number(request.query.id_library);
            try {
                const result = yield this.novelService.getNovelsOfLirbrary(id_library);
                response.status(201).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.getNovelbyId = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            try {
                const result = yield this.novelService.getNovelbyId(id);
                response.status(201).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateNovel = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const novelData = request.body;
            try {
                const result = yield this.novelService.updateNovel(id, novelData);
                response.status(201).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteNovel = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            try {
                const result = yield this.novelService.deleteNovel(id);
                response.status(201).send(`Novel with ${result} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.novelService = new novel_service_1.NovelService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .get(`${this.path}User`, authMiddleware_1.default, this.getNovelsOfUser)
            .get(`${this.path}Library`, authMiddleware_1.default, adminMiddleware_1.default, this.getNovelsOfLirbrary)
            .post(this.path, (0, validationMiddleware_1.default)(novel_dto_1.default), this.addNovelToLibrary);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .get(`${this.path}/:id`, this.getNovelbyId)
            .put(`${this.path}/:id`, (0, validationMiddleware_1.default)(novel_dto_1.default), this.updateNovel)
            .delete(`${this.path}/:id`, this.deleteNovel);
    }
}
exports.NovelController = NovelController;
