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
require("dotenv/config");
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const authentification_controller_1 = require("./modules/authentication/authentification.controller");
const emailConfirmation_controller_1 = require("./modules/email/emailConfirmation.controller");
const source_controller_1 = require("./modules/source/source.controller");
const AppDataSource_1 = require("./database/AppDataSource");
const resetPassword_controller_1 = require("./modules/password/resetPassword.controller");
const novel_controller_1 = require("./modules/novel/novel.controller");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield AppDataSource_1.AppDataSource.initialize();
    }
    catch (error) {
        console.log('Error while connecting to the database', error);
        return error;
    }
    const app = new app_1.default([
        new authentification_controller_1.AuthentificationController(),
        new emailConfirmation_controller_1.EmailConfirmationController(),
        new resetPassword_controller_1.ResetPasswordController(),
        new source_controller_1.SourceController(),
        new novel_controller_1.NovelController()
    ]);
    app.listen();
    app.get();
}))();
