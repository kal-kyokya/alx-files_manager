// Collection of functions preprocessing 'req' object before the endpoint handler

import { getUserFromXToken, getUserFromAuthorization } from '../utils/auth';

// Function applying Basic Authentication to a route
export const basicAuth = async (req, res, next) => {
  const user = await getUserFromAuthorization(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  req.user = user;
  next();
};

// Function applying Token-Based Authentication to a route
export const xTokenAuth = async (req, res, next) => {
  const user = await getUserFromXToken(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = user;
  next();
};
