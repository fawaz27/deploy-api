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
exports.ProgramService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const ClassWithThatNameNotExistsException_1 = __importDefault(require("../exceptions/class/ClassWithThatNameNotExistsException"));
const EstablishmentWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDNotExistsException"));
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const DestinatairesCanNotBeEmptyException_1 = __importDefault(require("../exceptions/program/DestinatairesCanNotBeEmptyException"));
const NoProgramFoundInEstablishmentException_1 = __importDefault(require("../exceptions/program/NoProgramFoundInEstablishmentException"));
const NoProgramFoundInEstablishmentForTeacherWithIDException_1 = __importDefault(require("../exceptions/program/NoProgramFoundInEstablishmentForTeacherWithIDException"));
const ProgramWithThatIDInEstablishmentNotExistsException_1 = __importDefault(require("../exceptions/program/ProgramWithThatIDInEstablishmentNotExistsException"));
const TeacherWithThatIDNotExistsInEstablishmentException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatIDNotExistsInEstablishmentException"));
const UserWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/teacher/UserWithThatIDNotExistsException"));
const class_entity_1 = require("../models/class.entity");
const establishment_entity_1 = require("../models/establishment.entity");
const program_entity_1 = require("../models/program.entity");
const teacher_entity_1 = require("../models/teacher.entity");
const validator_teachers_1 = __importDefault(require("../utils/validator-teachers"));
class ProgramService {
    constructor() {
        this.programRepository = AppDataSource_1.AppDataSource.getRepository(program_entity_1.Program);
        this.teacherRepository = AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
        this.classRepository = AppDataSource_1.AppDataSource.getRepository(class_entity_1.Class);
        this.etsRepository = AppDataSource_1.AppDataSource.getRepository(establishment_entity_1.Establishment);
    }
    getAllPrograms(id_ets, id_teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            let programs = yield this.programRepository
                .createQueryBuilder("program")
                .leftJoinAndSelect("program.teacher", "teacher")
                .where("program.establishment = :id_ets", { id_ets: estab.id })
                .getMany();
            if (programs && programs.length != 0) {
                if (id_teacher) {
                    programs = programs.filter(it => it.access == "ALL-TEACHERS" || it.destinataires.includes(id_teacher));
                    if (programs && programs.length != 0)
                        throw new NoProgramFoundInEstablishmentForTeacherWithIDException_1.default(id_ets, id_teacher);
                    return programs;
                }
                else {
                    return programs;
                }
            }
            else {
                throw new NoProgramFoundInEstablishmentException_1.default(id_ets);
            }
        });
    }
    createProgram(id_ets, id_teacher, program) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const teacher = yield this.teacherRepository
                .createQueryBuilder("teacher")
                .where("teacher.id = :id_teacher", { id_teacher: id_teacher })
                .getOne();
            if (teacher) {
                const classe = yield this.classRepository.findOneBy({ name: program.classe });
                if (classe) {
                    const result = yield (0, validator_teachers_1.default)(program.destinataires, id_ets);
                    if (result) {
                        throw new TeacherWithThatIDNotExistsInEstablishmentException_1.default(result, id_ets);
                    }
                    else {
                        const newProgram = new program_entity_1.Program();
                        newProgram.access = program.access;
                        newProgram.classe = program.classe;
                        newProgram.destinataires = program.destinataires;
                        newProgram.subject = program.subject;
                        newProgram.date = program.date;
                        newProgram.establishment = estab.id;
                        if (newProgram.access == "ALL-TEACHERS") {
                            newProgram.destinataires = [];
                        }
                        else if (newProgram.access == "GROUP-TEACHERS") {
                            if (newProgram.destinataires.length == 0) {
                                throw new DestinatairesCanNotBeEmptyException_1.default();
                            }
                        }
                        newProgram.teacher = teacher;
                        const created = yield this.programRepository.save(newProgram);
                        if (created) {
                            return created;
                        }
                        else {
                            throw new InternalErrorException_1.default();
                        }
                    }
                }
                else {
                    throw new ClassWithThatNameNotExistsException_1.default(program.classe);
                }
            }
            else {
                throw new UserWithThatIDNotExistsException_1.default(id_teacher);
            }
        });
    }
    getProgramById(id_ets, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const program = yield this.programRepository
                .createQueryBuilder("program")
                .leftJoinAndSelect("program.teacher", "teacher")
                .where("program.id = :id", { id: id })
                .andWhere("program.establishment = :id_ets", { id_ets: estab.id })
                .getOne();
            if (program) {
                return program;
            }
            else {
                throw new ProgramWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
    updateProgram(id_ets, id, program) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const programUpdate = yield this.programRepository
                .createQueryBuilder("program")
                .leftJoinAndSelect("program.teacher", "teacher")
                .where("program.id = :id", { id: id })
                .andWhere("program.establishment = :id_ets", { id_ets: estab.id })
                .getOne();
            if (programUpdate) {
                programUpdate.access = program.access;
                programUpdate.classe = program.classe;
                programUpdate.destinataires = program.destinataires;
                programUpdate.subject = program.subject;
                programUpdate.date = program.date;
                if (programUpdate.access == "ALL-TEACHERS") {
                    programUpdate.destinataires = [];
                }
                else if (programUpdate.access == "GROUP-TEACHERS") {
                    if (programUpdate.destinataires.length == 0) {
                        throw new DestinatairesCanNotBeEmptyException_1.default();
                    }
                }
                const result = yield this.programRepository.save(programUpdate);
                if (result) {
                    return result;
                }
                else {
                    throw new InternalErrorException_1.default();
                }
            }
            else {
                throw new ProgramWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
    deleteProgram(id_ets, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const program = yield this.programRepository
                .createQueryBuilder("program")
                .leftJoinAndSelect("program.teacher", "teacher")
                .where("program.id = :id", { id: id })
                .andWhere("program.establishment = :id_ets", { id_ets: estab.id })
                .getOne();
            if (program) {
                const result = yield this.programRepository.delete(id);
                return id;
            }
            else {
                throw new ProgramWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
}
exports.ProgramService = ProgramService;
