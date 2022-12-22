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
exports.ArchiveRequestController = void 0;
const express_1 = __importDefault(require("express"));
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const archive_request_service_1 = require("../services/archive_request.service");
const archive_request_dto_1 = __importDefault(require("../dto/archive_request.dto"));
const isAdminOrManagerMiddleware_1 = __importDefault(require("../middlewares/isAdminOrManagerMiddleware"));
class ArchiveRequestController {
    constructor() {
        this.path = '/establishments/:id_ets/archives_requests';
        this.router = express_1.default.Router();
        this.getAllRequests = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id_ets = request.params.id_ets;
                const result = yield this.archiveRequestService.getAllRequests(Number(id_ets));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createRequest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const ArchiveRequestData = request.body;
            const id_ets = request.params.id_ets;
            const id_teacher = request.user.id;
            try {
                const created = yield this.archiveRequestService.createRequest(Number(id_ets), Number(id_teacher), ArchiveRequestData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getRequestById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const request = yield this.archiveRequestService.getRequestById(Number(id_ets), Number(id));
                response.status(200).send(request);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateRequest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            const ArchiveRequestData = request.body;
            try {
                const result = yield this.archiveRequestService.updateRequest(Number(id_ets), Number(id), ArchiveRequestData);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteRequest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_ets = request.params.id_ets;
            const id = request.params.id;
            try {
                const result = yield this.archiveRequestService.deleteRequest(Number(id_ets), Number(id));
                response.status(200).send(`Archive Request with id ${id} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.archiveRequestService = new archive_request_service_1.ArchiveRequestService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminOrManagerMiddleware_1.default)
            .get(this.path, this.getAllRequests)
            .post(this.path, (0, validationMiddleware_1.default)(archive_request_dto_1.default), this.createRequest);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminOrManagerMiddleware_1.default)
            .get(`${this.path}/:id`, this.getRequestById)
            .put(`${this.path}/:id`, (0, validationMiddleware_1.default)(archive_request_dto_1.default), this.updateRequest)
            .delete(`${this.path}/:id`, this.deleteRequest);
    }
}
exports.ArchiveRequestController = ArchiveRequestController;
