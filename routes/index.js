// This file adds all the routes needed by the
// express app at the core of this project.
import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';
import { basicAuth, xTokenAuth } from '../middlewares/auth';

/**
 * Function to add routes to the Express app
 * @param {Object} app - The Express app instance
 */
function addRoutes(app) {
  // New router instance
  const router = express.Router();

  // Mounting the router on the '/' route
  app.use('/', router);

  // Route to check status of Redis and DB
  router.get('/status', AppController.getStatus);

  // Route to stats (users and files)
  router.get('/stats', AppController.getStats);

  // Route enabling creation of a new user
  router.post('/users', UsersController.postNew);

  // Route enabling user Authentication
  router.get('/connect', basicAuth, AuthController.getConnect);

  // Route terminating user session
  router.get('/disconnect', xTokenAuth, AuthController.getDisconnect);

  // Route enabling retrieval based on Auth-token
  router.get('/users/me', xTokenAuth, UsersController.getMe);

  // Route enabling creation of a new file on Disk and DB
  router.post('/files', xTokenAuth, FilesController.postUpload);
}

export default addRoutes;
