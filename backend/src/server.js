// const express = require("express");
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const port = process.env.PORT || 3000;

const app = express();


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);





app.listen(port,()=> console.log(`server started on port ${port}`));
