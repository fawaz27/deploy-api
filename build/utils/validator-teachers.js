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
Object.defineProperty(exports, "__esModule", { value: true });
const AppDataSource_1 = require("../database/AppDataSource");
const teacher_entity_1 = require("../models/teacher.entity");
const teacher_ets_entity_1 = require("../models/teacher_ets.entity");
function validator_teachers(value, id_ets) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = 0;
        for (const it of value) {
            const teacher = yield AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher).findOneBy({ id: it });
            const teacher_ets = yield AppDataSource_1.AppDataSource.getRepository(teacher_ets_entity_1.Teacher_Ets)
                .createQueryBuilder("teacher_ets")
                .leftJoinAndSelect("teacher_ets.teacher", "teacher")
                .where("teacher_ets.establishmentId = :establishmentId", { establishmentId: id_ets })
                .andWhere("teacher_ets.teacherId = :teacherId", { teacherId: teacher === null || teacher === void 0 ? void 0 : teacher.id })
                .getOne();
            if (teacher == null || teacher_ets == null) {
                id = it;
                break;
            }
        }
        return id;
    });
}
exports.default = validator_teachers;
