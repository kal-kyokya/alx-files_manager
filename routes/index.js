// File handling all API calls and redirecting them accordingly

// Acquisition des modules nécessaire
import UsersController from '../controllers/UsersController';

// 'Endpoint' permettant la création ya 'user' wa mupya
api.post('/users', UsersController.postNew);
