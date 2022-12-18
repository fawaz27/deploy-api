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
exports.AuthentificationService = void 0;
const AppDataSource_1 = require("../../database/AppDataSource");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const WrongCredentialsException_1 = __importDefault(require("../../exceptions/WrongCredentialsException"));
const InternalErrorException_1 = __importDefault(require("../../exceptions/InternalErrorException"));
const user_entity_1 = require("../user/user.entity");
const ConflictException_1 = __importDefault(require("../../exceptions/ConflictException"));
class AuthentificationService {
    constructor() {
        this.userRepository = AppDataSource_1.AppDataSource.getRepository(user_entity_1.User);
        this.userRepository = AppDataSource_1.AppDataSource.getRepository(user_entity_1.User);
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result1 = yield this.userRepository.findOne({ where: { email: user.email } });
            const result2 = yield this.userRepository.findOne({ where: { username: user.username } });
            if (result1) {
                throw new ConflictException_1.default(`User with email ${user.email} already exists.`);
            }
            else if (result2) {
                throw new ConflictException_1.default(`User with username ${user.username} already exists.`);
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
                user.password = hashedPassword;
                const newUser = this.userRepository.create(user);
                let created = yield this.userRepository.save(newUser);
                // //console.log(created);
                // return created;            
                if (created) {
                    created.password = "";
                    return created;
                }
                else {
                    throw new InternalErrorException_1.default();
                }
            }
        });
    }
    logIn(login) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(login);
            const result1 = yield this.userRepository.findOne(({ where: { email: `${login.login}` } }));
            const result2 = yield this.userRepository.findOne(({ where: { username: login.login } }));
            let user = null;
            if (result1)
                user = result1;
            else
                user = result2;
            console.log(user);
            if (user) {
                const isPassword = yield bcrypt_1.default.compare(login.password, user.password);
                if (isPassword) {
                    user.password = "";
                    const tokenData = this.createToken(user);
                    const cookie = this.createCookie(tokenData);
                    return { cookie, user };
                }
                else {
                    throw new WrongCredentialsException_1.default();
                }
            }
            else {
                throw new WrongCredentialsException_1.default();
            }
        });
    }
    logOut() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'Authorization=;Max-age=0';
        });
    }
    createToken(user) {
        const expiresIn = 3600;
        const secret = process.env.JWT_KEY;
        const dataStoredInToken = {
            _id: String(user.id),
        };
        return {
            expiresIn,
            token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn: `${expiresIn}s` }),
        };
    }
    createCookie(tokenData) {
        return `Authorization = ${tokenData.token}; HttpOnly; Max-Age = ${tokenData.expiresIn}`;
    }
}
exports.AuthentificationService = AuthentificationService;
