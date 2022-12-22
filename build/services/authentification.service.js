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
const AppDataSource_1 = require("../database/AppDataSource");
const teacher_entity_1 = require("../models/teacher.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TeacherWithThatEmailAlreadyExistsException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatEmailAlreadyExistsException"));
const WrongCredentialsException_1 = __importDefault(require("../exceptions/WrongCredentialsException"));
class AuthentificationService {
    constructor() {
        this.teacherRepository = AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
        this.teacherRepository = AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
    }
    register(teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.teacherRepository.findOne({ where: { email: teacher.email } });
            if (result) {
                throw new TeacherWithThatEmailAlreadyExistsException_1.default(teacher.email);
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(teacher.hashPassword, 10);
                teacher.hashPassword = hashedPassword;
                const newTeacher = this.teacherRepository.create(teacher);
                let created = yield this.teacherRepository.save(newTeacher);
                created.hashPassword = "";
                //console.log(created);
                return created;
                // if (created) {
                //     return created;
                // }
                // else{
                //     throw new InternalErrorException();
                // }
            }
        });
    }
    logIn(login) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(login);
            const result = yield this.teacherRepository.findOne(({ where: { email: `${login.email}` } }));
            //console.log(result);
            if (result) {
                const isPassword = yield bcrypt_1.default.compare(login.password, result.hashPassword);
                if (isPassword) {
                    result.hashPassword = "";
                    const tokenData = this.createToken(result, `${process.env.JWT_KEY}`, 3600);
                    const cookie = this.createCookie(tokenData);
                    return { cookie, result };
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
        return 'Authorization=;Max-age=0';
    }
    createToken(user, secret, expiresIn) {
        const dataStoredInToken = {
            _id: String(user.id),
        };
        return {
            expiresIn,
            token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
    createCookie(tokenData) {
        return `Authorization = ${tokenData.token}; HttpOnly; Max-Age = ${tokenData.expiresIn}`;
    }
}
exports.AuthentificationService = AuthentificationService;
