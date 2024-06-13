import express from 'express';
import { GroupProductController } from '../controllers/groupProductsController.js';
import authenticate from '../middlewares/isAuth.js';

export const routerGroupProduct = express.Router();

/**
 * @swagger
 * /api/group-product:
 *   post:
 *     summary: Create a new GroupProduct
 *     security:
 *       - bearerAuth: []
 *     tags: [GroupProducts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupProduct'
 *     responses:
 *       201:
 *         description: GroupProduct created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
routerGroupProduct.post('/', authenticate, GroupProductController.createGroupProduct);

/**
 * @swagger
 * /api/group-product:
 *   get:
 *     summary: Get all GroupProducts
 *     tags: [GroupProducts]
 *     responses:
 *       200:
 *         description: List of GroupProducts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupProduct'
 */
routerGroupProduct.get('/', GroupProductController.getGroupProducts);

/**
 * @swagger
 * /api/group-product/{id}:
 *   get:
 *     summary: Get a GroupProduct by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [GroupProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The GroupProduct ID
 *     responses:
 *       200:
 *         description: GroupProduct data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupProduct'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: GroupProduct not found
 */
routerGroupProduct.get('/:id', authenticate, GroupProductController.getGroupProductById);

/**
 * @swagger
 * /api/group-product/{id}:
 *   put:
 *     summary: Update a GroupProduct by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [GroupProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The GroupProduct ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupProduct'
 *     responses:
 *       200:
 *         description: GroupProduct updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       404:
 *         description: GroupProduct not found
 */
routerGroupProduct.put('/:id', authenticate, GroupProductController.updateGroupProduct);

/**
 * @swagger
 * /api/group-product/{id}:
 *   delete:
 *     summary: Delete a GroupProduct by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [GroupProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The GroupProduct ID
 *     responses:
 *       200:
 *         description: GroupProduct deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: GroupProduct not found
 */
routerGroupProduct.delete('/:id', authenticate, GroupProductController.deleteGroupProduct);
