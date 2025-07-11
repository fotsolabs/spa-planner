import { IEmployee,EmployeeModel} from "../models/EmployeeModel";
import { FastifyInstance } from "fastify";
import { IEvent,EventModel } from "../models/EventModel";


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



public async addEmployee(body: {
  photo: string;
  fullName: string;
  email: string;
  phone: string;
  events?: IEvent[];
}): Promise<{ success: boolean; message: string }> {
  if (!EmployeeModel) {
    return { success: false, message: "Employee model not available" };
  }

  try {
    const existingEmployee = await EmployeeModel.findOne({ email: body.email });
    if (existingEmployee) {
      return { success: false, message: "Employee already exists" };
    }

    let eventIds: string[] = [];

    if (body.events && body.events.length > 0) {
      const createdEvents = await EventModel.insertMany(body.events);
      eventIds = createdEvents.map(event => event._id);
    }

    const employee = new EmployeeModel({
      photo: body.photo,
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      events: eventIds,
    });

    console.log("Saving new employee:", employee);
    await employee.save();

    return { success: true, message: "Employee added successfully" };
  } catch (error) {
    console.error("Error saving employee:", error);
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
}