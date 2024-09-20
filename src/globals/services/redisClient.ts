import redisClientInstance from "../utils/redis";
import { RedisClientType } from "redis";

class RedisService {
  private redisClient: RedisClientType;

  constructor() {
    this.redisClient = redisClientInstance.getClient();
  }

  async set(
    id: string | number,
    exportName: string,
    data: string,
    expiresAt: number = 60 * 60 * 24 // Default to 24 hours in seconds
  ): Promise<void> {
    try {
      const realKey = `${String(id)}#${exportName}#${Date.now()}`; // Use Date.now() for a timestamp
      await redisClientInstance.connect();
      await this.redisClient.setEx(realKey, expiresAt, data);
    } catch (error) {
      console.error(`Error storing value in Redis with keys ${String(id)}#${exportName}:`, error);
    }
  }

  async get(id: string | number): Promise<string | null> {
    try {
      await redisClientInstance.connect();
      
      const pattern = `${id.toString()}#*`;
      const keys = await this.redisClient.keys(pattern);
  
      if (keys.length === 0) {
        console.log(`No keys found for ID: ${id}`);
        return null;
      }
  
      // Retrieve the first key's value
      const value = await this.redisClient.get(keys[0]);
      
      return value; // Return the value directly, not an object
    } catch (error) {
      console.error("Error searching for keys in Redis:", error);
      return null;
    } finally {
      await this.redisClient.disconnect();
    }
  }
  

  async push(
    stackName: string,
    value: string = Math.floor(Math.random() * 100000000).toString()
  ): Promise<boolean> {
    try {
      await redisClientInstance.connect();
      await this.redisClient.lPush(stackName, value);
      return true;
    } catch (error) {
      console.error("Error pushing to stack:", error);
      return false;
    }
  }

  async pop(stackName: string): Promise<string | null> {
    try {
      await redisClientInstance.connect();
      return await this.redisClient.lPop(stackName);
    } catch (error) {
      console.error("Error popping from stack:", error);
      return null;
    }
  }
}

// Export an instance of RedisService for use in other parts of your application
const redisService = new RedisService();
export default redisService;
