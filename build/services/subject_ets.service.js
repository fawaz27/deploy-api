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
exports.SubjectsEtsService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const EstablishmentWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDNotExistsException"));
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const NoSubjectFoundInEstablishmentException_1 = __importDefault(require("../exceptions/subjectEts/NoSubjectFoundInEstablishmentException"));
const SubjectWithThatIDInEstablishmentNotExistsException_1 = __importDefault(require("../exceptions/subjectEts/SubjectWithThatIDInEstablishmentNotExistsException"));
const SubjectWithThatNameAlreadyExistsException_1 = __importDefault(require("../exceptions/subjectEts/SubjectWithThatNameAlreadyExistsException"));
const establishment_entity_1 = require("../models/establishment.entity");
const subject_entity_1 = require("../models/subject.entity");
const subject_ets_entity_1 = require("../models/subject_ets.entity");
class SubjectsEtsService {
    constructor() {
        this.subjectsEtsRepository = AppDataSource_1.AppDataSource.getRepository(subject_ets_entity_1.Subject_Ets);
        this.etsRepository = AppDataSource_1.AppDataSource.getRepository(establishment_entity_1.Establishment);
        this.subjectRepository = AppDataSource_1.AppDataSource.getRepository(subject_entity_1.Subject);
    }
    getAllSubjectsEstablishment(id_ets) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            let subjects = yield this.subjectsEtsRepository
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.etablishment", "establishment")
                .where("establishment.id = :id_ets", { id_ets: estab.id })
                .getMany();
            if (subjects && subjects.length != 0) {
                return subjects;
            }
            else {
                throw new NoSubjectFoundInEstablishmentException_1.default(id_ets);
            }
        });
    }
    createSubjectEstablishment(id_ets, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const isAlreadyExistName = yield this.subjectsEtsRepository
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.etablishment", "establishment")
                .where("subject.name = :name", { name: subject.name })
                .andWhere("establishment.id = :id ", { id: id_ets })
                .getOne();
            if (isAlreadyExistName) {
                throw new SubjectWithThatNameAlreadyExistsException_1.default(subject.name, estab.name);
            }
            const newSubject = new subject_ets_entity_1.Subject_Ets();
            newSubject.name = subject.name;
            newSubject.etablishment = estab;
            const created = yield this.subjectsEtsRepository.save(newSubject);
            if (created) {
                return created;
            }
            else {
                throw new InternalErrorException_1.default();
            }
        });
    }
    getSubjectById(id_ets, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const subject = yield this.subjectsEtsRepository
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.etablishment", "establishment")
                .where("subject.id = :id", { id: id })
                .andWhere("establishment.id = :id_ets ", { id_ets: id_ets })
                .getOne();
            if (subject) {
                return subject;
            }
            else {
                throw new SubjectWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
    updateSubject(id_ets, id, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const isAlreadyExistName = yield this.subjectsEtsRepository
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.etablishment", "establishment")
                .where("subject.name = :name", { name: subject.name })
                .andWhere("establishment.id = :id ", { id: id_ets })
                .getOne();
            if (isAlreadyExistName && isAlreadyExistName.id != id) {
                throw new SubjectWithThatNameAlreadyExistsException_1.default(subject.name, estab.name);
            }
            const subjectUpdate = yield this.subjectsEtsRepository
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.etablishment", "establishment")
                .where("subject.id = :id", { id: id })
                .andWhere("establishment.id = :id_ets ", { id_ets: estab.id })
                .getOne();
            if (subjectUpdate) {
                if (subjectUpdate.name != subject.name) {
                    subjectUpdate.name = subject.name;
                    const result = yield this.subjectsEtsRepository.save(subjectUpdate);
                    let sco = yield this.subjectRepository
                        .createQueryBuilder()
                        .update()
                        .set({ name: subject.name })
                        .where("subjectId = :id", { id: id })
                        .execute();
                    if (result && sco) {
                        return { result, sco };
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
                subjectUpdate.name = subject.name;
                const result = yield this.subjectsEtsRepository.save(subjectUpdate);
                if (result) {
                    return result;
                }
                else {
                    throw new InternalErrorException_1.default();
                }
            }
            else {
                throw new SubjectWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
    deleteSubject(id_ets, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const subject = yield this.subjectsEtsRepository
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.etablishment", "establishment")
                .where("subject.id = :id", { id: id })
                .andWhere("establishment.id = :id_ets ", { id_ets: id_ets })
                .getOne();
            if (subject) {
                const result = yield this.subjectsEtsRepository.delete(id);
                return id;
            }
            else {
                throw new SubjectWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
}
exports.SubjectsEtsService = SubjectsEtsService;
