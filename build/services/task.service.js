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
exports.TaskService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const session_entity_1 = require("../models/session.entity");
const task_entity_1 = require("../models/task.entity");
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const NoTaskFoundInSessionException_1 = __importDefault(require("../exceptions/task/NoTaskFoundInSessionException"));
const SessionWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/session/SessionWithThatIDNotExistsException"));
const TaskWithThatIDNotExistsInSessionException_1 = __importDefault(require("../exceptions/task/TaskWithThatIDNotExistsInSessionException"));
class TaskService {
    constructor() {
        this.sessionRepository = AppDataSource_1.AppDataSource.getRepository(session_entity_1.Session);
        this.taskRepository = AppDataSource_1.AppDataSource.getRepository(task_entity_1.Task);
    }
    getAllTasksInSession(id_session) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.sessionRepository
                .createQueryBuilder("session")
                .leftJoinAndSelect("session.textbook", "textbook")
                .where("session.id = :id_session", { id_session: id_session })
                .getOne();
            if (session) {
                const tasks = yield this.taskRepository
                    .createQueryBuilder("task")
                    .leftJoinAndSelect("task.session", "session")
                    .where("session.id = :id_session", { id_session: session.id })
                    .getMany();
                if (tasks && tasks.length != 0) {
                    return tasks;
                }
                else {
                    throw new NoTaskFoundInSessionException_1.default(session.id);
                }
            }
            else {
                throw new SessionWithThatIDNotExistsException_1.default(id_session);
            }
        });
    }
    createTask(id_session, task) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.sessionRepository
                .createQueryBuilder("session")
                .leftJoinAndSelect("session.textbook", "textbook")
                .where("session.id = :id_session", { id_session: id_session })
                .getOne();
            if (session) {
                const newTask = new task_entity_1.Task();
                newTask.name = task.name;
                newTask.title = task.title;
                newTask.type = task.type;
                newTask.createdAt = task.createdAt;
                newTask.date_given = task.date_given;
                newTask.date_submission = task.date_submission;
                newTask.statement = task.statement;
                newTask.document_annex = task.document_annex;
                newTask.session = session;
                const created = yield this.taskRepository.save(newTask);
                if (created) {
                    return created;
                }
                else {
                    throw new InternalErrorException_1.default();
                }
            }
            else {
                throw new SessionWithThatIDNotExistsException_1.default(id_session);
            }
        });
    }
    getTaskById(id_session, id_task) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.sessionRepository
                .createQueryBuilder("session")
                .leftJoinAndSelect("session.textbook", "textbook")
                .where("session.id = :id_session", { id_session: id_session })
                .getOne();
            if (session) {
                const task = yield this.taskRepository
                    .createQueryBuilder("task")
                    .leftJoinAndSelect("task.session", "session")
                    .andWhere("task.id = :id_task", { id_task: id_task })
                    .where("session.id = :id_session", { id_session: session.id })
                    .getOne();
                if (task) {
                    return task;
                }
                else {
                    throw new TaskWithThatIDNotExistsInSessionException_1.default(id_task, id_session);
                }
            }
            else {
                throw new SessionWithThatIDNotExistsException_1.default(id_session);
            }
        });
    }
    updateTask(id_session, id_task, task) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.sessionRepository
                .createQueryBuilder("session")
                .leftJoinAndSelect("session.textbook", "textbook")
                .where("session.id = :id_session", { id_session: id_session })
                .getOne();
            if (session) {
                const taskUpdate = yield this.taskRepository
                    .createQueryBuilder("task")
                    .leftJoinAndSelect("task.session", "session")
                    .andWhere("task.id = :id_task", { id_task: id_task })
                    .where("session.id = :id_session", { id_session: session.id })
                    .getOne();
                if (taskUpdate) {
                    taskUpdate.name = task.name;
                    taskUpdate.title = task.title;
                    taskUpdate.type = task.type;
                    taskUpdate.createdAt = task.createdAt;
                    taskUpdate.date_given = task.date_given;
                    taskUpdate.date_submission = task.date_submission;
                    taskUpdate.statement = task.statement;
                    taskUpdate.document_annex = task.document_annex;
                    const result = yield this.taskRepository.save(taskUpdate);
                    if (result) {
                        return result;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
                else {
                    throw new TaskWithThatIDNotExistsInSessionException_1.default(id_task, id_session);
                }
            }
            else {
                throw new SessionWithThatIDNotExistsException_1.default(id_session);
            }
        });
    }
    deleteTask(id_session, id_task) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.sessionRepository
                .createQueryBuilder("session")
                .leftJoinAndSelect("session.textbook", "textbook")
                .where("session.id = :id_session", { id_session: id_session })
                .getOne();
            if (session) {
                const task = yield this.taskRepository
                    .createQueryBuilder("task")
                    .leftJoinAndSelect("task.session", "session")
                    .andWhere("task.id = :id_task", { id_task: id_task })
                    .where("session.id = :id_session", { id_session: session.id })
                    .getOne();
                if (task) {
                    const result = yield this.taskRepository.delete(id_task);
                    return id_task;
                }
                else {
                    throw new TaskWithThatIDNotExistsInSessionException_1.default(id_task, id_session);
                }
            }
            else {
                throw new SessionWithThatIDNotExistsException_1.default(id_session);
            }
        });
    }
}
exports.TaskService = TaskService;
