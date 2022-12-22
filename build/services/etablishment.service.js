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
exports.EtablishmentService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const EstablishmentWithThatNameAndYearAlreadyExistsException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatNameAndYearAlreadyExistsException"));
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const FormatYearException_1 = __importDefault(require("../exceptions/year/FormatYearException"));
const YearWithThatNameNotExistsException_1 = __importDefault(require("../exceptions/year/YearWithThatNameNotExistsException"));
const establishment_entity_1 = require("../models/establishment.entity");
const teacher_entity_1 = require("../models/teacher.entity");
const teacher_ets_entity_1 = require("../models/teacher_ets.entity");
const year_academic_entity_1 = require("../models/year_academic.entity");
const validator_year_academic_1 = __importDefault(require("../utils/validator-year_academic"));
const NoEstablishmentFoundException_1 = __importDefault(require("../exceptions/establishment/NoEstablishmentFoundException"));
const EstablishmentWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDNotExistsException"));
const EstablishmentWithThatIDNotExistsForYearException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDNotExistsForYearException"));
const EstablishmentWithThatIDHaveNotManager_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDHaveNotManager"));
const TeacherWithThatEmailNotExistsException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatEmailNotExistsException"));
const NoEstablishmentWithNameFoundException_1 = __importDefault(require("../exceptions/establishment/NoEstablishmentWithNameFoundException"));
const UserWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/teacher/UserWithThatIDNotExistsException"));
const NoEstablishmentFoundForTeacherException_1 = __importDefault(require("../exceptions/establishment/NoEstablishmentFoundForTeacherException"));
const TeacherWithThatIdIsAlreadyDirectorInEstablishmentException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatIdIsAlreadyDirectorInEstablishmentException"));
class EtablishmentService {
    constructor() {
        this.etsRepository = AppDataSource_1.AppDataSource.getRepository(establishment_entity_1.Establishment);
        this.yearRepository = AppDataSource_1.AppDataSource.getRepository(year_academic_entity_1.Year_Academic);
        this.teacherRepository = AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
        this.teacherEtsRepository = AppDataSource_1.AppDataSource.getRepository(teacher_ets_entity_1.Teacher_Ets);
    }
    getAllEtablishment() {
        return __awaiter(this, void 0, void 0, function* () {
            const estabs = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .leftJoinAndSelect("etablishment.teacher_ets", "teacher_ets")
                .andWhere("teacher_ets.role = :role", { role: "director" })
                .getMany();
            if (estabs && estabs.length != 0) {
                return estabs;
            }
            else {
                throw new NoEstablishmentFoundException_1.default();
            }
        });
    }
    createEtablishment(eta) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, validator_year_academic_1.default)(eta.yearAcademic)) {
                throw new FormatYearException_1.default();
            }
            const year = yield this.yearRepository.findOne({ where: { year: `${eta.yearAcademic}` } });
            const teacher = yield this.teacherRepository.findOneBy({ id: eta.teacherId });
            if (teacher == null)
                throw new UserWithThatIDNotExistsException_1.default(eta.teacherId);
            if (year) {
                const isAlreadyExist = yield this.etsRepository
                    .createQueryBuilder("etablishment")
                    .leftJoinAndSelect("etablishment.year", "year")
                    .leftJoinAndSelect("etablishment.teacher_ets", "teacher_ets")
                    .where("etablishment.name = :name ", { name: eta.name })
                    .andWhere("year.id = :id_year", { id_year: year.id })
                    .andWhere("teacher_ets.teacherId = :teacherId", { teacherId: eta.teacherId })
                    .andWhere("teacher_ets.role = :role", { role: "director" })
                    .getOne();
                if (isAlreadyExist)
                    throw new EstablishmentWithThatNameAndYearAlreadyExistsException_1.default(eta.name, eta.yearAcademic, eta.teacherId);
                else {
                    const newEsta = new establishment_entity_1.Establishment();
                    newEsta.name = eta.name;
                    newEsta.year = year;
                    const created = yield this.etsRepository.save(newEsta);
                    if (created) {
                        const teacher_ets = new teacher_ets_entity_1.Teacher_Ets();
                        teacher_ets.teacherId = teacher.id;
                        teacher_ets.establishmentId = created.id;
                        teacher_ets.role = "director";
                        const result = yield this.teacherEtsRepository.save(teacher_ets);
                        if (result) {
                            return { created, result };
                        }
                        else {
                            throw new InternalErrorException_1.default();
                        }
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
            }
            else {
                throw new YearWithThatNameNotExistsException_1.default(eta.yearAcademic);
            }
        });
    }
    getEtablishmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.teacher_ets", "teacher_ets")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id })
                .andWhere("teacher_ets.role = :role", { role: "director" })
                .getOne();
            // console.log(estab);
            if (estab) {
                return estab;
            }
            else {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id);
            }
        });
    }
    // Récupérer toutes les soubscriptions d'un établissement
    getAllEtablishmentsByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const estabs = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.name = :name ", { name: name })
                .getMany();
            // console.log(estab);
            if (estabs && estabs.length != 0) {
                return estabs;
            }
            else {
                throw new NoEstablishmentWithNameFoundException_1.default(name);
            }
        });
    }
    //Seulement le nom de l'établissement qui est modifiable
    updateEtablishment(id, estab) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, validator_year_academic_1.default)(estab.yearAcademic)) {
                throw new FormatYearException_1.default();
            }
            const year = yield this.yearRepository.findOne({ where: { year: `${estab.yearAcademic}` } });
            if (year) {
                const isAlreadyExist = yield this.etsRepository
                    .createQueryBuilder("etablishment")
                    .leftJoinAndSelect("etablishment.year", "year")
                    .leftJoinAndSelect("etablishment.teacher_ets", "teacher_ets")
                    .where("etablishment.name = :name ", { name: estab.name })
                    .andWhere("year.id = :id_year", { id_year: year.id })
                    .andWhere("teacher_ets.teacherId = :teacherId", { teacherId: estab.teacherId })
                    .andWhere("teacher_ets.role = :role", { role: "director" })
                    .getOne();
                if (isAlreadyExist && isAlreadyExist.id != id)
                    throw new EstablishmentWithThatNameAndYearAlreadyExistsException_1.default(estab.name, estab.yearAcademic, estab.teacherId);
                const estabUpdate = yield this.etsRepository
                    .createQueryBuilder("etablishment")
                    .leftJoinAndSelect("etablishment.year", "year")
                    .where("etablishment.id = :id ", { id: id })
                    .andWhere("year.year = :year", { year: estab.yearAcademic })
                    .getOne();
                if (estabUpdate) {
                    estabUpdate.name = estab.name;
                    const result = yield this.etsRepository.save(estabUpdate);
                    if (result) {
                        return result;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
                else {
                    throw new EstablishmentWithThatIDNotExistsForYearException_1.default(id, estab.yearAcademic);
                }
            }
        });
    }
    deleteEtablishment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id })
                .getOne();
            if (estab) {
                const result = yield this.etsRepository.delete(id);
                //console.log(result);
                return id;
            }
            else {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id);
            }
        });
    }
    addManagerToEstablishment(id, manager) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id })
                .getOne();
            if (estab) {
                const teacher = yield this.teacherRepository
                    .createQueryBuilder("teacher")
                    .where("teacher.email = :email", { email: manager.email })
                    .getOne();
                //console.log(teacher);
                if (teacher) {
                    const isAlreadyDirector = yield this.teacherEtsRepository
                        .createQueryBuilder("teacher_ets")
                        .where("teacher_ets.establishmentId = :establishmentId", { establishmentId: estab.id })
                        .andWhere("teacher_ets.teacherId = :teacherId", { teacherId: teacher.id })
                        .andWhere("teacher_ets.role = :role ", { role: 'director' })
                        .getOne();
                    if (isAlreadyDirector) {
                        throw new TeacherWithThatIdIsAlreadyDirectorInEstablishmentException_1.default(teacher.id, estab.id);
                    }
                    const teacher_ets = new teacher_ets_entity_1.Teacher_Ets();
                    teacher_ets.teacherId = teacher.id;
                    teacher_ets.establishmentId = id;
                    teacher_ets.role = "censor";
                    const result = yield this.teacherEtsRepository.save(teacher_ets);
                    if (result) {
                        return result;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
                else {
                    throw new TeacherWithThatEmailNotExistsException_1.default(manager.email);
                }
            }
            else {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id);
            }
        });
    }
    deleteManagerToEstablishment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id })
                .getOne();
            if (estab) {
                const delmanager = yield this.teacherEtsRepository
                    .createQueryBuilder("teacher_ets")
                    .where("teacher_ets.establishmentId = :id", { id: id })
                    .andWhere("teacher_ets.role = :role ", { role: "censor" })
                    .getOne();
                if (delmanager) {
                    const result = yield this.teacherEtsRepository
                        .createQueryBuilder()
                        .delete()
                        .where("establishmentId = :id", { id: id })
                        .andWhere("role = :role ", { role: "censor" })
                        .execute();
                    if (result) {
                        console.log(result);
                        return result;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
                else {
                    throw new EstablishmentWithThatIDHaveNotManager_1.default(id, "censor");
                }
            }
            else {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id);
            }
        });
    }
    getAllEtablishmentTeacher(id_teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield this.teacherRepository.findOneBy({ id: id_teacher });
            if (teacher) {
                const estabs = yield this.teacherEtsRepository
                    .createQueryBuilder("teacher_ets")
                    .leftJoinAndSelect("teacher_ets.establishment", "establishment")
                    .leftJoinAndSelect("teacher_ets.teacher", "teacher")
                    .where("teacher.id = :id_teacher", { id_teacher: id_teacher })
                    .getMany();
                if (estabs && estabs.length != 0) {
                    return estabs;
                }
                else {
                    throw new NoEstablishmentFoundForTeacherException_1.default(id_teacher);
                }
            }
            else {
                throw new UserWithThatIDNotExistsException_1.default(id_teacher);
            }
        });
    }
}
exports.EtablishmentService = EtablishmentService;
