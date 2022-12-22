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
exports.SubjectController = void 0;
const express_1 = __importDefault(require("express"));
const subject_service_1 = require("../services/subject.service");
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middlewares/isAdminMiddleware"));
const subject_dto_1 = __importDefault(require("../dto/subject.dto"));
class SubjectController {
    constructor() {
        this.path = '/classes/:id_class/subjects';
        this.router = express_1.default.Router();
        this.getAllSubjects = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            try {
                const result = yield this.subjectService.getAllSubjects(Number(id_class));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createSubject = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const id_subjectEts = request.query.subjectId;
            try {
                const created = yield this.subjectService.createSubjectInClass(Number(id_class), Number(id_subjectEts));
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getSubjectById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const id_subject = request.params.id_subject;
            try {
                const subject = yield this.subjectService.getSubjectById(Number(id_class), Number(id_subject));
                response.status(200).send(subject);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateSubject = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const id_subject = request.params.id_subject;
            const SubjectData = request.body;
            try {
                const result = yield this.subjectService.updateSubject(SubjectData, Number(id_class), Number(id_subject));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteSubject = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const id_subject = request.params.id_subject;
            try {
                const result = yield this.subjectService.deleteSubject(Number(id_class), Number(id_subject));
                response.status(200).send(`Subject with id ${id_subject} has been deleted in Class ${id_class} `);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllSubjectsTeacher = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id_teacher = request.query.teacherId;
                const id_ets = request.params.id_ets;
                const result = yield this.subjectService.getSubjectsTeacher(Number(id_ets), Number(id_teacher));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.subjectService = new subject_service_1.SubjectService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(this.path, this.getAllSubjects)
            .get('/establishments/:id_ets/subjectsTeacher', this.getAllSubjectsTeacher)
            .post(this.path, this.createSubject);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(`${this.path}/:id_subject`, this.getSubjectById)
            .put(`${this.path}/:id_subject`, (0, validationMiddleware_1.default)(subject_dto_1.default), this.updateSubject)
            .delete(`${this.path}/:id_subject`, this.deleteSubject);
    }
}
exports.SubjectController = SubjectController;
