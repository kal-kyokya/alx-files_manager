// Controller file enabling User Authentication

// eslint-disable import/no-named-as-default
import { uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

export default class AuthController {
  // Static method allowing caching of user details
  static async getConnect(req, res) {
    const { user } = req;
    console.log(req, user);
    const token = uuidv4();

    await redisClient.set(
      `auth_${token}`, user._id.toString(), 24 * 60 * 60,
    );
    res.status(200).json({ token });
  }

  // Static method for User session termination
  static async getDisconnect(req, res) {
    const token = req.header['X-token'];
    console.log(req.header);

    await redisClient.del(`auth_${token}`);
    res.status(204).send();
  }
}
