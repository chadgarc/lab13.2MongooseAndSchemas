// Dependencies
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// This tells the server to expect JSON data
app.use(express.json());

// Using the book routes, all routes are mounted on /api/books
app.use("/api/books", bookRoutes);

// Listener
// Call the connection to the database first, then call the listener
// to avoid listening the server before the database is connected

await connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});