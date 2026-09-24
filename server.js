// Dependencies
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;




// Listener
// Call the connection to the database first, then call the listener
// to avoid listening the server before the database is connected

await connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});