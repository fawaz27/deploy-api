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
exports.UserService = void 0;
const AppDataSource_1 = require("../../database/AppDataSource");
const user_entity_1 = require("./user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const NotFoundException_1 = __importDefault(require("../../exceptions/NotFoundException"));
class UserService {
    constructor() {
        this.userRepository = AppDataSource_1.AppDataSource.getRepository(user_entity_1.User);
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne(({ where: { email: email } }));
            if (user)
                return user;
            else
                throw new NotFoundException_1.default(`User with email ${email} not found.`);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne(({ where: { id: id } }));
            if (user)
                return user;
            else
                throw new NotFoundException_1.default('User not found.');
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find();
            if (users)
                return users;
        });
    }
    markEmailAsConfirmed(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.update({ email }, {
                isEmailConfirmed: true
            });
            return result;
        });
    }
    updatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const result = yield this.userRepository.update({ email }, {
                password: hashedPassword
            });
            return result;
        });
    }
}
exports.UserService = UserService;
