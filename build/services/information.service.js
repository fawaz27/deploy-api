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
exports.InformationService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const EstablishmentWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDNotExistsException"));
const DestinatairesCanNotBeEmptyException_1 = __importDefault(require("../exceptions/information/DestinatairesCanNotBeEmptyException"));
const InformationWithThatIDInEstablishmentNotExistsException_1 = __importDefault(require("../exceptions/information/InformationWithThatIDInEstablishmentNotExistsException"));
const NoInformationFoundInEstablishmentException_1 = __importDefault(require("../exceptions/information/NoInformationFoundInEstablishmentException"));
const NoInformationFoundInEstablishmentForTeacherWithIDException_1 = __importDefault(require("../exceptions/information/NoInformationFoundInEstablishmentForTeacherWithIDException"));
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const TeacherWithThatIDNotExistsInEstablishmentException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatIDNotExistsInEstablishmentException"));
const UserWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/teacher/UserWithThatIDNotExistsException"));
const establishment_entity_1 = require("../models/establishment.entity");
const information_entity_1 = require("../models/information.entity");
const teacher_entity_1 = require("../models/teacher.entity");
const validator_teachers_1 = __importDefault(require("../utils/validator-teachers"));
class InformationService {
    constructor() {
        this.informationRepository = AppDataSource_1.AppDataSource.getRepository(information_entity_1.Information);
        this.teacherRepository = AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
        this.etsRepository = AppDataSource_1.AppDataSource.getRepository(establishment_entity_1.Establishment);
    }
    getAllInformations(id_ets, id_teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            let informations = yield this.informationRepository
                .createQueryBuilder("information")
                .leftJoinAndSelect("information.teacher", "teacher")
                .where("information.establishment = :id_ets", { id_ets: estab.id })
                .getMany();
            if (informations && informations.length != 0) {
                if (id_teacher) {
                    informations = informations.filter(it => it.access == "ALL-TEACHERS" || it.destinataires.includes(id_teacher));
                    if (informations && informations.length != 0)
                        throw new NoInformationFoundInEstablishmentForTeacherWithIDException_1.default(id_ets, id_teacher);
                    return informations;
                }
                else {
                    return informations;
                }
            }
            else {
                throw new NoInformationFoundInEstablishmentException_1.default(id_ets);
            }
        });
    }
    createInformation(id_ets, id_teacher, information) {
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
                const result = yield (0, validator_teachers_1.default)(information.destinataires, id_ets);
                if (result) {
                    throw new TeacherWithThatIDNotExistsInEstablishmentException_1.default(result, id_ets);
                }
                else {
                    const newInformation = new information_entity_1.Information();
                    newInformation.access = information.access;
                    newInformation.contents = information.contents;
                    newInformation.destinataires = information.destinataires;
                    newInformation.establishment = estab.id;
                    if (newInformation.access == "ALL-TEACHERS") {
                        newInformation.destinataires = [];
                    }
                    else if (newInformation.access == "GROUP-TEACHERS") {
                        if (newInformation.destinataires.length == 0) {
                            throw new DestinatairesCanNotBeEmptyException_1.default();
                        }
                    }
                    newInformation.teacher = teacher;
                    const created = yield this.informationRepository.save(newInformation);
                    if (created) {
                        return created;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
            }
            else {
                throw new UserWithThatIDNotExistsException_1.default(id_teacher);
            }
        });
    }
    getInformationById(id_ets, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const information = yield this.informationRepository
                .createQueryBuilder("information")
                .leftJoinAndSelect("information.teacher", "teacher")
                .where("information.id = :id", { id: id })
                .andWhere("information.establishment = :id_ets", { id_ets: estab.id })
                .getOne();
            if (information) {
                return information;
            }
            else {
                throw new InformationWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
    updateInformation(id_ets, id, information) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const informationUpdate = yield this.informationRepository
                .createQueryBuilder("information")
                .leftJoinAndSelect("information.teacher", "teacher")
                .where("information.id = :id", { id: id })
                .andWhere("information.establishment = :id_ets", { id_ets: estab.id })
                .getOne();
            if (informationUpdate) {
                informationUpdate.access = information.access;
                informationUpdate.contents = information.contents;
                informationUpdate.destinataires = information.destinataires;
                informationUpdate.establishment = estab.id;
                if (informationUpdate.access == "ALL-TEACHERS") {
                    informationUpdate.destinataires = [];
                }
                else if (informationUpdate.access == "GROUP-TEACHERS") {
                    if (informationUpdate.destinataires.length == 0) {
                        throw new DestinatairesCanNotBeEmptyException_1.default();
                    }
                }
                const result = yield this.informationRepository.save(informationUpdate);
                if (result) {
                    return result;
                }
                else {
                    throw new InternalErrorException_1.default();
                }
            }
            else {
                throw new InformationWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
    deleteInformation(id_ets, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const information = yield this.informationRepository
                .createQueryBuilder("information")
                .leftJoinAndSelect("information.teacher", "teacher")
                .where("information.id = :id", { id: id })
                .andWhere("information.establishment = :id_ets", { id_ets: estab.id })
                .getOne();
            if (information) {
                const result = yield this.informationRepository.delete(id);
                return id;
            }
            else {
                throw new InformationWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
}
exports.InformationService = InformationService;
