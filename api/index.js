import express from "express";
import dotenv from "dotenv";
import mysql from "mysql";

import cors from "cors";

import userRoute from "./routes/user.route.js";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
connection.connect((err) => {
  if (err) {
    console.error(`Error connecting to MySQL database: ${err.stack}`);
    return;
  }
  console.log(`Connected to MySQL database as id ${connection.threadId}`);
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
});
