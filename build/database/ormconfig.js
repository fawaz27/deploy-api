"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const year_academic_entity_1 = require("../models/year_academic.entity");
const textbook_entity_1 = require("../models/textbook.entity");
const class_entity_1 = require("../models/class.entity");
const teacher_entity_1 = require("../models/teacher.entity");
const subject_entity_1 = require("../models/subject.entity");
const session_entity_1 = require("../models/session.entity");
const task_entity_1 = require("../models/task.entity");
const archive_request_entity_1 = require("../models/archive_request.entity");
const information_entity_1 = require("../models/information.entity");
const program_entity_1 = require("../models/program.entity");
const establishment_entity_1 = require("../models/establishment.entity");
const teacher_ets_entity_1 = require("../models/teacher_ets.entity");
const subject_ets_entity_1 = require("../models/subject_ets.entity");
const schedule_entity_1 = require("../models/schedule.entity");
const config = {
    type: 'postgres',
    // host: process.env.HOST,
    // port: Number(process.env.PORT_DB),
    // username: process.env.USERNAME_DB,
    // password: process.env.PASSWORD_DB,
    // database: process.env.NAME_DB,
    url: process.env.URL_DB,
    entities: [
        teacher_entity_1.Teacher,
        subject_entity_1.Subject,
        session_entity_1.Session,
        class_entity_1.Class,
        textbook_entity_1.Textbook,
        task_entity_1.Task,
        year_academic_entity_1.Year_Academic,
        schedule_entity_1.Schedule,
        archive_request_entity_1.Archive_request,
        information_entity_1.Information,
        program_entity_1.Program,
        establishment_entity_1.Establishment,
        teacher_ets_entity_1.Teacher_Ets,
        subject_ets_entity_1.Subject_Ets
    ],
    synchronize: true,
    logging: false
};
exports.default = config;
