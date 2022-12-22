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
exports.ArchiveRequestService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const ArchiveRequestWithThatIDInEstablishmentNotExistsException_1 = __importDefault(require("../exceptions/archiveRequest/ArchiveRequestWithThatIDInEstablishmentNotExistsException"));
const NoArchiveRequestFoundInEstablishmentException_1 = __importDefault(require("../exceptions/archiveRequest/NoArchiveRequestFoundInEstablishmentException"));
const EstablishmentWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDNotExistsException"));
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const TeacherWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatIDNotExistsException"));
const archive_request_entity_1 = require("../models/archive_request.entity");
const establishment_entity_1 = require("../models/establishment.entity");
const teacher_entity_1 = require("../models/teacher.entity");
class ArchiveRequestService {
    constructor() {
        this.archiveRequestRepository = AppDataSource_1.AppDataSource.getRepository(archive_request_entity_1.Archive_request);
        this.teacherRepository = AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
        this.etsRepository = AppDataSource_1.AppDataSource.getRepository(establishment_entity_1.Establishment);
    }
    getAllRequests(id_ets) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const archives_requests = yield this.archiveRequestRepository
                .createQueryBuilder("archive_request")
                .leftJoinAndSelect("archive_request.teacher", "teacher")
                .where("archive_request.establishment = :id_ets", { id_ets: estab.id })
                .getMany();
            if (archives_requests && archives_requests.length != 0) {
                return archives_requests;
            }
            else {
                throw new NoArchiveRequestFoundInEstablishmentException_1.default(id_ets);
            }
        });
    }
    createRequest(id_ets, id_teacher, archive_request) {
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
                const newArchiveRequest = new archive_request_entity_1.Archive_request();
                newArchiveRequest.contents = archive_request.contents;
                newArchiveRequest.date_request = archive_request.date_request;
                newArchiveRequest.email = archive_request.email;
                newArchiveRequest.firstname = archive_request.firstname;
                newArchiveRequest.lastname = archive_request.lastname;
                newArchiveRequest.state = "Pending";
                newArchiveRequest.type_archivage = archive_request.type_archivage;
                newArchiveRequest.establishment = estab.id;
                newArchiveRequest.teacher = teacher;
                const created = yield this.archiveRequestRepository.save(newArchiveRequest);
                if (created) {
                    return created;
                }
                else {
                    throw new InternalErrorException_1.default();
                }
            }
            else {
                throw new TeacherWithThatIDNotExistsException_1.default(id_teacher);
            }
        });
    }
    getRequestById(id_ets, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const archive_request = yield this.archiveRequestRepository
                .createQueryBuilder("archive_request")
                .leftJoinAndSelect("archive_request.teacher", "teacher")
                .where("archive_request.id = :id", { id: id })
                .andWhere("archive_request.establishment = :id_ets", { id_ets: estab.id })
                .getOne();
            if (archive_request) {
                return archive_request;
            }
            else {
                throw new ArchiveRequestWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
    updateRequest(id_ets, id, archive_request) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const archiveRequestUpdate = yield this.archiveRequestRepository
                .createQueryBuilder("archive_request")
                .leftJoinAndSelect("archive_request.teacher", "teacher")
                .where("archive_request.id = :id", { id: id })
                .andWhere("archive_request.establishment = :id_ets", { id_ets: estab.id })
                .getOne();
            if (archiveRequestUpdate) {
                archiveRequestUpdate.contents = archive_request.contents;
                archiveRequestUpdate.date_request = archive_request.date_request;
                archiveRequestUpdate.email = archive_request.email;
                archiveRequestUpdate.firstname = archive_request.firstname;
                archiveRequestUpdate.lastname = archive_request.lastname;
                archiveRequestUpdate.state = archive_request.state;
                archiveRequestUpdate.type_archivage = archive_request.type_archivage;
                archiveRequestUpdate.establishment = estab.id;
                const result = yield this.archiveRequestRepository.save(archiveRequestUpdate);
                if (result) {
                    return result;
                }
                else {
                    throw new InternalErrorException_1.default();
                }
            }
            else {
                throw new ArchiveRequestWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
    deleteRequest(id_ets, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estab = yield this.etsRepository
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab == null) {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
            const archiveRequest = yield this.archiveRequestRepository
                .createQueryBuilder("archive_request")
                .leftJoinAndSelect("archive_request.teacher", "teacher")
                .where("archive_request.id = :id", { id: id })
                .andWhere("archive_request.establishment = :id_ets", { id_ets: estab.id })
                .getOne();
            if (archiveRequest) {
                const result = yield this.archiveRequestRepository.delete(id);
                return id;
            }
            else {
                throw new ArchiveRequestWithThatIDInEstablishmentNotExistsException_1.default(id, id_ets);
            }
        });
    }
}
exports.ArchiveRequestService = ArchiveRequestService;
