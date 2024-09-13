import mongoose,{Document,Schema} from "mongoose";
import { IEmployee,EmployeeModel,EmployeeSchema } from "./EmployeeModel";

interface IUser extends Document {
    email: string;
    password: string;
    photo:string | null;
    employees: IEmployee[];
}



const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    photo: { 
        type: String, 
        required: false,
        default:'default-photo-url'
    },
    employees: [EmployeeSchema]
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export { UserModel, IUser };

