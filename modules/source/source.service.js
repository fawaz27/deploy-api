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
exports.SourceService = void 0;
const AppDataSource_1 = require("../../database/AppDataSource");
const InternalErrorException_1 = __importDefault(require("../../exceptions/InternalErrorException"));
const NotFoundException_1 = __importDefault(require("../../exceptions/NotFoundException"));
const source_entity_1 = require("./source.entity");
class SourceService {
    constructor() {
        this.sourceRepository = AppDataSource_1.AppDataSource.getRepository(source_entity_1.Source);
    }
    addSource(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSource = this.sourceRepository.create(source);
            const result = yield this.sourceRepository.save(newSource);
            if (result)
                return result;
            else
                throw new InternalErrorException_1.default();
        });
    }
    getAllSources() {
        return __awaiter(this, void 0, void 0, function* () {
            const sources = yield this.sourceRepository.find();
            if (sources)
                return sources;
        });
    }
    getSourceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const source = yield this.sourceRepository.findOne({ where: { id: id } });
            if (source)
                return source;
            else
                throw new NotFoundException_1.default('Source not found.');
        });
    }
    updateSource(id, source) {
        return __awaiter(this, void 0, void 0, function* () {
            const validId = yield this.sourceRepository.findOne({ where: { id: id } });
            if (validId) {
                const updatedSource = yield this.sourceRepository.update(id, source);
                if (updatedSource)
                    return updatedSource;
                else
                    throw new InternalErrorException_1.default();
            }
            else
                throw new NotFoundException_1.default('Source not found.');
        });
    }
    deleteSource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sourceToDelete = yield this.sourceRepository.findOne({ where: { id: id } });
            if (sourceToDelete) {
                const result = yield this.sourceRepository.remove(sourceToDelete);
                if (result)
                    return id;
                else
                    throw new InternalErrorException_1.default();
            }
            else
                throw new NotFoundException_1.default('Source not found.');
        });
    }
}
exports.SourceService = SourceService;
