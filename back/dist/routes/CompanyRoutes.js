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
const dotenv_1 = __importDefault(require("dotenv"));
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const DataBase_1 = __importDefault(require("./DataBase"));
const LoginRoute_1 = require("./LoginRoute");
const ServiceRoutes_1 = require("./ServiceRoutes");
const EmployeeRoutes_1 = require("./EmployeeRoutes");
require('dotenv').config({ path: '.env' });
class CompanyRoutes {
    constructor() {
        this.databaseUrl = process.env.MONGODB_URL || '';
        dotenv_1.default.config(); // Ensure environment variables are loaded at the start
        this.fastify = (0, fastify_1.default)({ logger: true });
        this.dataBase = new DataBase_1.default(this.databaseUrl);
        this.registerPlugins(); // Register plugins before starting the server
        this.init(); // Initialize the server
        this.routes(); // Define routes
    }
    getFastify() {
        return this.fastify;
    }
    getDatabase() {
        return this.dataBase;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dataBase.connect();
        });
    }
    listen() {
        const port = process.env.PORT || 3000;
        this.fastify.listen(port, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Server is running at ${address}`);
        });
    }
    registerPlugins() {
        this.fastify.register(cors_1.default, {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            exposedHeaders: ['Content-Range', 'X-Content-Range'],
            credentials: true
        });
        this.fastify.register(jwt_1.default, {
            secret: process.env.SECRET_KEY || 'supersecret'
        });
    }
    routes() {
        this.fastify.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send({ hello: 'world' });
        }));
        this.fastify.register(LoginRoute_1.loginRoutePlugin, { prefix: '/api/v1' });
        this.fastify.register(ServiceRoutes_1.serviceRoutePlugin, { prefix: '/api/v1' });
        this.fastify.register(EmployeeRoutes_1.employeeRoutePlugin, { prefix: '/api/v1' });
    }
}
exports.default = CompanyRoutes;
