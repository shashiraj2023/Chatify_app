import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        const { MONGO_URL } = process.env;
        if(!MONGO_URL) throw new error("MONGO_URL is not set");
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected",conn.connection.host)
    }catch (error){
        console.log("error connecting to mongodb",error);
        process.exit(1);

    }
}

