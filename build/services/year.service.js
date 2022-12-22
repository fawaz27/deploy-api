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
exports.YearService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const year_academic_entity_1 = require("../models/year_academic.entity");
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const NoYearFoundException_1 = __importDefault(require("../exceptions/year/NoYearFoundException"));
const YearWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/year/YearWithThatIDNotExistsException"));
const YearWithThatNameAlreadyExistsException_1 = __importDefault(require("../exceptions/year/YearWithThatNameAlreadyExistsException"));
const YearWithThatNameNotExistsException_1 = __importDefault(require("../exceptions/year/YearWithThatNameNotExistsException"));
const validator_year_academic_1 = __importDefault(require("../utils/validator-year_academic"));
const FormatYearException_1 = __importDefault(require("../exceptions/year/FormatYearException"));
class YearService {
    constructor() {
        this.yearRepository = AppDataSource_1.AppDataSource.getRepository(year_academic_entity_1.Year_Academic);
    }
    getAllYears() {
        return __awaiter(this, void 0, void 0, function* () {
            const years = yield this.yearRepository.find();
            if (years && years.length != 0) {
                return years;
            }
            else {
                throw new NoYearFoundException_1.default();
            }
        });
    }
    createYear(year) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, validator_year_academic_1.default)(year.year)) {
                throw new FormatYearException_1.default();
            }
            else {
                const isAlreadyExist = yield this.yearRepository
                    .createQueryBuilder("year")
                    .where("year.year = :name ", { name: year.year })
                    .getOne();
                if (isAlreadyExist) {
                    throw new YearWithThatNameAlreadyExistsException_1.default(year.year);
                }
                else {
                    const newYear = new year_academic_entity_1.Year_Academic();
                    newYear.year = year.year.trim();
                    const created = yield this.yearRepository.save(newYear);
                    // console.log(created);
                    if (created) {
                        return created;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
            }
        });
    }
    getYearById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const year = yield this.yearRepository.findOne({ where: { id: id } });
            if (year) {
                return year;
            }
            else {
                throw new YearWithThatIDNotExistsException_1.default(id);
            }
        });
    }
    getYearByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const year = yield this.yearRepository.findOne({ where: { year: `${name}` } });
            if (year) {
                return year;
            }
            else {
                throw new YearWithThatNameNotExistsException_1.default(name);
            }
        });
    }
    updateYear(year, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, validator_year_academic_1.default)(year.year)) {
                throw new FormatYearException_1.default();
            }
            else {
                const yearUpdate = yield this.yearRepository.findOne({ where: { id: id } });
                if (yearUpdate) {
                    const isAlreadyExist = yield this.yearRepository
                        .createQueryBuilder("year")
                        .where("year.year = :name ", { name: year.year })
                        .getOne();
                    if (isAlreadyExist && yearUpdate.year != year.year) {
                        throw new YearWithThatNameAlreadyExistsException_1.default(year.year);
                    }
                    else {
                        yearUpdate.year = year.year;
                        const result = yield this.yearRepository.save(yearUpdate);
                        if (result) {
                            return result;
                        }
                        else {
                            throw new InternalErrorException_1.default();
                        }
                    }
                }
                else {
                    throw new YearWithThatIDNotExistsException_1.default(id);
                }
            }
        });
    }
    deleteYear(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const year = yield this.yearRepository.findOneBy({ id: id });
            if (year) {
                const result = yield this.yearRepository.delete(id);
                if (result) {
                    return id;
                }
                else {
                    throw new InternalErrorException_1.default();
                }
            }
            else {
                throw new YearWithThatIDNotExistsException_1.default(id);
            }
        });
    }
}
exports.YearService = YearService;
