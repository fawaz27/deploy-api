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
exports.TeacherService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const UserWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/teacher/UserWithThatIDNotExistsException"));
const teacher_entity_1 = require("../models/teacher.entity");
const subject_entity_1 = require("../models/subject.entity");
const textbook_entity_1 = require("../models/textbook.entity");
const session_entity_1 = require("../models/session.entity");
const year_academic_entity_1 = require("../models/year_academic.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const TeacherWithIdHasNoSubjectsException_1 = __importDefault(require("../exceptions/teacher/TeacherWithIdHasNoSubjectsException"));
const NoTexbookFoundForClassForYearException_1 = __importDefault(require("../exceptions/textbook/NoTexbookFoundForClassForYearException"));
const YearWithThatNameNotExistsException_1 = __importDefault(require("../exceptions/year/YearWithThatNameNotExistsException"));
const NoSessionFoundForSubjectInClassForYearException_1 = __importDefault(require("../exceptions/session/NoSessionFoundForSubjectInClassForYearException"));
const SessionWithThatIDNotExistsInTextbookException_1 = __importDefault(require("../exceptions/session/SessionWithThatIDNotExistsInTextbookException"));
const TeacherWithIdHasNoSubjectsWithIDException_1 = __importDefault(require("../exceptions/teacher/TeacherWithIdHasNoSubjectsWithIDException"));
const validator_year_academic_1 = __importDefault(require("../utils/validator-year_academic"));
const FormatYearException_1 = __importDefault(require("../exceptions/year/FormatYearException"));
const YearIsStringException_1 = __importDefault(require("../exceptions/year/YearIsStringException"));
const TeacherWithThatEmailAlreadyExistsException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatEmailAlreadyExistsException"));
const TeacherWithThatEmailNotExistsException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatEmailNotExistsException"));
const teacher_ets_entity_1 = require("../models/teacher_ets.entity");
const establishment_entity_1 = require("../models/establishment.entity");
const EstablishmentWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDNotExistsException"));
const NoTeacherFoundInEstablishmentException_1 = __importDefault(require("../exceptions/teacher/NoTeacherFoundInEstablishmentException"));
const TeacherWithThatEmailNotExistsInEstablishmentException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatEmailNotExistsInEstablishmentException"));
const TeacherWithThatIDNotExistsInEstablishmentException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatIDNotExistsInEstablishmentException"));
const TeacherWithThatIdIsAlreadyManagerInEstablishmentException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatIdIsAlreadyManagerInEstablishmentException"));
const AdminWithThatEmailNotExistsException_1 = __importDefault(require("../exceptions/AdminWithThatEmailNotExistsException"));
class TeacherService {
    constructor() {
        this.teacherRepository = AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
        this.subjectRepository = AppDataSource_1.AppDataSource.getRepository(subject_entity_1.Subject);
        this.textbookRepository = AppDataSource_1.AppDataSource.getRepository(textbook_entity_1.Textbook);
        this.sessionRepository = AppDataSource_1.AppDataSource.getRepository(session_entity_1.Session);
        this.yearRepository = AppDataSource_1.AppDataSource.getRepository(year_academic_entity_1.Year_Academic);
        this.etsRepository = AppDataSource_1.AppDataSource.getRepository(establishment_entity_1.Establishment);
        this.teacherEtsRepository = AppDataSource_1.AppDataSource.getRepository(teacher_ets_entity_1.Teacher_Ets);
    }
    createTeacher(id_ets, teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const result = yield this.teacherRepository.findOne({ where: { email: teacher.email } });
            if (result) {
                throw new TeacherWithThatEmailAlreadyExistsException_1.default(teacher.email);
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(teacher.hashPassword, 10);
                teacher.hashPassword = hashedPassword;
                const newTeacher = this.teacherRepository.create(teacher);
                const created = yield this.teacherRepository.save(newTeacher);
                // console.log(created);
                if (created) {
                    const teacher_ets = new teacher_ets_entity_1.Teacher_Ets();
                    teacher_ets.teacherId = created.id;
                    teacher_ets.establishmentId = id_ets;
                    teacher_ets.role = "teacher";
                    const result = yield this.teacherEtsRepository.save(teacher_ets);
                    if (result) {
                        return [created, result];
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
                else {
                    throw new InternalErrorException_1.default();
                }
            }
        });
    }
    addExistTeacher(id_ets, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield this.teacherRepository.findOne({ where: { email: email } });
            if (teacher) {
                const estab = yield this.etsRepository
                    .createQueryBuilder("etablishment")
                    .leftJoinAndSelect("etablishment.year", "year")
                    .where("etablishment.id = :id ", { id: id_ets })
                    .getOne();
                if (estab == null) {
                    throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
                }
                // const isAlreadyManager = await this.teacherEtsRepository
                //     .createQueryBuilder("teacher_ets")
                //     .where("teacher_ets.establishmentId = :establishmentId",{establishmentId:estab.id})
                //     .andWhere("teacher_ets.teacherId = :teacherId",{teacherId:teacher.id})
                //     .getOne();
                // if (isAlreadyManager && isAlreadyManager.role!="teacher") {
                //     throw new TeacherWithThatIdIsAlreadyManagerInEstablishmentException(teacher.id,estab.id);
                // }
                const teacher_ets = new teacher_ets_entity_1.Teacher_Ets();
                teacher_ets.teacherId = teacher.id;
                teacher_ets.establishmentId = estab.id;
                teacher_ets.role = "teacher";
                const result = yield this.teacherEtsRepository.save(teacher_ets);
                if (result) {
                    return result;
                }
                else {
                    throw new InternalErrorException_1.default();
                }
            }
            else {
                throw new TeacherWithThatEmailNotExistsException_1.default(email);
            }
        });
    }
    getAllTeachersInEstablishment(id_ets) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const teachers = yield this.teacherEtsRepository
                .createQueryBuilder("teacher_ets")
                .leftJoinAndSelect("teacher_ets.teacher", "teacher")
                .where("teacher_ets.establishmentId = :establishmentId", { establishmentId: id_ets })
                .andWhere("teacher_ets.role = :role", { role: "teacher" })
                .getMany();
            if (teachers && teachers.length != 0) {
                return teachers;
            }
            else {
                throw new NoTeacherFoundInEstablishmentException_1.default(id_ets);
            }
        });
    }
    getAllTeachersAndManagersInEstablishment(id_ets) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const teachers = yield this.teacherEtsRepository
                .createQueryBuilder("teacher_ets")
                .leftJoinAndSelect("teacher_ets.teacher", "teacher")
                .where("teacher_ets.establishmentId = :establishmentId", { establishmentId: id_ets })
                .getMany();
            if (teachers && teachers.length != 0) {
                return teachers;
            }
            else {
                throw new NoTeacherFoundInEstablishmentException_1.default(id_ets);
            }
        });
    }
    getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield this.teacherRepository.findOneBy({ email: `${email},`, role: 'admin' });
            if (teacher)
                return teacher;
            else
                throw new AdminWithThatEmailNotExistsException_1.default(email);
        });
    }
    // A vérifier
    getTeacherByEmail(id_ets, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const teacher = yield this.teacherRepository.findOneBy({ email: `${email}` });
            const teacher_ets = yield this.teacherEtsRepository
                .createQueryBuilder("teacher_ets")
                .leftJoinAndSelect("teacher_ets.teacher", "teacher")
                .where("teacher_ets.establishmentId = :establishmentId", { establishmentId: id_ets })
                .andWhere("teacher_ets.teacherId = :teacherId", { teacherId: teacher === null || teacher === void 0 ? void 0 : teacher.id })
                .getOne();
            if (teacher && teacher_ets) {
                return teacher;
            }
            else {
                throw new TeacherWithThatEmailNotExistsInEstablishmentException_1.default(email, id_ets);
            }
        });
    }
    // A vérifier
    GetTeacherById(id_ets, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const teacher = yield this.teacherRepository.findOneBy({ id: id });
            const teacher_ets = yield this.teacherEtsRepository
                .createQueryBuilder("teacher_ets")
                .leftJoinAndSelect("teacher_ets.teacher", "teacher")
                .where("teacher_ets.establishmentId = :establishmentId", { establishmentId: id_ets })
                .andWhere("teacher_ets.teacherId = :teacherId", { teacherId: teacher === null || teacher === void 0 ? void 0 : teacher.id })
                .getOne();
            if (teacher && teacher_ets) {
                return teacher;
            }
            else {
                throw new TeacherWithThatIDNotExistsInEstablishmentException_1.default(id, id_ets);
            }
        });
    }
    // A vérifier
    UpdateTeacher(id_ets, teacher, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const teacherUpdate = yield this.teacherRepository.findOneBy({ id: id });
            const teacher_ets = yield this.teacherEtsRepository
                .createQueryBuilder("teacher_ets")
                .leftJoinAndSelect("teacher_ets.teacher", "teacher")
                .where("teacher_ets.establishmentId = :establishmentId", { establishmentId: id_ets })
                .andWhere("teacher_ets.teacherId = :teacherId", { teacherId: teacherUpdate === null || teacherUpdate === void 0 ? void 0 : teacherUpdate.id })
                .getOne();
            if (teacherUpdate && teacher_ets) {
                const alreadyExistEmail = yield this.teacherRepository.findOneBy({ email: teacher.email });
                if (alreadyExistEmail) {
                    throw new TeacherWithThatEmailAlreadyExistsException_1.default(teacher.email);
                }
                else {
                    const isAlreadyManager = yield this.teacherEtsRepository
                        .createQueryBuilder("teacher_ets")
                        .where("teacher_ets.establishmentId = :establishmentId", { establishmentId: id_ets })
                        .andWhere("teacher_ets.teacherId = :teacherId", { teacherId: id })
                        .getOne();
                    if (isAlreadyManager && isAlreadyManager.role != "teacher") {
                        throw new TeacherWithThatIdIsAlreadyManagerInEstablishmentException_1.default(id, id_ets);
                    }
                    const updated = yield this.teacherRepository.update(id, teacher);
                    if (updated) {
                        return updated;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
            }
            else {
                throw new TeacherWithThatIDNotExistsInEstablishmentException_1.default(id, id_ets);
            }
        });
    }
    // A vérifier
    dropTeacherInEstablishment(id_ets, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield this.teacherRepository.findOneBy({ id: id });
            const teacher_ets = yield this.teacherEtsRepository
                .createQueryBuilder("teacher_ets")
                .leftJoinAndSelect("teacher_ets.teacher", "teacher")
                .where("teacher_ets.establishmentId = :establishmentId", { establishmentId: id_ets })
                .andWhere("teacher_ets.teacherId = :teacherId", { teacherId: teacher === null || teacher === void 0 ? void 0 : teacher.id })
                .getOne();
            if (teacher && teacher_ets) {
                const result = yield this.teacherEtsRepository
                    .createQueryBuilder()
                    .delete()
                    .where("establishmentId = :establishmentId", { establishmentId: id_ets })
                    .andWhere("teacherId = :teacherId ", { teacherId: id })
                    .andWhere("role = :role ", { role: "teacher" })
                    .execute();
                if (result) {
                    //console.log(result);
                    return result;
                }
                else {
                    throw new InternalErrorException_1.default();
                }
            }
            else {
                throw new TeacherWithThatIDNotExistsInEstablishmentException_1.default(id, id_ets);
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
                //console.log(subject);
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
    addSession(id, id_subject, year_academic, session) {
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
                if (subject) {
                    if (!(0, validator_year_academic_1.default)(year_academic)) {
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
                            throw new NoTexbookFoundForClassForYearException_1.default(subject.classe.name, year_academic);
                        }
                    }
                    else {
                        throw new YearWithThatNameNotExistsException_1.default(year_academic);
                    }
                }
                else {
                    throw new TeacherWithIdHasNoSubjectsException_1.default(id);
                }
            }
            else {
                throw new UserWithThatIDNotExistsException_1.default(id);
            }
        });
    }
    updateSession(id, id_subject, year_academic, id_session, session) {
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
                if (subject) {
                    if (!(0, validator_year_academic_1.default)(year_academic)) {
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
                            const sessionUpdate = yield this.sessionRepository
                                .createQueryBuilder("session")
                                .leftJoinAndSelect("session.subject", "subject")
                                .leftJoinAndSelect("session.textbook", "textbook")
                                .where("session.id = :id_session", { id_session: id_session })
                                .andWhere("textbook.id = :id_textbook", { id_textbook: textbook.id })
                                .andWhere("subject.subjectId = :id_subject", { id_subject: subject.subjectId })
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
                            throw new NoTexbookFoundForClassForYearException_1.default(subject.classe.name, year_academic);
                        }
                    }
                    else {
                        throw new YearWithThatNameNotExistsException_1.default(year_academic);
                    }
                }
                else {
                    throw new TeacherWithIdHasNoSubjectsException_1.default(id);
                }
            }
            else {
                throw new UserWithThatIDNotExistsException_1.default(id);
            }
        });
    }
    deleteSession(id, id_subject, year_academic, id_session) {
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
                if (subject) {
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
                            const session = yield this.sessionRepository
                                .createQueryBuilder("session")
                                .leftJoinAndSelect("session.subject", "subject")
                                .leftJoinAndSelect("session.textbook", "textbook")
                                .where("session.id = :id_session", { id_session: id_session })
                                .andWhere("textbook.id = :id_textbook", { id_textbook: textbook.id })
                                .andWhere("subject.subjectId = :id_subject", { id_subject: subject.subjectId })
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
                            throw new NoTexbookFoundForClassForYearException_1.default(subject.classe.name, year_academic);
                        }
                    }
                    else {
                        throw new YearWithThatNameNotExistsException_1.default(year_academic);
                    }
                }
                else {
                    throw new TeacherWithIdHasNoSubjectsException_1.default(id);
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
exports.TeacherService = TeacherService;
