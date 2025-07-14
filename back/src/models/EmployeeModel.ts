import mongoose,{Document,Schema} from "mongoose";
import { IEvent,EventSchema } from "./EventModel"; // Importing the IEvent interface for reference


interface IEmployee extends Document {
    photo:string | null;
    fullName: string;
    email: string;
    phone: string;
    signature?: string|null; // Optional field for employee signature
    events?: IEvent[]; // Array of events associated with the employee
    
}


const EmployeeSchema = new Schema(
    {
        photo: { 
            type: String, 
            default: null 
        },
        fullName: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        phone: { 
            type: String, 
            required: true,
            unique: true
        },
        signature: { 
            type: String, 
            default: null 
        },
        events: [EventSchema] // Array of events associated with the employee, can be null

    }
);

const EmployeeModel = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export { EmployeeSchema,EmployeeModel, IEmployee };