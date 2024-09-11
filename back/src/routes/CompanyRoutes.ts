import dotenv from 'dotenv';
import Fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import DataBase from './DataBase';
import { loginRoutePlugin } from './LoginRoute';

require('dotenv').config({ path: '.env' });

export default class CompanyRoutes {
    private fastify: FastifyInstance;
    private dataBase: DataBase;
    private readonly databaseUrl: string = process.env.MONGODB_URL || '';

    constructor() {
        dotenv.config();  // Ensure environment variables are loaded at the start
        this.fastify = Fastify({ logger: true });
        this.dataBase = new DataBase(this.databaseUrl);
        this.registerPlugins();  // Register plugins before starting the server
        this.init();  // Initialize the server
        this.routes();  // Define routes
    }

    public getFastify(): FastifyInstance {
        return this.fastify;
    }

    public getDatabase(): DataBase {
        return this.dataBase;
    }

    private async init() {
        await this.dataBase.connect();
    }

    public listen() {
        const port = process.env.PORT || 3000;
        this.fastify.listen(port, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Server is running at ${address}`);
        });
    }

    private registerPlugins() {
        this.fastify.register(fastifyCors, {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            exposedHeaders: ['Content-Range', 'X-Content-Range'],
            credentials: true
        });

        this.fastify.register(fastifyJwt, {
            secret: process.env.SECRET_KEY || 'supersecret'
        });
    }

    private routes() {
        this.fastify.get('/', async (req, res) => {
            res.send({ hello: 'world' });
        });
        this.fastify.register(loginRoutePlugin, { prefix: '/api/v1' });
    }
}
