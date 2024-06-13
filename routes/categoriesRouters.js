import express from 'express';
import authenticate from '../middlewares/isAuth.js';
import {CategoryController} from '../controllers/categoriesController.js'

export const routerCategory = express.Router();

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Создание категории
 *     security:
 *       - bearerAuth: []
 *     tags: [Category]
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
routerCategory.post('/', authenticate, CategoryController.createCategory);

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Получение всех категорий
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 */
routerCategory.get('/', CategoryController.getCategories);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Получение категории по ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID категории
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
routerCategory.get('/:id', authenticate, CategoryController.getCategoryById);

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Обновление категории
 *     security:
 *       - bearerAuth: []
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID категории
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
routerCategory.put('/:id', authenticate, CategoryController.updateCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Удаление категории
 *     security:
 *       - bearerAuth: []
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID категории
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
routerCategory.delete('/:id', authenticate, CategoryController.deleteCategory);

/**
 * @swagger
 * /api/category/user/{userId}:
 *   get:
 *     summary: Получение категорий пользователя
 *     security:
 *       - bearerAuth: []
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Categories not found
 *       401:
 *         description: Unauthorized
 */
routerCategory.get('/user/:userId', authenticate, CategoryController.getUserCategories);

