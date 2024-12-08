import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

// Database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Database Connected");
  } catch (err) {
    console.log("MongoDB Database Connection Failed:", err);
  }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, async () => {
  try {
    await connect();
    console.log("Server listening on port", port);
  } catch (err) {
    console.error("Error starting server:", err);
  }
});
