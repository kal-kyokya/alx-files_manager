// Importing the Redis client library
import { createClient } from 'redis';

// Importing promisify to convert callback-based functions into promises
import { promisify } from 'util';

// RedisClient class to manage interactions with redis
class RedisClient {
  constructor() {
    this.client = createClient();

    // Track if client is connected to Redis
    this.isClientConnected = true;

    // Handle connection errors
    this.client.on('error', (err) => {
      console.error(
        'Redis client failed to connect:', err.message || err.toString(),
      );
      this.isClientConnected = false;
    });

    // Set connection status to true when successfully connected
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Check if connection to Redis is alive
   * @return {boolean} - Returns true if connected, false otherwise
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Get value for key stored in Redis
   * @param {string} key - The key to look up in Redis
   * @returns {Promise<string|null>} - Value or null if key doesn't exist
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Store a key-value pair with expiration time ttl (in seconds)
   * @param {string} key - The key to store
   * @param {string} value - value to store
   * @param {number} ttl - Duration/Time-to-live in seconds
   * @returns {Promise<void>}
   */
  async set(key, value, ttl) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, ttl, value);
  }

  /**
   * Remove a key stored in Redis
   * @param {string} key - The key to delete
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

// Creating and exporting an instance of RedisClient
const redisClient = new RedisClient();

export default redisClient;
