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
exports.SubjectService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const subject_entity_1 = require("../models/subject.entity");
const class_entity_1 = require("../models/class.entity");
const teacher_entity_1 = require("../models/teacher.entity");
const NoSubjectForClassFoundException_1 = __importDefault(require("../exceptions/subject/NoSubjectForClassFoundException"));
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const TeacherWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatIDNotExistsException"));
const ClassWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/class/ClassWithThatIDNotExistsException"));
const SubjectWithThatIDNotExistsInClassException_1 = __importDefault(require("../exceptions/subject/SubjectWithThatIDNotExistsInClassException"));
const TeacherWithIdHasNoSubjectsException_1 = __importDefault(require("../exceptions/teacher/TeacherWithIdHasNoSubjectsException"));
const establishment_entity_1 = require("../models/establishment.entity");
const EstablishmentWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDNotExistsException"));
const NoClassFoundExceptionInEstablishment_1 = __importDefault(require("../exceptions/class/NoClassFoundExceptionInEstablishment"));
const subject_ets_entity_1 = require("../models/subject_ets.entity");
const SubjectWithThatIDInClassForEstablishmentNotExistsException_1 = __importDefault(require("../exceptions/subjectEts/SubjectWithThatIDInClassForEstablishmentNotExistsException"));
class SubjectService {
    constructor() {
        this.classRepository = AppDataSource_1.AppDataSource.getRepository(class_entity_1.Class);
        this.subjectRepository = AppDataSource_1.AppDataSource.getRepository(subject_entity_1.Subject);
        this.teacherRepository = AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
        this.subjectsEtsRepository = AppDataSource_1.AppDataSource.getRepository(subject_ets_entity_1.Subject_Ets);
        this.etsRepository = AppDataSource_1.AppDataSource.getRepository(establishment_entity_1.Establishment);
    }
    getAllSubjects(id_class) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const subjects = yield this.subjectRepository
                    .createQueryBuilder("subject")
                    .leftJoinAndSelect("subject.classe", "class")
                    .leftJoinAndSelect("subject.teacher", "teacher")
                    .where("class.id = :id_class", { id_class: classe.id })
                    .getMany();
                if (subjects && subjects.length != 0) {
                    return subjects;
                }
                else {
                    throw new NoSubjectForClassFoundException_1.default(classe.name);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    createSubjectInClass(id_class, id_subjectEts) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository
                .createQueryBuilder("class")
                .leftJoinAndSelect("class.etablishment", "establishment")
                .where("class.id = :id_class ", { id_class: id_class })
                .getOne();
            if (classe) {
                const subjectEts = yield this.subjectsEtsRepository
                    .createQueryBuilder("subject")
                    .leftJoinAndSelect("subject.etablishment", "establishment")
                    .where("subject.id = :id", { id: id_subjectEts })
                    .andWhere("establishment.id = :id_ets ", { id_ets: classe.etablishment.id })
                    .getOne();
                if (subjectEts) {
                    const newSubject = new subject_entity_1.Subject();
                    newSubject.subjectId = subjectEts.id;
                    newSubject.name = subjectEts.name;
                    newSubject.hourly_billing = 0;
                    newSubject.quota_hours = 0;
                    newSubject.classe = classe;
                    const created = yield this.subjectRepository.save(newSubject);
                    if (created)
                        return created;
                    else
                        throw new InternalErrorException_1.default();
                }
                else {
                    throw new SubjectWithThatIDInClassForEstablishmentNotExistsException_1.default(id_subjectEts, id_class);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    getSubjectById(id_class, id_subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const subject = yield this.subjectRepository
                    .createQueryBuilder("subject")
                    .leftJoinAndSelect("subject.classe", "class")
                    .leftJoinAndSelect("subject.teacher", "teacher")
                    .where("subject.subjectId = :id_subject", { id_subject: id_subject })
                    .andWhere("class.id = :id_class", { id_class: classe.id })
                    .getOne();
                if (subject) {
                    return subject;
                }
                else {
                    throw new SubjectWithThatIDNotExistsInClassException_1.default(id_subject, classe.name);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    updateSubject(subject, id_class, id_subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const subjectUpdate = yield this.subjectRepository
                    .createQueryBuilder("subject")
                    .leftJoinAndSelect("subject.classe", "class")
                    .leftJoinAndSelect("subject.teacher", "teacher")
                    .where("subject.subjectId = :id_subject", { id_subject: id_subject })
                    .andWhere("class.id = :id_class", { id_class: classe.id })
                    .getOne();
                if (subjectUpdate) {
                    if (subject.id_teacher != null && typeof (subject.id_teacher) === 'number') {
                        const teacher = yield this.teacherRepository.findOneBy({ id: subject.id_teacher });
                        if (teacher) {
                            subjectUpdate.hourly_billing = subject.hourly_billing;
                            subjectUpdate.quota_hours = subject.quota_hours;
                            subjectUpdate.teacher = teacher;
                            const result = yield this.subjectRepository.save(subjectUpdate);
                            if (result) {
                                return result;
                            }
                            else {
                                throw new InternalErrorException_1.default();
                            }
                        }
                        else {
                            throw new TeacherWithThatIDNotExistsException_1.default(subject.id_teacher);
                        }
                    }
                    else {
                        subjectUpdate.hourly_billing = subject.hourly_billing;
                        subjectUpdate.quota_hours = subject.quota_hours;
                        const result = yield this.subjectRepository.save(subjectUpdate);
                        if (result) {
                            return result;
                        }
                        else {
                            throw new InternalErrorException_1.default();
                        }
                    }
                }
                else {
                    throw new SubjectWithThatIDNotExistsInClassException_1.default(id_subject, classe.name);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    deleteSubject(id_class, id_subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const subject = yield this.subjectRepository
                    .createQueryBuilder("subject")
                    .leftJoinAndSelect("subject.classe", "class")
                    .where("subject.subjectId = :id_subject", { id_subject: id_subject })
                    .andWhere("class.id = :id_class", { id_class: classe.id })
                    .getOne();
                if (subject) {
                    const result = yield this.subjectRepository.delete(id_subject);
                    if (result)
                        return id_subject;
                }
                else {
                    throw new SubjectWithThatIDNotExistsInClassException_1.default(id_subject, classe.name);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    getSubjectsTeacher(id_ets, id_teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const teacher = yield this.teacherRepository.findOneBy({ id: id_teacher });
            if (teacher) {
                const classes = yield this.classRepository
                    .createQueryBuilder("class")
                    .leftJoinAndSelect("class.etablishment", "etablishment")
                    .where("etablishment.id = :id_ets", { id_ets: id_ets })
                    .getMany();
                if (classes == null || classes.length == 0) {
                    throw new NoClassFoundExceptionInEstablishment_1.default(estab.name);
                }
                const subjects = yield this.subjectRepository
                    .createQueryBuilder("subject")
                    .leftJoinAndSelect("subject.teacher", "teacher")
                    .leftJoinAndSelect("subject.classe", "classe")
                    .where("teacher.id = :id_teacher", { id_teacher: id_teacher })
                    .getMany();
                const classeIds = classes.map(it => it.id);
                if (subjects && subjects.length != 0) {
                    const result = subjects.filter(it => classeIds.includes(it.classe.id));
                    if (result && result.length != 0) {
                        return result;
                    }
                    else {
                        throw new TeacherWithIdHasNoSubjectsException_1.default(id_teacher);
                    }
                }
                else {
                    throw new TeacherWithIdHasNoSubjectsException_1.default(id_teacher);
                }
            }
            else {
                throw new TeacherWithThatIDNotExistsException_1.default(id_teacher);
            }
        });
    }
}
exports.SubjectService = SubjectService;
