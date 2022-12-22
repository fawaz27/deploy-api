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
exports.InformationController = void 0;
const express_1 = __importDefault(require("express"));
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminOrManagerMiddleware_1 = __importDefault(require("../middlewares/isAdminOrManagerMiddleware"));
const information_service_1 = require("../services/information.service");
const information_dto_1 = __importDefault(require("../dto/information.dto"));
class InformationController {
    constructor() {
        this.path = '/establishments/:id_ets/informations';
        this.router = express_1.default.Router();
        this.getAllInformations = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id_teacher = request.query.teacherId;
                const id_ets = request.params.id_ets;
                const result = yield this.informationService.getAllInformations(Number(id_ets), Number(id_teacher));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createInformation = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const InformationData = request.body;
            const id_ets = request.params.id_ets;
            const id_teacher = request.user.id;
            try {
                const created = yield this.informationService.createInformation(Number(id_ets), Number(id_teacher), InformationData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getInformationById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const request = yield this.informationService.getInformationById(Number(id_ets), Number(id));
                response.status(200).send(request);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateInformation = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            const InformationData = request.body;
            try {
                const result = yield this.informationService.updateInformation(Number(id_ets), Number(id), InformationData);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteInformation = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const result = yield this.informationService.deleteInformation(Number(id_ets), Number(id));
                response.status(200).send(`Information with id ${id} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.informationService = new information_service_1.InformationService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminOrManagerMiddleware_1.default)
            .get(this.path, this.getAllInformations)
            .post(this.path, (0, validationMiddleware_1.default)(information_dto_1.default), this.createInformation);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminOrManagerMiddleware_1.default)
            .get(`${this.path}/:id`, this.getInformationById)
            .put(`${this.path}/:id`, (0, validationMiddleware_1.default)(information_dto_1.default), this.updateInformation)
            .delete(`${this.path}/:id`, this.deleteInformation);
    }
}
exports.InformationController = InformationController;
