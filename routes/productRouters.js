import express from 'express';
import { ProductController } from '../controllers/productController.js';
import authenticate from '../middlewares/isAuth.js';

export const routerProduct = express.Router();

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new Product
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
routerProduct.post('/', authenticate, ProductController.createProduct);

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all Products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of Products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
routerProduct.get('/', ProductController.getProducts);

/**
 * @swagger
 * /api/product/search:
 *   get:
 *     summary: Search Products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of Products matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
routerProduct.get('/search', authenticate, ProductController.searchProducts);

/**
 * @swagger
 * /api/product/products-recommendation:
 *   get:
 *     summary: Get Products by Recommendations
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of recommended Products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
routerProduct.get('/products-recommendation', authenticate, ProductController.getProductsByRecommendations);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a Product by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Product ID
 *     responses:
 *       200:
 *         description: Product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
routerProduct.get('/:id', authenticate, ProductController.getProductById);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a Product by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */
routerProduct.put('/:id', authenticate, ProductController.updateProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a Product by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
routerProduct.delete('/:id', authenticate, ProductController.deleteProduct);
