import app from "./app";
import pool from "./config/database";

const PORT = process.env.PORT || 3001;

pool.query('SELECT NOW()').then(() => {
  console.log('Connected to the database');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
  process.exit(1);
})