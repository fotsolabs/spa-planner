import {FastifyInstance} from 'fastify';
import CompanyRoutes from '../routes/CompanyRoutes';
import { after } from 'node:test';



let companyRoutes: CompanyRoutes;
let fastify: FastifyInstance;

beforeAll(async () => {
    companyRoutes = new CompanyRoutes(); // Initialize the instance without redeclaring it
    fastify = companyRoutes.getFastify();
    //await fastify.ready(); // Ensure the Fastify instance is ready before running tests
});


afterAll(async () => {
    await companyRoutes.getDatabase().disconnect(); // Disconnect from the database after all tests are done
    fastify.close();
})



describe('CompanyRoutes',  () => {
    it('should return all the services on GET /api/v1', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/v1/services'
        }); // Inject a request to the fastify instance
        expect(response.statusCode).toBe(200); // Check if the status code is 200
        
        
    })

    it('should add a service PUT /api/v1', async () => {
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
        expect(response.statusCode).toBe(200); // Check if the status code is 200

    })

    it('should delete the specific service', async () => {
        const response = await fastify.inject({
            method: 'DELETE',
            url: '/api/v1/service',
            payload: {
                serviceName: 'Belgian Massage',
                category: 'Massage',
                price:100,
                duration: '60'
            }
        });
        expect(response.statusCode).toBe(200); // Check if the status code is 200

    })

    

})

