import express from 'express';
import AppController from '../controllers/AppController';
//import UsersController from '../controllers/UsersController';

// Router instance
function addRoutes(app) {
  const route = express.Router();
  app.use('/', router);

  router.get('/status', (req, res) => {
	  AppController.getStatus(req, res);
  });

  router.get('/stats', (req, res) => {
	  AppController.getStats(req, res)
  });

// 'Endpoint' permettant la création ya 'user' wa mupya
//api.post('/users', UsersController.postNew);
};

export default addRoutes;
