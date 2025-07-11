import { FastifyPluginAsync, FastifyPluginCallback } from 'fastify';
import { FastifyInstance } from 'fastify';
import EmployeeService from '../services/EmployeeService';
import { IEvent } from '../models/EventModel';

export default class EmployeeRoutes {
    private fastify: FastifyInstance;
    private employeeService:EmployeeService ; // Replace with actual service type if available

    constructor(fastify: FastifyInstance) {
        this.fastify = fastify;
        this.employeeService = new EmployeeService(this.fastify); // Initialize the service
    }

    public routes() {
        this.fastify.get('/employees', async (req, res) => {
            const employees = await this.employeeService.getAllEmployees();
            res.status(200).send({ message: 'List of employees', employees: employees.employees });
        });

        this.fastify.post('/employee', async (req, res) => {
            const body = req.body as {photo: string, fullName: string, email: string, phone: string, events?:IEvent[]};
            const msg = await this.employeeService.addEmployee(body);
            res.status(201).send({ message: 'Employee added successfully' });
        });

        this.fastify.delete('/employee', async (req, res) => {
            // Logic to delete an employee by ID
            const body = req.body as {photo: string, fullName: string, email: string, phone: string};
            const msg = await this.employeeService.deleteEmployee(body);
            res.status(200).send({ ok:true, message: `Employee with name ${body.fullName} deleted`});
        });
    }
}
const employeeRoutePlugin: FastifyPluginAsync = async (fastify: FastifyInstance, options: any) => {
    const employeeRoutes = new EmployeeRoutes(fastify);
    employeeRoutes.routes();
};
export { employeeRoutePlugin };