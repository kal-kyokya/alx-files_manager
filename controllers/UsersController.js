// Controller enabling creation of new users

// Import of required modules
import sha1 from 'sha1';
import { dbClient } from '../utils/db';

export default class UsersController {
  // Create a static method (belongs to the class and not its instances)
  static async postNew(req, res) {
    // Ensure user infos are provided, otherwise set them to null
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    // Raise errors if user details are incomplete
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }

    // Ensures the input user doesn't already exist
    const user = await (await dbClient.usersCollection()).findOne({ email });
    if (user) {
      res.status(400).json({ error: 'Already exist' });
      return;
    }

    // Create a new user via 2 async operations
    const insertionInfo = await (await dbClient.usersCollection())
      .insertOne({ email, password: sha1(password) });

    // Extraction of the new user's ID
    const userId = insertionInfo.insertedId.toString();

    res.status(201).json({ email, id: userId });
  }

  static async getMe(req, res) {
    const { user } = req;
    res.status(200).json(
      { email: user.email, id: user._id.toString() },
    );
  }
}
