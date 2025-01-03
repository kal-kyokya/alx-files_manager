// File containing the 'DBClient' class enabling MongoDB interaction

// eslint-disable-next-line no-unused-vars
import mongodb from 'mongodb';
import envLoader from './env_loader';

class DBClient {
  // Initialize new DBClient instances.
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  // Validate the client's connection
  isAlive() {
    return this.client.isConnected();
  }

  // Return the number of users in the database
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // Return the number of files in the database
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  // Return the 'users' collection
  async usersCollection() {
    return this.client.db().collection('users');
  }

  // Return the 'files' collection
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
