// Controller defining some endpoints
import redisClient from '../utils/redis';
import dbClient from '../utils/db';


class AppController {
 // Get status of Redis and DB
 static getStatus(req, res) {
   const status = {
     redis: redisClient.isAlive(),
     db: dbClient.isAlive(),
   };
    res.status(200).send(status);
  } 

  // Get number of users and files in DB
  static async getStats(req, res) {
    const stats = {
      users : await dbClient.nbUsers(),
      files : await dbClient.nbFiles(),
    };
    res.status(200).send(stats);
  }
}

export default AppController;
