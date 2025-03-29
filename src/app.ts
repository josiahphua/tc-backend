import express from 'express';
import teachersRoutes from "./routes/teachers.routes";
import classRoutes from "./routes/class.routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/teachers', teachersRoutes);
app.use('/api/classes', classRoutes);

export default app;