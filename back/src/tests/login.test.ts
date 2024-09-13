import { FastifyInstance } from 'fastify';
import CompanyRoutes from '../routes/CompanyRoutes';
import exp from 'constants';

let companyRoutes: CompanyRoutes;
let fastify: FastifyInstance;

beforeAll(() => {
    companyRoutes = new CompanyRoutes(); // Initialize the instance without redeclaring it
    fastify = companyRoutes.getFastify();

});

afterAll( async () => { 
    await companyRoutes.getDatabase().disconnect(); // Disconnect from the database after all tests are done
    fastify.close();
});

describe('CompanyRoutes',  () => {
    it('should return hello world on GET /api/v1', async () => {
       const response = await fastify.inject({
              method: 'GET',
                url: '/'
       }); // Inject a request to the fastify instance
       expect(response.statusCode).toBe(200); // Check if the status code is 200
       expect(response.json()).toEqual({ hello: 'world' });
       
    });

    it('should return hello login on POST /api/v1/login', async () => {
        const response = await fastify.inject({
            method: 'POST',
            url: '/api/v1/login',
            payload: { 
                email:'larry@gmail.com',
                password: 'password'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(response.statusCode).toBe(200);
        expect(response.json().message).toEqual("Login success");
    });
});
