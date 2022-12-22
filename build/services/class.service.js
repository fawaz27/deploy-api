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
exports.ClassService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const class_entity_1 = require("../models/class.entity");
const InternalErrorException_1 = __importDefault(require("../exceptions/InternalErrorException"));
const NoClassFoundException_1 = __importDefault(require("../exceptions/class/NoClassFoundException"));
const ClassWithThatNameAndYearAlreadyExistsException_1 = __importDefault(require("../exceptions/class/ClassWithThatNameAndYearAlreadyExistsException"));
const establishment_entity_1 = require("../models/establishment.entity");
const EstablishmentWithThatIDNotExistsException_1 = __importDefault(require("../exceptions/establishment/EstablishmentWithThatIDNotExistsException"));
const NoClassFoundExceptionInEstablishment_1 = __importDefault(require("../exceptions/class/NoClassFoundExceptionInEstablishment"));
const ClassWithThatIDNotExistsInEstablishmentException_1 = __importDefault(require("../exceptions/class/ClassWithThatIDNotExistsInEstablishmentException"));
class ClassService {
    constructor() {
        this.classRepository = AppDataSource_1.AppDataSource.getRepository(class_entity_1.Class);
        this.etsRepository = AppDataSource_1.AppDataSource.getRepository(establishment_entity_1.Establishment);
    }
    getAllClasses() {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield this.classRepository
                .createQueryBuilder("class")
                .leftJoinAndSelect("class.etablishment", "etablishment")
                .getMany();
            if (classes && classes.length != 0) {
                return classes;
            }
            else {
                throw new NoClassFoundException_1.default();
            }
        });
    }
    getAllClassesInEstablishment(id_ets) {
        return __awaiter(this, void 0, void 0, function* () {
            const establishment = yield this.etsRepository.findOneBy({ id: id_ets });
            if (establishment) {
                const classes = yield this.classRepository
                    .createQueryBuilder("class")
                    .leftJoinAndSelect("class.etablishment", "etablishment")
                    .where("etablishment.id = :id_ets", { id_ets: id_ets })
                    .getMany();
                if (classes && classes.length != 0) {
                    return classes;
                }
                else {
                    throw new NoClassFoundExceptionInEstablishment_1.default(establishment.name);
                }
            }
            else {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
        });
    }
    createClass(id_ets, classe) {
        return __awaiter(this, void 0, void 0, function* () {
            const establishment = yield this.etsRepository.findOneBy({ id: id_ets });
            if (establishment) {
                const isAlreadyExist = yield this.classRepository
                    .createQueryBuilder("class")
                    .leftJoinAndSelect("class.etablishment", "etablishment")
                    .where("class.name = :name ", { name: classe.name })
                    .andWhere("etablishment.id = :id_ets", { id_ets: id_ets })
                    .getOne();
                if (isAlreadyExist) {
                    throw new ClassWithThatNameAndYearAlreadyExistsException_1.default(classe.name, isAlreadyExist.etablishment.name);
                }
                else {
                    const newClass = new class_entity_1.Class();
                    newClass.name = classe.name;
                    newClass.etablishment = establishment;
                    const created = yield this.classRepository.save(newClass);
                    // console.log(created);
                    if (created) {
                        return created;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
            }
            else {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
        });
    }
    getClasseById(id_ets, id_class) {
        return __awaiter(this, void 0, void 0, function* () {
            const establishment = yield this.etsRepository.findOneBy({ id: id_ets });
            if (establishment) {
                const classe = yield this.classRepository
                    .createQueryBuilder("class")
                    .leftJoinAndSelect("class.etablishment", "etablishment")
                    .where("class.id = :id_class ", { id_class: id_class })
                    .andWhere("etablishment.id = :id_ets", { id_ets: id_ets })
                    .getOne();
                if (classe) {
                    return classe;
                }
                else {
                    throw new ClassWithThatIDNotExistsInEstablishmentException_1.default(id_class, establishment.name);
                }
            }
            else {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
        });
    }
    updateClasse(id_ets, classe, id_class) {
        return __awaiter(this, void 0, void 0, function* () {
            const establishment = yield this.etsRepository.findOneBy({ id: id_ets });
            if (establishment) {
                const isAlreadyExist = yield this.classRepository
                    .createQueryBuilder("class")
                    .leftJoinAndSelect("class.etablishment", "etablishment")
                    .where("class.name = :name ", { name: classe.name })
                    .andWhere("etablishment.id = :id_ets", { id_ets: id_ets })
                    .getOne();
                if (isAlreadyExist && isAlreadyExist.id != id_class) {
                    throw new ClassWithThatNameAndYearAlreadyExistsException_1.default(classe.name, isAlreadyExist.etablishment.name);
                }
                const classeUpdate = yield this.classRepository
                    .createQueryBuilder("class")
                    .leftJoinAndSelect("class.etablishment", "etablishment")
                    .where("class.id = :id_class ", { id_class: id_class })
                    .andWhere("etablishment.id = :id_ets", { id_ets: id_ets })
                    .getOne();
                if (classeUpdate) {
                    classeUpdate.name = classe.name;
                    const result = yield this.classRepository.save(classeUpdate);
                    if (result) {
                        return result;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
                else {
                    throw new ClassWithThatIDNotExistsInEstablishmentException_1.default(id_class, establishment.name);
                }
            }
            else {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
        });
    }
    deleteClasse(id_ets, id_class) {
        return __awaiter(this, void 0, void 0, function* () {
            const establishment = yield this.etsRepository.findOneBy({ id: id_ets });
            if (establishment) {
                const classe = yield this.classRepository
                    .createQueryBuilder("class")
                    .leftJoinAndSelect("class.etablishment", "etablishment")
                    .where("class.id = :id_class ", { id_class: id_class })
                    .andWhere("etablishment.id = :id_ets", { id_ets: id_ets })
                    .getOne();
                if (classe) {
                    const result = yield this.classRepository.delete(id_class);
                    if (result) {
                        //console.log(result);
                        return id_class;
                    }
                    else {
                        throw new InternalErrorException_1.default();
                    }
                }
                else {
                    throw new ClassWithThatIDNotExistsInEstablishmentException_1.default(id_class, establishment.name);
                }
            }
            else {
                throw new EstablishmentWithThatIDNotExistsException_1.default(id_ets);
            }
        });
    }
}
exports.ClassService = ClassService;
