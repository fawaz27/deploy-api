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
const ForbiddenException_1 = __importDefault(require("../exceptions/ForbiddenException"));
function adminMiddleware(request, response, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(request.user.role);
        if (((_a = request.user) === null || _a === void 0 ? void 0 : _a.role) != "admin")
            next(new ForbiddenException_1.default('Sorry only the admin has sufficient rights to access this resource.'));
        next();
    });
}
exports.default = adminMiddleware;
