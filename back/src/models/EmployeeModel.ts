import mongoose,{Document,Schema} from "mongoose";


interface IEmployee extends Document {
    photo:string | null;
    fullName: string;
    email: string;
    phone: string;
    
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
        }
    }
);

const EmployeeModel = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export { EmployeeSchema,EmployeeModel, IEmployee };