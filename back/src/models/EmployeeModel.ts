import mongoose,{Document,Schema} from "mongoose";


interface IEmployee extends Document {
    name: string;
    email: string;
    phone: string;
    photo:string | null;

}

const EmployeeSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    photo: { 
        type: String, 
        required: false 
    }
});

const EmployeeModel = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export { EmployeeSchema,EmployeeModel, IEmployee };