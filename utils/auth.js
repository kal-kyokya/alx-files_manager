// Collection of functions (useful for)/(facilitating) User Authentication

// eslint-disable import/no-named-as-default
// eslint-disable no-unused-vars
import sha1 from 'sha1';
import mongoDBCore from 'mongodb/lib/core';
import { dbClient } from './db';
import redisClient from './redis';

// Retrieve a user off of the Authorization header
export const getUserFromAuthorization = async (req) => {
  const authorization = req.headers.authorization || null;

  if (!authorization) {
    return null;
  }
  const authorizationParts = authorization.split(' ');

  if (authorization.length !== 2 || authorizationParts[0] !== 'Basic') {
    return null;
  }
  const token = Buffer.from(authorizationParts[1], 'base64').toString();
  const sepPos = token.indexOf(':');
  const email = token.substring(0, sepPos);
  const password = token.substring(sepPos);
  const user = await (await dbClient.usersCollection).findOne({ email });

  if (!user || sha1(password) !== user.password) {
    return null;
  }

  return user;
};

// Retrieve a user off of the token in the request object
export const getUserFromXToken = async (req) => {
  const token = req.headers['x-token'];

  if (!token) {
    return null;
  }
  const userId = await redisClient.get(`auth_${token}`);

  if (!userId) {
    return null;
  }
  const user = await (await dbClient.usersCollection())
    .findOne({ _id: new mongoDBCore.BSON.ObjectId(userId) });

  return user || null;
};

export default {
  getUserFromAuthorization: async (req) => getUserFromAuthorization(req),
  getUserFromXToken: async (req) => getUserFromXToken(req),
};
