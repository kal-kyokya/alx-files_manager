// Controller defining some endpoints
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

// Get status of Redis and DB
export const getStatus = (req, res) => {
  if (redisClient.isAlive() === true && dbClient.isAlive() === true) {
    res.status(200).json({ redis: true, db: true });
  } else {
    res.status(500).json({ redis: false, db: false });
  }
};

// Get number of users and files in DB
export const getStats = async (req, res) => {
  try {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    res.status(200).json({ users: `${users}`, files: '{files}' });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching stats', message: err.message });
  }
};
