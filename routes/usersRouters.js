import express from 'express';
import { UsersController } from '../controllers/usersController.js';

const routerUsers = express.Router();

routerUsers.post('/register', UsersController.register);
routerUsers.post('/login', UsersController.login);
routerUsers.post('/logout', UsersController.logout);
routerUsers.get('/all', UsersController.getAllUsers);
routerUsers.post('/upload-profile-picture', UsersController.uploadProfilePicture); 

export default routerUsers;