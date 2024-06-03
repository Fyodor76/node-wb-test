import express from 'express';
import {UsersController} from "../controllers/usersController.js"
import authenticate from '../middlewares/isAuth.js';

export const routerUsers = express.Router();

routerUsers.get('/all', authenticate, UsersController.getAllUsers);
routerUsers.post('/register', UsersController.register);
routerUsers.post('/login', UsersController.login);
routerUsers.post('/logout', authenticate, UsersController.logout);
routerUsers.get('/profile', authenticate, UsersController.uploadProfilePicture);
