// This file adds all the routes needed by the
// express app at the core of this project.
import express from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';
import { basicAuth, xTokenAuth } from '../middlewares/auth';
import UsersController from '../controllers/UsersController';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * Function to add routes to the Express app
 * @param {Object} app - The Express app instance
 */
function addRoutes(app) {
  // New router instance
  const router = express.Router();

  // Mount the router on the '/' route
  app.use('/', router);

  // Check status of Redis and MongoDB
  router.get('/status', AppController.getStatus);

  // Query Stats (users & files collections)
  router.get('/stats', AppController.getStats);

  // Enable creation of a user
  router.post('/users', UsersController.postNew);

  // Enable user Authentication
  router.get('/connect', basicAuth, AuthController.getConnect);

  // Terminate user session
  router.get('/disconnect', xTokenAuth, AuthController.getDisconnect);

  // Retrieve user details
  router.get('/users/me', xTokenAuth, UsersController.getMe);

  // Enable creation of a file on Disk and DB
  router.post('/files', xTokenAuth, FilesController.postUpload);

  // Additional File endpoints
  router.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);
  router.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);
  router.get('/files/:id/data', FilesController.getFile);

  // Handle Undefined routes
  router.all('*', (req, res, next) => {
    errorResponse(new ROUTERError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });
  router.use(errorResponse);
}

export default addRoutes;
