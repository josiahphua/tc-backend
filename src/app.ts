import express from "express";
import cors from "cors";
import teachersRoutes from "./routes/teachers.routes";
import classRoutes from "./routes/class.routes";

const app = express();

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use("/api", teachersRoutes);
app.use("/api", classRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;
``