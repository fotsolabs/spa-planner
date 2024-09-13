import { FastifyPluginCallback } from 'fastify';
import { FastifyInstance } from 'fastify';
import LoginService from '../services/LoginService';
export default class LoginRoute {
    private fastify: FastifyInstance;
    private loginService:LoginService

   

    constructor(fastify:FastifyInstance) {
        this.fastify = fastify;
        this.loginService = new LoginService();
    }

    public routes() {
        this.fastify.post('/login', async (req, res) => {
            const body = req.body as { password: string, email: string };
            const msg =  await this.loginService.login(body);
            console.log("Route messages ",msg);
            res.status(200).send(msg);
        });
    }


}

const loginRoutePlugin:FastifyPluginCallback = async (fastify: FastifyInstance, options: any, done) => {
    const loginRoutes = new LoginRoute(fastify);
    loginRoutes.routes();
    done();
}

export { loginRoutePlugin };