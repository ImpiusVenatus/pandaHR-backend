import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import candidateRoutes from "./routes/candidate.routes.js";
import companyRoutes from "./routes/company.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import holidayRoutes from "./routes/holiday.routes.js";
import jobRoutes from "./routes/job.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import projectsRoutes from "./routes/projects.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/holiday", holidayRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/projects", projectsRoutes);

// Start the server
app.listen(port, async () => {
  try {
    await connectToMongoDB();
    console.log("Server listening on port", port);
  } catch (err) {
    console.error("Error starting server:", err);
  }
});
