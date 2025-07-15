import { IEmployee,EmployeeModel} from "../models/EmployeeModel";
import { FastifyInstance } from "fastify";
import { IEvent,EventModel } from "../models/EventModel";


// Payload interface
interface IEmployeePayload {
  photo?: string | null;
  fullName: string;
  email: string;
  phone: string;
  signature?: string | null; // Optional field for employee signature
  events?: IEvent[]; // Array of events associated with the employee
}

export default class EmployeeService {
    
    
 
    

    private fastify: FastifyInstance;

    constructor( fastify: FastifyInstance) {
        this.fastify = fastify;

    }

    public async getAllEmployees(): Promise<{ success: boolean, message: string, employees: IEmployee[] }> {
       try {
            const employees = await EmployeeModel.find();
            if (!employees || employees.length === 0) {
                return { success: false, message: "No employees found", employees: [] };
            }
            return { success: true, message: "Employees fetched successfully", employees: employees };
       }
       catch (error) {
            console.error("Error fetching employees:", error);
            throw new Error("Failed to fetch employees");
        }
    }


    public async addEmployee(body: IEmployeePayload): Promise<{ success: boolean, message: string, employee?: IEmployee }> {
        if (!EmployeeModel) {
            return { success: false, message: "Employee model not available" };
        }

        try {
            const existingEmployee = await EmployeeModel.findOne({ email: body.email });
            if (existingEmployee) {
                return { success: false, message: "Employee with this email already exists" };
            }

            const newEmployee = new EmployeeModel(body);
            const savedEmployee = await newEmployee.save();
            return { success: true, message: "Employee added successfully", employee: savedEmployee };
        } catch (error) {
            console.error("Error adding employee:", error);
            return { success: false, message: "Failed to add employee" };
        }
    }


    public async deleteEmployee(body:{photo: string, fullName: string, email: string, phone: string}): Promise<{ success: boolean, message: string }> {
        if (!EmployeeModel) {
            return { success: false, message: "Employee model not available" };
        }

        try {
            const employee = await EmployeeModel.findOneAndDelete({ email: body.email });
            if (employee) {
                return { success: true, message: "Employee deleted successfully" };
            } else {
                return { success: false, message: "Employee not found" };
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
            return { success: false, message: "Failed to delete employee" };
        }
    }


    public async updateEmployeeEvents(email: string, events: IEvent[]) {
      if (!EmployeeModel) {
        return { success: false, message: "Employee model not available" };
      }
      try{
        const employee = await EmployeeModel.findOne({ email: email });

        if(!employee) {
          return { success: false, message: "Employee not found" };
        }
        // Update the employee's events
        employee.events = [...(employee.events || []), ...events]; 
        await employee.save();
        return { success: true, message: "Events updated successfully" };
      }
      catch (error) {
        console.error("Error updating employee events:", error);
        return { success: false, message: "Failed to update events" };
      }
    
    }

    public async deleteEmployeeEvent(email: string, event: IEvent): Promise<{ success: boolean, message: string }> {
      if (!EmployeeModel) {
        return { success: false, message: "Employee model not available" };
      }
    
      try {
        const result = await EmployeeModel.updateOne(
          { email },
          {
            $pull: {
              events: {
                title: event.title,
                start: event.start,
                end: event.end,
                clientName: event.clientName,
                price: event.price
              }
            }
          }
        );
    
        if (result.modifiedCount === 0) {
          return { success: false, message: "Event not found or already deleted" };
        }
    
        return { success: true, message: "Event deleted successfully" };
      } catch (error) {
        console.error("Error deleting employee event:", error);
        return { success: false, message: "Failed to delete event" };
      }
    }
    

   
}