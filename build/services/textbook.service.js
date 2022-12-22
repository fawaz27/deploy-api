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
exports.TextbookService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const textbook_entity_1 = require("../models/textbook.entity");
const class_entity_1 = require("../models/class.entity");
const year_academic_entity_1 = require("../models/year_academic.entity");
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const NoTextbookFoundForClassException_1 = __importDefault(require("../exceptions/textbook/NoTextbookFoundForClassException"));
const ClassWithThatNameAlreadyExistsException_1 = __importDefault(require("../exceptions/textbook/ClassWithThatNameAlreadyExistsException"));
const ClassWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/class/ClassWithThatIDNotExistsException"));
const YearWithThatNameNotExistsException_1 = __importDefault(require("../exceptions/year/YearWithThatNameNotExistsException"));
const TextbookWithThatIDNotExistsInClassException_1 = __importDefault(require("../exceptions/textbook/TextbookWithThatIDNotExistsInClassException"));
class TextbookService {
    constructor() {
        this.textbookRepository = AppDataSource_1.AppDataSource.getRepository(textbook_entity_1.Textbook);
        this.classRepository = AppDataSource_1.AppDataSource.getRepository(class_entity_1.Class);
        this.yearRepository = AppDataSource_1.AppDataSource.getRepository(year_academic_entity_1.Year_Academic);
    }
    getAllTextbooks(id_class) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const textbooks = yield this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe", "class")
                    .leftJoinAndSelect("textbook.year_academic", "year")
                    .where("class.id = :id_class", { id_class: id_class })
                    .getMany();
                if (textbooks && textbooks.length != 0) {
                    return textbooks;
                }
                else {
                    throw new NoTextbookFoundForClassException_1.default(classe.name);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    createTextbook(id_class, textbook) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const year = yield this.yearRepository.findOneBy({ year: `${textbook.yearAcademic}` });
                if (year) {
                    const isAlreadyExist = yield this.textbookRepository
                        .createQueryBuilder("textbook")
                        .leftJoinAndSelect("textbook.classe", "class")
                        .leftJoinAndSelect("textbook.year_academic", "year")
                        .where("class.id = :id_class", { id_class: classe.id })
                        .andWhere("year.id = :id_year", { id_year: year.id })
                        .getOne();
                    if (isAlreadyExist) {
                        throw new ClassWithThatNameAlreadyExistsException_1.default(isAlreadyExist.classe.name, isAlreadyExist.year_academic.year);
                    }
                    else {
                        const newTextbook = new textbook_entity_1.Textbook();
                        newTextbook.classe = classe;
                        newTextbook.year_academic = year;
                        newTextbook.title = "Textbook - " + classe.name + " - " + year.year;
                        const created = yield this.textbookRepository.save(newTextbook);
                        if (created) {
                            return created;
                        }
                        else {
                            throw new InternalErrorException_1.default();
                        }
                    }
                }
                else {
                    throw new YearWithThatNameNotExistsException_1.default(textbook.yearAcademic);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    getTextbookById(id_class, id_textbook) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const textbook = yield this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe", "class")
                    .leftJoinAndSelect("textbook.year_academic", "year_academic")
                    .where("textbook.id = :id_textbook", { id_textbook: id_textbook })
                    .andWhere("class.id = :id_class", { id_class: classe.id })
                    .getOne();
                if (textbook) {
                    return textbook;
                }
                else {
                    throw new TextbookWithThatIDNotExistsInClassException_1.default(id_textbook, classe.name);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    updateTextbook(textbook, id_class, id_textbook) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const textbookUpdate = yield this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe", "class")
                    .leftJoinAndSelect("textbook.year_academic", "year_academic")
                    .where("textbook.id = :id_textbook", { id_textbook: id_textbook })
                    .andWhere("class.id = :id_class", { id_class: classe.id })
                    .getOne();
                if (textbookUpdate) {
                    const year = yield this.yearRepository.findOneBy({ year: `${textbook.yearAcademic}` });
                    if (year) {
                        const isAlreadyExist = yield this.textbookRepository
                            .createQueryBuilder("textbook")
                            .leftJoinAndSelect("textbook.classe", "class")
                            .leftJoinAndSelect("textbook.year_academic", "year")
                            .where("class.id = :id_class", { id_class: classe.id })
                            .andWhere("year.id = :id_year", { id_year: year.id })
                            .getOne();
                        if (isAlreadyExist && textbookUpdate.year_academic.year != textbook.yearAcademic) {
                            throw new ClassWithThatNameAlreadyExistsException_1.default(isAlreadyExist.classe.name, isAlreadyExist.year_academic.year);
                        }
                        else {
                            textbookUpdate.year_academic = year;
                            textbookUpdate.title = "Textbook - " + classe.name + " - " + year.year;
                            const result = yield this.textbookRepository.save(textbookUpdate);
                            if (result) {
                                return result;
                            }
                            else {
                                throw new InternalErrorException_1.default();
                            }
                        }
                    }
                    else {
                        throw new YearWithThatNameNotExistsException_1.default(textbook.yearAcademic);
                    }
                }
                else {
                    throw new TextbookWithThatIDNotExistsInClassException_1.default(id_textbook, classe.name);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
    deleteTextbook(id_class, id_textbook) {
        return __awaiter(this, void 0, void 0, function* () {
            const classe = yield this.classRepository.findOneBy({ id: id_class });
            if (classe) {
                const textbook = yield this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe", "class")
                    .where("textbook.id = :id_textbook", { id_textbook: id_textbook })
                    .andWhere("class.id = :id_class", { id_class: classe.id })
                    .getOne();
                if (textbook) {
                    const result = yield this.textbookRepository.delete(id_textbook);
                    return id_textbook;
                }
                else {
                    throw new TextbookWithThatIDNotExistsInClassException_1.default(id_textbook, classe.name);
                }
            }
            else {
                throw new ClassWithThatIDNotExistsException_1.default(id_class);
            }
        });
    }
}
exports.TextbookService = TextbookService;
