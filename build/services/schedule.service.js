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
exports.ScheduleService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const class_entity_1 = require("../models/class.entity");
const schedule_entity_1 = require("../models/schedule.entity");
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const ClassWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/class/ClassWithThatIDNotExistsException"));
const year_academic_entity_1 = require("../models/year_academic.entity");
const YearWithThatNameNotExistsException_1 = __importDefault(require("../exceptions/year/YearWithThatNameNotExistsException"));
const validator_year_academic_1 = __importDefault(require("../utils/validator-year_academic"));
const FormatYearException_1 = __importDefault(require("../exceptions/year/FormatYearException"));
const NoScheduleForClassFoundException_1 = __importDefault(require("../exceptions/schedule/NoScheduleForClassFoundException"));
const ScheduleAlreadyExistsException_1 = __importDefault(require("../exceptions/schedule/ScheduleAlreadyExistsException"));
const ScheduleWithThatIDNotExistsInClassException_1 = __importDefault(require("../exceptions/schedule/ScheduleWithThatIDNotExistsInClassException"));
const ScheduleWithThatIDNotExistsInClassExceptionForYear_1 = __importDefault(require("../exceptions/schedule/ScheduleWithThatIDNotExistsInClassExceptionForYear"));
const teacher_entity_1 = require("../models/teacher.entity");
const UserWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/teacher/UserWithThatIDNotExistsException"));
const subject_entity_1 = require("../models/subject.entity");
const ClassWithIDHaveNotScheduleForYearException_1 = __importDefault(require("../exceptions/schedule/ClassWithIDHaveNotScheduleForYearException"));
class ScheduleService {
    constructor() {
        this.classRepository = AppDataSource_1.AppDataSource.getRepository(class_entity_1.Class);
        this.scheduleRepository = AppDataSource_1.AppDataSource.getRepository(schedule_entity_1.Schedule);
        this.yearRepository = AppDataSource_1.AppDataSource.getRepository(year_academic_entity_1.Year_Academic);
        this.teacherRepository = AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
        this.subjectRepository = AppDataSource_1.AppDataSource.getRepository(subject_entity_1.Subject);
    }
    getAllSchedules(id_class) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const schedules = yield this.scheduleRepository
                    .createQueryBuilder("schedule")
                    .leftJoinAndSelect("schedule.classe", "class")
                    .leftJoinAndSelect("schedule.year", "year")
                    .where("class.id = :id_class", { id_class: classe.id })
                    .getMany();
                if (schedules && schedules.length != 0) {
                    return schedules;
                }
                else {
                    throw new NoScheduleForClassFoundException_1.default(classe.name);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    createSchedule(id_class, schedule) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                if (!(0, validator_year_academic_1.default)(schedule.yearAcademic)) {
                    throw new FormatYearException_1.default();
                }
                const year = yield this.yearRepository.findOne({ where: { year: `${schedule.yearAcademic}` } });
                if (year) {
                    const isAlreadyExist = yield this.scheduleRepository
                        .createQueryBuilder("schedule")
                        .leftJoinAndSelect("schedule.classe", "class")
                        .leftJoinAndSelect("schedule.year", "year")
                        .where("class.id = :id", { id: classe.id })
                        .andWhere("year.year = :yearAcademic", { yearAcademic: schedule.yearAcademic })
                        .getOne();
                    if (isAlreadyExist) {
                        throw new ScheduleAlreadyExistsException_1.default(classe.name, year.year);
                    }
                    const newschedule = new schedule_entity_1.Schedule();
                    // newschedule.schedule=schedule.schedule;
                    newschedule.classe = classe;
                    newschedule.year = year;
                    const created = yield this.scheduleRepository.save(newschedule);
                    // console.log(created);
                    if (created)
                        return created;
                    else
                        throw new InternalErrorException_1.default();
                }
                else {
                    throw new YearWithThatNameNotExistsException_1.default(schedule.yearAcademic);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    getScheduleById(id_class, id_schedule) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const schedule = yield this.scheduleRepository
                    .createQueryBuilder("schedule")
                    .leftJoinAndSelect("schedule.classe", "class")
                    .leftJoinAndSelect("schedule.year", "year")
                    .where("schedule.id = :id_schedule", { id_schedule: id_schedule })
                    .andWhere("class.id = :id_class", { id_class: classe.id })
                    .getOne();
                if (schedule) {
                    return schedule;
                }
                else {
                    throw new ScheduleWithThatIDNotExistsInClassException_1.default(id_schedule, classe.name);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    updateSchedule(schedule, id_class, id_schedule) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                if (!(0, validator_year_academic_1.default)(schedule.yearAcademic)) {
                    throw new FormatYearException_1.default();
                }
                const year = yield this.yearRepository.findOne({ where: { year: `${schedule.yearAcademic}` } });
                if (year) {
                    const scheduleUpdate = yield this.scheduleRepository
                        .createQueryBuilder("schedule")
                        .leftJoinAndSelect("schedule.classe", "class")
                        .leftJoinAndSelect("schedule.year", "year")
                        .where("schedule.id = :id_schedule", { id_schedule: id_schedule })
                        .andWhere("class.id = :id_class", { id_class: classe.id })
                        .andWhere("year.year = :yearAcademic", { yearAcademic: schedule.yearAcademic })
                        .getOne();
                    if (scheduleUpdate) {
                        // scheduleUpdate.schedule=schedule.schedule;
                        const result = yield this.scheduleRepository.save(scheduleUpdate);
                        if (result) {
                            return result;
                        }
                        else {
                            throw new InternalErrorException_1.default();
                        }
                    }
                    else {
                        throw new ScheduleWithThatIDNotExistsInClassExceptionForYear_1.default(id_schedule, classe.name, year.year);
                    }
                }
                else {
                    throw new YearWithThatNameNotExistsException_1.default(schedule.yearAcademic);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    deleteSchedule(id_class, id_schedule) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const schedule = yield this.scheduleRepository
                    .createQueryBuilder("schedule")
                    .leftJoinAndSelect("schedule.classe", "class")
                    .where("schedule.id = :id_schedule", { id_schedule: id_schedule })
                    .andWhere("class.id = :id_class", { id_class: classe.id })
                    .getOne();
                if (schedule) {
                    const result = yield this.scheduleRepository.delete(id_schedule);
                    return id_schedule;
                }
                else {
                    throw new ScheduleWithThatIDNotExistsInClassException_1.default(id_schedule, classe.name);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    getScheduleTeacher(id_class, id_teacher, yearAcademic) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            const teacher = yield this.teacherRepository.findOneBy({ id: id_teacher });
            if (!(0, validator_year_academic_1.default)(yearAcademic))
                throw new FormatYearException_1.default();
            if (teacher == null)
                throw new UserWithThatIDNotExistsException_1.default(id_teacher);
            if (classe == null)
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            const subjects = yield this.subjectRepository
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.teacher", "teacher")
                .leftJoinAndSelect("subject.classe", "classe")
                .where("teacher.id = :id_teacher", { id_teacher: id_teacher })
                .andWhere("classe.id = :id_class", { id_class: id_class })
                .getMany();
            let schedule = yield this.scheduleRepository
                .createQueryBuilder("schedule")
                .leftJoinAndSelect("schedule.classe", "class")
                .leftJoinAndSelect("schedule.year", "year")
                .where("year.year = :yearAcademic", { yearAcademic: yearAcademic })
                .andWhere("class.id = :id_class", { id_class: classe.id })
                .getOne();
            console.log(schedule);
            if (schedule) {
                if (subjects && subjects.length != 0) {
                    const subjectIds = subjects.map(it => it.subjectId);
                    // schedule.schedule = this.filterSchedule(subjectIds,schedule.schedule); 
                    console.log(schedule);
                    return schedule;
                }
                else {
                    // schedule.schedule = this.cleanSchedule(schedule.schedule);
                    return schedule;
                }
            }
            else {
                throw new ClassWithIDHaveNotScheduleForYearException_1.default(id_class, yearAcademic);
            }
        });
    }
    filterSchedule(subjectIds, schedule) {
        schedule["Monday"] = schedule["Monday"].filter(it => subjectIds.includes(it.id_subject));
        schedule["Tuesday"] = schedule["Tuesday"].filter(it => subjectIds.includes(it.id_subject));
        schedule["Wednesday"] = schedule["Wednesday"].filter(it => subjectIds.includes(it.id_subject));
        schedule["Thursday"] = schedule["Thursday"].filter(it => subjectIds.includes(it.id_subject));
        schedule["Friday"] = schedule["Friday"].filter(it => subjectIds.includes(it.id_subject));
        schedule["Saturday"] = schedule["Saturday"].filter(it => subjectIds.includes(it.id_subject));
        schedule["Sunday"] = schedule["Sunday"].filter(it => subjectIds.includes(it.id_subject));
        return schedule;
    }
    cleanSchedule(schedule) {
        schedule["Monday"] = [];
        schedule["Tuesday"] = [];
        schedule["Wednesday"] = [];
        schedule["Thursday"] = [];
        schedule["Friday"] = [];
        schedule["Saturday"] = [];
        schedule["Sunday"] = [];
        return schedule;
    }
}
exports.ScheduleService = ScheduleService;
