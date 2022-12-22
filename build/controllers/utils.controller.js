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
exports.UtilsController = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const utils_service_1 = require("../services/utils.service");
class UtilsController {
    constructor() {
        this.path = '/utils';
        this.router = express_1.default.Router();
        this.getInfosTeacher = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id_teacher = request.query.teacherId;
                const year_academic = request.query.yearAcademic;
                const id_ets = request.query.id_ets;
                const result = yield this.utilsService.getUtilsInfosTeacher(Number(id_teacher), Number(id_ets), String(year_academic));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.getInfosManager = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id_teacher = request.query.teacherId;
                const id_ets = request.query.id_ets;
                const result = yield this.utilsService.getUtilsInfosManager(Number(id_teacher), Number(id_ets));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.utilsService = new utils_service_1.UtilsService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}*`, authMiddleware_1.default)
            .get(`${this.path}/infosTeacher`, this.getInfosTeacher)
            .get(`${this.path}/infosManager`, this.getInfosManager);
    }
}
exports.UtilsController = UtilsController;
