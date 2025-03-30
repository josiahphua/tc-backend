import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

class DatabaseClient {
  private static instance: DatabaseClient;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER || "postgres",
      host: process.env.DB_HOST || "db", // Use service name as host
      database: process.env.POSTGRES_DB || "school",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      port: parseInt(process.env.DB_PORT || "5432"),
    });
  }

  public static getInstance(): DatabaseClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient();
    }
    return DatabaseClient.instance;
  }

  public async query(text: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(text, params);
      return res;
    } finally {
      client.release();
    }
  }

  public getPool(): Pool {
    return this.pool;
  }
}

export default DatabaseClient.getInstance().getPool();
