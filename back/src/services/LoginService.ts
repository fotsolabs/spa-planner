import { UserModel,IUser} from "../models/UserModel";
import { IEmployee } from "../models/EmployeeModel";
import bycrypt from "bcrypt";

export default class loginService{
   
  
    constructor(){

    }

    public async login(body: { password: string, email: string }):Promise<{success:Boolean,message:string, email?:string, photo?:String|null, employees?:IEmployee[]}> {
        try{
            
           const exitUser =  new UserModel({ email: body.email, password: body.password });
           if(!exitUser){
               return {success:false,message:"User not found"};
            }

            const user = await UserModel.findOne({email:body.email});
            if (!user) {
                return {success:false,message:"Invalid password or email"};
            }
            const { email, photo, employees } = user;
        

            const isMatch = await bycrypt.compare(body.password,user.password);
            if(!isMatch){
                console.log("Invalid password or email");
                return {success:false,message:"Invalid password or email"};
            }
            return {success:true,message:"Login success",email,photo,employees};

            

        }
        catch(err){
            console.error("Login error:", err);
            return {success:false,message:"Login failed"};
        }
    }

    

    
}