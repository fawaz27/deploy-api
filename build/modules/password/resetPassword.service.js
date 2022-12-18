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
const BadRequestException_1 = __importDefault(require("../../exceptions/BadRequestException"));
const email_service_1 = __importDefault(require("../email/email.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../user/user.service");
class ResetPasswordService {
    constructor() {
        this.emailService = new email_service_1.default();
        this.userService = new user_service_1.UserService();
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmail(email);
            if (user)
                return user.email;
            else
                throw new BadRequestException_1.default('Invalid user email');
        });
    }
    sendResetLink(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { email };
            const expiresIn = process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRATION_TIME;
            const secret = process.env.JWT_RESET_PASSWORD_TOKEN_SECRET;
            const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: `${expiresIn}s` });
            const url = `${process.env.EMAIL_RESET_PASSWORD_URL}?token=${token}`;
            const text = `Welcome to the application. To reset your password, click here: ${url}`;
            const result = yield this.emailService.sendMail({
                from: '"NovelsTranslate" <boukarifawas27@gmail.com>',
                to: email,
                subject: "Reset password",
                text: text
            });
            console.log(result);
            return result;
        });
    }
    decodeResetToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = process.env.JWT_RESET_PASSWORD_TOKEN_SECRET;
            try {
                const payload = jsonwebtoken_1.default.verify(token, secret);
                if (typeof payload === 'object' && 'email' in payload)
                    return payload.email;
                throw new BadRequestException_1.default('Error');
            }
            catch (error) {
                if ((error === null || error === void 0 ? void 0 : error.name) === 'TokenExpiredError') {
                    throw new BadRequestException_1.default('Reset password token expired');
                }
                throw new BadRequestException_1.default('Bad reset password token');
            }
        });
    }
    //vérifier quand l'email n'existe pas
    resetPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.updatePassword(email, password);
            console.log(result);
            return result;
        });
    }
}
exports.default = ResetPasswordService;
