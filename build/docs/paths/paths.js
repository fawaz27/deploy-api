"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./Auth/login"));
const register_1 = __importDefault(require("./Auth/register"));
const delete_class_1 = __importDefault(require("./Classes/delete_class"));
const get_class_1 = __importDefault(require("./Classes/get_class"));
const get_classes_1 = __importDefault(require("./Classes/get_classes"));
const post_class_1 = __importDefault(require("./Classes/post_class"));
const put_class_1 = __importDefault(require("./Classes/put_class"));
const delete_session_1 = __importDefault(require("./Sessions/delete_session"));
const get_session_1 = __importDefault(require("./Sessions/get_session"));
const get_sessions_1 = __importDefault(require("./Sessions/get_sessions"));
const get_sessions_subject_1 = __importDefault(require("./Sessions/get_sessions_subject"));
const post_session_1 = __importDefault(require("./Sessions/post_session"));
const put_session_1 = __importDefault(require("./Sessions/put_session"));
const delete_subject_1 = __importDefault(require("./Subjects/delete_subject"));
const get_subject_1 = __importDefault(require("./Subjects/get_subject"));
const get_subjects_1 = __importDefault(require("./Subjects/get_subjects"));
const post_subject_1 = __importDefault(require("./Subjects/post_subject"));
const put_subject_1 = __importDefault(require("./Subjects/put_subject"));
const delete_task_1 = __importDefault(require("./Tasks/delete_task"));
const get_task_1 = __importDefault(require("./Tasks/get_task"));
const get_tasks_1 = __importDefault(require("./Tasks/get_tasks"));
const post_task_1 = __importDefault(require("./Tasks/post_task"));
const put_task_1 = __importDefault(require("./Tasks/put_task"));
const delete_sessionbyTeacher_1 = __importDefault(require("./Teacher/delete_sessionbyTeacher"));
const delete_teacher_1 = __importDefault(require("./Teacher/delete_teacher"));
const get_teacher_1 = __importDefault(require("./Teacher/get_teacher"));
const get_teachers_1 = __importDefault(require("./Teacher/get_teachers"));
const get_teacher_sessions_1 = __importDefault(require("./Teacher/get_teacher_sessions"));
const get_teacher_subjects_1 = __importDefault(require("./Teacher/get_teacher_subjects"));
const post_sessionbyTeacher_1 = __importDefault(require("./Teacher/post_sessionbyTeacher"));
const post_teacher_1 = __importDefault(require("./Teacher/post_teacher"));
const put_sessionbyTeacher_1 = __importDefault(require("./Teacher/put_sessionbyTeacher"));
const put_teacher_1 = __importDefault(require("./Teacher/put_teacher"));
const delete_textbook_1 = __importDefault(require("./Textbooks/delete_textbook"));
const get_textbook_1 = __importDefault(require("./Textbooks/get_textbook"));
const get_textbooks_1 = __importDefault(require("./Textbooks/get_textbooks"));
const post_textbook_1 = __importDefault(require("./Textbooks/post_textbook"));
const put_textbook_1 = __importDefault(require("./Textbooks/put_textbook"));
const delete_working_1 = __importDefault(require("./Working/delete_working"));
const get_working_1 = __importDefault(require("./Working/get_working"));
const get_workings_1 = __importDefault(require("./Working/get_workings"));
const post_working_1 = __importDefault(require("./Working/post_working"));
const put_working_1 = __importDefault(require("./Working/put_working"));
const delete_year_1 = __importDefault(require("./Year/delete_year"));
const get_year_1 = __importDefault(require("./Year/get_year"));
const get_years_1 = __importDefault(require("./Year/get_years"));
const post_year_1 = __importDefault(require("./Year/post_year"));
const put_year_1 = __importDefault(require("./Year/put_year"));
const paths = {
    "/classes": {
        "get": get_classes_1.default,
        "post": post_class_1.default,
    },
    "/classes/{id}": {
        "parameters": [
            {
                "name": "id",
                "in": "path",
                "required": true,
                "description": "ID of class that we want to find",
                "type": "integer"
            }
        ],
        "get": get_class_1.default,
        "put": put_class_1.default,
        "delete": delete_class_1.default,
    },
    "/auth/login": {
        "post": login_1.default
    },
    "/auth/register": {
        "post": register_1.default
    },
    "/year_academic": {
        "get": get_years_1.default,
        "post": post_year_1.default
    },
    "/year_academic/{id_year}": {
        "parameters": [
            {
                "name": "id_year",
                "in": "path",
                "required": true,
                "description": "ID of year",
                "type": "integer"
            }
        ],
        "get": get_year_1.default,
        "put": put_year_1.default,
        "delete": delete_year_1.default
    },
    "/classes/{id_class}/subjects": {
        "parameters": [
            {
                "name": "id_class",
                "in": "path",
                "required": true,
                "description": "ID of class that we want to find subject",
                "type": "integer"
            }
        ],
        "get": get_subjects_1.default,
        "post": post_subject_1.default
    },
    "/classes/{id_class}/subjects/{id_subject}": {
        "parameters": [
            {
                "name": "id_class",
                "in": "path",
                "required": true,
                "description": "ID of class that we want to find subject",
                "type": "integer"
            },
            {
                "name": "id_subject",
                "in": "path",
                "required": true,
                "description": "ID of subject that we want to find subject",
                "type": "integer"
            }
        ],
        "get": get_subject_1.default,
        "put": put_subject_1.default,
        "delete": delete_subject_1.default
    },
    "/classes/{id_class}/workings": {
        "parameters": [
            {
                "name": "id_class",
                "in": "path",
                "required": true,
                "description": "ID of class that we want to find working time",
                "type": "integer"
            }
        ],
        "get": get_workings_1.default,
        "post": post_working_1.default
    },
    "/classes/{id_class}/workings/{id_working}": {
        "parameters": [
            {
                "name": "id_class",
                "in": "path",
                "required": true,
                "description": "ID of class that we want to find working time",
                "type": "integer"
            },
            {
                "name": "id_working",
                "in": "path",
                "required": true,
                "description": "ID of working time that we want to find working time",
                "type": "integer"
            }
        ],
        "get": get_working_1.default,
        "put": put_working_1.default,
        "delete": delete_working_1.default
    },
    "/classes/{id_class}/textbooks": {
        "parameters": [
            {
                "name": "id_class",
                "in": "path",
                "required": true,
                "description": "ID of class that we want to find textbook",
                "type": "integer"
            }
        ],
        "get": get_textbooks_1.default,
        "post": post_textbook_1.default
    },
    "/classes/{id_class}/textbooks/{id_textbook}": {
        "parameters": [
            {
                "name": "id_class",
                "in": "path",
                "required": true,
                "description": "ID of class that we want to find textbook",
                "type": "integer"
            },
            {
                "name": "id_textbook",
                "in": "path",
                "required": true,
                "description": "ID of textbook that we want to find textbook",
                "type": "integer"
            }
        ],
        "get": get_textbook_1.default,
        "put": put_textbook_1.default,
        "delete": delete_textbook_1.default
    },
    "/textbooks/{id_textbook}/subjects/{id_subject}/sessions": {
        "parameters": [
            {
                "name": "id_textbook",
                "in": "path",
                "required": true,
                "description": "ID of textbook ",
                "type": "integer"
            },
            {
                "name": "id_subject",
                "in": "path",
                "required": true,
                "description": "ID of subject ",
                "type": "integer"
            }
        ],
        "get": get_sessions_subject_1.default,
        "post": post_session_1.default
    },
    "/textbooks/{id_textbook}/sessions": {
        "parameters": [
            {
                "name": "id_textbook",
                "in": "path",
                "required": true,
                "description": "ID of textbook ",
                "type": "integer"
            }
        ],
        "get": get_sessions_1.default
    },
    "/textbooks/{id_textbook}/sessions/{id_session}": {
        "parameters": [
            {
                "name": "id_textbook",
                "in": "path",
                "required": true,
                "description": "ID of textbook ",
                "type": "integer"
            },
            {
                "name": "id_session",
                "in": "path",
                "required": true,
                "description": "ID of session ",
                "type": "integer"
            }
        ],
        "get": get_session_1.default,
        "put": put_session_1.default,
        "delete": delete_session_1.default
    },
    "/sessions/{id_session}/tasks": {
        "parameters": [
            {
                "name": "id_session",
                "in": "path",
                "required": true,
                "description": "ID of session ",
                "type": "integer"
            }
        ],
        "get": get_tasks_1.default,
        "post": post_task_1.default
    },
    "/sessions/{id_session}/tasks/{id_task}": {
        "parameters": [
            {
                "name": "id_session",
                "in": "path",
                "required": true,
                "description": "ID of session ",
                "type": "integer"
            },
            {
                "name": "id_task",
                "in": "path",
                "required": true,
                "description": "ID of task ",
                "type": "integer"
            }
        ],
        "get": get_task_1.default,
        "put": put_task_1.default,
        "delete": delete_task_1.default
    },
    "/teachers": {
        "get": get_teachers_1.default,
        "post": post_teacher_1.default
    },
    "/teachers/{id}": {
        "parameters": [
            {
                "name": "id",
                "in": "path",
                "required": true,
                "description": "ID of teacher that we want ",
                "type": "integer"
            }
        ],
        "get": get_teacher_1.default,
        "put": put_teacher_1.default,
        "delete": delete_teacher_1.default
    },
    "/mysubjects": {
        "get": get_teacher_subjects_1.default
    },
    "/mysubjects/{id_subject}/sessions": {
        "parameters": [
            {
                "name": "id_subject",
                "in": "path",
                "required": true,
                "description": "ID of subject that we want  to find sessions ",
                "type": "integer"
            }
        ],
        "get": get_teacher_sessions_1.default,
        "post": post_sessionbyTeacher_1.default
    },
    "/mysubjects/{id_subject}/sessions/{id_session}": {
        "parameters": [
            {
                "name": "id_subject",
                "in": "path",
                "required": true,
                "description": "ID of subject  ",
                "type": "integer"
            },
            {
                "name": "id_session ",
                "in": "path",
                "required": true,
                "description": "ID of session that we want ",
                "type": "integer"
            }
        ],
        "put": put_sessionbyTeacher_1.default,
        "delete": delete_sessionbyTeacher_1.default
    }
};
exports.default = paths;
