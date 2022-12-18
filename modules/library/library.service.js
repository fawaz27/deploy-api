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
exports.LibraryService = void 0;
const AppDataSource_1 = require("../../database/AppDataSource");
const ConflictException_1 = __importDefault(require("../../exceptions/ConflictException"));
const InternalErrorException_1 = __importDefault(require("../../exceptions/InternalErrorException"));
const NotFoundException_1 = __importDefault(require("../../exceptions/NotFoundException"));
const library_entity_1 = require("./library.entity");
const user_service_1 = require("../user/user.service");
class LibraryService {
    constructor() {
        this.libraryRepository = AppDataSource_1.AppDataSource.getRepository(library_entity_1.Library);
        this.userService = new user_service_1.UserService();
    }
    addLibraryWithId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            const alreadyExist = yield this.libraryRepository
                .createQueryBuilder("library")
                .leftJoinAndSelect("library.user", "user")
                .where("user.id = :userId", { userId })
                .getOne();
            if (alreadyExist)
                throw new ConflictException_1.default('User already have a library');
            let newLibrary = new library_entity_1.Library();
            newLibrary.user = user;
            const result = yield this.libraryRepository.save(newLibrary);
            if (result)
                return result;
            else
                throw new InternalErrorException_1.default();
        });
    }
    addLibraryWithEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmail(email);
            let newLibrary = new library_entity_1.Library();
            newLibrary.user = user;
            const result = yield this.libraryRepository.save(newLibrary);
            if (result)
                return result;
            else
                throw new InternalErrorException_1.default();
        });
    }
    getAllLibrary() {
        return __awaiter(this, void 0, void 0, function* () {
            const libraries = yield this.libraryRepository.find({ relations: { user: true } });
            if (libraries && libraries.length != 0)
                return libraries;
            else
                throw new NotFoundException_1.default('No Libraries exists.');
        });
    }
    getLibraryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const library = yield this.libraryRepository.findOne({ where: { id: id }, relations: { user: true } });
            if (library)
                return library;
            else
                throw new NotFoundException_1.default('Library not found.');
        });
    }
    getLibraryOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const library = yield this.libraryRepository
                .createQueryBuilder("library")
                .leftJoinAndSelect("library.user", "user")
                .where("user.id = :userId", { userId })
                .getOne();
            if (library)
                return library;
            else
                throw new NotFoundException_1.default('Library not found.');
        });
    }
    deleteLibrary(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const libraryToDelete = yield this.libraryRepository.findOne({ where: { id: id } });
            if (libraryToDelete) {
                const result = yield this.libraryRepository.remove(libraryToDelete);
                if (result)
                    return id;
                else
                    throw new InternalErrorException_1.default();
            }
            else
                throw new NotFoundException_1.default('Library not found.');
        });
    }
}
exports.LibraryService = LibraryService;
