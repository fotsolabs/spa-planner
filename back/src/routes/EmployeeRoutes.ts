import { FastifyPluginAsync, FastifyPluginCallback } from 'fastify';
import { FastifyInstance } from 'fastify';
import EmployeeService from '../services/EmployeeService';

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
            res.status(200).send({ message: 'List of employees' });
        });

        this.fastify.post('/employee', async (req, res) => {
            const body = req.body as {photo: string, fullName: string, email: string, phone: string};
            const msg = await this.employeeService.addEmployee(body);
            res.status(201).send({ message: 'Employee added successfully' });
        });

        this.fastify.delete('/employee/:id', async (req, res) => {
            // Logic to delete an employee by ID
            const { id } = req.params as { id: string };
            res.status(200).send({ message: `Employee with ID ${id} deleted` });
        });
    }
}
const employeeRoutePlugin: FastifyPluginAsync = async (fastify: FastifyInstance, options: any) => {
    const employeeRoutes = new EmployeeRoutes(fastify);
    employeeRoutes.routes();
};
export { employeeRoutePlugin };