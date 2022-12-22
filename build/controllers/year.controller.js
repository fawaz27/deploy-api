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
exports.YearController = void 0;
const express_1 = __importDefault(require("express"));
const year_service_1 = require("../services/year.service");
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middlewares/isAdminMiddleware"));
const year_academic_dto_1 = __importDefault(require("../dto/year_academic.dto"));
class YearController {
    constructor() {
        this.path = '/year_academic';
        this.router = express_1.default.Router();
        this.getAllYears = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.yearService.getAllYears();
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createYear = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const YearData = request.body;
            try {
                const created = yield this.yearService.createYear(YearData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getYearById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_year = request.params.id_year;
            try {
                const year = yield this.yearService.getYearById(Number(id_year));
                response.status(200).send(year);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateYear = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_year = request.params.id_year;
            const YearData = request.body;
            try {
                const result = yield this.yearService.updateYear(YearData, Number(id_year));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteYear = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_year = request.params.id_year;
            try {
                const result = yield this.yearService.deleteYear(Number(id_year));
                response.status(200).send(`Year with id ${id_year} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.yearService = new year_service_1.YearService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(this.path, this.getAllYears)
            .post(this.path, (0, validationMiddleware_1.default)(year_academic_dto_1.default), this.createYear);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(`${this.path}/:id_year`, this.getYearById)
            .put(`${this.path}/:id_year`, (0, validationMiddleware_1.default)(year_academic_dto_1.default), this.updateYear)
            .delete(`${this.path}/:id_year`, this.deleteYear);
    }
}
exports.YearController = YearController;
