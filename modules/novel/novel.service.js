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
exports.NovelService = void 0;
const AppDataSource_1 = require("../../database/AppDataSource");
const InternalErrorException_1 = __importDefault(require("../../exceptions/InternalErrorException"));
const NotFoundException_1 = __importDefault(require("../../exceptions/NotFoundException"));
const novel_entity_1 = require("./novel.entity");
const library_service_1 = require("../library/library.service");
const source_service_1 = require("../source/source.service");
const user_service_1 = require("../user/user.service");
class NovelService {
    constructor() {
        this.novelRepository = AppDataSource_1.AppDataSource.getRepository(novel_entity_1.Novel);
        this.userService = new user_service_1.UserService();
        this.sourceService = new source_service_1.SourceService();
        this.libraryService = new library_service_1.LibraryService();
    }
    addNovelToLibrary(id_library, id_source, novel) {
        return __awaiter(this, void 0, void 0, function* () {
            const library = yield this.libraryService.getLibraryById(id_library);
            const source = yield this.sourceService.getSourceById(id_source);
            let newNovel = this.novelRepository.create(novel);
            newNovel.source = source;
            newNovel.library = library;
            const result = yield this.novelRepository.save(newNovel);
            if (result)
                return result;
            else
                throw new InternalErrorException_1.default();
        });
    }
    getNovelsOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            const library = yield this.libraryService.getLibraryOfUser(user.id);
            const novels = yield this.getNovelsOfLirbrary(library.id);
            return novels;
        });
    }
    getNovelsOfLirbrary(id_library) {
        return __awaiter(this, void 0, void 0, function* () {
            const novels = yield this.novelRepository
                .createQueryBuilder("novel")
                .leftJoinAndSelect("novel.source", "source")
                .leftJoinAndSelect("novel.library", "library")
                .where("library.id = :id_library", { id_library })
                .getMany();
            if (novels)
                return novels;
        });
    }
    getNovelbyId(id_novel) {
        return __awaiter(this, void 0, void 0, function* () {
            const novel = yield this.novelRepository
                .createQueryBuilder("novel")
                .leftJoinAndSelect("novel.source", "source")
                .leftJoinAndSelect("novel.library", "library")
                .where("novel.id = :id_novel", { id_novel })
                .getOne();
            if (novel)
                return novel;
            else
                throw new NotFoundException_1.default('Novel not found.');
        });
    }
    updateNovel(id_novel, novel) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifExist = yield this.novelRepository
                .createQueryBuilder("novel")
                .leftJoinAndSelect("novel.source", "source")
                .leftJoinAndSelect("novel.library", "library")
                .where("novel.id = :id_novel", { id_novel })
                .getOne();
            if (ifExist) {
                const updatedNovel = this.novelRepository.update(id_novel, novel);
                if (updatedNovel)
                    return updatedNovel;
                else
                    throw new InternalErrorException_1.default();
            }
            else
                throw new NotFoundException_1.default('Novel not found.');
        });
    }
    deleteNovel(id_novel) {
        return __awaiter(this, void 0, void 0, function* () {
            const novelToDelete = yield this.novelRepository
                .createQueryBuilder("novel")
                .leftJoinAndSelect("novel.source", "source")
                .leftJoinAndSelect("novel.library", "library")
                .where("novel.id = :id_novel", { id_novel })
                .getOne();
            if (novelToDelete) {
                const result = yield this.novelRepository.remove(novelToDelete);
                if (result)
                    return id_novel;
                else
                    throw new InternalErrorException_1.default();
            }
            else
                throw new NotFoundException_1.default('Novel not found.');
        });
    }
}
exports.NovelService = NovelService;
