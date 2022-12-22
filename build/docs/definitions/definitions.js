"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Login_definitions_1 = __importDefault(require("./Auth/Login.definitions"));
const Class_definitions_1 = __importDefault(require("./Classes/Class.definitions"));
const CreateClassDto_definitions_1 = __importDefault(require("./Classes/CreateClassDto.definitions"));
const CreateSessionDto_definitions_1 = __importDefault(require("./Session/CreateSessionDto.definitions"));
const CreateSessionYearDto_definitions_1 = __importDefault(require("./Session/CreateSessionYearDto.definitions"));
const session_definition_1 = __importDefault(require("./Session/session.definition"));
const CreateSubjectDto_definitions_1 = __importDefault(require("./Subject/CreateSubjectDto.definitions"));
const subject_definitions_1 = __importDefault(require("./Subject/subject.definitions"));
const CreateTaskDto_definitions_1 = __importDefault(require("./Task/CreateTaskDto.definitions"));
const task_definitions_1 = __importDefault(require("./Task/task.definitions"));
const CreateTeacherDto_definitions_1 = __importDefault(require("./Teacher/CreateTeacherDto.definitions"));
const teacher_defintions_1 = __importDefault(require("./Teacher/teacher.defintions"));
const CreateTextbookDto_definitions_1 = __importDefault(require("./Textbook/CreateTextbookDto.definitions"));
const textbook_definitions_1 = __importDefault(require("./Textbook/textbook.definitions"));
const CreateYearDto_definitions_1 = __importDefault(require("./Year_Academic/CreateYearDto.definitions"));
const year_defintions_1 = __importDefault(require("./Year_Academic/year.defintions"));
const definitions = {
    "Class": Class_definitions_1.default,
    "CreateClassDto": CreateClassDto_definitions_1.default,
    "Session": session_definition_1.default,
    "CreateSessionDto": CreateSessionDto_definitions_1.default,
    "CreateSessionYearDto": CreateSessionYearDto_definitions_1.default,
    "Task": task_definitions_1.default,
    "CreateTaskDto": CreateTaskDto_definitions_1.default,
    "Year_Academic": year_defintions_1.default,
    "CreateYearAcademicDto": CreateYearDto_definitions_1.default,
    "Subject": subject_definitions_1.default,
    "CreateSubjectDto": CreateSubjectDto_definitions_1.default,
    "Teacher": teacher_defintions_1.default,
    "CreateTeacherDto": CreateTeacherDto_definitions_1.default,
    "Textbook": textbook_definitions_1.default,
    "CreateTextbookDto": CreateTextbookDto_definitions_1.default,
    "LoginDto": Login_definitions_1.default
};
exports.default = definitions;
