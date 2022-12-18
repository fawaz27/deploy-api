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
exports.EmailConfirmationController = void 0;
const express_1 = __importDefault(require("express"));
const confirmEmail_dto_1 = __importDefault(require("./confirmEmail.dto"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validationMiddleware_1 = __importDefault(require("../../middlewares/validationMiddleware"));
const emailConfirmation_service_1 = __importDefault(require("./emailConfirmation.service"));
const library_service_1 = require("../library/library.service");
class EmailConfirmationController {
    constructor() {
        this.path = '/email-confirmation';
        this.router = express_1.default.Router();
        this.confirm = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const confirmationData = request.body;
            try {
                const email = yield this.emailConfirmationService.decodeConfirmationToken(confirmationData.token);
                const result = yield this.emailConfirmationService.confirmEmail(email);
                yield this.libraryService.addLibraryWithEmail(email);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.resendConfirmationLink = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = request.user.id;
            try {
                const result = yield this.emailConfirmationService.resendConfirmationLink(userId);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.emailConfirmationService = new emailConfirmation_service_1.default();
        this.libraryService = new library_service_1.LibraryService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/confirm`, (0, validationMiddleware_1.default)(confirmEmail_dto_1.default), this.confirm);
        this.router
            .post(`${this.path}/resend-confirmation-link`, authMiddleware_1.default, this.resendConfirmationLink);
    }
}
exports.EmailConfirmationController = EmailConfirmationController;
