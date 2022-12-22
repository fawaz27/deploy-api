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
exports.TextbookController = void 0;
const express_1 = __importDefault(require("express"));
const textbook_service_1 = require("../services/textbook.service");
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middlewares/isAdminMiddleware"));
const textbook_dto_1 = __importDefault(require("../dto/textbook.dto"));
class TextbookController {
    constructor() {
        this.path = '/classes/:id_class/textbooks';
        this.router = express_1.default.Router();
        this.getAllTextbooks = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            try {
                const result = yield this.textbookService.getAllTextbooks(Number(id_class));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createTextbook = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const TextbookData = request.body;
            try {
                const created = yield this.textbookService.createTextbook(Number(id_class), TextbookData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getTextbookById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const id_textbook = request.params.id_textbook;
            try {
                const textbook = yield this.textbookService.getTextbookById(Number(id_class), Number(id_textbook));
                response.status(200).send(textbook);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateTextbook = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const id_textbook = request.params.id_textbook;
            const TextbookData = request.body;
            try {
                const result = yield this.textbookService.updateTextbook(TextbookData, Number(id_class), Number(id_textbook));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteTextbook = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const id_textbook = request.params.id_textbook;
            try {
                const result = yield this.textbookService.deleteTextbook(Number(id_class), Number(id_textbook));
                response.status(200).send(`Textbook with id ${id_textbook} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.textbookService = new textbook_service_1.TextbookService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(this.path, this.getAllTextbooks)
            .post(this.path, (0, validationMiddleware_1.default)(textbook_dto_1.default), this.createTextbook);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(`${this.path}/:id_textbook`, this.getTextbookById)
            .put(`${this.path}/:id_textbook`, (0, validationMiddleware_1.default)(textbook_dto_1.default), this.updateTextbook)
            .delete(`${this.path}/:id_textbook`, this.deleteTextbook);
    }
}
exports.TextbookController = TextbookController;
