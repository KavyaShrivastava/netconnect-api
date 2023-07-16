import mongoose from "mongoose";

const dbConnect = async()=>{
    try{
        const connected = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongdb connected at ${(connected).connection.host}`)
    }
    catch(error){
        console.log(`Error: ${error.message}`)
        process.exit(1)

    }
}

export default dbConnect