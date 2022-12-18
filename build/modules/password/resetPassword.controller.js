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
exports.ResetPasswordController = void 0;
const express_1 = __importDefault(require("express"));
const resetPassword_dto_1 = __importDefault(require("./resetPassword.dto"));
const validationMiddleware_1 = __importDefault(require("../../middlewares/validationMiddleware"));
const resetPassword_service_1 = __importDefault(require("./resetPassword.service"));
class ResetPasswordController {
    constructor() {
        this.path = '/reset-password';
        this.router = express_1.default.Router();
        this.reset = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const resetData = request.body;
            try {
                const email = yield this.resetPasswordService.decodeResetToken(resetData.token);
                const result = yield this.resetPasswordService.resetPassword(email, resetData.password);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.resetPasswordService = new resetPassword_service_1.default;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, validationMiddleware_1.default)(resetPassword_dto_1.default), this.reset);
    }
}
exports.ResetPasswordController = ResetPasswordController;
