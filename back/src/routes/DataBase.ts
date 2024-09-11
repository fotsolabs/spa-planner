import mongoose from "mongoose";

export default class DataBase {

    private url: string;

    public constructor(url: string) {
        this.url = url;

    }
  
  public async connect(): Promise<void> {
    try{
        await mongoose.connect(this.url, {});
        console.log('Database connected');
    }
    catch(err){
        console.error("Database connection error:", err);
        process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try{
        await mongoose.disconnect();
        console.log('Database disconnected');
    }
    catch(err){
        console.error("Database disconnection error:", err);
        process.exit(1);
    }
  }
  
}