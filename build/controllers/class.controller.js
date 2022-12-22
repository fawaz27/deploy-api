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
exports.ClassController = void 0;
const express_1 = __importDefault(require("express"));
const class_service_1 = require("../services/class.service");
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const class_dto_1 = __importDefault(require("../dto/class.dto"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middlewares/isAdminMiddleware"));
class ClassController {
    constructor() {
        this.path = '/establishments/:id_ets/classes';
        this.router = express_1.default.Router();
        this.getAllClasses = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.classService.getAllClasses();
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllClassesInEstablishment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id_ets = request.params.id_ets;
                const result = yield this.classService.getAllClassesInEstablishment(Number(id_ets));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createClass = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const ClassData = request.body;
            const id_ets = request.params.id_ets;
            try {
                const created = yield this.classService.createClass(Number(id_ets), ClassData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getClassById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const classe = yield this.classService.getClasseById(Number(id_ets), Number(id));
                response.status(200).send(classe);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateClass = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            const ClassData = request.body;
            try {
                const result = yield this.classService.updateClasse(Number(id_ets), ClassData, Number(id));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteClass = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const result = yield this.classService.deleteClasse(Number(id_ets), Number(id));
                response.status(200).send(`Class with id ${id} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.classService = new class_service_1.ClassService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get('/classes', this.getAllClasses)
            .get(this.path, this.getAllClassesInEstablishment)
            .post(this.path, (0, validationMiddleware_1.default)(class_dto_1.default), this.createClass);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(`${this.path}/:id`, this.getClassById)
            .put(`${this.path}/:id`, (0, validationMiddleware_1.default)(class_dto_1.default), this.updateClass)
            .delete(`${this.path}/:id`, this.deleteClass);
    }
}
exports.ClassController = ClassController;
