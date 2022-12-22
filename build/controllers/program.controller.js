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
exports.ProgramController = void 0;
const express_1 = __importDefault(require("express"));
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminOrManagerMiddleware_1 = __importDefault(require("../middlewares/isAdminOrManagerMiddleware"));
const program_service_1 = require("../services/program.service");
const program_dto_1 = __importDefault(require("../dto/program.dto"));
class ProgramController {
    constructor() {
        this.path = '/establishments/:id_ets/programs';
        this.router = express_1.default.Router();
        this.getAllPrograms = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id_teacher = request.query.teacherId;
                const id_ets = request.params.id_ets;
                const result = yield this.programService.getAllPrograms(Number(id_ets), Number(id_teacher));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createProgram = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const ProgramData = request.body;
            const id_ets = request.params.id_ets;
            const id_teacher = request.user.id;
            try {
                const created = yield this.programService.createProgram(Number(id_ets), Number(id_teacher), ProgramData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getProgramById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const request = yield this.programService.getProgramById(Number(id_ets), Number(id));
                response.status(200).send(request);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateProgram = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            const ProgramData = request.body;
            try {
                const result = yield this.programService.updateProgram(Number(id_ets), Number(id), ProgramData);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteProgram = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const result = yield this.programService.deleteProgram(Number(id_ets), Number(id));
                response.status(200).send(`Program with id ${id} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.programService = new program_service_1.ProgramService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminOrManagerMiddleware_1.default)
            .get(this.path, this.getAllPrograms)
            .post(this.path, (0, validationMiddleware_1.default)(program_dto_1.default), this.createProgram);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminOrManagerMiddleware_1.default)
            .get(`${this.path}/:id`, this.getProgramById)
            .put(`${this.path}/:id`, (0, validationMiddleware_1.default)(program_dto_1.default), this.updateProgram)
            .delete(`${this.path}/:id`, this.deleteProgram);
    }
}
exports.ProgramController = ProgramController;
