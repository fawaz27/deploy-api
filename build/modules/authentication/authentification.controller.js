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
exports.AuthentificationController = void 0;
const express_1 = __importDefault(require("express"));
const authentification_service_1 = require("./authentification.service");
const validationMiddleware_1 = __importDefault(require("../../middlewares/validationMiddleware"));
const login_dto_1 = __importDefault(require("./login.dto"));
const user_dto_1 = __importDefault(require("../user/user.dto"));
const emailConfirmation_service_1 = __importDefault(require("../email/emailConfirmation.service"));
const forgotPassword_dto_1 = __importDefault(require("../password/forgotPassword.dto"));
const resetPassword_service_1 = __importDefault(require("../password/resetPassword.service"));
class AuthentificationController {
    constructor() {
        this.path = '/auth';
        this.router = express_1.default.Router();
        this.registration = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const UserData = request.body;
            //console.log(UserData);
            try {
                const created = yield this.authService.register(UserData);
                const result = yield this.emailConfirmationService.sendVerificationLink(created.email);
                response.status(201).send(created);
            }
            catch (error) {
                next(error);
            }
        });
        this.logIn = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const login = request.body;
            try {
                const { cookie, user } = yield this.authService.logIn(login);
                response.setHeader('Set-Cookie', [cookie]); //?
                response.status(200).send(user);
            }
            catch (error) {
                next(error);
            }
        });
        this.logOut = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.authService.logOut();
                response.setHeader('Set-Cookie', [result]);
                response.status(200).send();
            }
            catch (error) {
                console.log(error);
            }
        });
        this.forgotPassword = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const forgotData = request.body;
            try {
                const email = yield this.resetPasswordService.checkEmail(forgotData.email);
                const result = yield this.resetPasswordService.sendResetLink(email);
                console.log(result);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.authService = new authentification_service_1.AuthentificationService();
        this.emailConfirmationService = new emailConfirmation_service_1.default();
        this.resetPasswordService = new resetPassword_service_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, (0, validationMiddleware_1.default)(user_dto_1.default), this.registration);
        this.router.post(`${this.path}/login`, (0, validationMiddleware_1.default)(login_dto_1.default), this.logIn);
        this.router.post(`${this.path}/forgotPassword`, (0, validationMiddleware_1.default)(forgotPassword_dto_1.default), this.forgotPassword);
        this.router.post(`${this.path}/logout`, this.logOut);
    }
}
exports.AuthentificationController = AuthentificationController;
