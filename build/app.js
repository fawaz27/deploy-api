"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
// import swaggerDocument from './docs/swaggerDocument';
const cors_1 = __importDefault(require("cors"));
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    listen() {
        const port = process.env.PORT || 3000;
        const hostname = process.env.API_URL || '127.0.0.1';
        this.app.listen(Number(port), hostname, () => {
            console.log(`Example app listening at http://${hostname}:${port}`);
        });
    }
    getServer() {
        return this.app;
    }
    get() {
        this.app.get('/', (request, response) => {
            response.send('Le serveur est bien configuré, bravo!!');
        });
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, morgan_1.default)("tiny"));
        this.app.use(express_1.default.static("public"));
        // this.app.use(
        //   '/api-docs',
        //   swaggerUi.serve, 
        //   swaggerUi.setup(swaggerDocument,{ explorer: true })
        // );
        this.app.use((0, cors_1.default)());
    }
    initializeErrorHandling() {
        this.app.use(errorMiddleware_1.default);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            //console.log(controller.getRouter())
            this.app.use('/', controller.router);
        });
    }
}
exports.default = App;
