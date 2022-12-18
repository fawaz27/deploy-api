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
const email_service_1 = __importDefault(require("./email.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BadRequestException_1 = __importDefault(require("../../exceptions/BadRequestException"));
const user_service_1 = require("../user/user.service");
class EmailConfirmationService {
    constructor() {
        this.emailService = new email_service_1.default();
        this.userService = new user_service_1.UserService();
    }
    sendVerificationLink(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { email };
            const expiresIn = process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME;
            const secret = process.env.JWT_VERIFICATION_TOKEN_SECRET;
            const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: `${expiresIn}s` });
            const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;
            const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
            const result = yield this.emailService.sendMail({
                from: `"NovelsTranslate" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Email confirmation",
                text: text
            });
            console.log(result);
            console.log('-------------------------------------------------------------');
            console.log(token);
            return result;
        });
    }
    confirmEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmail(email);
            if (user === null || user === void 0 ? void 0 : user.isEmailConfirmed) {
                throw new BadRequestException_1.default('Email already confirmed');
            }
            const result = yield this.userService.markEmailAsConfirmed(email);
            console.log(result);
            return result;
        });
    }
    decodeConfirmationToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = process.env.JWT_VERIFICATION_TOKEN_SECRET;
            try {
                const payload = jsonwebtoken_1.default.verify(token, secret);
                if (typeof payload === 'object' && 'email' in payload)
                    return payload.email;
                throw new BadRequestException_1.default('Error');
            }
            catch (error) {
                if ((error === null || error === void 0 ? void 0 : error.name) === 'TokenExpiredError') {
                    throw new BadRequestException_1.default('Email confirmation token expired');
                }
                throw new BadRequestException_1.default('Bad confirmation token');
            }
        });
    }
    resendConfirmationLink(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            if (user.isEmailConfirmed) {
                throw new BadRequestException_1.default('Email already confirmed');
            }
            const result = yield this.sendVerificationLink(user.email);
            console.log(result);
            return result;
        });
    }
}
exports.default = EmailConfirmationService;
