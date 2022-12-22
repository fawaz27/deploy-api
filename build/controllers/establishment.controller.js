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
exports.EstablishmentController = void 0;
const express_1 = __importDefault(require("express"));
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middlewares/isAdminMiddleware"));
const etablishment_service_1 = require("../services/etablishment.service");
const establishment_dto_1 = __importDefault(require("../dto/establishment.dto"));
const manager_dto_1 = __importDefault(require("../dto/manager.dto"));
class EstablishmentController {
    constructor() {
        this.path = '/establishments';
        this.router = express_1.default.Router();
        this.getAllEstablishments = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.etsService.getAllEtablishment();
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createEstablishment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const EstablishmentData = request.body;
            try {
                const created = yield this.etsService.createEtablishment(EstablishmentData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getEstablishmentById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const classe = yield this.etsService.getEtablishmentById(Number(id));
                response.status(200).send(classe);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateEstablishment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const EstablishmentData = request.body;
            try {
                const result = yield this.etsService.updateEtablishment(Number(id), EstablishmentData);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteEstablishment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const result = yield this.etsService.deleteEtablishment(Number(id));
                response.status(200).send(`Establishment with id ${id} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.addManagerToEstablishment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const ManagerData = request.body;
            try {
                const created = yield this.etsService.addManagerToEstablishment(Number(id), ManagerData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteManagerEstablishment = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const RoleManagerData = request.body;
            try {
                const result = yield this.etsService.deleteManagerToEstablishment(Number(id));
                response.status(200).send(`Manager ${RoleManagerData.roleManager} of Establishment with id ${id} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.etsService = new etablishment_service_1.EtablishmentService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(this.path, this.getAllEstablishments)
            .post(this.path, (0, validationMiddleware_1.default)(establishment_dto_1.default), this.createEstablishment);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(`${this.path}/:id`, this.getEstablishmentById)
            .put(`${this.path}/:id`, (0, validationMiddleware_1.default)(establishment_dto_1.default), this.updateEstablishment)
            .delete(`${this.path}/:id`, this.deleteEstablishment)
            .post(`${this.path}/:id/manager`, (0, validationMiddleware_1.default)(manager_dto_1.default), this.addManagerToEstablishment)
            .delete(`${this.path}/:id/manager`, this.deleteManagerEstablishment);
    }
}
exports.EstablishmentController = EstablishmentController;
