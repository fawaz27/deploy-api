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
const YearWithThatNameNotExistsException_1 = __importDefault(require("../exceptions/year/YearWithThatNameNotExistsException"));
const establishment_entity_1 = require("../models/establishment.entity");
const year_academic_entity_1 = require("../models/year_academic.entity");
function validateSubscriptionMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_ets = Number(request.params.id_ets);
        const year_now = process.env.YEAR;
        const year = yield AppDataSource_1.AppDataSource.getRepository(year_academic_entity_1.Year_Academic).findOne({ where: { year: `${year_now}` } });
        if (year == null) {
            throw new YearWithThatNameNotExistsException_1.default(year_now);
        }
        const estab = yield AppDataSource_1.AppDataSource.getRepository(establishment_entity_1.Establishment)
            .createQueryBuilder("etablishment")
            .leftJoinAndSelect("etablishment.year", "year")
            .where("etablishment.id = :id ", { id: id_ets })
            .andWhere("year.id = :id_year", { id_year: year.id })
            .getOne();
    });
}
