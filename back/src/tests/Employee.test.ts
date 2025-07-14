import {FastifyInstance} from 'fastify';
import CompanyRoutes from '../routes/CompanyRoutes';
import exp from 'constants';



let companyRoutes: CompanyRoutes;
let fastify: FastifyInstance;

beforeAll(async () => {
    companyRoutes = new CompanyRoutes(); // Initialize the instance without redeclaring it
    fastify = companyRoutes.getFastify();
    await fastify.ready(); // Ensure the Fastify instance is ready before running tests
});

afterAll(async () => {
    await companyRoutes.getDatabase().disconnect(); // Disconnect from the database after all tests are done
    fastify.close();
})

describe('CompanyRoutes', () => {

    it('should return all the services on GET /api/v1', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/v1/employees'
        });
        expect(response.statusCode).toBe(200);
        console.log("these are the employees",response.json().employees);
    })


  
    it('should add another employee via POST', async () => {
        const response = await fastify.inject({
            method: 'POST',
            url: '/api/v1/employee',
            payload: {
                photo: 'https://example.com/photo.jpg',
                fullName: 'Larry Smith',
                email: 'Larrysmith@gmail.com',
                phone: '438-456-7890',
                events: [
                    {
                        id: 1,
                        title: 'Cleaning Service',
                        start: new Date(2025, 6, 10, 13, 50), // July is month 6 (0-based)
                        end: new Date(2025, 6, 10, 16, 0),
                        allDay: false,
                        isDraggable: true,
                        clientName: 'John Doe',
                        price: 100,
                    },
                    {
                        id: 2,
                        title: 'Massage',
                        start: new Date(2025, 6, 11, 10, 0),
                        end: new Date(2025, 6, 11, 19, 0),
                        allDay: false,
                        isDraggable: true,
                        clientName: 'Jane Smith',
                        price: 150,
                    }, 
                ] // Assuming you want to add an empty array for events
               
            }
        });
        expect(response.statusCode).toBe(201);
        expect(response.json().message).toBeDefined();
    })


    it('should add another employee via POST', async () => {
        const response = await fastify.inject({
            method: 'POST',
            url: '/api/v1/employee',
            payload: {
                photo: 'https://example.com/photo.jpg',
                fullName: 'claude kamga',
                email: 'claudekamga@gmail.com',
                phone: '514-456-7890',
            }
        });
        expect(response.statusCode).toBe(201);
        expect(response.json().message).toBeDefined();
    })



})