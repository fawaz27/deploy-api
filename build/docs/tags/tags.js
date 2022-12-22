"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_tags_1 = __importDefault(require("./Auth/auth.tags"));
const classes_tags_1 = __importDefault(require("./Classes/classes.tags"));
const sessions_tags_1 = __importDefault(require("./Sessions/sessions.tags"));
const subjects_tags_1 = __importDefault(require("./Subjects/subjects.tags"));
const tasks_tags_1 = __importDefault(require("./Tasks/tasks.tags"));
const teachers_tags_1 = __importDefault(require("./Teachers/teachers.tags"));
const textbooks_tags_1 = __importDefault(require("./Textbooks/textbooks.tags"));
const working_tags_1 = __importDefault(require("./Working/working.tags"));
const year_tags_1 = __importDefault(require("./Year_Academic/year.tags"));
const tags = [
    auth_tags_1.default,
    classes_tags_1.default,
    year_tags_1.default,
    textbooks_tags_1.default,
    subjects_tags_1.default,
    teachers_tags_1.default,
    sessions_tags_1.default,
    tasks_tags_1.default,
    working_tags_1.default
];
exports.default = tags;
