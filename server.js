// Dependencies
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

