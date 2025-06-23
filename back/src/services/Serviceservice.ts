import {IserviceModel,ServiceModel} from "../models/ServiceModel";
import { FastifyInstance } from "fastify";

export default class Serviceservice {
    
   
    private fastify: FastifyInstance;

    constructor(fastify: FastifyInstance) {
        this.fastify = fastify;
    }

    public async getAllServices(): Promise<{success:Boolean, message:string, services: IserviceModel[]}> {
        try {
            const services = await ServiceModel.find();
            if (!services || services.length === 0) {
                return { success: false, message: "No services found", services: [] };
            }
            return { success: true, message: "Services fetched successfully", services: services };
        } catch (error) {
            console.error("Error fetching services:", error);
            throw new Error("Failed to fetch services");
        }
    }

    public async addService(body: {
        serviceName: string;
        category: string;
        price: number;
        duration: string;
      }): Promise<{ success: boolean; message: string }> {
        if (!ServiceModel) {
          return { success: false, message: "Service model not available" };
        }
      
        try {
          const service = new ServiceModel({
            serviceName: body.serviceName,
            category: body.category,
            price: body.price,
            duration: body.duration,
          });

          const existingService = await ServiceModel.findOne(
            {   
                serviceName:body.serviceName,
                category: body.category,
            }) // check if service already exists
          if(!existingService) {
            await service.save(); // wait for save to finish
      
            return { success: true, message: "Service added successfully" };
          }
            return { success: false, message: "Service already exists" };
          
        } catch (error) {
          console.error("Error saving service:", error);
          return { success: false, message: "Failed to add service" };
        }
    }

    public async deleteService(body: { serviceName: string; category: string; price: number; duration: string; }): Promise<{ success: boolean; message: string }> {
        try {
            
            const existingService = await ServiceModel.findOne(
                {   
                    serviceName:body.serviceName,
                    category: body.category,
                    price: body.price,
                    duration: body.duration,
                })
            if(!existingService) {
                return { success: false, message: "Service not found" };
            }
            await ServiceModel.deleteOne({
                serviceName: body.serviceName,
                category: body.category,
                price: body.price,
                duration: body.duration,
            })
            return { success: true, message: "Service deleted successfully" };
        }
        catch (error) {
            console.error("Error deleting service:", error);
            return { success: false, message: "Failed to delete service" };
        }
        
    }
      
}