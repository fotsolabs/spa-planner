import mongoose,{Document,Schema} from "mongoose";
import { IEvent } from "./EventModel"; // Importing the IEvent interface for reference


interface IEmployee extends Document {
    photo:string | null;
    fullName: string;
    email: string;
    phone: string;
    events?: mongoose.Types.ObjectId[] | IEvent[]; // Optional field for related events
    
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
        events: [{ 
            type: mongoose.Types.ObjectId, 
            ref: 'Event' // Reference to the Event model
        }]

    }
);

const EmployeeModel = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export { EmployeeSchema,EmployeeModel, IEmployee };