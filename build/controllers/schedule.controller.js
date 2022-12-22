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
exports.ScheduleController = void 0;
const express_1 = __importDefault(require("express"));
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middlewares/isAdminMiddleware"));
const schedule_service_1 = require("../services/schedule.service");
const schedule_dto_1 = __importDefault(require("../dto/schedule.dto"));
class ScheduleController {
    constructor() {
        this.path = '/classes/:id_class/schedules';
        this.router = express_1.default.Router();
        this.getAllSchedules = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            try {
                const result = yield this.ScheduleService.getAllSchedules(Number(id_class));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createSchedule = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const ScheduleData = request.body;
            try {
                const created = yield this.ScheduleService.createSchedule(Number(id_class), ScheduleData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getScheduleById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const id_schedule = request.params.id_schedule;
            try {
                const schedule = yield this.ScheduleService.getScheduleById(Number(id_class), Number(id_schedule));
                response.status(200).send(schedule);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateSchedule = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const id_schedule = request.params.id_schedule;
            const scheduleData = request.body;
            try {
                const result = yield this.ScheduleService.updateSchedule(scheduleData, Number(id_class), Number(id_schedule));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteSchedule = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const id_schedule = request.params.id_schedule;
            try {
                const result = yield this.ScheduleService.deleteSchedule(Number(id_class), Number(id_schedule));
                response.status(200).send(`Schedule with id ${result} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.getScheduletTeacher = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_class = request.params.id_class;
            const id_teacher = request.query.teacherId;
            const yearAcademic = request.query.yearAcademic;
            try {
                const schedule = yield this.ScheduleService.getScheduleTeacher(Number(id_class), Number(id_teacher), String(yearAcademic));
                response.status(200).send(schedule);
            }
            catch (error) {
                next(error);
            }
        });
        this.ScheduleService = new schedule_service_1.ScheduleService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .put(`${this.path}/:id_schedule`, (0, validationMiddleware_1.default)(schedule_dto_1.default), this.updateSchedule)
            .post(this.path, (0, validationMiddleware_1.default)(schedule_dto_1.default), this.createSchedule)
            .delete(`${this.path}/:id_schedule`, this.deleteSchedule);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .get(this.path, this.getAllSchedules)
            .get(`${this.path}Teacher`, this.getScheduletTeacher)
            .get(`${this.path}/:id_schedule`, this.getScheduleById);
    }
}
exports.ScheduleController = ScheduleController;
