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
const AppDataSource_1 = require("../database/AppDataSource");
const teacher_ets_entity_1 = require("../models/teacher_ets.entity");
const NotAdminAndManager_1 = __importDefault(require("../exceptions/NotAdminAndManager"));
const establishment_entity_1 = require("../models/establishment.entity");
const EstablishmentWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDNotExistsException"));
function isAdminOrManagerMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.user.role === "admin") {
            next();
        }
        else {
            const id_ets = Number(request.params.id_ets);
            const estab = yield AppDataSource_1.AppDataSource.getRepository(establishment_entity_1.Establishment)
                .createQueryBuilder("etablishment")
                .leftJoinAndSelect("etablishment.year", "year")
                .where("etablishment.id = :id ", { id: id_ets })
                .getOne();
            if (estab) {
                const isDirector = yield AppDataSource_1.AppDataSource.getRepository(teacher_ets_entity_1.Teacher_Ets)
                    .createQueryBuilder("teacher_ets")
                    .where("teacher_ets.teacherId = :teacherId ", { teacherId: request.user.id })
                    .andWhere("teacher_ets.establishmentId = :establishmentId", { establishmentId: id_ets })
                    .andWhere("teacher_ets.role = :role ", { role: 'director' })
                    .getOne();
                const isCensor = yield AppDataSource_1.AppDataSource.getRepository(teacher_ets_entity_1.Teacher_Ets)
                    .createQueryBuilder("teacher_ets")
                    .where("teacher_ets.teacherId = :teacherId ", { teacherId: request.user.id })
                    .andWhere("teacher_ets.establishmentId = :establishmentId", { establishmentId: id_ets })
                    .andWhere("teacher_ets.role = :role ", { role: 'censor' })
                    .getOne();
                if (isDirector || isCensor) {
                    next();
                }
                else {
                    next(new NotAdminAndManager_1.default(String(request.user.id), String(id_ets)));
                }
            }
            else {
                next(new EstablishmentWithThatIDNotExistsException_1.default(id_ets));
            }
        }
    });
}
exports.default = isAdminOrManagerMiddleware;
