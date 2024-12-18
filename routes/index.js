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
  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  // Route to stats (users and files)
  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });

  // Route enabling creation of a new user
  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  });

  // Route enabling user Authentication
  router.get('/connect', basicAuth, (req, res) => {
    AuthController.getConnect(req, res);
  });

  // Route terminating user session
  router.get('/disconnect', xTokenAuth, (req, res) => {
    AuthController.getDisconnect(req, res);
  });

  // Route enabling retrieval based on Auth-token
  router.get('/users/me', xTokenAuth, (req, res) => {
    UsersController.getMe(req, res);
  });

  // Route enabling creation of a new file on Disk and DB
  router.post('/files', xTokenAuth, FilesController.postUpload);
}

export default addRoutes;
