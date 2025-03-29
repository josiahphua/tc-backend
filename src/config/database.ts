import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config()

class DatabaseClient {
  private static instance: DatabaseClient
  private pool: Pool
  
  private constructor() {
    this.pool = new Pool({
      user: process.env.PG_USER || 'postgres',
      host: process.env.PG_HOST || 'localhost',
      database: process.env.PG_DATABASE || 'school',
      password: process.env.PG_PASSWORD || 'postgres',
      port: parseInt(process.env.PG_PORT || '5432'),
    })
  }
  
  public static getInstance(): DatabaseClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient()
    }
    return DatabaseClient.instance
  }
  
  public async query(text: string, params?: any[]) {
    const client = await this.pool.connect()
    try {
      const res = await client.query(text, params)
      return res
    } finally {
      client.release()
    }
  }
  
  public getPool(): Pool {
    return this.pool
  }
}

export default DatabaseClient.getInstance().getPool()