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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const authentification_controller_1 = require("../../controllers/authentification.controller");
const bcrypt_1 = __importDefault(require("bcrypt"));
describe('The AuthenticationController', () => {
    let app;
    let authenticationController;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        authenticationController = new authentification_controller_1.AuthentificationController();
        app = new app_1.default([authenticationController]);
        authenticationController.authService.teacherRepository.findOne = jest.fn();
        authenticationController.authService.teacherRepository.create = jest.fn();
        authenticationController.authService.teacherRepository.save = jest.fn();
        authenticationController.authService.createCookie = jest.fn();
        bcrypt_1.default.compare = jest.fn();
    }));
    describe('POST /auth/register', () => {
        describe('if the email is not taken', () => {
            it('should return a 201 status and the created teacher', () => __awaiter(void 0, void 0, void 0, function* () {
                const userData = {
                    lastName: 'John ',
                    firstName: 'Smith',
                    email: 'john@smith.com',
                    hashPassword: 'strongPassword123',
                    phone: '95661715',
                    role: 'user'
                };
                authenticationController.authService.teacherRepository.findOne.mockReturnValue(undefined);
                authenticationController.authService.teacherRepository.create.mockReturnValue(Object.assign({}, userData));
                authenticationController.authService.teacherRepository.save.mockReturnValue(Object.assign(Object.assign({}, userData), { id: 0 }));
                const response = yield (0, supertest_1.default)(app.getServer())
                    .post(`${authenticationController.path}/register`)
                    .send(userData);
                let result = Object.assign(Object.assign({}, userData), { id: 0 });
                result.hashPassword = "";
                expect(response.status).toBe(201);
                expect(response.body).toEqual(result);
            }));
        });
        describe('if the email is taken', () => {
            it('should return a 400 status and an error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const userData = {
                    lastName: 'John ',
                    firstName: 'Smith',
                    email: 'john@smith.com',
                    hashPassword: 'strongPassword123',
                    phone: '95661715',
                    role: 'user'
                };
                const foundData = {
                    lastName: 'CHABI BOUKARI',
                    firstName: 'Fawaz',
                    email: 'john@smith.com',
                    hashPassword: 'Password123',
                    phone: '53896065',
                    role: 'user'
                };
                authenticationController.authService.teacherRepository.findOne.mockReturnValue(Object.assign(Object.assign({}, foundData), { id: 0 }));
                const response = yield (0, supertest_1.default)(app.getServer())
                    .post(`${authenticationController.path}/register`)
                    .send(userData);
                expect(response.status).toBe(400);
                expect(response.body.message).toEqual(`Teacher with email ${userData.email} already exists`);
            }));
        });
        describe('if the request is invalid', () => {
            it('should return a 400 status and an error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const userData = {
                    lastName: 'John ',
                    email: 'john@smith.com',
                    hashPassword: 'strongPassword123',
                    phone: '95661715',
                    role: 'user'
                };
                const response = yield (0, supertest_1.default)(app.getServer())
                    .post(`${authenticationController.path}/register`)
                    .send(userData);
                expect(response.status).toBe(400);
                expect(response.body.message).toEqual("firstName must be a string");
            }));
        });
    });
    describe('POST /auth/login', () => {
        describe('if right credentials are provided ', () => {
            it('should return a 200 status, validate headers and the result of the login', () => __awaiter(void 0, void 0, void 0, function* () {
                const login = {
                    email: 'john@smith.com',
                    password: 'strongPassword123'
                };
                const userData = {
                    lastName: 'John ',
                    firstName: 'Smith',
                    email: 'john@smith.com',
                    hashPassword: 'strongPassword123',
                    phone: '95661715',
                    role: 'user'
                };
                authenticationController.authService.teacherRepository.findOne.mockReturnValue(Object.assign(Object.assign({}, userData), { id: 0 }));
                bcrypt_1.default.compare.mockReturnValue(true);
                const tokenData = {
                    token: "codetoken",
                    expiresIn: 3600
                };
                const cookie = `Authorization = ${tokenData.token}; HttpOnly; Max-Age = ${tokenData.expiresIn}`;
                authenticationController.authService.createCookie.mockImplementation(() => cookie);
                const response = yield (0, supertest_1.default)(app.getServer())
                    .post(`${authenticationController.path}/login`)
                    .send(login);
                let result = Object.assign(Object.assign({}, userData), { id: 0 });
                result.hashPassword = "";
                expect(response.status).toBe(200);
                expect(response.body).toEqual(result);
                expect(response.headers).toHaveProperty('set-cookie');
                expect(response.headers['set-cookie']).toEqual([`Authorization = ${tokenData.token}; HttpOnly; Max-Age = 3600`]);
            }));
        });
        describe('if wrong credentials are provided ', () => {
            const loginData = {
                email: 'fa@smith.com',
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
                it('should return a 401 status', () => __awaiter(void 0, void 0, void 0, function* () {
                    authenticationController.authService.teacherRepository.findOne.mockReturnValue(undefined);
                    const response = yield (0, supertest_1.default)(app.getServer())
                        .post(`${authenticationController.path}/login`)
                        .send(loginData);
                    expect(response.status).toBe(401);
                    expect(response.body.message).toEqual("Wrong credentials provided.");
                }));
            });
            describe('when email is right and password is wrong ', () => {
                it('should return a 401 status', () => __awaiter(void 0, void 0, void 0, function* () {
                    authenticationController.authService.teacherRepository.findOne.mockReturnValue(Object.assign(Object.assign({}, userData), { id: 0 }));
                    bcrypt_1.default.compare.mockReturnValue(false);
                    const response = yield (0, supertest_1.default)(app.getServer())
                        .post(`${authenticationController.path}/login`)
                        .send(loginData);
                    expect(response.status).toBe(401);
                    expect(response.body.message).toEqual("Wrong credentials provided.");
                }));
            });
        });
        describe('if the request is invalid', () => {
            it('should return a 400 status and an error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const loginData = {
                    email: 'john@smith.com',
                };
                const userData = {
                    lastName: 'John ',
                    firstName: 'Smith',
                    email: 'john@smith.com',
                    hashPassword: 'strongPassword123',
                    phone: '95661715',
                    role: 'user'
                };
                authenticationController.authService.teacherRepository.findOne.mockReturnValue(Object.assign(Object.assign({}, userData), { id: 0 }));
                bcrypt_1.default.compare.mockReturnValue(true);
                const response = yield (0, supertest_1.default)(app.getServer())
                    .post(`${authenticationController.path}/login`)
                    .send(loginData);
                expect(response.status).toBe(400);
                expect(response.body.message).toEqual("password must be a string, please the email is required");
            }));
        });
    });
    describe('POST /auth/logout', () => {
        it('should return a 200 status and log out an authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app.getServer())
                .post(`${authenticationController.path}/logout`)
                .send();
            expect(response.status).toBe(200);
            expect(response.headers).toHaveProperty('set-cookie');
            expect(response.headers['set-cookie']).toEqual(['Authorization=;Max-age=0']);
        }));
    });
});
