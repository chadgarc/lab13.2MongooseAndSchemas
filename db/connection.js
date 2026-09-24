import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

// Database
// MongoDBConnection

// Just a monitor
const db = mongoose.connection
db.on('error', (error) => console.log(error.message + ' mongo is not running'))
db.once('connected', () => console.log('mongo is connected'))
db.on('disconnected', () => console.log('mongo is disconnected'))
db.on('reconnected', () => console.log('mongo is reconnected'))

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;