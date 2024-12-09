reuire('dotenv').config();
const { createClient } = require('redis');


class RedisClient {
  constructor(redisClient) {
    try {
    this.redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
      }
    });
    } on('error') {
      console.error('Could not connect to Redis:', err);
    }
  }

  async isAlive() => {
  try {
    await this.redisClient.connect
  } catch (err) {
    
  }
  }
}
