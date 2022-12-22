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
const TeacherWithThatEmailAlreadyExistsException_1 = __importDefault(require("../../exceptions/teacher/TeacherWithThatEmailAlreadyExistsException"));
const authentification_service_1 = require("../../services/authentification.service");
const WrongCredentialsException_1 = __importDefault(require("../../exceptions/WrongCredentialsException"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const teacher_entity_1 = require("../../models/teacher.entity");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('The Authentifiction Service', () => {
    let authentificationService;
    beforeEach(() => {
        authentificationService = new authentification_service_1.AuthentificationService();
        authentificationService.teacherRepository.findOne = jest.fn();
        authentificationService.teacherRepository.create = jest.fn();
        authentificationService.teacherRepository.save = jest.fn();
        bcrypt_1.default.compare = jest.fn();
    });
    describe('when registering a user', () => {
        describe('if the email is already taken', () => {
            it('should throw an error', () => __awaiter(void 0, void 0, void 0, function* () {
                const userData = {
                    lastName: 'John ',
                    firstName: 'Smith',
                    email: 'john@smith.com',
                    hashPassword: 'strongPassword123',
                    phone: '95661715',
                    role: 'user'
                };
                authentificationService.teacherRepository.findOne.mockReturnValue(userData);
                yield expect(authentificationService.register(userData))
                    .rejects.toMatchObject(new TeacherWithThatEmailAlreadyExistsException_1.default(userData.email));
            }));
        });
        describe('if the email is not taken', () => {
            it('should not throw an error', () => __awaiter(void 0, void 0, void 0, function* () {
                const userData = {
                    lastName: 'John',
                    firstName: 'Smith',
                    email: 'john@smith.com',
                    hashPassword: 'strongPassword123',
                    phone: '95661715',
                    role: 'user'
                };
                authentificationService.teacherRepository.findOne.mockReturnValue(undefined);
                authentificationService.teacherRepository.create.mockReturnValue(Object.assign({}, userData));
                authentificationService.teacherRepository.save.mockReturnValue(Object.assign(Object.assign({}, userData), { id: 0 }));
                const result = yield authentificationService.register(userData);
                expect(result.email).toEqual(Object.assign(Object.assign({}, userData), { id: 0 }).email);
                expect(result.lastName).toEqual(Object.assign(Object.assign({}, userData), { id: 0 }).lastName);
                expect(result.firstName).toEqual(Object.assign(Object.assign({}, userData), { id: 0 }).firstName);
                expect(result.phone).toEqual(Object.assign(Object.assign({}, userData), { id: 0 }).phone);
                expect(result.role).toEqual(Object.assign(Object.assign({}, userData), { id: 0 }).role);
                expect(result.id).toEqual(Object.assign(Object.assign({}, userData), { id: 0 }).id);
            }));
        });
    });
    describe('when create a token ', () => {
        it('should create a valid token', () => {
            const user = new teacher_entity_1.Teacher();
            const secret = "process.env.JWT_KEY";
            const expiresIn = 3600;
            user.id = 1;
            const tokenData = authentificationService.createToken(user, secret, expiresIn);
            expect(tokenData).toHaveProperty('expiresIn');
            expect(tokenData).toHaveProperty('token');
            expect(typeof tokenData.token).toBe('string');
            expect(typeof tokenData.expiresIn).toBe('number');
            expect(tokenData.expiresIn).toEqual(expiresIn);
        });
        it('should store user id in the token', () => {
            const user = new teacher_entity_1.Teacher();
            user.id = 1;
            const secret = "process.env.JWT_KEY";
            const expiresIn = 3600;
            const tokenData = authentificationService.createToken(user, secret, expiresIn);
            const decodedToken = jsonwebtoken_1.default.verify(tokenData.token, secret);
            expect(decodedToken).toHaveProperty('_id');
            expect(decodedToken._id).toBe(String(user.id));
        });
    });
    describe('when create a cookie ', () => {
        const tokenData = {
            token: '',
            expiresIn: 1
        };
        it('should return a string ', () => {
            expect(typeof authentificationService.createCookie(tokenData)).toEqual('string');
        });
    });
    describe('when a user login', () => {
        describe('when the user provided wrong credentials', () => {
            const loginData = {
                email: 'john@smith.com',
                password: 'strongPassword123'
            };
            const userData = {
                lastName: 'John',
                firstName: 'Smith',
                email: 'john@smith.com',
                hashPassword: 'strongPassword123',
                phone: '95661715',
                role: 'user'
            };
            describe('when email is wrong', () => {
                it('should throw an error', () => __awaiter(void 0, void 0, void 0, function* () {
                    authentificationService.teacherRepository.findOne.mockReturnValue(undefined);
                    yield expect(authentificationService.logIn(loginData))
                        .rejects.toMatchObject(new WrongCredentialsException_1.default());
                }));
            });
            describe('when email is right and password is wrong', () => {
                it('should throw an error', () => __awaiter(void 0, void 0, void 0, function* () {
                    authentificationService.teacherRepository.findOne.mockReturnValue(userData);
                    bcrypt_1.default.compare.mockReturnValue(false);
                    yield expect(authentificationService.logIn(loginData))
                        .rejects.toMatchObject(new WrongCredentialsException_1.default());
                }));
            });
            describe('when email and password is wrong', () => {
                it('should throw an error', () => __awaiter(void 0, void 0, void 0, function* () {
                    authentificationService.teacherRepository.findOne.mockReturnValue(undefined);
                    bcrypt_1.default.compare.mockReturnValue(false);
                    yield expect(authentificationService.logIn(loginData))
                        .rejects.toMatchObject(new WrongCredentialsException_1.default());
                }));
            });
        });
        describe('when user provided correct credentials', () => {
            it('should not throw an error', () => __awaiter(void 0, void 0, void 0, function* () {
                const loginData = {
                    email: 'john@smith.com',
                    password: 'strongPassword123'
                };
                const userData = {
                    lastName: 'John',
                    firstName: 'Smith',
                    email: 'john@smith.com',
                    hashPassword: 'strongPassword123',
                    phone: '95661715',
                    role: 'user'
                };
                authentificationService.teacherRepository.findOne.mockReturnValue(Object.assign(Object.assign({}, userData), { id: 0 }));
                bcrypt_1.default.compare.mockReturnValue(true);
                const result = yield authentificationService.logIn(loginData);
                expect(result).toEqual({
                    cookie: expect.any(String),
                    result: {
                        id: expect.any(Number),
                        firstName: 'Smith',
                        lastName: 'John',
                        email: 'john@smith.com',
                        hashPassword: '',
                        phone: '95661715',
                        role: 'user'
                    },
                });
            }));
        });
    });
    describe('when a user logout', () => {
        it('should return a string ', () => {
            expect(typeof authentificationService.logOut()).toEqual('string');
        });
    });
});
