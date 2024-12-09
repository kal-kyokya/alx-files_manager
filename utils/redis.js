require('dotenv').config();  // Retrieve variables from .env file
const { createClient } = require('redis');


// RedisClient class
class RedisClient {
  constructor() {
    try {
    this.redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
      },
    });
    
    // Handle connection errors
    this.redisClient.on('error', (err) => {
      console.error('Could not connect to Redis:', err);
    });
    } catch(err) {
      console.error('Error initializing Redis client:', err);
    }
  }

  // Check if connection to Redis is successfull
  async isAlive() {
  try {
    await this.redisClient.connect();
    console.log('Connected to Redis');
    return true;
  } catch (err) {
    console.error('Could not connect to Redis:', err);
    return false;
  }
  }

  // Get value for key stored in Redis
  async get(key) {
    try {
      const value = await this.redisClient.get(key);
    
      if (value === null) {
        console.error('Key not found or expired');
        return null;
      }
      return value;
      } catch (err) {
        console.error('Error getting key:', err);
        return null;
      }
    }
  
  // Store a key, value and  duration (in seconds) in Redis
  async set(key, value, ttl) {
    try { 
      await this.redisClient.setEx(key, ttl, value);
    } catch (err) {
      console.error('Error getting key:', err);
    }
  }

  // Remove a key stored in Redis
  async del(key) {
    try {
    await this.redisClient.del(key);
    } catch (err) {
       console.error('Error getting key:', err)
    }
  }
}


// Creating and exporting an instance of RedisClient
const redisClient = new RedisClient();

module.exports = redisClient;
