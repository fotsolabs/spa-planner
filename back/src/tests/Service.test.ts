import {FastifyInstance} from 'fastify';
import CompanyRoutes from '../routes/CompanyRoutes';
import { after } from 'node:test';
import exp from 'constants';
import { ServiceModel } from '../models/ServiceModel';



let companyRoutes: CompanyRoutes;
let fastify: FastifyInstance;

beforeAll(async () => {
    companyRoutes = new CompanyRoutes(); // Initialize the instance without redeclaring it
    fastify = companyRoutes.getFastify();
    await fastify.ready(); // Ensure the Fastify instance is ready before running tests
    await ServiceModel.deleteMany({}); // Clear the ServiceModel collection before tests
});


afterAll(async () => {
    await companyRoutes.getDatabase().disconnect(); // Disconnect from the database after all tests are done
    fastify.close();
})



describe('CompanyRoutes', () => {
    it('should return all the services on GET /api/v1', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/v1/services'
        });
        expect(response.statusCode).toBe(200);
    });

    it('should add Belgian Massage service via PUT', async () => {
        const response = await fastify.inject({
            method: 'PUT',
            url: '/api/v1/service',
            payload: {
                serviceName: 'Belgian Massage',
                category: 'Massage',
                price: 100,
                duration: '60'
            }
        });
        expect(response.statusCode).toBe(200);
        expect(response.json().message).toBeDefined();
    });

    it('should add Chinese Massage service via PUT', async () => {
        const response = await fastify.inject({
            method: 'PUT',
            url: '/api/v1/service',
            payload: {
                serviceName: 'Chinese Massage',
                category: 'Relaxation',
                price: 90,
                duration: '45'
            }
        });
        expect(response.statusCode).toBe(200);
        expect(response.json().message).toBeDefined();
        console.log("Chinese Massage " + response.json().message);
    });

    it('should add Cameroon Massage service via PUT', async () => {
        const response = await fastify.inject({
            method: 'PUT',
            url: '/api/v1/service',
            payload: {
                serviceName: 'Cameroon Massage',
                category: 'Healing',
                price: 110,
                duration: '75'
            }
        });
        expect(response.statusCode).toBe(200);
        expect(response.json().message).toBeDefined();
    });

    it('should delete the Belgian Massage service via DELETE', async () => {
        const response = await fastify.inject({
            method: 'DELETE',
            url: '/api/v1/service',
            payload: {
                serviceName: 'Belgian Massage',
                category: 'Massage'
            }
        });
        expect(response.statusCode).toBe(200);
    });
});


