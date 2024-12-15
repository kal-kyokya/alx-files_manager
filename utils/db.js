// This file contains the 'DBClient' class enabling MongoDB manipulation

// Importing required modules
// eslint-disable-next-line no-unused-vars
import mongodb from 'mongodb';
import envLoader from './env_loader';

class DBClient {
  // Function initializing new DBClient instances.
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  // This function validates the client's connection
  isAlive() {
    return this.client.isConnected();
  }

  // This function returns the number of users in the database
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // This function returns the number of files in the database
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  // This function returns the 'users' collection
  async usersCollection() {
    return this.client.db().collection('users');
  }

  // This function returns the 'files' collection
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
