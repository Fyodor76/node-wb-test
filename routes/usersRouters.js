import express from 'express';
import authenticate from '../middlewares/isAuth.js';
import { UsersController } from "../controllers/usersController.js"

export const routerUsers = express.Router();

/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Получение всех пользователей
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 */
routerUsers.get('/all', authenticate, UsersController.getAllUsers);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */
routerUsers.post('/register', UsersController.register);


/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
routerUsers.post('/login', UsersController.login);


/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Выход из приложения
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful logout
 *       401:
 *         description: Unauthorized
 */
routerUsers.post('/logout', authenticate, UsersController.logout);


/**
 * @swagger
 * /api/user/update-picture:
 *   post:
 *     summary: Обновление фотографии пользователя
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Picture uploaded
 *       401:
 *         description: Unauthorized
 */
routerUsers.post('/update-picture', authenticate, UsersController.uploadProfilePicture);


/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Получение данных о профиле пользователя
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 */
routerUsers.get('/profile', authenticate, UsersController.getUserProfile);


/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Обновление профиля пользователя
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Unauthorized
 */
routerUsers.put('/profile', authenticate, UsersController.updateProfile);

// Маршруты для работы с рекомендациями
/**
 * @swagger
 * /api/user/addCategory:
 *   post:
 *     summary: Добавление категорий в рекомендации пользователя
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category added
 *       401:
 *         description: Unauthorized
 */
routerUsers.post('/addCategory', authenticate, UsersController.addUserCategory);


/**
 * @swagger
 * /api/user/addGroupProduct:
 *   post:
 *     summary: Добавление группы продуктов в рекомендации пользователя
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupProductId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Group product added
 *       401:
 *         description: Unauthorized
 */
routerUsers.post('/addGroupProduct', authenticate, UsersController.addUserGroupProduct);

/**
 * @swagger
 * /api/user/{userId}/categories:
 *   get:
 *     summary: Получение категорий, которые нравятся пользователю
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 */
routerUsers.get('/:userId/categories', authenticate, UsersController.getUserCategories);


/**
 * @swagger
 * /api/user/{userId}/groupProducts:
 *   get:
 *     summary: Получение групп продуктов, которые нравятся пользователю
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 */
routerUsers.get('/:userId/groupProducts', authenticate, UsersController.getUserGroupProducts);