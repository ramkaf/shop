import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";

dotenv.config();

interface RedisConfig {
  user?: string;
  host?: string;
  port?: number;
  password?: string;
}

class RedisClient {
  private static instance: RedisClient;
  private client: RedisClientType;
  private config: RedisConfig;

  private constructor(config: RedisConfig) {
    this.config = config || {};
    this.client = createClient({
      url: `redis://${this.config.user}:${this.config.password}@${this.config.host}:${this.config.port}`,
    });
  }

  public static getInstance(config: RedisConfig): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient(config);
    }
    return RedisClient.instance;
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      this.client.on("error", (err) => console.error("Redis Client Error", err));
      await this.client.connect();
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  getClient(): RedisClientType {
    return this.client;
  }
}

// Example usage with custom configuration from environment variables
const redisConfig: RedisConfig = {
  user: process.env.REDIS_USER || "", // Add default empty string or suitable default
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || "",
};

const instance = RedisClient.getInstance(redisConfig);
Object.freeze(instance);

export default instance;
