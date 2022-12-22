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
require("dotenv/config");
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const AppDataSource_1 = require("./database/AppDataSource");
const authentification_controller_1 = require("./controllers/authentification.controller");
const teacher_controller_1 = require("./controllers/teacher.controller");
const class_controller_1 = require("./controllers/class.controller");
const subject_controller_1 = require("./controllers/subject.controller");
const textbook_controller_1 = require("./controllers/textbook.controller");
const year_controller_1 = require("./controllers/year.controller");
const session_controller_1 = require("./controllers/session.controller");
const task_controller_1 = require("./controllers/task.controller");
const establishment_controller_1 = require("./controllers/establishment.controller");
const archive_request_controller_1 = require("./controllers/archive_request.controller");
const program_controller_1 = require("./controllers/program.controller");
const information_controller_1 = require("./controllers/information.controller");
const subscription_controller_1 = require("./controllers/subscription.controller");
const utils_controller_1 = require("./controllers/utils.controller");
const subject_ets_controller_1 = require("./controllers/subject_ets.controller");
const schedule_controller_1 = require("./controllers/schedule.controller");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield AppDataSource_1.AppDataSource.initialize();
    }
    catch (error) {
        console.log('Error while connecting to the database', error);
        return error;
    }
    const app = new app_1.default([
        new authentification_controller_1.AuthentificationController(),
        new teacher_controller_1.TeacherController(),
        new class_controller_1.ClassController(),
        new subject_controller_1.SubjectController(),
        new textbook_controller_1.TextbookController(),
        new year_controller_1.YearController(),
        new session_controller_1.SessionController(),
        new task_controller_1.TaskController(),
        new schedule_controller_1.ScheduleController(),
        new establishment_controller_1.EstablishmentController(),
        new archive_request_controller_1.ArchiveRequestController(),
        new program_controller_1.ProgramController(),
        new information_controller_1.InformationController(),
        new subscription_controller_1.SubscriptionController(),
        new utils_controller_1.UtilsController(),
        new subject_ets_controller_1.SubjectsEtsController()
    ]);
    app.listen();
    app.get();
}))();
