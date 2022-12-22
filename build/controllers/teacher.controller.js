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
exports.TeacherController = void 0;
const express_1 = __importDefault(require("express"));
const teacher_service_1 = require("../services/teacher.service");
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const teacher_dto_1 = __importDefault(require("../dto/teacher.dto"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const sessionyear_dto_1 = __importDefault(require("../dto/sessionyear.dto"));
const isAdminOrManagerMiddleware_1 = __importDefault(require("../middlewares/isAdminOrManagerMiddleware"));
const onlyAdminCanCreateAnotherAdminMiddleware_1 = __importDefault(require("../middlewares/onlyAdminCanCreateAnotherAdminMiddleware"));
const mail_dto_1 = __importDefault(require("../dto/mail.dto"));
class TeacherController {
    constructor() {
        this.path = '/establishments/:id_ets/teachers';
        this.router = express_1.default.Router();
        this.getAllTeachers = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id_ets = request.params.id_ets;
                const result = yield this.teacherService.getAllTeachersInEstablishment(Number(id_ets));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createTeacher = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const TeacherData = request.body;
            try {
                const id_ets = request.params.id_ets;
                const created = yield this.teacherService.createTeacher(Number(id_ets), TeacherData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.addTeacherExist = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const TeacherData = request.body;
            try {
                const id_ets = request.params.id_ets;
                const created = yield this.teacherService.addExistTeacher(Number(id_ets), TeacherData.email);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getTeacherById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const user = yield this.teacherService.GetTeacherById(Number(id_ets), Number(id));
                response.status(200).send(user);
            }
            catch (error) {
                next(error);
            }
        });
        this.GetTeacherByEmail = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const email = request.params.email;
            try {
                const user = yield this.teacherService.getTeacherByEmail(Number(id_ets), email);
                response.status(200).send(user);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateTeacher = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            const TeacherData = request.body;
            try {
                const result = yield this.teacherService.UpdateTeacher(Number(id_ets), TeacherData, Number(id));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.dropTeacher = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const result = yield this.teacherService.dropTeacherInEstablishment(Number(id_ets), Number(id));
                response.status(200).send(`Teachers with id ${id} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.getSessionSubjects = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.user.id;
            const id_subject = request.params.id_subject;
            const yearData = request.query.yearAcademic;
            try {
                const result = yield this.teacherService.getSessionsTeacher(Number(id), Number(id_subject), yearData);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.addSession = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const Session = request.body;
            const id = request.user.id;
            const id_subject = request.params.id_subject;
            const year_academic = Session.yearAcademic;
            try {
                const created = yield this.teacherService.addSession(Number(id), Number(id_subject), year_academic, Session);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateSession = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const Session = request.body;
            const id = request.user.id;
            const id_session = request.params.id_session;
            const id_subject = request.params.id_subject;
            const year_academic = Session.yearAcademic;
            try {
                const result = yield this.teacherService.updateSession(Number(id), Number(id_subject), year_academic, Number(id_session), Session);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteSession = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_session = request.params.id_session;
            const id = request.user.id;
            const id_subject = request.params.id_subject;
            const year_academic = request.query.yearAcademic;
            try {
                const result = yield this.teacherService.deleteSession(Number(id), Number(id_subject), year_academic, Number(id_session));
                response.status(200).send(`Sessions with id ${id_session} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.teacherService = new teacher_service_1.TeacherService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminOrManagerMiddleware_1.default)
            .get(this.path, this.getAllTeachers)
            .post(this.path, (0, validationMiddleware_1.default)(teacher_dto_1.default), onlyAdminCanCreateAnotherAdminMiddleware_1.default, this.createTeacher)
            .post(this.path + 'Exists', authMiddleware_1.default, isAdminOrManagerMiddleware_1.default, (0, validationMiddleware_1.default)(mail_dto_1.default), this.addTeacherExist);
        this.router
            .all(`${this.path}/:id`, authMiddleware_1.default)
            .all(`${this.path}/:id`, isAdminOrManagerMiddleware_1.default)
            .get(`${this.path}/:id`, this.getTeacherById)
            .put(`${this.path}/:id`, (0, validationMiddleware_1.default)(teacher_dto_1.default), onlyAdminCanCreateAnotherAdminMiddleware_1.default, this.updateTeacher)
            .delete(`${this.path}/:id`, this.dropTeacher);
        this.router
            .all(`/mysubjects*`, authMiddleware_1.default)
            .get(`/mysubjects/:id_subject/sessions`, this.getSessionSubjects)
            .post(`/mysubjects/:id_subject/sessions`, (0, validationMiddleware_1.default)(sessionyear_dto_1.default), this.addSession)
            .put(`/mysubjects/:id_subject/sessions/:id_session`, (0, validationMiddleware_1.default)(sessionyear_dto_1.default), this.updateSession)
            .delete(`/mysubjects/:id_subject/sessions/:id_session`, this.deleteSession);
    }
}
exports.TeacherController = TeacherController;
