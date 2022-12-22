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
exports.UtilsService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const session_entity_1 = require("../models/session.entity");
const subject_entity_1 = require("../models/subject.entity");
const textbook_entity_1 = require("../models/textbook.entity");
const class_entity_1 = require("../models/class.entity");
const teacher_entity_1 = require("../models/teacher.entity");
const validator_year_academic_1 = __importDefault(require("../utils/validator-year_academic"));
const FormatYearException_1 = __importDefault(require("../exceptions/year/FormatYearException"));
const year_academic_entity_1 = require("../models/year_academic.entity");
const UserWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/teacher/UserWithThatIDNotExistsException"));
const teacher_ets_entity_1 = require("../models/teacher_ets.entity");
const establishment_entity_1 = require("../models/establishment.entity");
const EstablishmentWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDNotExistsException"));
const UserWithThatIdIsNotTeacherInEstablishment_1 = __importDefault(require("../exceptions/establishment/UserWithThatIdIsNotTeacherInEstablishment"));
const NoClassFoundExceptionInEstablishment_1 = __importDefault(require("../exceptions/class/NoClassFoundExceptionInEstablishment"));
const TeacherWithIdHasNoSubjectsException_1 = __importDefault(require("../exceptions/teacher/TeacherWithIdHasNoSubjectsException"));
const UserWithThatIdIsNotManagerInEstablishment_1 = __importDefault(require("../exceptions/establishment/UserWithThatIdIsNotManagerInEstablishment"));
const typeorm_1 = require("typeorm");
class UtilsService {
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
    getTimeDoneYearAcademic(sessions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sessions && sessions.length != 0) {
                let total = 0;
                sessions.forEach(it => total += it.duration);
                return total;
            }
            else
                return 0;
        });
    }
    getTotalToDoTime(subjects) {
        let TotalToDoTime = 0;
        subjects.forEach((it) => {
            let minutes = Math.floor(it.quota_hours * 60);
            TotalToDoTime += minutes;
        });
        return TotalToDoTime;
    }
    getHourlyAmount(sessions, subjects) {
        return __awaiter(this, void 0, void 0, function* () {
            let tab = [];
            subjects.forEach((it) => {
                let duration = 0;
                sessions.forEach((el) => {
                    if (el.subject.subjectId == it.subjectId)
                        duration += el.duration;
                });
                tab.push({ duration: duration, billing: it.hourly_billing });
            });
            let result = 0;
            tab.forEach((it) => {
                result += it.billing * (Math.floor(it.duration / 60) + ((it.duration % 60) / 60));
            });
            return result;
        });
    }
    getUtilsInfosTeacher(id_teacher, id_ets, year_academic) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, validator_year_academic_1.default)(year_academic)) {
                throw new FormatYearException_1.default();
            }
            const teacher = yield this.teacherRepository.findOneBy({ id: id_teacher });
            if (teacher) {
                const estab = yield this.etsRepository
                    .createQueryBuilder("etablishment")
                    .leftJoinAndSelect("etablishment.year", "year")
                    .where("etablishment.id = :id ", { id: id_ets })
                    .getOne();
                if (estab == null) {
                    throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
                }
                const teacher_estab = yield this.teacherEtsRepository
                    .createQueryBuilder("teacher_ets")
                    .leftJoinAndSelect("teacher_ets.establishment", "establishment")
                    .leftJoinAndSelect("teacher_ets.teacher", "teacher")
                    .where("teacher.id = :id_teacher", { id_teacher: id_teacher })
                    .andWhere("establishment.id = :id_ets", { id_ets: id_ets })
                    .andWhere("teacher_ets.role = :role ", { role: 'teacher' })
                    .getOne();
                if (teacher_estab) {
                    const classes = yield this.classRepository
                        .createQueryBuilder("class")
                        .leftJoinAndSelect("class.etablishment", "etablishment")
                        .where("etablishment.id = :id_ets", { id_ets: id_ets })
                        .getMany();
                    if (classes == null || classes.length == 0) {
                        throw new NoClassFoundExceptionInEstablishment_1.default(estab.name);
                    }
                    const classeIds = classes.map(it => it.id);
                    // const textbooks = await this.textbookRepository
                    //     .createQueryBuilder("textbook")
                    //     .leftJoinAndSelect("textbook.classe","class")
                    //     .leftJoinAndSelect("textbook.year_academic","year_academic.year")
                    //     .where("class.id IN (:...ids)",{ids:classeIds})
                    //     .andWhere("year_academic.year = :yearAcademic",{yearAcademic:year_academic})
                    //     .getMany();
                    let subjects = yield this.subjectRepository
                        .createQueryBuilder("subject")
                        .leftJoinAndSelect("subject.teacher", "teacher")
                        .leftJoinAndSelect("subject.classe", "classe")
                        .where("teacher.id = :id_teacher", { id_teacher: id_teacher })
                        .getMany();
                    subjects = subjects.filter(it => classeIds.includes(it.classe.id));
                    if (subjects && subjects.length != 0) {
                        const subjectIds = subjects.map(it => it.subjectId);
                        let sessions = yield this.sessionRepository
                            .createQueryBuilder("session")
                            .leftJoinAndSelect("session.textbook", "textbook")
                            .leftJoinAndSelect("session.subject", "subject")
                            .getMany();
                        sessions = sessions.filter((it) => {
                            let title = it.textbook.title;
                            let componentTitle = title.split(" - ");
                            let year = componentTitle[2];
                            if (subjectIds.includes(it.subject.subjectId) && year == year_academic) {
                                return it;
                            }
                        });
                        const TotalToDoTime = this.getTotalToDoTime(subjects);
                        const TimeDone = yield this.getTimeDoneYearAcademic(sessions);
                        const TimeRemaining = TotalToDoTime - TimeDone;
                        const HourlyAmount = yield this.getHourlyAmount(sessions, subjects);
                        return {
                            TimeDone: TimeDone,
                            TimeRemaining: TimeRemaining,
                            HourlyAmount: HourlyAmount
                        };
                    }
                    else {
                        throw new TeacherWithIdHasNoSubjectsException_1.default(id_teacher);
                    }
                }
                else {
                    throw new UserWithThatIdIsNotTeacherInEstablishment_1.default(id_teacher, id_ets);
                }
            }
            else {
                throw new UserWithThatIDNotExistsException_1.default(id_teacher);
            }
        });
    }
    getUtilsInfosManager(id_teacher, id_ets) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield this.teacherRepository.findOneBy({ id: id_teacher });
            if (teacher) {
                const estab = yield this.etsRepository
                    .createQueryBuilder("etablishment")
                    .leftJoinAndSelect("etablishment.year", "year")
                    .where("etablishment.id = :id ", { id: id_ets })
                    .getOne();
                if (estab == null) {
                    throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
                }
                const teacher_estab = yield this.teacherEtsRepository
                    .createQueryBuilder("teacher_ets")
                    .leftJoinAndSelect("teacher_ets.establishment", "establishment")
                    .leftJoinAndSelect("teacher_ets.teacher", "teacher")
                    .where("teacher.id = :id_teacher", { id_teacher: id_teacher })
                    .andWhere("establishment.id = :id_ets", { id_ets: id_ets })
                    .andWhere("teacher_ets.role != :role ", { role: 'teacher' })
                    .getOne();
                if (teacher_estab) {
                    const number_of_teachers = yield this.countTeachers(id_ets);
                    const number_of_managers = yield this.countManagers(id_ets);
                    const number_of_students = yield this.countStudents(id_ets);
                    return { number_of_teachers, number_of_managers, number_of_students };
                }
                else {
                    throw new UserWithThatIdIsNotManagerInEstablishment_1.default(id_teacher, id_ets);
                }
            }
            else {
                throw new UserWithThatIDNotExistsException_1.default(id_teacher);
            }
        });
    }
    countTeachers(id_ets) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher_estab = yield this.teacherEtsRepository
                .createQueryBuilder("teacher_ets")
                .leftJoinAndSelect("teacher_ets.establishment", "establishment")
                .andWhere("establishment.id = :id_ets", { id_ets: id_ets })
                .andWhere("teacher_ets.role = :role ", { role: 'teacher' })
                .getMany();
            return teacher_estab.length;
        });
    }
    countManagers(id_ets) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher_estab = yield this.teacherEtsRepository
                .createQueryBuilder("teacher_ets")
                .leftJoinAndSelect("teacher_ets.establishment", "establishment")
                .where("establishment.id = :id_ets", { id_ets: id_ets })
                .andWhere(new typeorm_1.Brackets((qb) => {
                qb.where("teacher_ets.role = :role ", { role: 'director' })
                    .orWhere("teacher_ets.role = :role2 ", { role2: 'censor' });
            }))
                .getMany();
            return teacher_estab.length;
        });
    }
    countStudents(id_ets) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher_estab = yield this.teacherEtsRepository
                .createQueryBuilder("teacher_ets")
                .leftJoinAndSelect("teacher_ets.establishment", "establishment")
                .andWhere("establishment.id = :id_ets", { id_ets: id_ets })
                .andWhere("teacher_ets.role = :role ", { role: 'student' })
                .getMany();
            return teacher_estab.length;
        });
    }
}
exports.UtilsService = UtilsService;
