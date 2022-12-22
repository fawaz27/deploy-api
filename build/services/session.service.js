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
exports.SessionService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const session_entity_1 = require("../models/session.entity");
const subject_entity_1 = require("../models/subject.entity");
const textbook_entity_1 = require("../models/textbook.entity");
const class_entity_1 = require("../models/class.entity");
const NoSessionFoundForSubjectException_1 = __importDefault(require("../exceptions/session/NoSessionFoundForSubjectException"));
const NoSessionFoundInTextbookException_1 = __importDefault(require("../exceptions/session/NoSessionFoundInTextbookException"));
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const SubjectWithThatIDNotExistsInClassException_1 = __importDefault(require("../exceptions/subject/SubjectWithThatIDNotExistsInClassException"));
const SessionWithThatIDNotExistsInTextbookException_1 = __importDefault(require("../exceptions/session/SessionWithThatIDNotExistsInTextbookException"));
const TextbookWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/textbook/TextbookWithThatIDNotExistsException"));
const teacher_entity_1 = require("../models/teacher.entity");
const YearIsStringException_1 = __importDefault(require("../exceptions/year/YearIsStringException"));
const validator_year_academic_1 = __importDefault(require("../utils/validator-year_academic"));
const FormatYearException_1 = __importDefault(require("../exceptions/year/FormatYearException"));
const year_academic_entity_1 = require("../models/year_academic.entity");
const NoSessionFoundForSubjectInClassForYearException_1 = __importDefault(require("../exceptions/session/NoSessionFoundForSubjectInClassForYearException"));
const NoTexbookFoundForClassForYearException_1 = __importDefault(require("../exceptions/textbook/NoTexbookFoundForClassForYearException"));
const YearWithThatNameNotExistsException_1 = __importDefault(require("../exceptions/year/YearWithThatNameNotExistsException"));
const TeacherWithIdHasNoSubjectsWithIDException_1 = __importDefault(require("../exceptions/teacher/TeacherWithIdHasNoSubjectsWithIDException"));
const UserWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/teacher/UserWithThatIDNotExistsException"));
const teacher_ets_entity_1 = require("../models/teacher_ets.entity");
const establishment_entity_1 = require("../models/establishment.entity");
class SessionService {
    constructor() {
        this.sessionRepository = AppDataSource_1.AppDataSource.getRepository(session_entity_1.Session);
        this.subjectRepository = AppDataSource_1.AppDataSource.getRepository(subject_entity_1.Subject);
        this.textbookRepository = AppDataSource_1.AppDataSource.getRepository(textbook_entity_1.Textbook);
        this.classRepository = AppDataSource_1.AppDataSource.getRepository(class_entity_1.Class);
        this.teacherRepository = AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
        this.yearRepository = AppDataSource_1.AppDataSource.getRepository(year_academic_entity_1.Year_Academic);
        this.teacherEtsRepository = AppDataSource_1.AppDataSource.getRepository(teacher_ets_entity_1.Teacher_Ets);
        this.etsRepository = AppDataSource_1.AppDataSource.getRepository(establishment_entity_1.Establishment);
    }
    getAllSessionsSubject(id_textbook, id_subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const textbook = yield this.textbookRepository
                .createQueryBuilder("textbook")
                .leftJoinAndSelect("textbook.classe", "class")
                .where("textbook.id = :id_textbook", { id_textbook: id_textbook })
                .getOne();
            if (textbook) {
                const subject = yield AppDataSource_1.AppDataSource.getRepository(subject_entity_1.Subject)
                    .createQueryBuilder("subject")
                    .leftJoinAndSelect("subject.classe", "class")
                    .where("subject.subjectId = :id_subject", { id_subject: id_subject })
                    .andWhere("class.id = :id_class", { id_class: textbook.classe.id })
                    .getOne();
                if (subject) {
                    const sessions = yield this.sessionRepository
                        .createQueryBuilder("session")
                        .leftJoinAndSelect("session.subject", "subject")
                        .leftJoinAndSelect("session.textbook", "textbook")
                        .where("subject.subjectId = :id_subject", { id_subject: subject.subjectId })
                        .andWhere("textbook.id = :id_textbook", { id_textbook: textbook.id })
                        .getMany();
                    if (sessions && sessions.length != 0) {
                        return sessions;
                    }
                    else {
                        throw new NoSessionFoundForSubjectException_1.default(subject.name, textbook.classe.name);
                    }
                }
                else {
                    throw new SubjectWithThatIDNotExistsInClassException_1.default(id_subject, textbook.classe.name);
                }
            }
            else {
                throw new TextbookWithThatIDNotExistsException_1.default(id_textbook);
            }
        });
    }
    getAllSessions(id_textbook) {
        return __awaiter(this, void 0, void 0, function* () {
            const textbook = yield this.textbookRepository
                .createQueryBuilder("textbook")
                .leftJoinAndSelect("textbook.classe", "class")
                .where("textbook.id = :id_textbook", { id_textbook: id_textbook })
                .getOne();
            if (textbook) {
                const sessions = yield this.sessionRepository
                    .createQueryBuilder("session")
                    .leftJoinAndSelect("session.subject", "subject")
                    .leftJoinAndSelect("session.textbook", "textbook")
                    .where("textbook.id = :id_textbook", { id_textbook: textbook.id })
                    .getMany();
                if (sessions && sessions.length != 0) {
                    return sessions;
                }
                else {
                    throw new NoSessionFoundInTextbookException_1.default(textbook.title, textbook.classe.name);
                }
            }
            else {
                throw new TextbookWithThatIDNotExistsException_1.default(id_textbook);
            }
        });
    }
    createSession(id_textbook, id_subject, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const textbook = yield this.textbookRepository
                .createQueryBuilder("textbook")
                .leftJoinAndSelect("textbook.classe", "class")
                .where("textbook.id = :id_textbook", { id_textbook: id_textbook })
                .getOne();
            if (textbook) {
                const subject = yield AppDataSource_1.AppDataSource.getRepository(subject_entity_1.Subject)
                    .createQueryBuilder("subject")
                    .leftJoinAndSelect("subject.classe", "class")
                    .where("subject.subjectId = :id_subject", { id_subject: id_subject })
                    .andWhere("class.id = :id_class", { id_class: textbook.classe.id })
                    .getOne();
                if (subject) {
                    const newSession = new session_entity_1.Session();
                    newSession.title = session.title;
                    newSession.date = session.date;
                    newSession.annex_document = session.annex_document;
                    newSession.description = session.description;
                    newSession.duration = this.convertInTime(session.end_time) - this.convertInTime(session.start_time);
                    newSession.summary_course = session.summary_course;
                    newSession.point_of_presence = session.point_of_presence;
                    newSession.start_time = session.start_time;
                    newSession.end_time = session.end_time;
                    newSession.subject = subject;
                    newSession.textbook = textbook;
                    const created = yield this.sessionRepository.save(newSession);
                    if (created) {
                        return created;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
                else {
                    throw new SubjectWithThatIDNotExistsInClassException_1.default(id_subject, textbook.classe.name);
                }
            }
            else {
                throw new TextbookWithThatIDNotExistsException_1.default(id_textbook);
            }
        });
    }
    getSessionById(id_textbook, id_session) {
        return __awaiter(this, void 0, void 0, function* () {
            const textbook = yield this.textbookRepository
                .createQueryBuilder("textbook")
                .leftJoinAndSelect("textbook.classe", "class")
                .where("textbook.id = :id_textbook", { id_textbook: id_textbook })
                .getOne();
            if (textbook) {
                const session = yield this.sessionRepository
                    .createQueryBuilder("session")
                    .leftJoinAndSelect("session.subject", "subject")
                    .leftJoinAndSelect("session.textbook", "textbook")
                    .where("session.id = :id_session", { id_session: id_session })
                    .andWhere("textbook.id = :id_textbook", { id_textbook: textbook.id })
                    .getOne();
                if (session) {
                    return session;
                }
                else {
                    throw new SessionWithThatIDNotExistsInTextbookException_1.default(id_session, textbook.title);
                }
            }
            else {
                throw new TextbookWithThatIDNotExistsException_1.default(id_textbook);
            }
        });
    }
    updateSession(id_textbook, id_session, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const textbook = yield this.textbookRepository
                .createQueryBuilder("textbook")
                .leftJoinAndSelect("textbook.classe", "class")
                .where("textbook.id = :id_textbook", { id_textbook: id_textbook })
                .getOne();
            if (textbook) {
                const sessionUpdate = yield this.sessionRepository
                    .createQueryBuilder("session")
                    .leftJoinAndSelect("session.subject", "subject")
                    .leftJoinAndSelect("session.textbook", "textbook")
                    .where("session.id = :id_session", { id_session: id_session })
                    .andWhere("textbook.id = :id_textbook", { id_textbook: textbook.id })
                    .getOne();
                if (sessionUpdate) {
                    sessionUpdate.title = session.title;
                    sessionUpdate.date = session.date;
                    sessionUpdate.annex_document = session.annex_document;
                    sessionUpdate.description = session.description;
                    sessionUpdate.duration = this.convertInTime(session.end_time) - this.convertInTime(session.start_time);
                    sessionUpdate.summary_course = session.summary_course;
                    sessionUpdate.point_of_presence = session.point_of_presence;
                    sessionUpdate.start_time = session.start_time;
                    sessionUpdate.end_time = session.end_time;
                    const result = yield this.sessionRepository.save(sessionUpdate);
                    if (result) {
                        return result;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
                else {
                    throw new SessionWithThatIDNotExistsInTextbookException_1.default(id_session, textbook.title);
                }
            }
            else {
                throw new TextbookWithThatIDNotExistsException_1.default(id_textbook);
            }
        });
    }
    deleteSession(id_textbook, id_session) {
        return __awaiter(this, void 0, void 0, function* () {
            const textbook = yield this.textbookRepository
                .createQueryBuilder("textbook")
                .leftJoinAndSelect("textbook.classe", "class")
                .where("textbook.id = :id_textbook", { id_textbook: id_textbook })
                .getOne();
            if (textbook) {
                const session = yield this.sessionRepository
                    .createQueryBuilder("session")
                    .leftJoinAndSelect("session.subject", "subject")
                    .leftJoinAndSelect("session.textbook", "textbook")
                    .where("session.id = :id_session", { id_session: id_session })
                    .andWhere("textbook.id = :id_textbook", { id_textbook: textbook.id })
                    .getOne();
                if (session) {
                    const result = yield this.sessionRepository.delete(id_session);
                    return id_session;
                }
                else {
                    throw new SessionWithThatIDNotExistsInTextbookException_1.default(id_session, textbook.title);
                }
            }
            else {
                throw new TextbookWithThatIDNotExistsException_1.default(id_textbook);
            }
        });
    }
    getSessionsTeacher(id, id_subject, year_academic) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.teacherRepository.findOneBy({ id: id });
            if (user) {
                const subject = yield this.subjectRepository
                    .createQueryBuilder("subject")
                    .leftJoinAndSelect("subject.teacher", "teacher")
                    .leftJoinAndSelect("subject.classe", "classe")
                    .where("teacher.id = :id_teacher", { id_teacher: id })
                    .andWhere("subject.subjectId = :id_subject", { id_subject: id_subject })
                    .getOne();
                console.log(subject);
                if (subject) {
                    // if(year_academic==undefined){
                    //     let year_now = (new Date()).getFullYear();
                    //     year_academic=year_now-1+'-'+year_now;
                    // }
                    if (typeof (year_academic) != "string") {
                        throw new YearIsStringException_1.default();
                    }
                    else if (!(0, validator_year_academic_1.default)(year_academic)) {
                        throw new FormatYearException_1.default();
                    }
                    const year = yield this.yearRepository.findOne({ where: { year: `${year_academic}` } });
                    if (year) {
                        const textbook = yield this.textbookRepository
                            .createQueryBuilder("textbook")
                            .leftJoinAndSelect("textbook.classe", "class")
                            .leftJoinAndSelect("textbook.year_academic", "year")
                            .where("year.year = :year_academic", { year_academic: year_academic })
                            .andWhere("class.id = :id_class", { id_class: subject.classe.id })
                            .getOne();
                        if (textbook) {
                            const sessions = yield this.sessionRepository
                                .createQueryBuilder("session")
                                .leftJoinAndSelect("session.subject", "subject")
                                .leftJoinAndSelect("session.textbook", "textbook")
                                .where("subject.subjectId = :id_subject", { id_subject: subject.subjectId })
                                .andWhere("textbook.id = :id_textbook", { id_textbook: textbook.id })
                                .getMany();
                            if (sessions && sessions.length != 0) {
                                return sessions;
                            }
                            else {
                                throw new NoSessionFoundForSubjectInClassForYearException_1.default(subject.name, subject.classe.name, year_academic);
                            }
                        }
                        else {
                            throw new NoTexbookFoundForClassForYearException_1.default(subject.classe.name, year_academic);
                        }
                    }
                    else {
                        throw new YearWithThatNameNotExistsException_1.default(year_academic);
                    }
                }
                else {
                    throw new TeacherWithIdHasNoSubjectsWithIDException_1.default(id, id_subject);
                }
            }
            else {
                throw new UserWithThatIDNotExistsException_1.default(id);
            }
        });
    }
    convertInTime(timeInHour) {
        var timeParts = timeInHour.split(":");
        return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }
}
exports.SessionService = SessionService;
