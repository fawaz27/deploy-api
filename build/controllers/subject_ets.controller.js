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
exports.SubjectsEtsController = void 0;
const express_1 = __importDefault(require("express"));
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminOrManagerMiddleware_1 = __importDefault(require("../middlewares/isAdminOrManagerMiddleware"));
const subject_ets_service_1 = require("../services/subject_ets.service");
const subject_ets_dto_1 = __importDefault(require("../dto/subject_ets.dto"));
class SubjectsEtsController {
    constructor() {
        this.path = '/establishments/:id_ets/subjects';
        this.router = express_1.default.Router();
        this.getAllSubjectsEstablishment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id_ets = request.params.id_ets;
                const result = yield this.subjectEtsService.getAllSubjectsEstablishment(Number(id_ets));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createSubjectEstablishment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const SubjectData = request.body;
            const id_ets = request.params.id_ets;
            try {
                const created = yield this.subjectEtsService.createSubjectEstablishment(Number(id_ets), SubjectData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getSubjectById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const request = yield this.subjectEtsService.getSubjectById(Number(id_ets), Number(id));
                response.status(200).send(request);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateSubject = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            const SubjectData = request.body;
            try {
                const result = yield this.subjectEtsService.updateSubject(Number(id_ets), Number(id), SubjectData);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteSubject = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const result = yield this.subjectEtsService.deleteSubject(Number(id_ets), Number(id));
                response.status(200).send(`Subject with id ${id} has been deleted in Esatblishment with ${id_ets}`);
            }
            catch (error) {
                next(error);
            }
        });
        this.subjectEtsService = new subject_ets_service_1.SubjectsEtsService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminOrManagerMiddleware_1.default)
            .get(this.path, this.getAllSubjectsEstablishment)
            .post(this.path, (0, validationMiddleware_1.default)(subject_ets_dto_1.default), this.createSubjectEstablishment);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminOrManagerMiddleware_1.default)
            .get(`${this.path}/:id`, this.getSubjectById)
            .put(`${this.path}/:id`, (0, validationMiddleware_1.default)(subject_ets_dto_1.default), this.updateSubject)
            .delete(`${this.path}/:id`, this.deleteSubject);
    }
}
exports.SubjectsEtsController = SubjectsEtsController;
