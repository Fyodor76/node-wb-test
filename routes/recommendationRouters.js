import express from 'express';
import { RecommendationController } from '../controllers/recommendationController.js';
import authenticate from '../middlewares/isAuth.js';

export const routerRecommendation = express.Router();

/**
 * @swagger
 * /api/recommendation:
 *   post:
 *     summary: Create a new Recommendation
 *     security:
 *       - bearerAuth: []
 *     tags: [Recommendations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recommendation'
 *     responses:
 *       201:
 *         description: Recommendation created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
routerRecommendation.post('/', authenticate, RecommendationController.saveRecommendations);

/**
 * @swagger
 * /api/recommendation:
 *   get:
 *     summary: Get all Recommendations
 *     security:
 *       - bearerAuth: []
 *     tags: [Recommendations]
 *     responses:
 *       200:
 *         description: List of Recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       401:
 *         description: Unauthorized
 */
routerRecommendation.get('/', authenticate, RecommendationController.getRecommendations);

/**
 * @swagger
 * /api/recommendation/{id}:
 *   delete:
 *     summary: Delete a Recommendation by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Recommendation ID
 *     responses:
 *       200:
 *         description: Recommendation deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recommendation not found
 */
routerRecommendation.delete('/:id', authenticate, RecommendationController.removeRecommendation);
