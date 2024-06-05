import express from 'express';
import authenticate from '../middlewares/isAuth.js';
import { UsersController } from "../controllers/usersController.js"

export const routerUsers = express.Router();

routerUsers.get('/all', authenticate, UsersController.getAllUsers);
routerUsers.post('/register', UsersController.register);
routerUsers.post('/login', UsersController.login);
routerUsers.post('/logout', authenticate, UsersController.logout);
routerUsers.post('/profile', authenticate, UsersController.uploadProfilePicture);

// Маршруты для работы с рекомендациями
routerUsers.post('/addCategory', authenticate, UsersController.addUserCategory);
routerUsers.post('/addGroupProduct', authenticate, UsersController.addUserGroupProduct);
routerUsers.get('/:userId/categories', authenticate, UsersController.getUserCategories);
routerUsers.get('/:userId/groupProducts', authenticate, UsersController.getUserGroupProducts);