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
exports.SubscriptionService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const TeacherWithThatEmailNotExistsException_1 = __importDefault(require("../exceptions/teacher/TeacherWithThatEmailNotExistsException"));
const teacher_entity_1 = require("../models/teacher.entity");
const email_service_1 = __importDefault(require("./email.service"));
class SubscriptionService {
    constructor() {
        this.emailService = new email_service_1.default();
        this.teacherRepository = AppDataSource_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
    }
    requestSubscription(requestSubscription, emailAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield this.teacherRepository.findOneBy({ email: `${requestSubscription.email}` });
            if (teacher == null)
                throw new TeacherWithThatEmailNotExistsException_1.default(requestSubscription.email);
            const text = `User with name ${teacher.firstName} ${teacher.lastName} and mail ${teacher.email}  submit a subscription request for the establishment "${requestSubscription.establishmentName}" for the academic year(s) "${requestSubscription.years}".`;
            const info = yield this.emailService.sendMail({
                from: `"IWE" <${process.env.EMAIL_USER}>`,
                to: emailAdmin,
                subject: "Subscription request",
                text: text
            });
            return info;
        });
    }
}
exports.SubscriptionService = SubscriptionService;
