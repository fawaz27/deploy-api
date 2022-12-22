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
exports.TaskController = void 0;
const express_1 = __importDefault(require("express"));
const task_service_1 = require("../services/task.service");
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middlewares/isAdminMiddleware"));
const task_dto_1 = __importDefault(require("../dto/task.dto"));
class TaskController {
    constructor() {
        this.path = '/sessions/:id_session/tasks';
        this.router = express_1.default.Router();
        this.getAllTasks = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_session = request.params.id_session;
            try {
                const result = yield this.taskService.getAllTasksInSession(Number(id_session));
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.createTask = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_session = request.params.id_session;
            const TextbookData = request.body;
            try {
                const created = yield this.taskService.createTask(Number(id_session), TextbookData);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.getTaskById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_session = request.params.id_session;
            const id_task = request.params.id_task;
            try {
                const task = yield this.taskService.getTaskById(Number(id_session), Number(id_task));
                response.status(200).send(task);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateTask = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_session = request.params.id_session;
            const id_task = request.params.id_task;
            const TextbookData = request.body;
            try {
                const result = yield this.taskService.updateTask(Number(id_session), Number(id_task), TextbookData);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteTask = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id_session = request.params.id_session;
            const id_task = request.params.id_task;
            try {
                const result = yield this.taskService.deleteTask(Number(id_session), Number(id_task));
                response.status(200).send(`Task with id ${id_task} has been deleted`);
            }
            catch (error) {
                next(error);
            }
        });
        this.taskService = new task_service_1.TaskService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(this.path, this.getAllTasks)
            .post(this.path, (0, validationMiddleware_1.default)(task_dto_1.default), this.createTask);
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .all(`${this.path}`, isAdminMiddleware_1.default)
            .get(`${this.path}/:id_task`, this.getTaskById)
            .put(`${this.path}/:id_task`, (0, validationMiddleware_1.default)(task_dto_1.default), this.updateTask)
            .delete(`${this.path}/:id_task`, this.deleteTask);
    }
}
exports.TaskController = TaskController;
