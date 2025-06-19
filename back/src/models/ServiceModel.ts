import mongoose, {Document,Schema} from "mongoose";

interface IserviceModel extends Document {
    serviceName: string;
    duration: string;
    price: number;
    category: string;
}

const ServiceSchema = new Schema(
    {
        serviceName: { 
            type: String, 
            required: true 
        },
        duration: { 
            type: String, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true 
        },
        category: { 
            type: String, 
            required: true 
        }
    })

const ServiceModel = mongoose.model<IserviceModel>('Service', ServiceSchema);

export { ServiceModel, IserviceModel };