import { FastifyPluginAsync, FastifyPluginCallback } from 'fastify';
import { FastifyInstance } from 'fastify';
import Serviceservice from '../services/Serviceservice';


export default class ServiceRoutes {
    private fastify: FastifyInstance;
    private serviceService: Serviceservice;

    constructor(fastify: FastifyInstance) {
        this.fastify = fastify;
        this.serviceService = new Serviceservice(this.fastify);
    }

    public routes() {
        this.fastify.get('/services', async (req, res) => {
            const msg = await this.serviceService.getAllServices();
            console.log("Route messages ", msg);
            res.status(200).send(msg);
        });

        this.fastify.put('/service', async (req, res) => {
            const body =  req.body as { serviceName: string, category: string, price: number, duration: string };
            const msg = await this.serviceService.addService(body);
            console.log("Route messages ", msg);
            res.status(200).send(msg);
        });

        this.fastify.delete('/service', async (req, res) => { 
            const body = req.body as { serviceName: string, category: string, price: number, duration: string };
            const msg = await this.serviceService.deleteService(body);
            console.log("Route messages ", msg);
            res.status(200).send(msg);
        })
    }

   
    
    
}

const serviceRoutePlugin: FastifyPluginAsync = async (fastify: FastifyInstance, options: any) => {
    const serviceRoutes = new ServiceRoutes(fastify);
    serviceRoutes.routes();
    
};

export {serviceRoutePlugin};