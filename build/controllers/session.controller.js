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
exports.SessionController = void 0;
const express_1 = __importDefault(require("express"));
const session_service_1 = require("../services/session.service");
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middlewares/isAdminMiddleware"));
const session_dto_1 = __importDefault(require("../dto/session.dto"));
class SessionController {
    constructor() {
        this.path = '/textbooks/:id_textbook';
        this.router = express_1.default.Router();
        this.getAllSessionsSubject = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_subject = request.params.id_subject;
            const id_textbook = request.params.id_textbook;
            try {
                const result = yield this.sessionService.getAllSessionsSubject(Number(id_textbook), Number(id_subject));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllSessions = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_textbook = request.params.id_textbook;
            try {
                const result = yield this.sessionService.getAllSessions(Number(id_textbook));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createSession = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_subject = request.params.id_subject;
            const id_textbook = request.params.id_textbook;
            const SessionData = request.body;
            try {
                const created = yield this.sessionService.createSession(Number(id_textbook), Number(id_subject), SessionData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getSessionById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_textbook = request.params.id_textbook;
            const id_session = request.params.id_session;
            try {
                const session = yield this.sessionService.getSessionById(Number(id_textbook), Number(id_session));
                response.status(200).send(session);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateSession = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_textbook = request.params.id_textbook;
            const id_session = request.params.id_session;
            const SessionData = request.body;
            try {
                const result = yield this.sessionService.updateSession(Number(id_textbook), Number(id_session), SessionData);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteSession = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_textbook = request.params.id_textbook;
            const id_session = request.params.id_session;
            try {
                const result = yield this.sessionService.deleteSession(Number(id_textbook), Number(id_session));
                response.status(200).send(`Session with id ${id_session} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.sessionService = new session_service_1.SessionService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(`${this.path}/subjects/:id_subject/sessions`, this.getAllSessionsSubject)
            .get(`${this.path}/subjects/:id_subject/sessions`, this.getAllSessionsSubject)
            .post(`${this.path}/subjects/:id_subject/sessions`, (0, validationMiddleware_1.default)(session_dto_1.default), this.createSession);
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(`${this.path}/sessions/:id_session`, this.getSessionById)
            .put(`${this.path}/sessions/:id_session`, (0, validationMiddleware_1.default)(session_dto_1.default), this.updateSession)
            .delete(`${this.path}/sessions/:id_session`, this.deleteSession);
    }
}
exports.SessionController = SessionController;
