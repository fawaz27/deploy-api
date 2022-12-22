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
exports.SubscriptionController = void 0;
const express_1 = __importDefault(require("express"));
const subscription_dto_1 = __importDefault(require("../dto/subscription.dto"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const validationMiddleware_1 = __importDefault(require("../middlewares/validationMiddleware"));
const subscription_service_1 = require("../services/subscription.service");
const teacher_service_1 = require("../services/teacher.service");
class SubscriptionController {
    constructor() {
        this.path = '/subscription';
        this.router = express_1.default.Router();
        this.sendRequestSubscription = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const RequestData = request.body;
                const emailAdmin = (yield this.teacherService.getAdminByEmail(String(process.env.EMAIL_ADMIN))).email;
                const result = yield this.subscriptionService.requestSubscription(RequestData, emailAdmin);
                response.status(200).send(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.subscriptionService = new subscription_service_1.SubscriptionService();
        this.teacherService = new teacher_service_1.TeacherService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .all(`${this.path}`, authMiddleware_1.default)
            .post(this.path, (0, validationMiddleware_1.default)(subscription_dto_1.default), this.sendRequestSubscription);
    }
}
exports.SubscriptionController = SubscriptionController;
