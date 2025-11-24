import mongoose from "mongoose";
import { ENV } from "./env.js";
export const connectDB = async () =>{
    try{
        const { MONGO_URL } = ENV;
        if(!MONGO_URL) throw new error("MONGO_URL is not set");
        const conn = await mongoose.connect(ENV.MONGO_URL)
        console.log("mongodb connected",conn.connection.host)
    }catch (error){
        console.log("error connecting to mongodb",error);
        process.exit(1);

    }
}